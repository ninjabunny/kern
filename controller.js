function Controller(player1, player2) {
  this.p1 = player1;
  this.p2 = player2;
}

function _shuffle(arr) {
  // FY shuffle an array in place
  var j, tmp;
  for (var i=arr.length - 1; i>0; i--) {
    j = ~~(Math.random() * (i + 1));
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  return arr;
}

_baseDeck = [6,6,6,6,6,6,5,5,4,4,3,3,2,2,1,1];

Controller.prototype = {
  _generateHands: function() {
    // Returns an arrray of the standard deck partitioned into 3 sub arrays of
    // length 6, 6, and 4 (two hands and the non-playable cards)
    var deck = _baseDeck.slice(0);
    _shuffle(deck);

    return [deck.slice(0,6), deck.slice(6,12), deck.slice(12)]
  },
  runOneGame: function() {
    var partition = this._generateHands();
    console.log(partition);
  }
}

var c = new Controller();
c.runOneGame();
