const settingSubmit = document.querySelector('.setting__button');
const settingColumn = document.querySelector('#setting__column');
const settingRow = document.querySelector('#setting__row');
const gameBoard = document.querySelector('.game');
const settingForm = document.querySelector('.setting')


function settingUp() {
  let cardCount = settingColumn.value * settingRow.value;

  gameBoard.style.cssText=`grid-template-columns: repeat(${settingColumn.value}, 1fr);`
  gameInit(cardCount)
  settingForm.style.cssText='display: none'
}


// ========== инициализация массива

function gameInit (settingCardCount) {
  const cardCount = settingCardCount
  function CardObjInit() {
    let cardsList = [];

    function cardArray(i) {
      if (i == 0) {
        return cardsList = cardsList.concat(cardsList);
      } else {
        cardsList = cardsList.concat(i);
        return cardsList, cardArray(i-1);;
      }
    }(100)
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
        <p className='card__number'>
          {props.value}
        </p>
      </div>
    )
  }

  let selectOne = 0
  let selectTwo = 0
  let cardOpened = 0
  let win = 0

  function cardMark(i) {
    const selectDiv = document.getElementById(i.index)
    selectDiv.classList.toggle('marked')
  }


  class App extends React.Component {

    state = { cards: mainObj }

    handleClick(i) {
      if (selectTwo == 0) {
        if (selectOne == 0) {
          selectOne = i;
          cardMark(i)

        } else {
          selectTwo = i;
          cardMark(i)
          if (selectOne.id === selectTwo.id) {
            selectOne = 0
            selectTwo = 0
            cardOpened++
            if (cardOpened == cardCount/2) {
              console.log('Win!')
              win = 1;
            }
          } else {
            setTimeout(() => {  cardMark(selectOne) }, 1000);
            setTimeout(() => {  cardMark(selectTwo) }, 1000);
            setTimeout(() => {  selectOne = 0 }, 1000);
            setTimeout(() => {  selectTwo = 0 }, 1000);   
          } 
        }
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


  class Stopwatcher extends React.Component {
    constructor(props) {
        super(props);
  
        this.timer = null;
        
        this.state = {
            minute: 0,
            seconds60: 0,
            seconds10: 0,
            ms: 0,
        };
    }

  
    componentDidMount() {
        this.timer = setInterval(() => {
          if (win == 0) {
            this.tick();
          } else {

            this.componentWillUnmount()
          }
        }, 100);
        
    }
  
    tick() {
      this.setState({
        ms: this.state.ms + 1,
      })
      if (this.state.ms == 10) {
        this.setState({
          ms: this.state.ms = 0,
          })
        this.setState({
            seconds10: this.state.seconds10 + 1,
          })
        if (this.state.seconds10 == 10) {
          this.setState({
            seconds10: this.state.seconds10 = 0,
          })
          this.setState({
            seconds60: this.state.seconds60 + 1,
          })
        if (this.state.seconds60 == 6) {
          this.setState({
              seconds60: this.state.seconds60 = 0,
              seconds10: this.state.seconds10 = 0,
            })
          this.setState({
              minute: this.state.minute + 1,
            })
          }
        }  
      }     
    }
  
    componentWillUnmount() {
        clearInterval(this.timer);
    }
  
    render() {
        return (
            <h1 className="content__title">Time {this.state.minute}:{this.state.seconds60}{this.state.seconds10}.{this.state.ms}</h1>
        )
    }
  }
  
  ReactDOM.render(
      <Stopwatcher />,
      document.querySelector('.content__title')
    );
}






settingSubmit.addEventListener('click', settingUp)