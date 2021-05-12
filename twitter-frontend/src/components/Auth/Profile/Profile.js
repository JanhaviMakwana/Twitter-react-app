import React, { useState, useEffect } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import './Profile.css';
import { Button } from '@material-ui/core';
import AuthService from '../../../Services/AuthService';
import { withAuth } from '../../../twitter-context'

const Profile = (props) => {

    const [username, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        async function fetchProfileData() {
            const res = await AuthService.getuser(1);
            setUserName(res.data.username);
            setName(res.data.name);
            setImage(res.data.profileImage);
        }
        fetchProfileData();
    }, [])

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const usernameHandler = (event) => {
        setUserName(event.target.value);
    }

    const imageHandler = (event) => {
        const filename = event.target.value.replace(/^.*[\\\/]/, '');
        setImage(filename);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const data = {
            userId: props.userId,
            imgurl: image,
            username: username,
            name: name
        }
        AuthService.editProfile(data)
            .then(res => { props.click('Home'); })
            .catch(err => {
                alert("Failed")
            });

    }

    const src = image ? require(`../../../assets/users/${image}`).default : null;

    return (
        <div className="profile">
            <div className="profileBox">
                <div className="profileBox__header">
                    <img
                        src={src}
                        alt={image}
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