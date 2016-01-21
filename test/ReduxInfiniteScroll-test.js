import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ReduxInfiniteScroll from '../src/ReduxInfiniteScroll';

describe('ReduxInfiniteScroll', () => {
  let loadMore, items;

  beforeEach(() => {
    loadMore = () => {
      items = items.concat(['item 4', 'item 5'])
    };

    items = [<div height="250px"></div>, <div height="250px"></div>, <div height="250px"></div>];
  });

  describe('default props', () => {
    it('defaults to 100%', () => {
      const reactElement = <ReduxInfiniteScroll loadMore={loadMore}
                                             items={items}/>;
      const render = TestUtils.renderIntoDocument(reactElement);
      const node = ReactDOM.findDOMNode(render);
      expect(node.style.height).toEqual('100%');
    });
  });

  describe('containerHeight', () => {
    it('defaults to 100%', () => {
      const reactElement = <ReduxInfiniteScroll loadMore={loadMore}
                                             items={items}/>;
      const render = TestUtils.renderIntoDocument(reactElement);
      const node = ReactDOM.findDOMNode(render);
      expect(node.style.height).toEqual('100%');
    });
    it('should set the height of the div when given the correct props', () => {
      const reactElement = <ReduxInfiniteScroll containerHeight="500px"
                                             loadMore={loadMore}
                                             items={items}/>;
      const render = TestUtils.renderIntoDocument(reactElement);
      const node = ReactDOM.findDOMNode(render);
      expect(node.style.height).toEqual('500px');
    });
  });

  xdescribe('threshold', () => {
    it('defaults to setting the threshold to 100', () => {
      const reactElement = <ReduxInfiniteScroll containerHeight="500px"
                                             loadMore={loadMore}
                                             items={items}/>;
      const render = TestUtils.renderIntoDocument(reactElement);
      const node = ReactDOM.findDOMNode(render);
      //node.scrollTop = 499;
      //reactElement.props.loadMore();
      TestUtils.Simulate.scroll(node, {deltaY: 450});

      expect(items).toEqual('')
    });

    it('actually adds the element to the page', () => {
      const reactElement = <ReduxInfiniteScroll containerHeight="500px"
                                             loadMore={loadMore}
                                             items={items}/>;
      //const render = TestUtils.renderIntoDocument(reactElement);


      var parentDiv = document.createElement('div');
      document.body.appendChild(parentDiv);
      var component = ReactDOM.render(reactElement, parentDiv);
      const node = ReactDOM.findDOMNode(component);
      TestUtils.Simulate.scroll(node, {deltaY: 450});

      //ReactDOM.unmountComponentAtNode(component);
    })
  });


});
