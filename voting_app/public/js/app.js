
class ProductList extends React.Component {

  state = {
    products: [],
  };


  componentDidMount() {
    this.setState({ products: Seed.products });
  }


  handleProductUpVote = (productId) => {
    //console.log('This product Id is upvote : ' + productId);

    //on créé un nouveau tableau pour remplacer l ancien qui est immutable 
    // on map l ancien tableau dans le state pour trouver celui qui a eu le click upvote
    const nextProducts = this.state.products.map((product) => {
        if (product.id === productId) {
          // copies all enumerable own properties from one or more source objects to a target object.
          // It returns the modified target object.
          return Object.assign({}, product, { votes: product.votes + 1,} 
                 );
          
        }
        else {
          // on garde la structure du produit actuel
          // we keep the structure of the product the same 
          // and we return items
          return product;
        }

      })
    ;

    this.setState({products: nextProducts });
  }

  render() {

    const products = this.state.products.sort((a,b) => (b.votes - a.votes));

    const productComponents = products.map((product) => ( 
        <Product
          key={'product-' + product.id} 
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl}
          onVote={this.handleProductUpVote}
        />
    ));

    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }

}  


class Product extends React.Component{


  handleUpVote = () => {
    this.props.onVote(this.props.id);
  }


  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by :</span>
            <img className='ui avatar image' src={this.props.submitterAvatarUrl}/>
          </div>

        </div>
      </div>
    );
  }
} 


ReactDOM.render(
  <ProductList />, document.getElementById("content")
);