import React, { useState } from 'react';
import { Button, Avatar } from '@material-ui/core';
import { withAuth } from '../../twitter-context';
import TweetService from '../../Services/TweetService';
import FormData from 'form-data';
import './TweetBox.css';

const TweetBox = (props) => {
    const [tweet, setTweet] = useState('');
    const [image, setImage] = useState(null);
    const tweetChangeHandler = (event) => {
        setTweet(event.target.value);
    }
    const imageSelectHandler = (event) => {
        setImage(event.target.files[0]);
    }

    const tweetSubmitHandler = async (event) => {
        event.preventDefault();
        const data = {
            description: tweet
        }
        TweetService.postTweet(data, props.state.user.id).then(res => {
            if (image != null) {
                const imageData = new FormData();
                imageData.append('image', image);
                TweetService.uploadTweetImage(imageData, res.id)
                    .then(imageRes => {
                        props.getTweets();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                props.getTweets();
            }

        }).catch(e => {

        })
        setTweet('');
        setImage();

    };

    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
                    <input
                        onChange={tweetChangeHandler}
                        value={tweet}
                        placeholder="What's happening?"
                        type="text"
                    />
                </div>
                <div className="tweetBox__section2">
                    <div className="tweetBox__imageInput">
                        <input
                            type="file"
                            onChange={imageSelectHandler}
                            placeholder="Optional: Enter image URL"
                        />
                    </div>
                    <Button
                        onClick={tweetSubmitHandler}
                        type="submit"
                        className="tweetBox__tweetButton"
                    >
                        Tweet
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default withAuth(TweetBox);