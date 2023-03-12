import React, { useEffect, useRef } from 'react';
import Image from 'next/image'
import { signIn, useSession } from "next-auth/react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { Props, User } from '@/interfaces/auth';

import { toastEmitter } from '@/redux/slices/toastSlice';
import { showHideLoading } from '@/redux/slices/spinnerSlice';

import Layout from '@/components/layout';
import { Button } from '@/components/button/Button';
import Spinner from '@/components/spinner/Spinner';

import { NEXTAUTH_STATUS, NEXTAUTH_TYPE, ROUTES } from '@/types/constant';

//import loginImage from '@/public/login_image.gif';
import loginImage from '@/public/the_hihi.gif';
import styles from './Login.module.css';

const Login = ({ csrfToken }: Props) => {
    const { status, data: session } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === NEXTAUTH_STATUS.AUTHENTICATED) {
            router.push(ROUTES.HOME);
        }
    }, [status]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm() as UseFormReturn;

    if (status === NEXTAUTH_STATUS.LOADING) {
        return (<Spinner />)
    }
    else if (status === NEXTAUTH_STATUS.UNAUTHENTICATED) {

        const handleError = (errors: any) => { console.log('login-handle-errors========', errors) };

        const loginOptions = {
            // email: {
            //     required: "Email is required",
            //     pattern: {
            //         value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
            //         message: "Email not valid",
            //     },
            // },
            username: {
                required: "Username is required",
            },
            password: {
                required: "Password is required",
            },
        };

        const handleSignin = async (data: FieldValues) => {
            try {
                dispatch(showHideLoading(true))

                const { username, password } = data as User;

                const result = await signIn(NEXTAUTH_TYPE.CREDENTIALS, {
                    redirect: false,
                    username,
                    password
                })

                dispatch(showHideLoading(false))

                if (result?.ok && !result.error) {
                    router.push(ROUTES.HOME);
                }
                else {
                    dispatch(toastEmitter({
                        isShow: true,
                        isError: true,
                        message: result?.error || ''
                    }))
                }
            } catch (err: any) {
                dispatch(showHideLoading(false))
                dispatch(toastEmitter({
                    isShow: true,
                    isError: true,
                    message: err || ''
                }))
            }
        }

        const signInGoogle = async () => {
            await signIn(NEXTAUTH_TYPE.GOOGLE);
            //route.push('/home');
        }

        return (
            <Layout>
                <div className={`${styles.page_grid} grid`}>
                    <section className={`${styles.banner} grid center`}>
                        <Image src={loginImage}
                            alt=""
                            className={styles._image}>
                        </Image>
                    </section>
                    <section className={`${styles.form_wrapper} grid center`}>
                        <form action="" className={styles.form_section}
                            onSubmit={handleSubmit(handleSignin, handleError)}>

                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <div className={styles.header}>
                                <h1>Welcome Back</h1>
                                <p>Welcome back, Please enter your details</p>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="username">Username</label>
                                <input id="username" type="text" placeholder="Enter Your name"
                                    {...register("username", loginOptions.username)} autoFocus />

                                {errors?.username && (<p className={styles.validate_error}>{errors.username.message as React.ReactNode}</p>)}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" placeholder="Enter Your password"
                                    {...register("password", loginOptions.password)} />

                                {errors?.password && (<p className={styles.validate_error}>{errors.password.message as React.ReactNode}</p>)}
                            </div>
                            <div className={`${styles.pass_section} flex`}>
                                <div className="flex center">
                                    <input type="checkbox" name="" id="" />
                                    <span>Remember password</span>
                                </div>
                                <a href="#0">Forgot password?</a>
                            </div>
                            <Button type="submit"
                            //callbackfunc={handleButtonLoginClick}
                            >
                                Sign in
                            </Button>
                            <div className={`btn ${styles.google_sign_in} flex center`}
                                onClick={signInGoogle}>
                                <svg width="148" height="148" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M144.156 75.6583C144.156 70.7639 143.759 65.8431 142.912 61.0281H75V88.754H113.89C112.276 97.6962 107.091 105.607 99.4982 110.633V128.623H122.7C136.325 116.083 144.156 97.5639 144.156 75.6583Z" fill="#4285F4" />
                                    <path d="M75.0002 146.005C94.4189 146.005 110.795 139.629 122.726 128.623L99.5249 110.633C93.0696 115.025 84.736 117.512 75.0266 117.512C56.2429 117.512 40.3164 104.839 34.6019 87.8016H10.6592V106.347C22.8819 130.661 47.777 146.005 75.0002 146.005Z" fill="#34A853" />
                                    <path d="M34.5752 87.8016C31.5592 78.8595 31.5592 69.1766 34.5752 60.2345V41.6888H10.659C0.446995 62.0335 0.446995 86.0026 10.659 106.347L34.5752 87.8016Z" fill="#FBBC04" />
                                    <path d="M75.0002 30.498C85.2651 30.3393 95.1861 34.2018 102.62 41.2921L123.176 20.7357C110.16 8.51303 92.8844 1.7932 75.0002 2.00485C47.7769 2.00485 22.8819 17.3493 10.6592 41.6889L34.5754 60.2346C40.2634 43.1703 56.2164 30.498 75.0002 30.498Z" fill="#EA4335" />
                                </svg>
                                Sign in with Google
                            </div>
                            <div className={styles.footer}>
                                <p>Dont have an account? <a href={ROUTES.REGISTER}>Sign up</a></p>
                            </div>
                        </form>
                    </section>
                </div>
            </Layout>
        );
    }
};

export default Login;