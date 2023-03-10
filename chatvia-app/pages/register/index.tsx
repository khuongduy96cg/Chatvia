import React from 'react'
import Image from 'next/image'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';

import Layout from '@/components/layout'
import { Button } from '@/components/button/Button';

import { ROUTES } from '@/types/constant';

import styles from '../login/Login.module.css';
import registerImage from '@/public/login_image.gif';
import { User } from '@/interfaces/auth';

function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm() as UseFormReturn;

    const handleError = (errors: any) => { };

    const handleSignup = async (data: FieldValues) => {
        try {

            const { username, password, email, first_name, last_name } = data as User;
            //handle call api create user

        } catch (err: any) {
            // dispatch(toastEmitter({
            //     isShow: true,
            //     isError: true,
            //     message: err || ''
            // }))
        }
    }

    const validatePassword = () => {
        const { password, confirmPassword } = getValues() // Get the values of the two password fields
        return password === confirmPassword || "Passwords do not match"
    }

    const signUpOptions = {
        email: {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Email not valid",
            },
        },
        username: {
            required: "Username is required",
        },
        first_name: {
            required: "Firstname is required",
        },
        last_name: {
            required: "Lastname is required",
        },
        password: {
            required: "Password is required",
        },
        confirm_password: {
            //required: "Password is required",
            validate: validatePassword
        },
    };

    return (
        <Layout>
            <div className={`${styles.page_grid} grid`}>
                <section className={`${styles.banner} grid center`}>
                    <Image src={registerImage}
                        alt=""
                        className={styles._image}>
                    </Image>
                </section>
                <section className={`${styles.form_wrapper} grid center`}>
                    <form action="" className={styles.form_section}
                        onSubmit={handleSubmit(handleSignup, handleError)}>

                        <div className={styles.header}>
                            <h1>Register form</h1>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="Enter Your email"
                                {...register("email", signUpOptions.email)} autoFocus />

                            {errors?.email && (<p className={styles.validate_error}>{errors.email.message as React.ReactNode}</p>)}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" placeholder="Enter Your username"
                                {...register("username", signUpOptions.username)} autoFocus />

                            {errors?.username && (<p className={styles.validate_error}>{errors.username.message as React.ReactNode}</p>)}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="first_name">First Name</label>
                            <input id="first_name" type="text" placeholder="Enter Your name"
                                {...register("first_name", signUpOptions.first_name)} autoFocus />

                            {errors?.first_name && (<p className={styles.validate_error}>{errors.first_name.message as React.ReactNode}</p>)}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="last_name">Last Name</label>
                            <input id="last_name" type="text" placeholder="Enter Your name"
                                {...register("last_name", signUpOptions.last_name)} autoFocus />

                            {errors?.last_name && (<p className={styles.validate_error}>{errors.last_name.message as React.ReactNode}</p>)}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="Enter Your password"
                                {...register("password", signUpOptions.password)} />

                            {errors?.password && (<p className={styles.validate_error}>{errors.password.message as React.ReactNode}</p>)}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input id="confirm_password" type="password" placeholder="Enter Your password"
                                {...register("confirm_password", signUpOptions.confirm_password)} />

                            {errors?.confirm_password && (<p className={styles.validate_error}>{errors.confirm_password.message as React.ReactNode}</p>)}
                        </div>

                        <Button type="submit"
                        //callbackfunc={handleButtonLoginClick}
                        >
                            Sign up
                        </Button>

                        <div className={styles.footer}>
                            <a href={ROUTES.LOGIN}>Sign in</a>
                        </div>
                    </form>
                </section>
            </div>
        </Layout>
    )
}

export default Register
