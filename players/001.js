function Player() {
  this._playerIdx = null;
};


Player.prototype = {
  startRound: function(idx) {
    this._playerIdx = idx;
  },
  nextMove: function(gameState) {
    var myValue = gameState.computePlayerValues()[this._playerIdx],
        pileValue = gameState.computePileValue(),
        delta = myValue - pileValue,
        myHand = gameState._hands[this._playerIdx],
        myHandRate = null,
        enemyHandRate = null;


      // Step 1: Determine if my Hand and the Enemy Hand is High or Low
      console.log("Hand: " + myHand);
      myHandRate = computeMyHandRate(myHand);
      console.log("My hand is: " + myHandRate);

      // Step 2: Check if condition can be fulfilled
         // 2a: checkEnemyChance of exact
         //     if high: step 3
         //     if  low: knock

      // Step 3: If more than one 6, discard
      if (findOccurrences(myHand,6)>1){
        return {action: 'discard', rank:6};
      }

      // Step 4: ???

    else if (delta < 1) {
      return {action: 'knock'};
    } else {
      //myHand.sort();
      for (var i=myHand.length - 1; i>=0; i--) {
        if (pileValue + (myHand[i] * 2) < myValue) {
          return {action: 'play', rank: myHand[i]};
        }
      }

      return {action: 'play', rank: myHand[0]};
    }
  }
};

function computeMyHandRate(hand){
  var myCardsHandRate;
  if ( findOccurrences(hand,4)==2 || findOccurrences(hand,5)==2 || 
    (findOccurrences(hand,5)==1 && findOccurrences(hand,4)==1)){
    return "high";
  }
  else return "low";
};

function computerEnemyHandRate(hand, pileValue){

};


function checkCondition(hand, pileValue){
  var condition = {};
  condition.index = null;
  condition.pass = null;
  for(var i = 0; i < hand.length; i++){
    var tempHand = hand.slice(0);
    tempHand.splice(i,1);
    if (computeSumMyHand(tempHand) - pileValue < 2){
      condition.index = i;
      condition.pass = true;
      return condition;
    }
    else condition.pass = false;
  }
  return false;
}

function computeSumMyHand(hand){
  var sum = 0;
  for (var i = 0; i < hand.length; i++){
    sum+=hand[i];
  }
  return sum;
}

function findOccurrences(hand, value) {
    var i,
        count = 0;
    for (i = 0; i < hand.length; i++) {
        if (hand[i] === value){
          count++;
        }
    }
    return count;
}

module.exports = Player;
