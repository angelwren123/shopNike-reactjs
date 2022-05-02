import React from 'react'
import {Link} from 'react-router-dom'
import '../../assets/css/style.css'
import banner3 from '../../assets/img/banner3.jpg'
const HomePage = () => {
  return (
    <>
        <h1 className="home_header">HOME</h1>
        <div className="home_banner">
            <img src={banner3} alt="banner" className="img_banner"/>
        </div>
        <hr/>
        <h1 className="slogan">JUST DO IT</h1>
        <h2 className="title">shop early, relax later</h2>
        <p className="content">"Make your May extra easy"</p>
        <div className="d-grid gap-2 col-6 mx-auto">
            <Link  className="btn btn-outline-dark" to="/products">SHOP NOW</Link>
        </div>
        <br/>
        <br/>

    </>
  )
}

export default HomePage