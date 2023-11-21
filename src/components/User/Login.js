// import { Fragment, useEffect, useState } from "react";
// import Metdata from "../layouts/Metadata";
// import { login } from "../../actions/userActions";
// import { clearerror } from '../../actions/userActions';
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// export default function Login() {
//     const [email, setemail] = useState("");
//     const [password, setpassword] = useState("");
//     const [role, setRole] = useState(""); // Added state for role
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const { loading, error, isAuthenticated } = useSelector(state => state.authState);
//     const redirect = location.search ? '/' + location.search.split('=')[1] : '/';
//     const submitHandler = (e) => {
//         e.preventDefault();
//         dispatch(login({ email, password, role })); // Passing role to the login action
//     };

//     useEffect(() => {
//         if (isAuthenticated) {
//             navigate(redirect);
//         }
//         if (error) {
//             toast(error, {
//                 position: toast.POSITION.BOTTOM_CENTER,
//                 type: 'error',
//                 onOpen: () => { dispatch(clearerror); }
//             });
//         }
//     }, [error, isAuthenticated, clearerror]);

//     return (
//         <Fragment>
//             <Metdata title={'Loginpage'} />
//             <div className="row wrapper">
//                 <div className="col-10 col-lg-5">
//                     <form onSubmit={submitHandler} className="shadow-lg">
//                         <h1 className="mb-3">Login</h1>
//                         <div className="form-group">
//                             <label htmlFor="email_field">Email</label>
//                             <input
//                                 type="email"
//                                 id="email_field"
//                                 className="form-control"
//                                 value={email}
//                                 onChange={i => setemail(i.target.value)}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="password_field">Password</label>
//                             <input
//                                 type="password"
//                                 id="password_field"
//                                 className="form-control"
//                                 value={password}
//                                 onChange={i => setpassword(i.target.value)}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="role_field">Role</label>
//                             <select
//                                 name="role"
//                                 id="role_field"
//                                 className="form-control"
//                                 value={role}
//                                 onChange={e => setRole(e.target.value)}
//                             >
//                                 <option value="">Select Role</option>
//                                 <option value="Artist">Artist</option>
//                                 <option value="Admin">Admin</option>
//                                 <option value="User">User</option>
//                             </select>
//                         </div>

//                         <a href="#" className="float-right mb-4">Forgot Password?</a>

//                         <button
//                             id="login_button"
//                             type="submit"
//                             className="btn btn-block py-3"
//                             disabled={loading}
//                         >
//                             LOGIN
//                         </button>

//                         <Link to="/register" href="#" className="float-right mt-3">New User?</Link>
//                     </form>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }

import { Fragment, useEffect, useState } from "react";
import Metdata from "../layouts/Metadata";
import { login } from "../../actions/userActions";
import { clearerror } from '../../actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))

    }
    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect);
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearerror()); }
            });
        }
    }, [error, isAuthenticated, clearerror]);
    
    return (
        <Fragment>
            <Metdata title={'Loginpage'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={i => setemail(i.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={i => setpassword(i.target.value)}
                            />
                        </div>

                        <a href="#" className="float-right mb-4">Forgot Password?</a>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            LOGIN
                        </button>

                        <Link to="/register" href="#" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
