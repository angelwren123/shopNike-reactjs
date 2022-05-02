import React,{useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { DataContext } from './Context';


const ProtectedRouters = () => {
    const dataContext = useContext(DataContext)
    const useAuth = () => {
        const user = { loggedIn: dataContext.isSignedIn };
        return user && user.loggedIn
    }
    
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to={'/'}/>

  
}

export default ProtectedRouters