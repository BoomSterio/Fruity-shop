import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core'
import s from './Redactor.module.css'
import {db} from '../../../firebase'

const Redactor = ({docId, id, name, size, weight, imageUrl}) => {
    const [newName, setNewName] = useState(name)
    const [newSize, setNewSize] = useState(size)
    const [newWeight, setNewWeight] = useState(weight)
    const [newImage, setNewImage] = useState(imageUrl)

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

    function submitChangedItem(e) {
        db
            .collection('products')
            .doc(docId)
            .update({'id': id, 'size': newSize, 'imageUrl': newImage, 'name': newName, 'weight': newWeight})
    }

    return (
        <form className={s.redactor} onSubmit={submitChangedItem}>
            <TextField
                style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                value={newName} onChange={handleNameChange}
                label={'New name'}
            />
            <TextField
                style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                value={newSize.width} onChange={handleWidthChange}
                label={'New width'}
            />
            <TextField
                style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                value={newSize.height} onChange={handleHeightChange}
                label={'New height'}
            />
            <TextField
                style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                value={newWeight} onChange={handleWeightChange}
                label={'New weight'}
            />
            <TextField
                style={{marginBottom: '15px'}} size={'small'} variant={'outlined'}
                value={newImage} onChange={handleImageChange}
                label={'New image'}
            />
            <Button type={'submit'} className={s.submitBtn}>Redact product</Button>
        </form>
    )
}

export default Redactor
