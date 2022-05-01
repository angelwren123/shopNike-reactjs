import React from 'react';
import { Formik, Form } from 'formik';
import TextField from '../Layouts/TextField';
import * as Yup from 'yup';
const PaymentPage = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Required'),
        address: Yup.string()
            // .max(20, 'Must be 20 characters or less')
            .required('Required'),
        // password: Yup.string()
        //   .min(6, 'Password must be at least 6 charaters')
        //   .required('Password is required'),
        // confirmPassword: Yup.string()
        //   .oneOf([Yup.ref('password'), null], 'Password must match')
        //   .required('Confirm password is required'),
    })
    return (
        <Formik
            initialValues={{
                email: '',
                phone: '',
                address: ''
            }}
            validationSchema={validate}
            onSubmit={values => {
                console.log(values)
            }}
        >
            {formik => (
                <div className='container'>
                    <h1 className="my-4 font-weight-bold .display-4">PAYMENT</h1>
                    <div className="row">
                        <div className="col-md-5">
                            <Form>
                                <TextField
                                    label="Email" name="email" type="email"
                                />
                                <TextField
                                    label="Phone" name="phone" type="number"
                                />
                                <TextField
                                    label="Address" name="address" type="text"
                                />
                                <button className="btn btn-dark mt-3" type="submit">PAY</button>
                                <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                                <br/>
                                <br/>
                            </Form>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default PaymentPage