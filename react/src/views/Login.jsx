import { useRef, useState} from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

function Login () {

    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);

    const {setToken, setUser} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors(null);

        axiosClient.post('/login', payload)
        .then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) { // invalid input

                if (response.data.errors) {
                    setErrors(response.data.errors);
                }else {
                    setErrors({
                        email: [response.data.message],
                    })
                }

            }
        });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Login into your account</h1>
                {errors &&
                    <div className="alert">
                        <p>{errors.email}</p>
                        <p>{errors.password}</p>
                    </div>
                }
                <form onSubmit={onSubmit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registred? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;

