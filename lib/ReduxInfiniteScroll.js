'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _DOMPositionUtils = require('./Utilities/DOMPositionUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReduxInfiniteScroll = function (_React$Component) {
  _inherits(ReduxInfiniteScroll, _React$Component);

  function ReduxInfiniteScroll(props) {
    _classCallCheck(this, ReduxInfiniteScroll);

    var _this = _possibleConstructorReturn(this, (ReduxInfiniteScroll.__proto__ || Object.getPrototypeOf(ReduxInfiniteScroll)).call(this, props));

    _this.scrollFunction = _this.scrollListener.bind(_this);
    return _this;
  }

  _createClass(ReduxInfiniteScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.attachScrollListener();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.attachScrollListener();
    }
  }, {
    key: '_findElement',
    value: function _findElement() {
      return this.props.elementIsScrollable ? _reactDom2.default.findDOMNode(this) : window;
    }
  }, {
    key: 'attachScrollListener',
    value: function attachScrollListener() {
      if (!this.props.hasMore || this.props.loadingMore) return;
      var el = this._findElement();
      el.addEventListener('scroll', this.scrollFunction, true);
      el.addEventListener('resize', this.scrollFunction, true);
      this.scrollListener();
    }
  }, {
    key: '_elScrollListener',
    value: function _elScrollListener() {
      var el = _reactDom2.default.findDOMNode(this);

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
    key: '_windowScrollListener',
    value: function _windowScrollListener() {
      var el = _reactDom2.default.findDOMNode(this);

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
    key: 'scrollListener',
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
    key: 'detachScrollListener',
    value: function detachScrollListener() {
      var el = this._findElement();
      el.removeEventListener('scroll', this.scrollFunction, true);
      el.removeEventListener('resize', this.scrollFunction, true);
    }
  }, {
    key: '_totalItemsSize',
    value: function _totalItemsSize() {
      var totalSize = void 0;
      totalSize += this.props.children.size ? this.props.children.size : this.props.children.length;
      totalSize += this.props.items.size ? this.props.items.size : this.props.items.length;
      return totalSize;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.detachScrollListener();
    }
  }, {
    key: '_assignHolderClass',
    value: function _assignHolderClass() {
      var additionalClass = void 0;
      additionalClass = typeof this.props.className === 'function' ? this.props.className() : this.props.className;

      return 'redux-infinite-scroll ' + additionalClass;
    }
  }, {
    key: 'render',
    value: function render() {
      var Holder = this.props.holderType;

      return _react2.default.createElement(
        Holder,
        { className: this._assignHolderClass(), style: { height: this.props.containerHeight } },
        this.props.children.concat(this.props.items),
        this.props.loadingMore && this.props.showLoader && this.props.loader
      );
    }
  }]);

  return ReduxInfiniteScroll;
}(_react2.default.Component);

exports.default = ReduxInfiniteScroll;


ReduxInfiniteScroll.propTypes = {
  elementIsScrollable: _propTypes2.default.bool,
  containerHeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  threshold: _propTypes2.default.number,
  horizontal: _propTypes2.default.bool,
  hasMore: _propTypes2.default.bool,
  loadingMore: _propTypes2.default.bool,
  loader: _propTypes2.default.any,
  showLoader: _propTypes2.default.bool,
  loadMore: _propTypes2.default.func.isRequired,
  items: _propTypes2.default.oneOfType([
  //ImmutablePropTypes.list,
  _propTypes2.default.array]),
  children: _propTypes2.default.oneOfType([
  //ImmutablePropTypes.list,
  _propTypes2.default.array]),
  holderType: _propTypes2.default.string,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  transitionName: _propTypes2.default.string,
  transitionEnter: _propTypes2.default.bool,
  transitionEnterTimeout: _propTypes2.default.number,
  transitionLeave: _propTypes2.default.bool,
  transitionLeaveTimeout: _propTypes2.default.number,
  transitionAppear: _propTypes2.default.bool,
  transitionAppearTimeout: _propTypes2.default.number
};

ReduxInfiniteScroll.defaultProps = {
  className: '',
  elementIsScrollable: true,
  containerHeight: '100%',
  threshold: 100,
  horizontal: false,
  hasMore: true,
  loadingMore: false,
  loader: _react2.default.createElement(
    'div',
    { style: { textAlign: 'center' } },
    'Loading...'
  ),
  showLoader: true,
  holderType: 'div',
  children: [],
  items: [],
  transitionName: 'redux-infinite-scroll',
  transitionEnter: true,
  transitionEnterTimeout: 2000,
  transitionLeave: true,
  transitionLeaveTimeout: 1000,
  transitionAppear: true,
  transitionAppearTimeout: 2000
};