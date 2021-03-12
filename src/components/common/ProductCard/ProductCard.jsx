import React, {useState} from 'react'
import s from './ProductCard.module.css'
import {useHistory} from 'react-router'
import {Button, IconButton} from '@material-ui/core'
import {DeleteOutlined} from '@material-ui/icons'
import {db} from '../../../firebase'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

const ProductCard = (props) => {
    const {id, inStock, imageUrl, name} = props.data
    const history = useHistory()
    const [showDialog, setShowDialog] = useState(false)

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
                    <IconButton onClick={() => setShowDialog(true)} size={'small'}><DeleteOutlined color={'error'}/></IconButton>
                    <Dialog
                        open={showDialog}
                        onClose={() => setShowDialog(false)}
                        aria-labelledby="confirm-dialog-title"
                        aria-describedby="confirm-dialog-description"
                    >
                        <DialogTitle id="confirm-dialog-title">{"Product deleting"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="confirm-dialog-description">
                                Confirm product deleting action. You won't be able to undo that action.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowDialog(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={deleteProduct} color="primary" autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
