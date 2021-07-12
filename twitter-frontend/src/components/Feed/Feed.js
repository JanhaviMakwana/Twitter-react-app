import React, { useState, useEffect } from 'react';
import './Feed.css';
import Tweet from '../Tweet/Tweet';
import TweetBox from '../TweetBox/TweetBox';
import TweetService from '../../Services/TweetService';
import { SET_ISUPDATING } from '../../store/actionTypes';
import { withAuth } from '../../twitter-context';

const Feed = (props) => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        async function fetchTweets() {
            const res = await TweetService.getAllTweets();
            setTweets(res);
        }
        fetchTweets();
    }, [setTweets])

    const getTweets = async () => {
        const res = await TweetService.getAllTweets();
        setTweets(res);
        props.dispatch({ type: SET_ISUPDATING });
    }

    const iconClickHandler = async (type, id) => {
        if (type === 'Like') {
            TweetService.likeTweet(props.state.user.id, id)
                .then(res => {
                    getTweets();
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (type === 'Retweet') {
            if (window.confirm('Share it?')) {
                const res = await TweetService.getTweetById(id);
                const filename = res.imageUrl.split('/')[3]
                const userId = props.state.user.id;
                const data = {
                    description: res.description,
                    imageUrl: res.imageUrl === null ? '' : filename
                }
                TweetService.retweet(data, userId)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

        } else {

        }

    }

    const arr = tweets.map((tweet, index) => {
        const like = tweet.likes.filter(ob => ob.userId === props.state.user.id);
        return <Tweet key={index} tweet={tweet} onIconClick={(type) => iconClickHandler(type, tweet.id)} liked={like.length !== 0 ? true : false} />
    })
    return (

        <div className="feed">
            <div className="feed_header">
                <h2>Home</h2>
            </div>
            <TweetBox getTweets={getTweets} />
            {arr}
        </div >
    );
};

export default withAuth(Feed);