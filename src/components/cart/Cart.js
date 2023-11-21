import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChromePicker } from 'react-color';
import { Link, useNavigate } from 'react-router-dom';
// import { decreaseItemQnty, increaseItemQnty, removeItemfromCart } from "../../slices/cartSlice";
import { dcreaseItemQnty, increaseItemQnty, removeItemfromCart } from "../../slices/cartSlice";

export default function Cart() {
    const { items } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showGiftForm, setShowGiftForm] = useState(false);
    const [from, setFrom] = useState('');
    const [letter, setLetter] = useState('');
    const [wrapColor, setWrapColor] = useState('');
    const [submittedFrom, setSubmittedFrom] = useState('');
    const [submittedLetter, setSubmittedLetter] = useState('');
    const [submittedWrapColor, setSubmittedWrapColor] = useState('');

    const increseqty = (item) => {
        const count = item.quantity;
        if (item.stock === 0 || count >= item.stock) return;
        dispatch(increaseItemQnty(item.product));
    };

    const decreseqty = (item) => {
        const count = item.quantity;
        if (count === 1) return;
        dispatch(dcreaseItemQnty(item.product));
    };

    const checkoutHandler = () => {
        navigate('/login/rs?redirect=shipping');
    };

    const subtotalUnits = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const handleGiftOption = () => {
        setShowGiftForm(true);
    };

    const handleGiftFormSubmit = (e) => {
        e.preventDefault();
        setSubmittedFrom(from);
        setSubmittedLetter(letter);
        setSubmittedWrapColor(wrapColor);
        // Implement logic here to handle form submission
        // You can use the 'from', 'letter', and 'wrapColor' states for the form values
        // After submission, you can close the form
        setShowGiftForm(false);
    };

    return (
        <Fragment>
            {items.length === 0 ? (
                <h2 className="mt-5">Your Cart is empty</h2>
            ) : (
                <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-10 col-lg-8">
                            {items.map(item => (
                                <Fragment key={item.product}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>

                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">₹{item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreseqty(item)}>-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                                    <span className="btn btn-primary plus" onClick={() => increseqty(item)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" onClick={() => dispatch(removeItemfromCart(item.product))} className="fa fa-trash btn btn-danger"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))}
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            {submittedFrom && (
                                <div id="order_summary">
                                    <h4>Gift Options:</h4>
                                    <hr/>
                                    <p>From:<span className="order-summary-values">{submittedFrom}</span></p>
                                    <p>Letter: <span className="order-summary-values">{submittedLetter}</span></p>
                                    <p>Wrap Color: <span className="order-summary-values">{submittedWrapColor}  </span></p>
                                    <hr/>
                                </div>
                            )}
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal: <span className="order-summary-values">{subtotalUnits} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">{subtotalPrice}</span></p>
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                            </div>

                        </div>

                        <div id="gift_option" className="rs">
                            <button onClick={handleGiftOption} id="checkout_btn" className="btn btn-primary btn-block" >Gift Option</button>
                        </div>

                        {showGiftForm && (
                            <div className="popup-overlay">
                                <div className="gift-form-popup">
                                    <div className="customize-gift">
                                        <h2><b>Customize the gift</b></h2>
                                    </div>
                                    <form onSubmit={handleGiftFormSubmit} className="shadow-lg">
                                        <label htmlFor="from">From:</label>
                                        <input
                                            type="text"
                                            id="from"
                                            value={from}
                                            className="form-control"
                                            onChange={(e) => setFrom(e.target.value)}
                                        />
                                        <br />
                                        <label htmlFor="letter">Letter:</label>
                                        <input
                                            type="text"
                                            id="letter"
                                            className="form-control"
                                            value={letter}
                                            onChange={(e) => setLetter(e.target.value)}
                                        />
                                        <br />
                                       
                                        <div className="wrap-color-options">
                                            <label htmlFor="wrapColor">Wrap Color:</label>
                                            <div className="color-picker-container">
                                                <ChromePicker
                                                    color={wrapColor}
                                                    onChange={(color) => setWrapColor(color.hex)}
                                                />
                                            </div>
                                        </div>
                                      
                                        <br />
                                        <button type="submit" id="checkout_btn" className="btn btn-primary btn-block">Submit</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
