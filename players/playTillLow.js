function Player() {
  this._playerIdx = null;
  var records;
  this.getRecords = function(){return records;};
  this.setRecords = function(value){records = value;};
};

Player.prototype = {
  
  startRound: function(idx) {
    this._playerIdx = idx;
    this.setRecords([6,6,6,6,6,6,5,5,4,4,3,3,2,2,1,1]); 
  },
  nextMove: function(gameState) {

    var myValue = gameState.computePlayerValues()[this._playerIdx],
      pileValue = gameState.computePileValue(),
      delta = myValue - pileValue,
      myHand = gameState._hands[this._playerIdx];
      history = gameState.historyStack;
      if(this.getRecords().length === 16){
        console.log('my starting hand: ' + myHand);
        removeUniqueArr(this.getRecords(), myHand[0]);
        removeUniqueArr(this.getRecords(), myHand[1]);
        removeUniqueArr(this.getRecords(), myHand[2]);
        removeUniqueArr(this.getRecords(), myHand[3]);
        removeUniqueArr(this.getRecords(), myHand[4]);
        removeUniqueArr(this.getRecords(), myHand[5]);
        console.log(this.getRecords());  
      }
      removeUniqueArr(this.getRecords(), history[history.length -1].rank);
      console.log(this.getRecords());

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
