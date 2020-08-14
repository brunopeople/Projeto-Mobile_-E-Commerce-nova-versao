import React, { Component } from "react";
import { linkData } from "./linkData";
import { socialData } from "./socialData";
import { items } from "./productData";

const ProductContext = React.createContext();
//Provider
//Consumer
class ProductProvider extends Component {
  state = {
    sidebarOpen: false,
    cartOpen: false,
    cartItems: 2,
    links: linkData,
    socialIcons: socialData,
    cart: [],
    cartItems: 0,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProduct: {},
    loading: false
  };

  // método que serve para setar o conteudo da array de produtos.
  componentDidMount(){
    this.setProducts(items);
  }

  setProducts = products => {
    let storeProducts = products.map(item => {
      const {id} = item.sys;
      const image = item.fields.image.fields.file.url 
      const product = { id, ...item.fields, image };
      return product;
    });

    let featuredProducts = storeProducts.filter(item => item.featured === true);
    this.setState({
      storeProducts,
      filteredProducts: storeProducts,
      featuredProducts,
      cart: this.getStorageCart(),
      singleProduct: this.getStoreProduct(),
      loading: false

    });
  };

  // Pega o carrinho que está na loja
  getStorageCart = () => {
    return [];
  };

  //Pegar o produto que está no carrinho
  getStoreProduct = () => {
    return {};
  };

  //Soma o total
  getTotals = () => {};

  //adciona o total 
  addTotals = () => {};

  //sincroniza o carrinho
  syncStorage = () => {};

  //adiciona ao carrinho
  addToCart = id => {
    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.storeProducts];
    let tempItem = tempCart.find(item => item.id === id);
    if(!tempItem) {
      tempItem = tempProducts.find(item => item.id === id);
      let total = tempItem.price;
      let cartItem = {...tempItem, count: 1, total};
      tempCart = [...tempCart, cartItem];
    } else {
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }

    this.setState(
      () => {
        return {cart: tempCart};
      },
      () => {
        this.addTotals();
        this.syncStorage();
        this.openCart();
        }
      );
    };

  // adicionar apenas um produto no carrinho
  setSingleProduct = id => {
    console.log(`set single product ${id}`);
  }

  // handle sidebar
  handleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };
  // hanldle sart
  handleCart = () => {
    this.setState({ cartOpen: !this.state.sidebarOpen });
  };
  //close cart
  closeCart = () => {
    this.setState({ cartOpen: false });
  };
  // open
  openCart = () => {
    this.setState({ cartOpen: true });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleSidebar: this.handleSidebar,
          handleCart: this.handleCart,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addToCart: this.addToCart,
          setSingleProduct: this.singleProduct
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
