import React, { useState } from 'react';
import { Button, Avatar } from '@material-ui/core';
import { withAuth } from '../../twitter-context';
import TweetService from '../../Services/TweetService';
import './TweetBox.css';

const TweetBox = (props) => {
    const [tweet, setTweet] = useState('');
    const [file, setFile] = useState();
    console.log(props.userId);
    const tweetChangeHandler = (event) => {
        setTweet(event.target.value);
    }
    const imageSelectHandler = (event) => {
        console.log("click");
        const filename = event.target.value.replace(/^.*[\\\/]/, '');
        setFile(filename);
    }

    const tweetSubmitHandler = async (event) => {
        event.preventDefault();
        const data = {
            userId: props.userId,
            description: tweet,
            imageUrl: file
        }
        TweetService.tweet(data).then(res => {
            props.getTweets();
        }).catch(e => {

        })
        setTweet('');
        setFile();

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