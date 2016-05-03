import CreateStore from './src/store/CreateStore';
const store = CreateStore('Client');


export class ReactScrollableElementContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactScrollableElement {...this.props} />
      </Provider>
    )
  }
}
