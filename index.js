var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var settingSubmit = document.querySelector('.setting__button');
var settingColumn = document.querySelector('#setting__column');
var settingRow = document.querySelector('#setting__row');
var gameBoard = document.querySelector('.game');
var settingForm = document.querySelector('.setting');

function settingUp() {
  var cardCount = settingColumn.value * settingRow.value;

  gameBoard.style.cssText = 'grid-template-columns: repeat(' + settingColumn.value + ', 1fr);';
  gameInit(cardCount);
  settingForm.style.cssText = 'display: none';
}

// ========== инициализация массива

function gameInit(settingCardCount) {
  var cardCount = settingCardCount;
  function CardObjInit() {
    var cardsList = [];

    function cardArray(i) {
      if (i == 0) {
        return cardsList = cardsList.concat(cardsList);
      } else {
        cardsList = cardsList.concat(i);
        return cardsList, cardArray(i - 1);;
      }
    }100;
    function initCards(cardCount) {
      var i = cardCount / 2;
      cardArray(i);
    }

    initCards(cardCount);

    function makeRandomArr(a, b) {
      return Math.random() - 0.5;
    }
    cardsList.sort(makeRandomArr);

    var mainObj = [];

    cardsList.forEach(createFuncObj);
    function createFuncObj(i, index) {
      var Obj = new Object();
      Obj.id = i;
      Obj.index = index;
      mainObj.push(Obj);
    }

    return mainObj;
  }
  mainObj = CardObjInit();
  //============== инициализация карточек

  function Card(props) {

    var classes = ['card'];

    return React.createElement(
      'div',
      { className: classes.join(' '), id: props.index, onClick: props.mark },
      React.createElement(
        'p',
        { className: 'card__number' },
        props.value
      )
    );
  }

  var selectOne = 0;
  var selectTwo = 0;
  var cardOpened = 0;
  var win = 0;

  function cardMark(i) {
    var selectDiv = document.getElementById(i.index);
    selectDiv.classList.toggle('marked');
  }

  var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, App);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = { cards: mainObj }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(App, [{
      key: 'handleClick',
      value: function handleClick(i) {
        if (selectTwo == 0) {
          if (selectOne == 0) {
            selectOne = i;
            cardMark(i);
          } else {
            selectTwo = i;
            cardMark(i);
            if (selectOne.id === selectTwo.id) {
              selectOne = 0;
              selectTwo = 0;
              cardOpened++;
              if (cardOpened == cardCount / 2) {
                console.log('Win!');
                win = 1;
              }
            } else {
              setTimeout(function () {
                cardMark(selectOne);
              }, 1000);
              setTimeout(function () {
                cardMark(selectTwo);
              }, 1000);
              setTimeout(function () {
                selectOne = 0;
              }, 1000);
              setTimeout(function () {
                selectTwo = 0;
              }, 1000);
            }
          }
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return this.state.cards.map(function (card) {
          return React.createElement(Card, {
            card: card,
            value: card.id,
            index: card.index,
            key: card.index,
            mark: _this2.handleClick.bind(_this2, card)
          });
        });
      }
    }]);

    return App;
  }(React.Component);

  ReactDOM.render(React.createElement(App, null), document.querySelector('.game'));

  var Stopwatcher = function (_React$Component2) {
    _inherits(Stopwatcher, _React$Component2);

    function Stopwatcher(props) {
      _classCallCheck(this, Stopwatcher);

      var _this3 = _possibleConstructorReturn(this, (Stopwatcher.__proto__ || Object.getPrototypeOf(Stopwatcher)).call(this, props));

      _this3.timer = null;

      _this3.state = {
        minute: 0,
        seconds60: 0,
        seconds10: 0,
        ms: 0
      };
      return _this3;
    }

    _createClass(Stopwatcher, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this4 = this;

        this.timer = setInterval(function () {
          if (win == 0) {
            _this4.tick();
          } else {

            _this4.componentWillUnmount();
          }
        }, 100);
      }
    }, {
      key: 'tick',
      value: function tick() {
        this.setState({
          ms: this.state.ms + 1
        });
        if (this.state.ms == 10) {
          this.setState({
            ms: this.state.ms = 0
          });
          this.setState({
            seconds10: this.state.seconds10 + 1
          });
          if (this.state.seconds10 == 10) {
            this.setState({
              seconds10: this.state.seconds10 = 0
            });
            this.setState({
              seconds60: this.state.seconds60 + 1
            });
            if (this.state.seconds60 == 6) {
              this.setState({
                seconds60: this.state.seconds60 = 0,
                seconds10: this.state.seconds10 = 0
              });
              this.setState({
                minute: this.state.minute + 1
              });
            }
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.timer);
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'h1',
          { className: 'content__title' },
          'Time ',
          this.state.minute,
          ':',
          this.state.seconds60,
          this.state.seconds10,
          '.',
          this.state.ms
        );
      }
    }]);

    return Stopwatcher;
  }(React.Component);

  ReactDOM.render(React.createElement(Stopwatcher, null), document.querySelector('.content__title'));
}

settingSubmit.addEventListener('click', settingUp);