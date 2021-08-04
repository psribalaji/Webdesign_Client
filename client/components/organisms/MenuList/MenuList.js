import React, { useState } from 'react'
import { Link , useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import R, { identity } from 'ramda'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";
import Button from 'react-bulma-companion/lib/Button'

// const dispatch = useDispatch()
let productList = [{}];
  
  /* Product */
  class Product extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        qty: 0
      };
      this.add = this.add.bind(this);
      this.subtract = this.subtract.bind(this);
      this.showInfo = this.showInfo.bind(this);
    }
  
    add() {
      this.setState({
        
        qty: parseInt(this.state.qty) + 1
      });
      console.log("add ",this.state.qty)
      this.props.handleTotal(this.props.price);
    }
  
    subtract() {
      this.setState({
        qty: this.state.qty - 1
      });
      this.props.handleTotal(-this.props.price);
    }
  
    showInfo() {
      this.props.handleShow(this.props.info);
    }
  
    render() {
      return (
        <div>
          <div className="row form-group">
            <div className="col-sm-10">
              <h4>{this.props.name}: ${this.props.price}</h4>
            </div>
            <div className="col-sm-2 text-right">qty: {this.state.qty}</div>
          </div>
          <div className="row btn-toolbar">
            <div className="col-6">
              <button className="btn btn-outline-primary" onClick={this.showInfo}>
                show More
              </button>
            </div>
            <div className="col-6 text-right">
              <button className="btn btn-outline-primary" onClick={this.add}>
                +1
              </button>
              <button className="btn btn-outline-primary" onClick={this.subtract} disabled={this.state.qty < 1}>
                -1
              </button>
            </div>
          </div>
          <hr />
        </div>
      );
    }
  }
  
  /* Total */
  class Total extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
    //   console.log('this.props.total ', this.props.total)
      let total = this.props.total.toFixed(2);
      let tax = (this.props.total * 0.05).toFixed(2);
      let totalIncTax = (+total + +tax);
      let mystyle = {
        borderTop: "1px solid #ddd",
        marginTop: "10px"
      };
      return (
        <div style={{"marginTop": "30px", "backgroundColor":"#F6F6F6","padding": "10px"}}>
          <h3 className="row" style={{ fontWeight: 400 }}>
            <span className="col-6">Total Price:</span>
            <span className="col-6 text-right">${total}</span>
          </h3>
          <h3 className="row" style={{ fontWeight: 400 }}>
            <span className="col-6">Tax (5%):</span>
            <span className="col-6 text-right">${tax}</span>
          </h3>
          <h3 className="row" style={mystyle}>
            <span className="col-6">Total inc Tax:</span>
            <span className="col-6 text-right">${totalIncTax}</span>
          </h3>
  
        </div>
      );
    }
  }
  
 
  
  /* ProductList */
  class MenuList extends React.Component {
    constructor(props) {
      super(props);
     // const { id } = this.props.params;
      //console.log("IDD ",match.params.id)

      this.state = {
        total: 0,
        productList: "",
       // id : this.props.match.params.id
      };
      console.log('ID ', localStorage.getItem('id'))
      this.createProduct = this.createProduct.bind(this);
      this.calculateTotal = this.calculateTotal.bind(this);
      this.showProduct = this.showProduct.bind(this);
    }
  
    componentDidMount() {
        
    //   setTimeout(() => {
    //     this.setState({ productList: productList });
    //   }, 1000);
      fetch(`http://localhost:3000/api/res/getMenu/${localStorage.getItem('id')}`)
      .then(res => res.json())
      .then(
        (result) => {
            console.log("Rss ",result.restaurants[0].menu)
          this.setState({
            isLoaded: true,
            productList: result.restaurants[0].menu
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    }
  
    createProduct(product) {
      this.setState({
        products: this.state.productList.push(product)
      });
    }
  
    calculateTotal(price) {
      this.setState({
        total: parseInt(this.state.total) + parseInt(price)
      });
      console.log("Total ",this.state.total);
    }
  
    showProduct(info) {
      console.log(info);
      alert(info);
    }
  
    render() {
      if (!this.state.productList) return <p>loading menu ...!!!!</p>;
        console.log("Pp ", productList)
      var component = this;
      var products = this.state.productList.map(function(product) {
        return (
          <Product
            name={product.itemName}
            price={product.price}
            info={product.info}
            handleShow={component.showProduct}
            handleTotal={component.calculateTotal}
          />
        );
      });
  
      return (
        <div>
          {products}
          <Total total={this.state.total} />
          <br>
          </br>
          <Button variant="primary">Order Now</Button>{' '}

        </div>
      );
    }
  }
  
  export default MenuList;
