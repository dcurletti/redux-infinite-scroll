import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { topPosition, leftPosition } from './Utilities/DOMPositionUtils';

export default class ReduxInfiniteScroll extends React.Component {

  constructor(props) {
    super(props);
    this.scrollFunction = this.scrollListener.bind(this);
  }

  componentDidMount() {
    this.manageScrollListener();
  }

  componentDidUpdate() {
    this.manageScrollListener();
  }

  manageScrollListener() {
    if (!this.props.hasMore || this.props.loadingMore) this.detachScrollListener();
    else this.attachScrollListener();
  }

  _findElement() {
    return this.props.elementIsScrollable ? ReactDOM.findDOMNode(this) : window;
  }

  attachScrollListener() {
    if (!this.props.hasMore || this.props.loadingMore) return;
    let el = this._findElement();
    el.addEventListener('scroll', this.scrollFunction, true);
    el.addEventListener('resize', this.scrollFunction, true);
    this.scrollListener();
  }

  _elScrollListener() {
    let el = ReactDOM.findDOMNode(this);

    if (this.props.horizontal) {
      let leftScrollPos = el.scrollLeft;
      let totalContainerWidth = el.scrollWidth;
      let containerFixedWidth = el.offsetWidth;
      let rightScrollPos = leftScrollPos + containerFixedWidth;

      return (totalContainerWidth - rightScrollPos);
    }

    let topScrollPos = el.scrollTop;
    let totalContainerHeight = el.scrollHeight;
    let containerFixedHeight = el.offsetHeight;
    let bottomScrollPos = topScrollPos + containerFixedHeight;

    return (totalContainerHeight - bottomScrollPos);
  }

  _windowScrollListener() {
    let el = ReactDOM.findDOMNode(this);

    if (this.props.horizontal) {
      let windowScrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      let elTotalWidth = leftPosition(el) + el.offsetWidth;
      let currentRightPosition = elTotalWidth - windowScrollLeft - window.innerWidth;

      return currentRightPosition;
    }

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

  detachScrollListener() {
    let el = this._findElement();
    el.removeEventListener('scroll', this.scrollFunction, true);
    el.removeEventListener('resize', this.scrollFunction, true);
  }

  _renderOptions() {
    const allItems = this.props.children.concat(this.props.items);

    return allItems;
  }

  _totalItemsSize() {
    let totalSize;
    totalSize += (this.props.children.size) ? this.props.children.size : this.props.children.length;
    totalSize += (this.props.items.size) ? this.props.items.size : this.props.items.length;
    return totalSize;
  }

  componentWillUnmount() {
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

  _renderWithTransitions() {
    const allItems = this.props.children.concat(this.props.items);


    console.log('animating with tran');
    return (
      <ReactCSSTransitionGroup transitionName={this.props.transitionName}
        transitionEnter={this.props.transitionEnter}
        transitionEnterTimeout={this.props.transitionEnterTimeout}
        transitionLeave={this.props.transitionLeave}
        transitionLeaveTimeout={this.props.transitionLeaveTimeout}
        transitionAppear={this.props.transitionAppear}
        transitionAppearTimeout={this.props.transitionAppearTimeout}>
        {allItems}
      </ReactCSSTransitionGroup>
    )
  }

  render() {
    const Holder = this.props.holderType;

    return (
      <Holder className={this._assignHolderClass()} style={{ height: this.props.containerHeight, overflow: 'scroll' }}>
        {this.props.animateItems ? this._renderWithTransitions() : this._renderOptions()}
        {this.renderLoader()}
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
  horizontal: React.PropTypes.bool,
  hasMore: React.PropTypes.bool,
  loadingMore: React.PropTypes.bool,
  loader: React.PropTypes.any,
  showLoader: React.PropTypes.bool,
  loadMore: React.PropTypes.func.isRequired,
  items: React.PropTypes.oneOfType([
    //ImmutablePropTypes.list,
    React.PropTypes.array
  ]),
  children: React.PropTypes.oneOfType([
    //ImmutablePropTypes.list,
    React.PropTypes.array
  ]),
  holderType: React.PropTypes.string,
  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ]),
  animateItems: React.PropTypes.bool,
  transitionName: React.PropTypes.string,
  transitionEnter: React.PropTypes.bool,
  transitionEnterTimeout: React.PropTypes.number,
  transitionLeave: React.PropTypes.bool,
  transitionLeaveTimeout: React.PropTypes.number,
  transitionAppear: React.PropTypes.bool,
  transitionAppearTimeout: React.PropTypes.number,
};

ReduxInfiniteScroll.defaultProps = {
  className: '',
  elementIsScrollable: true,
  containerHeight: '100%',
  threshold: 100,
  horizontal: false,
  hasMore: true,
  loadingMore: false,
  loader: <div style={{ textAlign: 'center' }}>Loading...</div>,
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
