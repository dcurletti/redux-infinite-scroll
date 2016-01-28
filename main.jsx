ReduxInfiniteScroll = ReduxInfiniteScroll.default;

class MessageList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {messages: ['1','2','3','4','5','6','7','8','9']};
  }

  _loadMore() {
    console.log('hithere');
    return this.setState({messages: (this.state.messages + ['10', '20'])});
  }

  _renderMessages() {
    return _.map(this.state.messages, (msg) => {
      return(
        <div>{msg}</div>
      )
    })
  }

  render() {
    return (
      <div>
        <p>Hi</p>
        <ReduxInfiniteScroll
          items={this._renderMessages()}
          loadMore={this._loadMore.bind(this)}
        />
      </div>
    )
  }
}


ReactDOM.render(
  <MessageList />,
  document.getElementById('example1')
);
