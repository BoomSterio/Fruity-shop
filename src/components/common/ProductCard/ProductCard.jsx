import React from 'react'
import s from './ProductCard.module.css'
import {useHistory} from 'react-router'
import {Button, IconButton} from '@material-ui/core'
import {DeleteOutlined} from '@material-ui/icons'
import {db} from '../../../firebase'

const ProductCard = (props) => {
    const {id, inStock, imageUrl, name} = props.data
    const history = useHistory()

    const deleteProduct = () => {
        db
            .collection('products')
            .doc(props.id)
            .delete()
            .then(() => {
                window.location.reload()
                alert('Product was successfully deleted!')
            })
    }

    return (
        <div className={s.product}>
            <img onClick={() => history.push(`/product/${id}`)} className={s.image} src={imageUrl} alt={imageUrl}/>
            <div className={s.info}>
                <h3>{name}</h3>
                <p>In Stock: {inStock}</p>
                <div>
                    <Button onClick={() => history.push(`/product/${id}`)} style={{color: 'orange'}}>
                        Details
                    </Button>
                    <IconButton onClick={deleteProduct} size={'small'}><DeleteOutlined color={'error'}/></IconButton>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
