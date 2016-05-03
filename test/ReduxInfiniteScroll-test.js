import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ReduxInfiniteScroll from '../src/ReduxInfiniteScroll';

class Shell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.initialItems
    }
  }

  _loadMore() {
    var currentItems = this.state.items;
    var newItems = this.props.additionalItems;

    this.setState({
      items: currentItems.concat(newItems)
    });
  }

  _renderItems() {
    console.log(this.state.items);
    return this.state.items.map((item) => {
      return (
        <div style={{'height': this.props.itemHeight}}>{item}</div>
      )
    })
  }

  render () {
    console.log(this);
    return (
      <div style={{overflow:'scroll'}}>
        <ReduxInfiniteScroll containerHeight={this.props.containerHeight}
                             loadMore={this._loadMore.bind(this)} >
          {this._renderItems()}
        </ReduxInfiniteScroll>
      </div>
    )
  }
}

describe('ReduxInfiniteScroll', () => {

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe('containerHeight', () => {
    it('defaults to 100%', () => {
      const reactElement = <ReduxInfiniteScroll loadMore={function(){}}
                                                items={[]}/>;
      const render = TestUtils.renderIntoDocument(reactElement);
      const node = ReactDOM.findDOMNode(render);
      expect(node.style.height).toEqual('100%');
    });

    it('should set the height of the div when given the correct props', () => {
      const reactElement = <ReduxInfiniteScroll containerHeight="500px"
                                                loadMore={function(){}}
                                                items={[]}/>;
      const render = TestUtils.renderIntoDocument(reactElement);
      const node = ReactDOM.findDOMNode(render);
      expect(node.style.height).toEqual('500px');
    });
  });

  describe('threshold default', () => {
    it('should load more items at scroll of 101', (done) => {
      const reactElement = <Shell
        initialItems={['hi', 'hi', 'hi', 'hi']}
        additionalItems={['bye', 'bye']}
        itemHeight="100px"
        containerHeight="200px"
      />;
      var component = ReactDOM.render(reactElement, document.body, function(){});
      const shellNode = ReactDOM.findDOMNode(component);
      var scrollNode = shellNode.children[0];
      scrollNode.style["overflow"] = "scroll";

      expect(scrollNode.children.length).toEqual(4)

      scrollNode.scrollTop = 101;
      TestUtils.Simulate.scroll(scrollNode, {
        target: scrollNode
      });

      setTimeout(function() {
        expect(scrollNode.children.length).toEqual(6);
        done();
      }, 0);

    }, 100);

    it('should not load more items at scroll of 100', (done) => {
      const reactElement = <Shell
        initialItems={['hi', 'hi', 'hi', 'hi']}
        additionalItems={['bye', 'bye']}
        itemHeight="100px"
        containerHeight="200px"
      />;
      var component = ReactDOM.render(reactElement, document.body, function(){});
      const shellNode = ReactDOM.findDOMNode(component);
      var scrollNode = shellNode.children[0];
      scrollNode.style["overflow"] = "scroll";

      expect(scrollNode.children.length).toEqual(4)

      scrollNode.scrollTop = 100;
      TestUtils.Simulate.scroll(scrollNode, {
        target: scrollNode
      });

      setTimeout(function() {
        expect(scrollNode.children.length).toEqual(4);
        done();
      }, 0);

    }, 100);
  });


});
