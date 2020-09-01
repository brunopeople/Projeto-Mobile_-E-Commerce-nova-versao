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
    links: linkData,
    socialIcons: socialData,
    cart: [],
    cartItems: 0,
    cartSubTotal: 0,
    cartTax: 0,
    carTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProduct: {},
    loading: false
  };
  componentDidMount() {
    //vindo items satisfeito. 

    this.setProducts(items);
  }

  //setar os produtos 

  setProducts = products => {
    let storeProducts = products.map(item => {
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      const product = { id, ...item.fields, image };
      return product;
    });
    // Exibir as caracteristicas do produto ao clicar 
    let featuredProducts = storeProducts.filter(item => item.featured === true);
    this.setState(
      {
      storeProducts,
      filteredProducts: storeProducts,
      featuredProducts,
      cart: this.getStorageCart(),
      singleProduct: this.getStorageProduct(),
      loading: false
    },
    () => {
      this.addTotals();
    }
  );
};
  // inserir o produto no carrinho de compras
  getStorageCart = () => {
    let cart;
    if(localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = [];
    }
    return cart;
  };
  // pegar o produto na localstorage 
  getStorageProduct = () => {
    return localStorage.getItem("singleProduct")
    ? JSON.parse(localStorage.getItem("singleProduct"))
    : {};
  };
  // pegar o total
  getTotals = () => {
    let subTotal = 0;
    let cartItems = 0;
    this.state.cart.forEach(item => {
      subTotal += item.total
      cartItems += item.count
    });

    subTotal = parseFloat(subTotal.toFixed(2));
    let tax = subTotal * 0.2;
    tax = parseFloat(tax.toFixed(2));
    let total = subTotal + tax; 
    total = parseFloat(total.toFixed(2));
    return{
      cartItems,
      subTotal,
      tax,
      total
    };
  };
  //adiciona total
  addTotals = () => {
    const totals = this.getTotals();
    this.setState({
      cartItems: totals.cartItems,
      cartSubTotal: totals.subTotal,
      cartTax: totals.tax,
      cartTotal: totals.total
    });
  };
  // sincronizar o armazenamento
  syncStorage = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  };
  //adiciona ao carrinho
  addToCart = id => {
    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.storeProducts];
    let tempItem = tempCart.find(item => item.id === id);
    if (!tempItem) {
      tempItem = tempProducts.find(item => item.id === id);
      let total = tempItem.price;
      let cartItem = { ...tempItem, count: 1, total };
      tempCart = [...tempCart, cartItem];
    } else {
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }
    this.setState(
      () => {
        return { cart: tempCart };
      },
      () => {
        this.addTotals();
        this.syncStorage();
        this.openCart();
      }
    );
  };
  // setar o método singleProduct 
  setSingleProduct = id => {
   let product = this.state.storeProducts.find(item => item.id === id);
   localStorage.setItem("singleProduct", JSON.stringify(product));
   this.setState({
     singleProduct: {...product },
     loading: false
   });
  };

  // lidar com a barra lateral. 
  handleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };
  // lidar com o start
  handleCart = () => {
    this.setState({ cartOpen: !this.state.sidebarOpen });
  };
  //fechar o carrinho
  closeCart = () => {
    this.setState({ cartOpen: false });
  };
  // open
  openCart = () => {
    this.setState({ cartOpen: true });
  };

  // Funcinalidade do carrinho 
  //Método de incrementação

  increment = id => {
    let tempCart = [...this.state.cart];
    const cartItem = tempCart.find(item => item.id === id);
    cartItem.count++;
    cartItem.total = cartItem.count * cartItem.price;
    cartItem.total = parseFloat(cartItem.total.toFixed(2));
    this.setState(
      () => {
        return {
          cart:[...tempCart]
        };
      },

      () => {
        this.addTotals();
        this.syncStorage();
      }
    );
  };

  /**Método de decremento */
  decrement = id => {
    let tempCart = [...this.state.cart];
    const cartItem= tempCart.find(item => item.id === id);

    cartItem.count = cartItem.count - 1;
      if(cartItem.count === 0){
        this.removeItem(id);
      } else{
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));
        this.setState(
          () => {
            return{
              cart: [...tempCart]
            };
          },

          () => {
            this.addTotals();
            this.syncStorage();
          }
        );
      }
    };

    /**Remover o produto */

    removeItem = id =>{
      let tempCart = [...this.state.cart];
      tempCart = tempCart.filter(item => item.id !== id);
      this.setState(
        {
          cart: [...tempCart]
        },

        () => {
          this.addTotals();
          this.syncStorage();
        }
      );
    };

    clearCart = () =>{
      this.setState(
        {
          cart: []
        },
        () => {
          this.addTotals();
          this.syncStorage();
        }
      );
    }

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
          setSingleProduct: this.setSingleProduct,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
