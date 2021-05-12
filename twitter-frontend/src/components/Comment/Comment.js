import React, { useState } from 'react';
import TweetService from '../../Services/TweetService';
import { withAuth } from '../../twitter-context';
import './Comment.css';

const Comment = (props) => {

    const [comment, setComment] = useState('');

    const commentChangeHandler = (event) => {
        setComment(event.target.value);
    }

    const commentPostHandler = async (event) => {
        event.preventDefault();
        props.onClick();
        const data = {
            userId: props.userId,
            tweetId: props.tweetId,
            comment: comment
        }
        TweetService.postComment(data).then(res => {}).catch(err => {});
    }

    return (
        <form onSubmit={commentPostHandler}>
            <div className="post__commentBox">
                <input
                    placeholder="write ...."
                    type="text"
                    value={comment}
                    onChange={commentChangeHandler}
                />
            </div>
        </form >
    );
};

export default withAuth(Comment);
