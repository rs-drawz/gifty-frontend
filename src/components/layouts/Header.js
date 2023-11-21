import React from "react"
import Search from "./Search"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { DropdownButton, Dropdown, Image } from "react-bootstrap"
import DropdownToggle from "react-bootstrap/esm/DropdownToggle"
import { logout } from "../../actions/userActions"

export default function Header() {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const {items:cartItems} = useSelector(state=>state.cartState);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(logout)
    }
    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to='/'>
                        <img width="150px" src="/images/rsdrawz.png" alt="rsaart logo" />
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                {isAuthenticated ?
                    (
                        <Dropdown className="d-inline">
                            <Dropdown.Toggle variant='default text-white pr-5 ' id='dropdown-basic'>
                                <figure className="avatar avatar-nav">
                                    {/* src={user.avatar??'./images/defa'} */}
                                    <Image width="50px" src="images/default_avatar.png" />
                                </figure>
                                <span>{user.name}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { navigate('/myprofile') }}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={logoutHandler} className="text-danger">logout</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    )
                    :
                    <Link to="/login/rs">
                        <button className="btn" id="login_btn">Login</button>
                    </Link>
                }
                <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
                <span className="ml-1" id="cart_count">{cartItems.length}</span>
            </div>
        </nav>
    )
}