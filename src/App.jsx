import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'

const App = () => {
    return (
        <BrowserRouter>
            <div className={'app'}>
                <Sidebar/>
                <Switch>
                    <Route path={'/'}><HomePage/></Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
