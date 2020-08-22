function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), 
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i]) {
      return;
    }
    squares[i] = this.state = i+1;
    this.setState({
      squares: squares,
    });
  }

  renderSquare(i) {
    return (
    <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
    />
    );
  }

  render() {
    const status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.querySelector('.content')
);


//=========================================


const initialCards = [1, 2, 3, 4];
const cardsList = initialCards.concat(initialCards);


let tapCount = 0;

function handleClick(i) {
  console.log(i)
  if (i == tapCount) {
    console.log('Ok')
  } else {
    tapCount = i;
  }
}

class Game extends React.Component {
  

  render() {
    return (
      <div className="game">
        {cardsList.map((card, index) => 
         <div
           key={index}
           className={'card'}
           onClick={handleClick.bind(this, card)}
         >{card}</div>
        )}
      </div>
    )
  }
  
}

// ========================================

ReactDOM.render(
  <Game />,
  document.querySelector('.content')
);



// ========== инициализация массива

function CardObjInit() {
  let cardsList = [];
  let cardCount = 16;

  function cardArray(i) {
    if (i == 0) {
      return cardsList = cardsList.concat(cardsList);
    } else {
      cardsList = cardsList.concat(i);
      return cardsList, cardArray(i-1);;
    }
  }
  function initCards(cardCount) {
    let i = cardCount / 2;
    cardArray(i)
  }

  initCards(cardCount)

  function makeRandomArr(a, b) {
    return Math.random() - 0.5;
  }
  cardsList.sort(makeRandomArr);

  const mainObj = [];

  cardsList.forEach(createFuncObj)
  function createFuncObj(i, index) {
    const Obj = new Object();
    Obj.id = i;
    Obj.index = index;
    mainObj.push(Obj)
  }

  return mainObj;
}
mainObj = CardObjInit()
//============== инициализация карточек

function Card(props) {

  const classes = ['card'];

  return (
    <div className={classes.join(' ')} id={props.index} onClick={props.mark}>
      {props.value}
    </div>
  )
}

let selectOne = 0
let selectTwo = 0

function cardMark(i) {
  const selectDiv = document.getElementById(selectOne.index)
  console.log(selectDiv)
}


class App extends React.Component {

  state = { cards: mainObj }

  handleClick(i) {

    if (selectOne == 0) {
      selectOne = i;
      cardMark(i)

    } else {
      selectTwo = i;
      console.log(selectTwo)
      if (selectOne.id === selectTwo.id) {
        console.log('Ok')
      } else {
        console.log('ne Ok')
      }
      selectOne = 0
      selectTwo = 0
    }
  }

  render() {
    return this.state.cards.map(card => {
      return (
        <Card 
        card = {card}
        value = {card.id}
        index = {card.index}
        key = {card.index}
        mark={this.handleClick.bind(this, card)}
        />
      )
    })
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.game')
);