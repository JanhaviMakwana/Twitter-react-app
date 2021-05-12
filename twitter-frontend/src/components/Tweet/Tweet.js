import React, {  useState } from 'react';
import {  Avatar } from '@material-ui/core';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, TwitterIcon, TwitterShareButton, EmailShareButton, WhatsappIcon, EmailIcon } from 'react-share';
import { withAuth } from '../../twitter-context';
import Comment from '../Comment/Comment';
import './Tweet.css';

const Tweet = (props) => {

    const [showComment, setShowComment] = useState(false);

    const addCommentHandler = () => {
        setShowComment(!showComment);
    }
    const name = props.tweet.user.name ? props.tweet.user.name : "User";
    const username = props.tweet.user.username ? props.tweet.user.username : "Anonymous";
    const imageSrc = props.tweet.imageUrl ? require(`../../assets/tweets/${props.tweet.imageUrl}`).default : null;
    const userSrc = props.tweet.user.profileImage !== null ? require(`../../assets/tweets/${props.tweet.user.profileImage}`).default : null;
    return (
        <div>
            <div className="post">
                <div className="post__avatar">
                    <Avatar src={userSrc} />
                </div>
                <div className="post__body">
                    <div className="post__header">
                        <div className="post__headerText">
                            <h3>
                                {name}{" "}
                                <span className="post__headerSpecial">
                                    {true && <VerifiedUserIcon className="post__badge" />}@{username}
                                </span>
                            </h3>
                        </div>
                        <div className="post__headerDescription">
                            <p>{props.tweet.description}</p>
                        </div>

                    </div>
                    {imageSrc !== null && <img className="post__image" src={imageSrc} alt="" />}
                    <div className="post__footer">
                        <ChatBubbleOutlineIcon fontSize="small" onClick={addCommentHandler} />
                        <RepeatIcon fontSize="small" onClick={() => props.onIconClick('Retweet')} />
                        <FavoriteBorderIcon color={props.liked ? "secondary" : "inherit"} fontSize="small" onClick={() => props.onIconClick('Like')} />
                        <div>
                            <TwitterShareButton>
                                <TwitterIcon size={30} round={true} />
                            </TwitterShareButton>
                            <FacebookShareButton >
                                <FacebookIcon size={30} round={true} />
                            </FacebookShareButton>
                            <WhatsappShareButton>
                                <WhatsappIcon size={30} round={true} />
                            </WhatsappShareButton>
                            <EmailShareButton>
                                <EmailIcon size={30} round={true} />
                            </EmailShareButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post__comment">
                {showComment && <Comment onClick={addCommentHandler} tweetId={props.tweet.id} />}
            </div>
        </div>
    )
}



export default withAuth(Tweet);