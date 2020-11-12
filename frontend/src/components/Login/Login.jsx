// app
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import Cookies from 'js-cookie';

// components
import HomeWrapper from '../../utilities/HomeWrapper/HomeWrapper';
import { ReactComponent as Loading } from '../../images/loading.svg';

// styles
import './Login.css';

const Login = () => {
    let history = useHistory();
    const location = useLocation();
    const isLogin = location.pathname === '/login' ? true : false;
    const [generalNote, setGeneralNote] = useState({ status: 'SUCCESS', message: null });
    const { register, handleSubmit, watch, errors } = useForm();
    const LOGIN_MUTATION = gql`
        mutation($email: String!, $password: String!) {
            authenticate(email: $email, password: $password)
        }
    `;
    const REGISTER_MUTATION = gql`
        mutation($email: String!, $password: String!) {
            register(email: $email, password: $password)
        }
    `;
    const [loginMutation, { loading: loginLoading, data: loginData, onCompleted: loginCompleted, onError: loginError }] = useMutation(LOGIN_MUTATION, {
        onCompleted(data) {
            if (data.authenticate) {
                Cookies.set('authorization', data.authenticate, { expires: 0.5 });
                history.push('/');
            } else {
                setGeneralNote({ status: 'ERROR', message: "Please enter valid email or password" });
            }
        },
        onError(data) {
            setGeneralNote({ status: 'ERROR', message: "Please enter valid email or password" });
        }
    });
    const [registerMutation, { loading: registerLoading, data: registerData, onCompleted: registerCompleted, onError: registerError }] = useMutation(REGISTER_MUTATION, {
        onCompleted(data) {
            if (data.register) {
                alert('Registration successful. Redirecting to login screen');
                history.push('/login');
            } else {
                setGeneralNote({ status: 'ERROR', message: "Please enter valid email or password" });
            }
        },
        onError(data) {
            setGeneralNote({ status: 'ERROR', message: "Please enter valid email or password" });
        }
    });

    const onSubmit = (data) => {
        if (isLogin) {
            loginMutation({ variables: data });
            console.info('loginLoading', loginLoading);
            console.info('loginData', loginData);
            console.info('loginError', loginError);
        } else {
            registerMutation({ variables: { email: data.email, password: data.password } });
            console.info('registerLoading', registerLoading);
            console.info('registerData', registerData);
            console.info('registerError', registerError);
        }
    };

    return (
        <HomeWrapper>
            <div className="wrapper login-container">
                <div className="login-form-container">
                    <h1 className="form-title">{isLogin ? 'LOGIN' : 'REGISTER'}</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
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
                                        value: 6,
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
                        {
                            !isLogin &&
                            <div className="form-group">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type="password"
                                    className={errors.confirmpassword ? 'error' : ''}
                                    ref={register({
                                        required: {
                                            value: true,
                                            message: "Password is required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Please enter at least 10 characters"
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Please enter a password of less than 50 characters"
                                        },
                                        validate: value =>
                                            value === watch('password') || "The passwords do not match"
                                    })}
                                />
                                {errors.confirmpassword && <label htmlFor="confirm-password" className="error-message">{errors.confirmpassword.message}</label>}
                            </div>
                        }
                        <div className="form-group">
                            <button type="submit" className={loginLoading || registerLoading ? 'loading' : ''}>{loginLoading || registerLoading ? <Loading style={{ height: "50px", width: "50px" }} /> : (isLogin ? 'LOGIN' : 'REGISTER')}</button>
                        </div>
                        <div hidden={!generalNote.message} className={`general-note ${generalNote.status}`}>
                            {generalNote.message}
                        </div>
                        {(loginLoading || registerLoading) && <p>Loading...</p>}
                        {(loginError || registerError) && <p>Error :( Please try again</p>}
                    </form>
                    <span>
                        {
                            isLogin ?
                                <span>No account yet? <Link to="/register" className="link">REGISTER HERE</Link></span> :
                                <span>Already have an account? <Link to="/login" className="link">LOGIN HERE</Link></span>
                        }
                    </span>
                </div>
            </div>
        </HomeWrapper>
    )
}

export default Login
