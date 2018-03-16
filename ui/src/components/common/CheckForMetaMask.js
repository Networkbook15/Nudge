import React from 'react';


module.exports = new Promise(function(resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function() {
      var web3 = window.web3
  
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
  
        resolve(web3);
      } else {
  
        resolve(false);
      }
    })
  });
  