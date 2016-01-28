class MessageList extends React.Component {
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
      <div>
        <p>Hi</p>
        <ReduxInfiniteScroll
          items={this._renderMessages.bind(this)}
          loadMore={this._loadMore.bind(this)}
        />
      </div>
    )
  }
}


ReactDOM.render(
  React.createElement(MessageList, null),
  document.getElementById('example1')
);
