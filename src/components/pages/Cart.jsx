import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { DataContext } from '../Context'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/style.css'
const Cart = () => {
    const dataContext = useContext(DataContext)
    const navigate = useNavigate()
    // const form = {
    //     email: '',
    //     phone: null,
    //     address: ''
    // }
    // const [formValue, setFormValue] = useState(form)
    // const onChangeForm = (e) => {
    //     let name = e.target.name
    //     setFormValue({
    //         ...formValue,
    //         [name]: e.target.value
    //     })
    // }
    // const onSubmitForm = (e) => {
    //     e.preventDefault();
    //     console.log(formValue);
    // }
    useEffect(() => {
        dataContext.getTotal()
    })
    if(dataContext.cart.length>0)
    return (
        <>
            <h1 className="cart_header">CART</h1>

            <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th>Delete</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                dataContext.cart.map((item, index) => (

                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td><img src={require(`../../assets/img/${item.image}`)} style={{ width: 50 + 'px' }} alt="" /></td>
                                        <td>
                                            <button className="btn btn-dark" onClick={() => dataContext.reduction(item.id)} style={{ borderRadius: 100 + '%', paddingRight: 14 + 'px', paddingLeft: 14 + 'px' }} >-</button>
                                            &ensp;<span>  {item.quantity} </span>&ensp;
                                            <button className="btn btn-dark" onClick={() => dataContext.increase(item.id)} style={{ borderRadius: 100 + '%' }}>+</button> </td>
                                        <td>{item.sale_price !== 0 ? <span style={{ color: 'red' }}>${item.sale_price * item.quantity}</span> : <span style={{ color: 'red' }}>${item.price * item.quantity}</span>}</td>
                                        <td><img className='delete_icon' onClick={() => dataContext.remove(item.id)} src={require(`../../assets/img/outline_delete_black_24dp.png`)} style={{ width: 40 + '%' }} alt="" /></td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                    <h4 style={{ float: 'right', color: 'red' }}>Total: ${dataContext.total}</h4>
                    {dataContext.cart.length===0 || !dataContext.cart ? '' : <a className="btn btn-dark" onClick={()=>navigate('/payment')}>PAYMENT</a>}
                    <br />
                    <br />
                </div>
            </div>

        </>
    )
    else return (<h1>NO PRODUCT</h1>)
}

export default Cart
