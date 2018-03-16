pragma solidity ^0.4.0;

contract NudgeFactory {
  // index of created contracts
  address[] public contracts;

  // useful to know the row count in contracts index
  function getContractCount() public constant returns(uint contractCount){
    return contracts.length;
  }

  // deploy a new contract
  function newCookie(address _user, address _moderator, address _alternativePayout, string _commitment, uint _durationMinutes) public returns(address newContract){
    Nudge c = new Nudge(_user, _moderator, _alternativePayout, _commitment, _durationMinutes);
    contracts.push(c);
    return c;
  }
}

contract Nudge {
    enum State {AWAITING_COMMITMENT, AWAITING_COMPLETION, AWAITING_JUDGING, SUCCESS, FAILURE}
    // AWAITING_COMMITMENT - Initial state, once contract created it changes
    // AWAITING_COMPLETION - Before deadline or user proof 
    // AWAITING_JUDGING - Waiting for verdict to be decided by moderator, payout
    // SUCCESS - Task completed, funds sent to user
    // FAILURE - Task incomplete, funds sent to alternativePayout
    
    // NOTE: had a buffer between complete and payout to submit disputes, but
    //       left out for first iteration
    
    State public currentState; // defaults to AWAITING_COMMITMENT
    
    modifier inState(State expectedState){
        require(currentState == expectedState);
        _;
    }
    modifier userOnly(){
        require(msg.sender == user);
        _;
    }
    
    modifier moderatorOnly(){
        require(msg.sender == moderator);
        _;
    }
    
    modifier userOrModeratorOnly(){
        require(msg.sender == moderator || msg.sender == user);
        _;
    }
    
    address public contractAddress; 
    address public user;
    address public moderator;
    address public alternativePayout;
    
    string public commitment;
    string public proof;
    bool public verdict;
    uint public deadline;
    bool public proofProvided;
    
    event deadlineTime(uint deadline);
    event verdictDecided(bool verdict, address payout);
    event proofHasBeenProvided(string proof);
    event noProofProvided(uint time);


    // constructor, called by user 
    // NOTE: Consider sending small fee to moderator's address to cover gas cost
    function Nudge(address _user, address _moderator, address _alternativePayout, string _commitment, uint _durationMinutes) public payable{
        contractAddress = this;
        
        user = _user;
        moderator = _moderator;
        alternativePayout = _alternativePayout;
        commitment = _commitment;

        // calculate deadline
        // now is an alias to block.timestamp property, seconds since epoch
        // solidity has day, months, seconds
        deadline = now + (_durationMinutes * 1 minutes);
        
        emit deadlineTime(deadline);
        currentState = State.AWAITING_COMPLETION;
    }
    
    // The user provides proof (url to image, string explination, etc)
    function proveCommitment(string _proof) userOnly inState(State.AWAITING_COMPLETION) public {
        // require currentTime <= deadline
        require(now <= deadline);
        
        proof = _proof;
        proofProvided = true;
        emit proofHasBeenProvided(proof);
        
        currentState = State.AWAITING_JUDGING;
    }
    
    // called by moderator if deadline passes and no proof was provided
    function noProofAfterDeadline() moderatorOnly inState(State.AWAITING_COMPLETION) public {
        // 1) check conditions
        require(now >= deadline);
        require(!proofProvided);
        
        // 2) update state
        verdict = false;
        emit noProofProvided(now);
        emit verdictDecided(verdict, alternativePayout);
        currentState = State.FAILURE;
        
        // 3) interact with address
        alternativePayout.transfer(contractAddress.balance);
    }
    
    // the moderator makes a verdict if the proof in proveCommitment() was valid
    function didCompleteCommitment(bool _verdict) moderatorOnly inState(State.AWAITING_JUDGING) public {
        // 1) check conditions
        require(now >= deadline);
        
        // 2) update state
        verdict = _verdict;
        if (verdict){
            // User succedeed, they get their money back
            currentState = State.SUCCESS;
            emit verdictDecided(verdict, user);
        }
        else{
            // User failed, they lose the money and it is sent to alternativePayout
            currentState = State.FAILURE;
            emit verdictDecided(verdict, alternativePayout);
        }
        
        // 3) interact with address
        if (verdict){
            user.transfer(contractAddress.balance);
        }
        else {
            alternativePayout.transfer(contractAddress.balance);
        }
    }
}