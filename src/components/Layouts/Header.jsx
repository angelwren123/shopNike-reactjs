import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { DataContext } from '../Context'
import '../../assets/css/style.css'
const Header = () => {
    const dataContext = useContext(DataContext)
    const [dataUser, setDataUser] = useState({})
    // const [isUser, setIsUser] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem('user')){
            setDataUser({
               name: JSON.parse(localStorage.getItem('user')).name,
               avt: JSON.parse(localStorage.getItem('user')).imageUrl
            })
        }else{
            setDataUser({
                name: '',
                avt: ''
            })
        }
    },[])
    const responseGoogle = (res) => {
        console.log(res);
        if (res.profileObj) {
            localStorage.setItem('user', JSON.stringify(res.profileObj))
            setDataUser({
                name: res.profileObj.name,
                avt: res.profileObj.imageUrl
            })
            dataContext.loginAndLogout(true)
        } else {
            setDataUser({
                name: '',
                avt: ''
            })
            dataContext.loginAndLogout(false)
        }
    }
    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('dataCart')
        dataContext.setCart([])
        setDataUser({
            name: '',
            avt: ''
        })
        dataContext.loginAndLogout(false)
    }

    return (

        <>
            {/* <!-- Navigation--> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light header__custom">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" to="/">NIKE</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">HOME</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/products">PRODUCTS</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/contact">CONTACT</Link></li>

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#!">All Products</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                                    <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                                </ul>
                            </li> */}
                        </ul>
                        <div>
                            {
                                dataUser ? 
                                (<div style={{marginRight: 15+'px'}}>
                                    <img src={dataUser.avt} alt='' style={{width: 30 + 'px', borderRadius:100+'%', marginRight: 10 +'px'}} />
                                    <span style={{color:'red',fontWeight:'bolder'}}>{dataUser.name}</span>
                                </div>) : ''
                            }
                        </div>
                        <div style={{ marginRight: 5 + 'px' }}>
                            {!dataContext.isSignedIn && (
                                <GoogleLogin
                                    clientId='826621306945-koaipor6v3p5b0obuobuftqhvsmbr3cj.apps.googleusercontent.com'
                                    buttonText='Login'
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"}>
                                </GoogleLogin>
                            )}
                            {dataContext.isSignedIn &&
                                (<GoogleLogout
                                    clientId='826621306945-koaipor6v3p5b0obuobuftqhvsmbr3cj.apps.googleusercontent.com'
                                    buttonText='Logout'
                                    onLogoutSuccess={logout}
                                >
                                </GoogleLogout>)
                            }
                        </div>

                        <form className="d-flex">
                            <Link className="btn btn-outline-dark" type="submit" to={'/cart'} >
                                <i className="bi-cart-fill me-1"></i>
                                Cart
                                <span className="badge bg-dark text-white ms-1 rounded-pill">{dataContext.cart.length}</span>
                            </Link>
                        </form>

                    </div>
                </div>
            </nav>
            {/* <!-- Header--> */}
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">With this shop homepage template</p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header