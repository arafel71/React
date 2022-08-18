
class ProductList extends React.Component {
  render() {
    return (
      <div className='ui unstackable items'>
      Hello friend, i am a basic react component.
      </div>
    );
  }

}  

ReactDOM.render(
  <ProductList />, document.getElementById("content")
);