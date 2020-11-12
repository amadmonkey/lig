// app
import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

// components
import HomeWrapper from '../../utilities/HomeWrapper/HomeWrapper';

// styles
import './Register.css';

const Register = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <HomeWrapper>
            <div className="wrapper register-container">
                <div className="login-form-container">
                    <h1 className="form-title">LOGIN</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                className={errors.email ? 'error' : ''}
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Please enter an email of less than 50 characters"
                                    },
                                    pattern: {
                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Please enter a valid email"
                                    }
                                })}
                                autoFocus
                            />
                            {errors.email && <label htmlFor="email" className="error-message">{errors.email.message}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={errors.password ? 'error' : ''}
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Please enter at least 10 characters"
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Please enter a password of less than 50 characters"
                                    }
                                })}
                            />
                            {errors.password && <label htmlFor="password" className="error-message">{errors.password.message}</label>}
                        </div>
                        <div className="form-group">
                            <button type="submit">LOGIN</button>
                        </div>
                    </form>
                    <span>No account yet? <Link to="/register" className="link">REGISTER HERE</Link></span>
                </div>
            </div>
        </HomeWrapper>
    )
}

export default Register
