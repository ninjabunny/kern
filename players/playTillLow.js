function Player() {
  this._playerIdx = null;
};
var baseDeck = [6,6,6,6,6,6,5,5,4,4,3,3,2,2,1,1];
Player.prototype = {
  

  startRound: function(idx) {
    this._playerIdx = idx;
  },
  nextMove: function(gameState) {

    var myValue = gameState.computePlayerValues()[this._playerIdx],
      pileValue = gameState.computePileValue(),
      delta = myValue - pileValue,
      myHand = gameState._hands[this._playerIdx];
      history = gameState.historyStack;


    // deduce possible enemy cards
    if(baseDeck.length === 16){
      console.log(myHand);
      console.log(baseDeck);
      //remove my own cards first
      for(var i = 0; i < myHand.length; i++){
        console.log('fire');
        baseDeck = removeUniqueArr(baseDeck, myHand[i]);  
      }
      // removeUniqueArr(baseDeck, myHand[0]);
      // removeUniqueArr(baseDeck, myHand[1]);
      // removeUniqueArr(baseDeck, myHand[2]);
      // removeUniqueArr(baseDeck, myHand[3]);
      // removeUniqueArr(baseDeck, myHand[4]);
      // removeUniqueArr(baseDeck, myHand[5]);
      console.log(baseDeck);
    }
    // if(history[history.length].rank !== undefined){
    //   removeUniqueArr(baseDeck, history[history.length].rank);  
    // }
    
    console.log(baseDeck);

    if(history.length === 0){
      //I am first player
      //stub: throw a 6,
      //stub: throw something else
    }
    if (delta < 1) {
      return {action: 'knock'};
    } else {
      myHand.sort();
      for (var i=myHand.length - 1; i>=0; i--) {
        if (pileValue + (myHand[i] * 2) < myValue) {
          return {action: 'play', rank: myHand[i]};
        }
      }

      return {action: 'play', rank: myHand[0]};
    }
    function contains6(){
      for (var i=0; i<myHand.length; i++) {
        if(myHand[i] === 6){
          return true;
        }
      }
      return false;
    }
    function removeUniqueArr(arr, target){
      for(i=0;i<arr.length;i++){
        if(arr[i] === target){
          arr.splice(i, 1);
          break;
        }
      }
      
    }
  }
};

module.exports = Player;
