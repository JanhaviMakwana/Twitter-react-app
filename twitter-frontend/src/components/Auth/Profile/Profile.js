import React, { useState, useEffect } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import './Profile.css';
import { Button } from '@material-ui/core';
import AuthService from '../../../Services/AuthService';
import { withAuth } from '../../../twitter-context';
import FormData from 'form-data';

const Profile = (props) => {
    console.log(props.state.user);
    const [user, setUser] = useState([]);
    const [username, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        const userId = props.state.user.id;
        const fetchUserProfile = async () => {
            const user = await AuthService.getUserProfile(userId)
                .then(res => {
                    setUser(res);
                    setUserName(res.username);
                    setImage(res.profileImageUrl);
                    setName(res.name);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        fetchUserProfile();
        // eslint-disable-next-line
    }, [])

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const usernameHandler = (event) => {
        setUserName(event.target.value);
    }

    const imageHandler = (event) => {
        setImage(event.target.files[0]);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const data = {
            username: username,
            name: name
        }
        AuthService.editProfile(props.state.user.id, data)
            .then(res => {
                if (image != null && typeof image === 'object') {
                    const imageData = new FormData();
                    imageData.append('image', image);
                    AuthService.updateProfileImage(props.state.user.id, imageData)
                        .then(res => {
                            props.click('Home');
                        }).catch(err => {
                            console.log(err);
                        });
                } else {
                    props.click('Home');
                }

            })
            .catch(err => {
                console.log(err.message);
                alert("Failed")
            });
    }

    return (
        <div className="profile">
            <div className="profileBox">
                <div className="profileBox__header">
                    <img
                        src={user.profileImageUrl !== null ? user.profileImageUrl : null}
                        alt="user"
                        style={{ height: '70px', width: '70px', borderRadius: '50px', margin: '5px auto' }}
                    />
                    <div className="profileBox__imageSelect">
                        <CreateIcon fontSize="small" />
                        <input
                            type="file"
                            onChange={imageHandler}
                            style={{ width: '180px' }}
                        />
                    </div>
                </div>
                <div className="profileBox__body">
                    <input
                        type="text"
                        placeholder="First name"
                        value={name}
                        onChange={nameHandler}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={usernameHandler}
                    />
                    <Button
                        style={{ fontWeight: 'bold' }}
                        variant="contained"
                        color="primary"
                        onClick={formSubmitHandler}
                    >
                        Save
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default withAuth(Profile);