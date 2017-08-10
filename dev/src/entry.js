import React from 'react';
import ReactDOM from 'react-dom';
import InfScroller from '../../src/ReduxInfiniteScroll';

class App extends React.Component {
  state =  {
    numOfItems: 40,
    loadingMore: false
  };

  _createData(numOfItems=this.state.numOfItems) {
    const data = [];
    for (var i=0; i < numOfItems; i++) {
      data.push(
          <div key={i}>Item #{i}</div>
      )
    }

    return data;
  }

  _loadMore() {
    this.setState({loadingMore: true}, () => {
      // CB emulates an ajax request
      this.setState({
        numOfItems: this.state.numOfItems + 40,
        loadingMore: false
      })
    })
  }

  render() {
    return (
        <div>
          <h2>Dev Env</h2>
          <InfScroller loadMore={this._loadMore.bind(this)}
                       hasMore={true}
                       loadingMore={this.state.loadingMore}
                       showLoader={true}
                       threshold={50}
                       containerHeight={200}
                       animateItems={true}
                       items={this._createData()}
          />
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('entry'));
