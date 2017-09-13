[![Circle CI](https://circleci.com/gh/RealScout/redux-infinite-scroll.svg?style=svg)](https://circleci.com/gh/RealScout/redux-infinite-scroll)
[![npm version](https://badge.fury.io/js/redux-infinite-scroll.svg)](https://badge.fury.io/js/redux-infinite-scroll)
[![npm dm](https://img.shields.io/npm/dm/redux-infinite-scroll.svg)](https://www.npmjs.com/package/redux-infinite-scroll)
[![Package Quality](http://npm.packagequality.com/shield/redux-infinite-scroll.svg)](http://packagequality.com/#?package=redux-infinite-scroll)

# Redux Infinite Scroll

A stateless React infinite scroll component meant for usage within Redux.

## **Important**
If you are using an element as the scrollable component, rather than the window, you **MUST** pass a fixed height to the containerHeight prop (many issues will be fixed by following this step).

## Demo & Examples

http://realscout.github.io/redux-infinite-scroll/

## Installation

``` bash
npm install redux-infinite-scroll --save
```

## Importing Via AMD/CommonJS

##### ES6 format
```javascript
import ReduxInfiniteScroll from 'redux-infinite-scroll';
```
##### ES5 format
```javascript
var ReduxInfiniteScroll = require('redux-infinite-scroll');
```

## Importing Via Script Tag
If you decide to use either one of the distribution files found in `/dist`, then you can access the `ReduxInfiniteScroll` via a global variable.

##### ES6 format
```javascript
ReduxInfiniteScroll
```
##### ES5 format
```javascript
ReduxInfiniteScroll.default;
```
The difference is due to the `ReduxInfiniteScroll` being an ES6 module and therefore having a different export syntax than ES5.


## Usage

In order to use it in your React app, simply import it and follow the example below.  The component expects to receive
child elements that it then injects into the DOM.  The `loadMore` prop expects a function that requests for more
items to be loaded once the container/window has reached the bottom `threshold`.  If there are no more items left to
be passed to the component, make sure to set the `hasMore` prop to be `false`.  **Important** If you are using
an element as the scrollable component, rather than the window, you MUST pass a fixed height to the `containerHeight`
prop.

##### ES6 format

```javascript

// MessageList.jsx

import InfiniteScroll from 'redux-infinite-scroll';
import ChatActions from './ChatActions';

class MessageList extends Component {
  _loadMore() {
    this.props.dispatch(ChatActions.fetchMessages())
  }

  _renderMessages() {
    return _.map(this.props.messages, (msg) => {
      return(
          <div>{msg}</div>
      )
    })
  }

  render() {
    return (
        <InfiniteScroll
          items={this._renderMessages()}
          loadMore={this._loadMore.bind(this)}
        />
    )
  }
}

```

Where your Redux action and reducer might look something like this:

``` javascript
// ChatActions.js

export function fetchMessages(params) {
  return {
    type: FETCH_MESSAGES,
    messages: ['hi there', 'hi again', 'still here']
  };
}


// ChatReducer.js


const initialState = {
  messages: []
}

function chatReducer(state=initialState, action=undefined) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return Object.assign({}, initialState, {
        messages: initialState.concat(action.messages)
      })
  }
}

```


### Options

| Props  	|  Type 	|  Required | Default 	| Description  	|
|---	|---	|---	|---	|--- |
| elementIsScrollable  	| bool  	| no |  true 	| Defines whether the div will have a fixed height and listens to the div's overflow event or instead have a non-fixed height and listen to the window scroll event
| containerHeight  	|  integer or string 	| no  	| '100%' | Sets an inline style on the height of the topmost div.
| threshold | integer | no | 100 | The number of pixels from the bottom that the scroll bar must reach in order to trigger `loadMore`.
| horizontal  	|  bool | no  |false| Whether to check for horizontal scrolling
| hasMore  	|  bool 	| no  	| true  	| Whether there are more items waiting to be displayed. Set this to false once all of the items have been passed down to either `items` or `children`.
| loadingMore |  bool 	| no  	|false| A prop that should be set to `true` by the parent component whenever the `loadMore` function gets invoked, and then toggled to `false` once that function has finished updating the `items` prop.
| loader  	|  any | no|  Loading... 	| The value of this prop gets injected as the last element of the parent div when `hasMore` `loadingMore` and `showLoader` are all `true`.
| showLoader  	| bool  	| no  	|  true 	| Whether to show the loader when the `loadingMore` property is `true`
| loadMore  	|  function | yes  |undefined| The function is called when the component has reached the `threshold` and `hasMore` is true.
| holderType | string  	|no|div| The type the loader is rendered as, could be `ul`, `dl`, etc.
| className | string  	|no|''| Any additional classes to be added to the holder.
| id | string  	|no|''| The id attribute that the parent component which holds items/children will have.
| items | array | no | []	| The array of elements waiting to be rendered.  Use either this or `children`. **Deprecated.**
| children | array | no | []  | The array of elements waiting to be rendered. Use either this or `items`.

## Credits

RealScout
Heavily inspired by react-infinite-scroll.

# License

MIT Licensed. Copyright (c) RealScout Inc.
