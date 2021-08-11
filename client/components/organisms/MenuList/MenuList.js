import React, { useState } from 'react'
import { useHistory ,Link, useParams } from 'react-router-dom'
import R, { identity } from 'ramda'
import './App.scss'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bulma-companion/lib/Button'
import { Col, Row } from 'react-bootstrap'
import GoogleMap1 from './GoogleMap1'
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

import ReactDOM from "react-dom"

// const dispatch = useDispatch()
let productList = [{}]
let menu =[]

const { user } = R.pick(['user'])
console.log("UU ", user)


const containerStyle = {
  width: '250px',
  height: '250px',
}

/* Product */
class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 0,
     
    }
    this.add = this.add.bind(this)
    this.subtract = this.subtract.bind(this)
    this.showInfo = this.showInfo.bind(this)
  }
  
  add() {
    this.setState({
      qty: parseInt(this.state.qty) + 1,
    })
    console.log('add ', this)
    this.props.handleTotal(this.props.price)
    let name = this.props.name
    let q  = this.state.qty
   let flag = false;
    menu.forEach(function (item){
      console.log("ff ", item.itemName)
      console.log("ff111 ", name)

      if(item.itemName === name){
        console.log("It already exists")
        item.quantity = item.quantity+1

        flag = true
      }
     
    })
     if(!flag){
        menu.push({"itemName": this.props.name,"quantity":this.state.qty+1})
      }
      flag = false;
      console.log("mm ", menu)
    
  }

  subtract() {
    this.setState({
      qty: this.state.qty - 1,
    })
    this.props.handleTotal(-this.props.price)
    let name = this.props.name

   
    for(var i =0 ; i < menu.length; i++){
      if(menu[i].itemName === name){
        if(menu[i].quantity ==1 ){
         menu.splice(i,1)
        }else{
          menu[i].quantity = menu[i].quantity-1
        }
      }
    }

    console.log("NNN ", menu)


  }

  showInfo() {
    this.props.handleShow(this.props.info)
  }



  render() {
    
    return (
      <Row>
        <Col>
          <div className='row form-group'>
            <div className='col-sm-10'>
              <h4>
                {this.props.name}: ${this.props.price}
              </h4>
            </div>
            <div className='col-sm-2 text-right'>qty: {this.state.qty}</div>
          </div>
          <div className='row btn-toolbar'>
            <div className='col-6'>
         
            </div>
            <div className='col-6 text-right'>
              <button className='btn btn-outline-primary' onClick={this.add}>
                +1
              </button>
              <button
                className='btn btn-outline-primary'
                onClick={this.subtract}
                disabled={this.state.qty < 1}
              >
                -1
              </button>
             
            </div>
          </div>
          <hr />
        </Col>
      </Row>
    )
  }
}

/* Total */
class Total extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    //   console.log('this.props.total ', this.props.total)
    let total = this.props.total.toFixed(2)
    let tax = (this.props.total * 0.05).toFixed(2)
    let totalIncTax = +total + +tax
    let mystyle = {
      borderTop: '1px solid #ddd',
      marginTop: '10px',
    }
    return (
      <div
        className='col-lg-6 col-md-6 col-sm-12'
        style={{
          marginTop: '30px',
          backgroundColor: '#F6F6F6',
          padding: '10px',
        }}
      >
        <h3 className='row' style={{ fontWeight: 400 }}>
          <span className='col-6'>Total Price:</span>
          <span className='col-6 text-right'>${total}</span>
        </h3>
        <h3 className='row' style={{ fontWeight: 400 }}>
          <span className='col-6'>Tax (5%):</span>
          <span className='col-6 text-right'>${tax}</span>
        </h3>
        <h3 className='row' style={mystyle}>
          <span className='col-6'>Total inc Tax:</span>
          <span className='col-6 text-right'>${totalIncTax}</span>
        </h3>
      </div>
    )
  }
}

/* ProductList */
class MenuList extends React.Component {
  
  constructor(props) {
    super(props)
    // const { id } = this.props.params;
    //console.log("IDD ",match.params.id)

    this.state = {
      total: 0,
      productList: '',
      address: '',
      // id : this.props.match.params.id
      
  }

    console.log('ID ', localStorage.getItem('id'))
    this.calculateTotal = this.calculateTotal.bind(this)
    this.order = this.order.bind(this)

  }

  componentDidMount() {
    //   setTimeout(() => {
    //     this.setState({ productList: productList });
    //   }, 1000);
    fetch(`http://localhost:3000/api/res/getMenu/${localStorage.getItem('id')}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('Rss ', result.restaurants[0])
          this.setState({
            isLoaded: true,
            productList: result.restaurants[0].menu,
            address: result.restaurants[0].address
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }

  calculateTotal(price) {
    this.setState({
      total: parseInt(this.state.total) + parseInt(price),

    })

    console.log('Total ', this.state.total)
  }

  order(t){

    console.log("order called")
    // console.log('mm **', menu)

    let orderDetails = {
      user_id: localStorage.getItem('uid'),
      restaurant_id: localStorage.getItem('id'),
      status: "Waiting for Confirmation",
      total: (this.state.total * 1.05).toFixed(2),
      menu : menu

    }
    console.log('mm rrr', orderDetails)
    axios.post('http://localhost:3000/api/order/saveOrder', orderDetails)
        .then(response => 
          console.log("Successfully Ordered")
          
    );
    menu =[]
    

  }

createOrder(data, actions) {
  this.order()
  return actions.order.create({
    purchase_units: [
      {
        amount: {
          value: (this.state.total * 1.05).toFixed(2),
        },
      },
    ],
  });
}

onApprove(data, actions) {
  return actions.order.capture();
}

  
  
  render() {
    
    if (!this.state.productList) return <p>loading menu ...!!!!</p>
    console.log('Pp ', productList)
    console.log('Paypal ', this.state.initialOptions)

    var component = this
    var products = this.state.productList.map(function (product) {
      return (
        <div>
          <Product
            name={product.itemName}
            price={product.price}
            // info={product.info}
            // handleShow={component.showProduct}
            handleTotal={component.calculateTotal}
          />
        </div>
      )
    })

    return (
      
      <div>
        <Row>
          <Col>
            {products}
            <Total total={this.state.total} />
            <br></br>
            {/* <Button variant='primary' onClick={this.order}>Order Now</Button>{' '} */}
            
            <PayPalButton
                createOrder={(data, actions) => this.createOrder(data, actions)}
                onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </Col>
          <Col>
            <GoogleMap1 address={this.state.address} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default MenuList
