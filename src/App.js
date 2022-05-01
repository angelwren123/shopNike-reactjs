import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Context from './components/Context'
const App = () => {
    return (
        <>
        <BrowserRouter>
            <Context/>
        </BrowserRouter>
        </>
    )
}
export default App