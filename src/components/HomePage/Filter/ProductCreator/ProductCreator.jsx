import React, {useState} from 'react'
import s from './ProductCreator.module.css'
import {Backdrop, Button, TextField} from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import {db} from '../../../../firebase'

const ProductCreator = ({editMode, handleClose}) => {
    const [newName, setNewName] = useState('')
    const [newSize, setNewSize] = useState({width: 0, height: 0})
    const [newWeight, setNewWeight] = useState(0)
    const [newImage, setNewImage] = useState('')
    const [newStock, setNewStock] = useState(0)

    function handleImageChange(e) {
        setNewImage(e.target.value)
    }

    function handleNameChange(e) {
        setNewName(e.target.value)
    }

    function handleWidthChange(e) {
        setNewSize({...newSize, width: e.target.value})
    }

    function handleHeightChange(e) {
        setNewSize({...newSize, height: e.target.value})
    }

    function handleWeightChange(e) {
        setNewWeight(e.target.value)
    }

    function handleStockChange(e) {
        setNewStock(e.target.value)
    }

    function submitNewItem() {
        db
            .collection('products')
            .doc()
            .set({
                'id': new Date().getTime(),
                'size': newSize,
                'imageUrl': newImage,
                'name': newName,
                'weight': newWeight,
                'inStock': newStock
            })
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={s.modal}
            open={editMode}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={editMode}>
                <form className={s.creator} onSubmit={submitNewItem}>
                    <TextField
                        style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                        value={newName} onChange={handleNameChange}
                        label={'Name'}
                    />
                    <TextField
                        style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                        value={newSize.width} onChange={handleWidthChange} type={'number'}
                        label={'Width'}
                    />
                    <TextField
                        style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                        value={newSize.height} onChange={handleHeightChange} type={'number'}
                        label={'Height'}
                    />
                    <TextField
                        style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                        value={newWeight} onChange={handleWeightChange} type={'number'}
                        label={'Weight'}
                    />
                    <TextField
                        style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                        value={newImage} onChange={handleImageChange}
                        label={'Image'}
                    />
                    <TextField
                        style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                        value={newStock} onChange={handleStockChange}
                        label={'Stock count'}
                    />
                    <Button disabled={!newName || !newImage} type={'submit'} className={s.submitBtn}>Create product</Button>
                </form>
            </Fade>
        </Modal>
    )
}

export default ProductCreator
