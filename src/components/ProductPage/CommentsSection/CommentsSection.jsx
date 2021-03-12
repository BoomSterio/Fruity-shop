import React, {useEffect, useState} from 'react'
import s from './CommentsSection.module.css'
import {db} from '../../../firebase'
import Comment from '../../common/Comment/Comment'
import {Button, TextField} from '@material-ui/core'

const CommentsSection = ({productId}) => {
    const [comments, setComments] = useState(null)
    const [newPost, setNewPost] = useState('')

    const fetchInfo = async () => {
        db
            .collection('comments')
            .where('productId', '==', Number(productId))
            .get()
            .then(c => {
                let comms = []
                c.forEach(doc => comms.push(doc.data()))
                comms.sort((a, b) => b.id - a.id)
                setComments(comms)
                console.log(comms)
            })
    }

    const handleChange = (e) => {
        setNewPost(e.target.value)
    }

    const submitPost = () => {
        db
            .collection('comments')
            .add({
                id: new Date().getTime(),
                productId: Number(productId),
                description: newPost,
                date: new Date()
            })
            .then(() => {
                fetchInfo()
            })
        setNewPost('')
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    return (
        <div className={s.section}>
            <TextField
                className={s.input} size={'small'} variant={'outlined'}
                value={newPost} onChange={handleChange}
                label={'New Comment'} multiline rows={3}
            />
            <Button onClick={submitPost} disabled={!newPost} className={s.submitBtn}>Leave comment</Button>
            <div className={s.items}>
                {comments?.map(c => <Comment key={c.id} {...c}/>)}
            </div>
        </div>
    )
}

export default CommentsSection
