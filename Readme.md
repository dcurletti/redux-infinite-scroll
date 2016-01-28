[![npm version](https://badge.fury.io/js/redux-infinite-scroll.svg)](https://badge.fury.io/js/redux-infinite-scroll)
[![Circle CI](https://circleci.com/gh/RealScout/redux-infinite-scroll.svg?style=svg)](https://circleci.com/gh/RealScout/redux-infinite-scroll)

# Redux Infinite Scroll

A stateless React infinite scroll component meant for usage within Redux.

## Demo & Examples

http://realscout.github.io/redux-infinite-scroll/

## Installation

``` bash
npm install redux-infinite-scroll --save
```

## Usage

In order to use it in your React app, simply import it and follow the example below.  The component expects the items 
prop to receive an array of React components that it then renders to the DOM.  The `loadMore` prop
expects a function that updates the Redux store with more items and therefore causes React to re-render the component.

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
          items={this._renderMessages.bind(this)}
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
| threshold | integer | no | 100 | The number of pixels 
| hasMore  	|  bool 	| no  	| true  	| Whether there are more items waiting to be displayed
| loadingMore |  bool 	| no  	|false| A prop that should be set to `true` by the parent component whenever the `loadMore` function gets invoked, and then toggled to `false` once that function has finished updating the `items` prop.
| loader  	|  any | no|  Loading... 	| The value of this prop gets injected as the last element of the parent div when `hasMore` `loadingMore` and `showLoader` are all `true`.
| showLoader  	| bool  	| true  	|   	| Whether to show the loader when the `loadingMore` property is `true`
| loadMore  	|  function | yes  |undefined| The function is called when the component has reached the `threshold` and `hasMore` is true.
| items | array  	|yes|undefined| The array of elements waiting to be rendered.  Normally each item in the array is a React component.

## Credits

RealScout
Heavily inspired by react-infinite-scroll.

# License

MIT Licensed. Copyright (c) RealScout Inc.
