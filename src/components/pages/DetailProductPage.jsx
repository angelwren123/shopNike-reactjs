import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../Context';
const DetailProductPage = () => {
    const quantityProduct = {
        quantityPrd:1
    }
    const dataContext = useContext(DataContext);
    const [quantity, setQuantity] = useState(quantityProduct)
    const [product, setProduct] = useState([])
    let param = useParams();
    useEffect(() => {
        if (param) {
            let newParam = parseInt(param.id)
            const data = dataContext.dataApi.filter((product, index) => {
                return product.id === newParam
            })
            setProduct(data)
        }
    }, [])
    const changeQuantity = (event) => {
        console.log(event.target.name + ': '+ event.target.value)
        setQuantity({
            ...quantity,
            quantityPrd:event.target.value
        })
    }
    return (
        <>
            {/* <!-- Product section--> */}
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    {
                        product.map((item, index) => (
                            <div className="row gx-4 gx-lg-5 align-items-center" key={index}>
                                <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={require(`../../assets/img/${item.image}`)} alt={item.name} /></div>
                                <div className="col-md-6">
                                    {/* <div className="small mb-1">SKU: BST-498</div> */}
                                    <h1 className="display-5 fw-bolder">{item.name}</h1>
                                    <div className="fs-5 mb-5">
                                        {item.sale_price > 0 ? <><span className="text-decoration-line-through">${item.price}</span><span style={{color: 'red', fontWeight:'bolder'}}>${item.sale_price}</span></> : '' }
                                        {item.sale_price === 0 ? <><span style={{color: 'red', fontWeight:'bolder'}}>${item.price}</span></> : '' }
                                    </div>
                                    <p className="lead">{item.desc}</p>
                                    <div className="d-flex">
                                        <input className="form-control text-center me-3" id="inputQuantity" type="number" name='quantityPrd' onChange={(event)=>changeQuantity(event)} value={quantity.quantityPrd} style={{ maxWidth: 3 + 'rem' }} />
                                        <button className="btn btn-outline-dark flex-shrink-0"
                                            type="button"
                                            onClick={()=>{dataContext.addToCart(item.id,parseInt(quantity.quantityPrd))}} >
                                            <i className="bi-cart-fill me-1"></i>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            {/* <!-- Related items section--> */}

        </>
    )
}

export default DetailProductPage