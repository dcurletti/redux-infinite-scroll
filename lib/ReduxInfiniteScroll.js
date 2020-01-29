"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTransitionGroup = require("react-transition-group");

var _DOMPositionUtils = require("./Utilities/DOMPositionUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ReduxInfiniteScroll =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReduxInfiniteScroll, _React$Component);

  function ReduxInfiniteScroll(props) {
    var _this;

    _classCallCheck(this, ReduxInfiniteScroll);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReduxInfiniteScroll).call(this, props));
    _this.scrollFunction = _this.scrollListener.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ReduxInfiniteScroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.attachScrollListener();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.attachScrollListener();
    }
  }, {
    key: "_findElement",
    value: function _findElement() {
      return this.props.elementIsScrollable ? _reactDom["default"].findDOMNode(this) : window;
    }
  }, {
    key: "attachScrollListener",
    value: function attachScrollListener() {
      if (!this.props.hasMore || this.props.loadingMore) return;

      var el = this._findElement();

      el.addEventListener('scroll', this.scrollFunction, true);
      el.addEventListener('resize', this.scrollFunction, true);
      this.scrollListener();
    }
  }, {
    key: "_elScrollListener",
    value: function _elScrollListener() {
      var el = _reactDom["default"].findDOMNode(this);

      if (this.props.horizontal) {
        var leftScrollPos = el.scrollLeft;
        var totalContainerWidth = el.scrollWidth;
        var containerFixedWidth = el.offsetWidth;
        var rightScrollPos = leftScrollPos + containerFixedWidth;
        return totalContainerWidth - rightScrollPos;
      }

      var topScrollPos = el.scrollTop;
      var totalContainerHeight = el.scrollHeight;
      var containerFixedHeight = el.offsetHeight;
      var bottomScrollPos = topScrollPos + containerFixedHeight;
      return totalContainerHeight - bottomScrollPos;
    }
  }, {
    key: "_windowScrollListener",
    value: function _windowScrollListener() {
      var el = _reactDom["default"].findDOMNode(this);

      if (this.props.horizontal) {
        var windowScrollLeft = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
        var elTotalWidth = (0, _DOMPositionUtils.leftPosition)(el) + el.offsetWidth;
        var currentRightPosition = elTotalWidth - windowScrollLeft - window.innerWidth;
        return currentRightPosition;
      }

      var windowScrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var elTotalHeight = (0, _DOMPositionUtils.topPosition)(el) + el.offsetHeight;
      var currentBottomPosition = elTotalHeight - windowScrollTop - window.innerHeight;
      return currentBottomPosition;
    }
  }, {
    key: "scrollListener",
    value: function scrollListener() {
      // This is to prevent the upcoming logic from toggling a load more before
      // any data has been passed to the component
      if (this._totalItemsSize() <= 0) return;
      var bottomPosition = this.props.elementIsScrollable ? this._elScrollListener() : this._windowScrollListener();

      if (bottomPosition < Number(this.props.threshold)) {
        this.detachScrollListener();
        this.props.loadMore();
      }
    }
  }, {
    key: "detachScrollListener",
    value: function detachScrollListener() {
      var el = this._findElement();

      el.removeEventListener('scroll', this.scrollFunction, true);
      el.removeEventListener('resize', this.scrollFunction, true);
    }
  }, {
    key: "_renderOptions",
    value: function _renderOptions() {
      var allItems = this.props.children.concat(this.props.items);
      return allItems;
    }
  }, {
    key: "_totalItemsSize",
    value: function _totalItemsSize() {
      var totalSize;
      totalSize += this.props.children.size ? this.props.children.size : this.props.children.length;
      totalSize += this.props.items.size ? this.props.items.size : this.props.items.length;
      return totalSize;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.detachScrollListener();
    }
  }, {
    key: "renderLoader",
    value: function renderLoader() {
      return this.props.loadingMore && this.props.showLoader ? this.props.loader : undefined;
    }
  }, {
    key: "_assignHolderClass",
    value: function _assignHolderClass() {
      var additionalClass;
      additionalClass = typeof this.props.className === 'function' ? this.props.className() : this.props.className;
      return 'redux-infinite-scroll ' + additionalClass;
    }
  }, {
    key: "_renderWithTransitions",
    value: function _renderWithTransitions() {
      var allItems = this.props.children.concat(this.props.items);
      console.log('animating with tran');
      return _react["default"].createElement(_reactTransitionGroup.CSSTransitionGroup, {
        transitionName: this.props.transitionName,
        transitionEnter: this.props.transitionEnter,
        transitionEnterTimeout: this.props.transitionEnterTimeout,
        transitionLeave: this.props.transitionLeave,
        transitionLeaveTimeout: this.props.transitionLeaveTimeout,
        transitionAppear: this.props.transitionAppear,
        transitionAppearTimeout: this.props.transitionAppearTimeout
      }, allItems);
    }
  }, {
    key: "render",
    value: function render() {
      var Holder = this.props.holderType;
      return _react["default"].createElement(Holder, {
        className: this._assignHolderClass(),
        style: {
          height: this.props.containerHeight,
          overflow: 'scroll'
        }
      }, this.props.animateItems ? this._renderWithTransitions() : this._renderOptions(), this.renderLoader());
    }
  }]);

  return ReduxInfiniteScroll;
}(_react["default"].Component);

exports["default"] = ReduxInfiniteScroll;
ReduxInfiniteScroll.propTypes = {
  elementIsScrollable: _propTypes["default"].bool,
  containerHeight: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  threshold: _propTypes["default"].number,
  horizontal: _propTypes["default"].bool,
  hasMore: _propTypes["default"].bool,
  loadingMore: _propTypes["default"].bool,
  loader: _propTypes["default"].any,
  showLoader: _propTypes["default"].bool,
  loadMore: _propTypes["default"].func.isRequired,
  items: _propTypes["default"].oneOfType([//ImmutablePropTypes.list,
  _propTypes["default"].array]),
  children: _propTypes["default"].oneOfType([//ImmutablePropTypes.list,
  _propTypes["default"].array]),
  holderType: _propTypes["default"].string,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  animateItems: _propTypes["default"].bool,
  transitionName: _propTypes["default"].string,
  transitionEnter: _propTypes["default"].bool,
  transitionEnterTimeout: _propTypes["default"].number,
  transitionLeave: _propTypes["default"].bool,
  transitionLeaveTimeout: _propTypes["default"].number,
  transitionAppear: _propTypes["default"].bool,
  transitionAppearTimeout: _propTypes["default"].number
};
ReduxInfiniteScroll.defaultProps = {
  className: '',
  elementIsScrollable: true,
  containerHeight: '100%',
  threshold: 100,
  horizontal: false,
  hasMore: true,
  loadingMore: false,
  loader: _react["default"].createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, "Loading..."),
  showLoader: true,
  holderType: 'div',
  children: [],
  items: [],
  animateItems: false,
  transitionName: 'redux-infinite-scroll',
  transitionEnter: true,
  transitionEnterTimeout: 2000,
  transitionLeave: true,
  transitionLeaveTimeout: 1000,
  transitionAppear: true,
  transitionAppearTimeout: 2000
};