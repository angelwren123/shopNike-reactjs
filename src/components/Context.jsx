import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import Footer from './Layouts/Footer'
import Header from './Layouts/Header'
import Routers from './Routers'
import apiCaller from './config/axiosconfig'
export const DataContext = createContext();
const API = axios.create({
    baseURL: `https://fake-api-json-angular-production-56a8.up.railway.app/products`,
})
var products=[]
const Context = () => {
    const [dataApi, setDataApi] = useState([])
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [isSignedIn, setIsSignedIn] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem('user')){
            setIsSignedIn(true)
        }else{
            setIsSignedIn(false)
        }
    },[])

    const loginAndLogout = (value) =>{
        setIsSignedIn(value)
    }
    const dataProducts = async () => {
        await API.get('/')
            .then((res) => {
                // console.log(res.data)
                products=[...res.data]
                setDataApi(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    

    useEffect(() => {
        apiCaller('products','GET',null).then(res=>setDataApi(res.data))
        localStorage.setItem('dataCart',JSON.stringify(cart))
        localStorage.setItem('dataTotal',JSON.stringify(total))  
    }, [cart,total])
    const addToCart = (id,quantity) =>{
        console.log(id, quantity);
        const check = cart.every(item =>{
            return item.id !== id
        })
        if(check){
            const data = dataApi.filter(prod =>{
                return prod.id === id
            })
            if(data){
                data.forEach(item=>{
                    item.quantity=quantity
                })
            }
            setCart([...cart,...data])
            // alert('Added to cart!')
        }else{
            alert('The product has been added to cart!')
        }
    }
    const getTotal = () =>{
        const res = cart.reduce((prev, item)=>{
            if(item.sale_price === 0){
                return prev + (item.price * item.quantity) 
            }else{
                return prev + (item.sale_price * item.quantity) 
            }
        },0)
        setTotal(res)
    }
    const dataCart = JSON.parse(localStorage.getItem('dataCart'));  
    const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
    useEffect(()=>{
      
        if(dataCart !== null){
            setCart(dataCart)
        }
        
        if(dataTotal !== null){
            setTotal(dataTotal)
        }
    },[])
    const increase = id =>{
        const newCart = [...cart];
        newCart.forEach(item => {
            if(item.id===id){
                item.quantity +=1;
            }
        })
        setCart(newCart)
        getTotal()
    }
    const reduction = id =>{
        const newCart = [...cart];
        newCart.forEach(item => {
            if(item.id===id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -=1;
            }
        })
        setCart(newCart)
        getTotal()
    }
    const remove = id =>{
        if(window.confirm('Do you want to delete this product?')){
            const newCart = [...cart]
            cart.forEach((item, index) =>{
                if(item.id === id ){
                    newCart.splice(index,1)
                } 
            })
            setCart(newCart)
            getTotal();
        }
    }
    const sort=(value)=>{
        console.log(value);
        switch(value){
            case 'Default':
                return apiCaller('products','GET',null).then(res=>setDataApi(res.data));
            case 'A-Z':
                return apiCaller('products?_sort=name&_order=asc','GET',null).then(res=>setDataApi(res.data));
            case 'Z-A':
                return apiCaller('products?_sort=name&_order=desc','GET',null).then(res=>setDataApi(res.data));;
            default:
                return;
        }
    }
    const search=(value)=>{
        console.log(value);
        if(!value || value.txtSearch===''|| value.txtSearch===null){
            dataProducts();
        }else{
            apiCaller('products','GET',null).then(res=>{
                setDataApi(
                    res.data.filter((product, index)=>{
                        return product.name.toLowerCase().indexOf(value)!==-1
                    })
                )
            });
        }
    }

    const value = {
        dataApi,
        addToCart,
        cart,setCart,
        total,getTotal,
        increase,
        reduction,
        remove,
        isSignedIn,
        loginAndLogout,
        sort,search
    }
  return (
    <>
            <DataContext.Provider value={value}>
                <Header />
                <Routers />
                <Footer />
            </DataContext.Provider>
    </>
  )
}

export default Context