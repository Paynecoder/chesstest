var board = null
var game = new Chess()

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false
}

function makeRandomMove () {
  var possibleMoves = game.moves()

  // game over
  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  board.position(game.fen())
}

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  // make random legal move for black
  window.setTimeout(makeRandomMove, 250)
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}


/** SEARCHES FOR PIECES IMAGES */
function pieceTheme (piece) {
  if (piece.search(/w/) !== -1) {
    return './img/pieces/' + piece + '.png'
  }

  return './img/pieces/' + piece + '.png'
}

/** board config */
var config = {
    draggable: true,
    pieceTheme: pieceTheme,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd, 
  }

  var board = Chessboard('myBoard', config)


  /**clear and start btns */
  $('#startBtn').on('click', board.start)
  $('#clearBtn').on('click', board.clear)


/**  */




