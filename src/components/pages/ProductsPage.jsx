import React, { useState } from 'react'
import { useContext } from 'react';
import { DataContext } from '../Context';
import { useNavigate } from "react-router-dom";
import DetailProductPage from './DetailProductPage';
const ProductsPage = () => {
    const dataContext = useContext(DataContext)
    const sort = {
        sortBy:'Default'
    }
    const search={
        txtSearch:''
    }
    const [sortBy] = useState(sort)
    const handleSort =(event)=>{
        // console.log(event.target.value);
        dataContext.sort(event.target.value)
    }
    const [searchBy, setSearchBy] = useState(search)
    const handleSearch =(event)=>{
        setSearchBy(event.target.value);
        
    }
    const handleSubmitSearch = (e)=>{
        dataContext.search(searchBy)
        e.preventDefault()
    }
    let navigate = useNavigate();
    const viewDetail = (product) =>{
        console.log(product);
        
        navigate(`/product/${product.id}`)
    }
    return (
        <>
            <div className='container'>
                <h1 className="products_header">PRODUCTS</h1>
                <div className="row">
                    <div className="col-md-2">
                        <select className="form-select"
                         aria-label="Default select example"
                         name='sortBy'
                         value={sortBy.by}
                         onChange={(event)=>handleSort(event)}>
                        <option value={'Default'}>Default</option>
                        <option value={'A-Z'}>Name: A - Z</option>
                        <option value={'Z-A'}>Name: Z - A</option>
                        
                        </select>
                    </div>
                    <div className="col-md-7"></div>
                    <div className="col-md-3">
                        <form className="d-flex"  onSubmit={(e)=>handleSubmitSearch(e)} >
                        <input className="form-control me-2"
                        type="search" placeholder="Search"
                        aria-label="Search"
                        name="txtSearch"
                        value={searchBy.txtSearch}
                        onChange={(event)=>handleSearch(event)} />
                            <button className="btn btn-outline-success" type="submit" >Search</button>
                        </form>
                    </div>
                </div >
            </div>
            {/* <!-- Section--> */}
            <section className="py-5" >
                <div className="container px-4 px-lg-5 mt-0">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {dataContext.dataApi.map((product, index) => (
                            <div className="col mb-5" key={index} >
                                <div className="card h-100" >
                                    {/* <!-- Sale badge--> */}
                                    {product.sale_price ? <div className="badge bg-dark text-white position-absolute" style={{ top: 0.5 + 'rem' }}>SALE</div> : ''}
                                    {/* <!-- Product image--> */}
                                    <img className="card-img-top" src={require(`../../assets/img/${product.image}`)} alt={product.name} />
                                    {/* <!-- Product details--> */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* <!-- Product name--> */}
                                            <h5 className="fw-bolder">{product.name}</h5>
                                            {/* <!-- Product reviews--> */}
                                            {/* <div className="d-flex justify-content-center small text-warning mb-2">
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                        </div> */}
                                            {/* <!-- Product price--> */}
                                            {product.sale_price > 0 ? <><span className="text-muted text-decoration-line-through">${product.price}</span><span style={{ color: 'red', fontWeight: 'bolder' }}>${product.sale_price}</span></> : ''}
                                            {product.sale_price === 0 ? <><span style={{ color: 'red', fontWeight: 'bolder' }}>${product.price}</span></> : ''}
                                        </div>
                                    </div>
                                    {/* <!-- Product actions--> */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><button className="btn btn-outline-dark mt-auto" onClick={() =>viewDetail(product)}>Detail</button></div>
                                    </div>
                                </div>
                            </div>
                        ))}
    
                    </div>
                </div>
            </section >
        </>
    )
}

export default ProductsPage