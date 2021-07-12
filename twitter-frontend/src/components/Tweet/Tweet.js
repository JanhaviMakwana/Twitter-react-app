import React, { useState} from 'react';
import { Avatar } from '@material-ui/core';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, TwitterIcon, TwitterShareButton, EmailShareButton, WhatsappIcon, EmailIcon } from 'react-share';
import { withAuth } from '../../twitter-context';
import Comment from '../Comment/Comment';
import './Tweet.css';

const shareButtonProps = {
    url: 'http://localhost:3000/home'
}

const Tweet = (props) => {
    const [showComment, setShowComment] = useState(false);
    const { tweet } = props;
    const addCommentHandler = () => {
        setShowComment(!showComment);
    }


    const name = tweet.user.name ? tweet.user.name : "User";
    const username = tweet.user.username ? tweet.user.username : "Anonymous";

    return (
        <div>
            <div className="post">
                <div className="post__avatar">
                    <Avatar src={tweet.user.profileImageUrl ? tweet.user.profileImageUrl : null} />
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
                            <p>{tweet.description}</p>
                        </div>

                    </div>
                    {tweet.imageUrl && <img className="post__image" src={tweet.imageUrl} alt={tweet.description} />}
                    <div className="post__footer">
                        <ChatBubbleOutlineIcon fontSize="small" onClick={addCommentHandler} />
                        <RepeatIcon fontSize="small" onClick={() => props.onIconClick('Retweet')} />
                        <FavoriteBorderIcon color={props.liked ? "secondary" : "inherit"} fontSize="small" onClick={() => props.onIconClick('Like')} />
                        <div>
                            <TwitterShareButton {...shareButtonProps}>
                                <TwitterIcon size={30} round={true} />
                            </TwitterShareButton>
                            <FacebookShareButton {...shareButtonProps}>
                                <FacebookIcon size={30} round={true} />
                            </FacebookShareButton>
                            <WhatsappShareButton {...shareButtonProps}>
                                <WhatsappIcon size={30} round={true} />
                            </WhatsappShareButton>
                            <EmailShareButton {...shareButtonProps}>
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