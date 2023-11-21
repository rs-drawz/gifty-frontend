import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { register, clearerror } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [userdata, setuserdata] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate()
    const [avatar, setavatar] = useState("");
    const [avatarPreview, setavatarPreview] = useState("/images/default_avatar.png")
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setavatarPreview(reader.result)
                    setavatar(e.target.files[0])
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
        else {
            setuserdata({ ...userdata, [e.target.name]: e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', userdata.name)
        formData.append('email', userdata.email)
        formData.append('password', userdata.password)
        formData.append('avatar', avatar)
        dispatch(register(formData))
    }
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
            return
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearerror) }
            })
            return
        }
    }, [error])
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                    <h1 className="mb-3">Register</h1>

                    <div className="form-group">
                        <label htmlFor="email_field">Name</label>
                        <input name='name' onChange={onChange} type="name" id="name_field" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name='email'
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name='password'
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role_field">Role</label>
                        <select name="role" id="role_field" className="form-control" onChange={onChange}>
                            <option value="">Select Role</option>
                            <option value="Artist">Artist</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </div>


                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    <img
                                        src={avatarPreview}
                                        className='rounded-circle'
                                        alt='image'
                                    />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    onChange={onchange}
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
    )
}