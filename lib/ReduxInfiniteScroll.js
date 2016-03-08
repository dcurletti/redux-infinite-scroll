'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _DOMPositionUtils = require('./Utilities/DOMPositionUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReduxInfiniteScroll = function (_Component) {
  _inherits(ReduxInfiniteScroll, _Component);

  function ReduxInfiniteScroll(props) {
    _classCallCheck(this, ReduxInfiniteScroll);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxInfiniteScroll).call(this, props));

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
      var windowScrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var elTotalHeight = (0, _DOMPositionUtils.topPosition)(el) + el.offsetHeight;
      var currentBottomPosition = elTotalHeight - windowScrollTop - window.innerHeight;

      return currentBottomPosition;
    }
  }, {
    key: 'scrollListener',
    value: function scrollListener() {
      var _this2 = this;

      // This is to prevent the upcoming logic from toggling a load more before
      // redux has passed any data to the component
      if (this.props.items <= 0) return;

      setTimeout(function () {
        var bottomPosition = _this2.props.elementIsScrollable ? _this2._elScrollListener() : _this2._windowScrollListener();

        if (bottomPosition < Number(_this2.props.threshold)) {
          _this2.detachScrollListener();
          _this2.props.loadMore();
        }
      }, 0);
    }
  }, {
    key: 'detachScrollListener',
    value: function detachScrollListener() {
      var el = this._findElement();
      el.removeEventListener('scroll', this.scrollFunction, true);
      el.removeEventListener('resize', this.scrollFunction, true);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.detachScrollListener();
    }
  }, {
    key: 'renderLoader',
    value: function renderLoader() {
      return this.props.loadingMore && this.props.showLoader ? this.props.loader : undefined;
    }
  }, {
    key: 'render',
    value: function render() {
      var Holder = this.props.holderType;
      return _react2.default.createElement(
        Holder,
        { className: 'rs-infinite-scroll', style: { height: this.props.containerHeight } },
        this.props.items.map(function (item, i) {
          return item;
        }),
        this.renderLoader()
      );
    }
  }]);

  return ReduxInfiniteScroll;
}(_react.Component);

exports.default = ReduxInfiniteScroll;


ReduxInfiniteScroll.propTypes = {
  elementIsScrollable: _react2.default.PropTypes.bool,
  containerHeight: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  threshold: _react2.default.PropTypes.number,
  hasMore: _react2.default.PropTypes.bool,
  loadingMore: _react2.default.PropTypes.bool,
  loader: _react2.default.PropTypes.any,
  showLoader: _react2.default.PropTypes.bool,
  loadMore: _react2.default.PropTypes.func.isRequired,
  items: _react2.default.PropTypes.array.isRequired,
  holderType: _react2.default.PropTypes.string
};

ReduxInfiniteScroll.defaultProps = {
  elementIsScrollable: true,
  containerHeight: '100%',
  threshold: 100,
  hasMore: true,
  loadingMore: false,
  loader: _react2.default.createElement(
    'div',
    { style: { textAlign: 'center' } },
    'Loading...'
  ),
  showLoader: true,
  holderType: 'div'
};