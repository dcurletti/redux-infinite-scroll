import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ImmutablePropTypes from 'react-immutable-proptypes';

import {topPosition} from './Utilities/DOMPositionUtils';

export default class ReduxInfiniteScroll extends Component {

  constructor(props) {
    super(props);
    this.scrollFunction = this.scrollListener.bind(this);
  }

  componentDidMount () {
    this.attachScrollListener();
  }

  componentDidUpdate () {
    this.attachScrollListener();
  }

  _findElement() {
    return this.props.elementIsScrollable ? ReactDOM.findDOMNode(this) : window;
  }

  attachScrollListener () {
    if (!this.props.hasMore || this.props.loadingMore) return;
    let el = this._findElement();
    el.addEventListener('scroll', this.scrollFunction, true);
    el.addEventListener('resize', this.scrollFunction, true);
    this.scrollListener();
  }

  _elScrollListener() {
    let el = ReactDOM.findDOMNode(this);
    let topScrollPos = el.scrollTop;
    let totalContainerHeight = el.scrollHeight;
    let containerFixedHeight = el.offsetHeight;
    let bottomScrollPos = topScrollPos + containerFixedHeight;

    return (totalContainerHeight - bottomScrollPos);
  }

  _windowScrollListener() {
    let el = ReactDOM.findDOMNode(this);
    let windowScrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let elTotalHeight = topPosition(el) + el.offsetHeight;
    let currentBottomPosition = elTotalHeight - windowScrollTop - window.innerHeight;

    return currentBottomPosition;
  }

  scrollListener() {
    // This is to prevent the upcoming logic from toggling a load more before
    // any data has been passed to the component
    if (this._totalItemsSize() <= 0) return;

    let bottomPosition = this.props.elementIsScrollable ? this._elScrollListener() : this._windowScrollListener();

    if (bottomPosition < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.props.loadMore();
    }
  }

  detachScrollListener () {
    let el = this._findElement();
    el.removeEventListener('scroll', this.scrollFunction, true);
    el.removeEventListener('resize', this.scrollFunction, true);
  }

  _renderOptions() {
    const allItems = this.props.children.concat(this.props.items);

    return [allItems, this.renderLoader()];
  }

  _totalItemsSize() {
    let totalSize;
    totalSize += (this.props.children.size) ? this.props.children.size : this.props.children.length;
    totalSize += (this.props.items.size) ? this.props.items.size : this.props.items.length;
    return totalSize;
  }

  componentWillUnmount () {
    this.detachScrollListener();
  }

  renderLoader() {
    return (this.props.loadingMore && this.props.showLoader) ? this.props.loader : undefined;
  }

  _assignHolderClass() {
    let additionalClass;
    additionalClass = (typeof this.props.className === 'function') ? this.props.className() : this.props.className;

    return 'redux-infinite-scroll ' + additionalClass;
  }

  render () {
    const Holder = this.props.holderType;

    return (
      <Holder className={ this._assignHolderClass() } style={{height: this.props.containerHeight}}>
        {this._renderOptions()}
      </Holder>
    )
  }
}

ReduxInfiniteScroll.propTypes = {
  elementIsScrollable: React.PropTypes.bool,
  containerHeight: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  threshold: React.PropTypes.number,
  hasMore: React.PropTypes.bool,
  loadingMore: React.PropTypes.bool,
  loader: React.PropTypes.any,
  showLoader: React.PropTypes.bool,
  loadMore: React.PropTypes.func.isRequired,
  items: React.PropTypes.oneOfType([
    ImmutablePropTypes.list,
    React.PropTypes.array
  ]),
  children: React.PropTypes.oneOfType([
    ImmutablePropTypes.list,
    React.PropTypes.array
  ]),
  holderType: React.PropTypes.string,
  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ])
};

ReduxInfiniteScroll.defaultProps = {
  className: '',
  elementIsScrollable: true,
  containerHeight: '100%',
  threshold: 100,
  hasMore: true,
  loadingMore: false,
  loader: <div style={{textAlign: 'center'}}>Loading...</div>,
  showLoader: true,
  holderType: 'div',
  children: [],
  items: []
};
