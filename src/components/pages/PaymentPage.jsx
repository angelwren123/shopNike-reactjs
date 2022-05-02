import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { DataContext } from '../Context'
import TextField from '../Layouts/TextField';
import * as Yup from 'yup';
var FileSaver = require('file-saver');

const PaymentPage = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [bill, setBill] = useState([])
    const navigate = useNavigate()
    const dataContext = useContext(DataContext)
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
    useEffect(()=>{
        setBill(JSON.parse(localStorage.getItem('dataCart')))
        dataContext.getTotal()
    },[])

    return (
        <Formik
            initialValues={{
                email: '',
                phone: '',
                address: ''
            }}
            validationSchema={validate}
            onSubmit={values => {
                var infoBill = [];
                infoBill = [values, ...dataContext.cart]
                // console.log(infoBill);
                var file = new File([
                    `   Email:  ${infoBill[0].email},
                        Phone:  ${infoBill[0].phone},
                        Address:  ${infoBill[0].address},
                        Products:==>  ${dataContext.cart.map(item => {
                       return ` 
                        Name: ${item.name} x ${item.quantity}`
                    })},
                        Total price: $${dataContext.total}`
                ], "Bill.txt", {type: "txt/plain;charset=utf-8"});
                if(window.confirm('Do you want print your bill?')){
                    alert('Thank you for purchasing our products :D !')
                    FileSaver.saveAs(file);
                    localStorage.removeItem('dataCart')
                    dataContext.setCart([])
                    navigate ('/products')
                }else{
                    alert('Thank you for purchasing our products :D !')
                    localStorage.removeItem('dataCart')
                    dataContext.setCart([])
                    navigate ('/products')
                }
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
                        </div >
                        <div className="col-md-7">
                            <h1>Hóa đơn</h1>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bill.map((item,index)=>(
                                            <tr>
                                            <td scope="row">{item.name}</td>
                                            <td><img src={require(`../../assets/img/${item.image}`)} style={{ width: 50 + 'px' }} alt="" /></td>
                                            <td>{item.quantity}</td>
                                            <td>{item.sale_price !== 0 ? <span style={{ color: 'red' }}>${item.sale_price * item.quantity}</span> : <span style={{ color: 'red' }}>${item.price * item.quantity}</span>}</td>

                                        </tr>
                                        ))}
                                    </tbody>
                                    
                                </table>
                                <h3 style={{float:'right'}}>Total: ${dataContext.total}</h3>
                            
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default PaymentPage