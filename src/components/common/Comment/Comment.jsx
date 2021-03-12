import React from 'react'
import s from './Comment.module.css'
import firebase from 'firebase'

const Comment = ({description, date}) => {
    const time = new Date(date.seconds * 1000).toLocaleString()

    return (
        <div className={s.comment}>
            <div className={s.info}>
                <p className={s.time}>{time}</p>
            </div>
            <p className={s.text}>{description}</p>
        </div>
    )
}

export default Comment
