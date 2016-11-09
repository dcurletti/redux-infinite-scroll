(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["ReduxInfiniteScroll"] = factory(require("React"), require("ReactDOM"));
	else
		root["ReduxInfiniteScroll"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _DOMPositionUtils = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//import ImmutablePropTypes from 'react-immutable-proptypes';

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
	    key: '_renderOptions',
	    value: function _renderOptions() {
	      var allItems = this.props.children.concat(this.props.items);

	      return allItems;
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
	    key: 'renderLoader',
	    value: function renderLoader() {
	      return this.props.loadingMore && this.props.showLoader ? this.props.loader : undefined;
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
	        this._renderOptions(),
	        this.renderLoader()
	      );
	    }
	  }]);

	  return ReduxInfiniteScroll;
	}(_react2.default.Component);

	exports.default = ReduxInfiniteScroll;


	ReduxInfiniteScroll.propTypes = {
	  elementIsScrollable: _react2.default.PropTypes.bool,
	  containerHeight: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
	  threshold: _react2.default.PropTypes.number,
	  horizontal: _react2.default.PropTypes.bool,
	  hasMore: _react2.default.PropTypes.bool,
	  loadingMore: _react2.default.PropTypes.bool,
	  loader: _react2.default.PropTypes.any,
	  showLoader: _react2.default.PropTypes.bool,
	  loadMore: _react2.default.PropTypes.func.isRequired,
	  items: _react2.default.PropTypes.oneOfType([
	  //ImmutablePropTypes.list,
	  _react2.default.PropTypes.array]),
	  children: _react2.default.PropTypes.oneOfType([
	  //ImmutablePropTypes.list,
	  _react2.default.PropTypes.array]),
	  holderType: _react2.default.PropTypes.string,
	  className: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func])
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
	  items: []
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.topPosition = topPosition;
	exports.leftPosition = leftPosition;
	function topPosition(domElt) {
	  if (!domElt) {
	    return 0;
	  }
	  return domElt.offsetTop + topPosition(domElt.offsetParent);
	}

	function leftPosition(domElt) {
	  if (!domElt) {
	    return 0;
	  }
	  return domElt.offsetLeft + leftPosition(domElt.offsetParent);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;