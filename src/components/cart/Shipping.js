import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveshippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Make sure to import the toast object
import CheckoutSetup from "./CheckoutSetup";

export const validateShipping = (shippingInfo, navigate) => {
    if (
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.state ||
        !shippingInfo.country ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode
    ) {
        toast.error('Please fill the shipping information',{position:toast.POSITION.BOTTOM_CENTER});
        navigate('/shipping');
    }
};

export default function Shipping() {
    const { shippingInfo } = useSelector((state) => state.cartState);
    const [add, setadd] = useState(shippingInfo.address);
    const [city, setcity] = useState(shippingInfo.city);
    const [phno, setphno] = useState(shippingInfo.phoneNo);
    const [postalCode, setpostalCode] = useState(shippingInfo.postalCode);
    const [country, setcountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const countryList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveshippingInfo({
                address: add,
                city: city,
                phoneNo: phno,
                postalCode: postalCode,
                country: country,
                state: state,
            })
        );
        navigate('/order/confirm');
    };

    return (
        <div>
            <CheckoutSetup shipping/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={add}
                                onChange={(e) => setadd(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setcity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="text"
                                id="phone_field"
                                className="form-control"
                                value={phno}
                                onChange={(e) => setphno(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setpostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                required
                                onChange={(e) => setcountry(e.target.value)}
                            >
                                {countryList.map((country, i) => (
                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            onClick={submitHandler}
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
