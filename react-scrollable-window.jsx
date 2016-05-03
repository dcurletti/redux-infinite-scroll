const InfiniteScroll = ReduxInfiniteScroll.default;

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this._createMessages(),
      loadingMore: false
    }
  }

  _createMessages(arr=[],start=0) {
    arr = _.cloneDeep(arr);
    for (var i=start;i<start+20;i++) {
      arr.push(i)
    }
    return arr;
  }

  _loadMore() {
    this.setState({loadingMore: true});
    setTimeout(() => {
      const messages = this._createMessages(this.state.messages, this.state.messages.length+1);
      this.setState({messages: messages, loadingMore: false})
    }, 1000)
  }

  _renderMessages() {
    return this.state.messages.map((msg) => {
      return(
        <div className="item" key={msg}>{msg}</div>
      )
    })
  }

  render() {
    return (
        <InfiniteScroll loadingMore={this.state.loadingMore} elementIsScrollable={false} loadMore={this._loadMore.bind(this)}>
          {this._renderMessages()}
        </InfiniteScroll>
    )
  }
}


ReactDOM.render(<MessageList />,document.getElementById('example1'));
