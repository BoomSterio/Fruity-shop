import React, {useState} from 'react'
import s from './Filter.module.css'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import {SearchOutlined} from '@material-ui/icons'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {Button, FormControl} from '@material-ui/core'
import RadioGroup from '@material-ui/core/RadioGroup'
import ProductCreator from './ProductCreator/ProductCreator'

const Filter = ({sortBy, handleSortChange}) => {
    const [editMode, setEditMode] = useState(false)

    const openModal = () => {
        setEditMode(true)
    }

    const closeModal = () => {
        setEditMode(false)
    }

    return (
        <div className={s.filter}>
            <Paper component="form" className={s.search}>
                <InputBase
                    className={s.input}
                    placeholder="Search Products"
                    inputProps={{'aria-label': 'search'}}
                />
                <IconButton type="submit" className={s.iconButton} aria-label="search">
                    <SearchOutlined/>
                </IconButton>
            </Paper>
            <div>
                <h3>Sort By:</h3>
                <FormControl>
                    <RadioGroup value={sortBy} onChange={handleSortChange}>
                        <FormControlLabel value="name" control={<Radio/>} label="Name"/>
                        <FormControlLabel value="quantity" control={<Radio/>} label="Quantity"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <Button color={'secondary'} onClick={openModal}>Create new Product</Button>
            <ProductCreator editMode={editMode} handleClose={closeModal}/>
        </div>
    )
}

export default Filter
