import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import ProductPage from './components/ProductPage/ProductPage'

const App = () => {
    return (
        <div className={'app'}>
            <Sidebar/>
            <Switch>
                <Route exact path={'/'}><HomePage/></Route>
                <Route path={'/product/:id?'}><ProductPage/></Route>
            </Switch>
        </div>
    )
}

const AppWrap = () => {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    )
}

export default AppWrap
