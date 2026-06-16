import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export default function Cart ( { cartItems, setCartItems }) {
    return (
        <div class="container container-fluid">
            <h2 class="mt-5">Your Cart: <b>{cartItems.length}</b></h2>
        
            <div class="row d-flex justify-content-between">
                <div class="col-12 col-lg-8">
                    {
                        cartItems.map((item) =>
                        (<Fragment>
                        <hr />
                        <div class="cart-item">
                            <div class="row">
                                <div class="col-4 col-lg-3">
                                    <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115" />
                                </div>

                                <div class="col-5 col-lg-3">
                                    <Link to={'/product/'+item.product._id}>{item.product.name}</Link>
                                </div>

                                <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p id="card_item_price">{item.product.price}</p>
                                </div>

                                <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <div class="stockCounter d-inline">
                                        <span class="btn btn-danger minus">-</span>
                                        <input type="number" class="form-control count d-inline" value="1" readOnly />

                                        <span class="btn btn-primary plus">+</span>
                                    </div>
                                </div>

                                <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                                    <i id="delete_cart_item" class="fa fa-trash btn btn-danger"></i>
                                </div>
                            </div>
                        </div>
                        <hr />
                         </Fragment>)
                   )}
                    
                </div>

                <div class="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span class="order-summary-values">1 (Units)</span></p>
                        <p>Est. total: <span class="order-summary-values">$245.67</span></p>
        
                        <hr />
                        <button id="checkout_btn" class="btn btn-primary btn-block">Place Order</button>
                    </div>
                </div>
            </div>
    </div> 
    )
}