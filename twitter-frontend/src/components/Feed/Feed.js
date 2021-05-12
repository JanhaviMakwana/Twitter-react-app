import React, { useState, useEffect } from 'react';
import './Feed.css';
import Tweet from '../Tweet/Tweet';
import TweetBox from '../TweetBox/TweetBox';
import TweetService from '../../Services/TweetService';
import { withAuth } from '../../twitter-context';

const Feed = (props) => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        async function fetchTweets() {
            const res = await TweetService.getTweets();
            setTweets(res.data);
        }
        fetchTweets();
    }, [setTweets])

    const getTweets = async () => {
        const res = await TweetService.getTweets();
        setTweets(res.data);
    }

    const iconClickHandler = async (type, id) => {
        if (type === 'Like') {
            const data = {
                userId: props.userId,
                tweetId: id
            }
            TweetService.getLike(data).then(res => { }).catch(err => { });
        } else if (type === 'Retweet') {
            if (window.confirm('Share it?')) {
                const res = await TweetService.getTweetById(id);
                const data = {
                    userId: props.userId,
                    description: res.data.description,
                    imageUrl: res.data.imageUrl === null ? '' : res.data.imageUrl
                }
                TweetService.tweet(data).then(res => { }).catch(err => { });
            }

        } else {

        }
        getTweets();
    }

    const arr = tweets.map((tweet, index) => {
        const like = tweet.likes.filter(ob => ob.userId === props.userId);
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