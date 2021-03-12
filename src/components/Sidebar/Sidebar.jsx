import React from 'react'
import s from './Sidebar.module.css'
import logo from '../../assets/images/big-logo.png'
import {LocalMallOutlined} from '@material-ui/icons'
import {default as CurrencyFormat} from 'react-currency-format/lib/currency-format'
import {Link, useHistory} from 'react-router-dom'

const Sidebar = () => {
    const history = useHistory()

    return (
        <div className={s.sidebar}>
            <img
                onClick={() => history.push('/')}
                className={s.logo}
                src={logo} alt={'logo'}
            />
            <div className={s.bottom}>
                <LocalMallOutlined style={{fontSize: '30px'}}/>
                <CurrencyFormat
                    decimalScale={2}
                    value={0}
                    displayType={'text'}
                    prefix={'$'}
                    thousandSeparator
                    renderText={(value) => <strong className={s.total}>{value}</strong>}
                />
                <div className={s.toCart}>
                    View my cart
                </div>
            </div>
        </div>
    )
}

export default Sidebar
