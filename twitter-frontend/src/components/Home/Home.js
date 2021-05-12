import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';
import Profile from '../Auth/Profile/Profile';
import './Home.css';
const Home = (props) => {
    const [type, setType] = useState('Home');

    const sidebarClickHandler = (type) => {
        setType(type);
    };

    return (
        <div className="home">
            <SideBar type={type} click={(type) => sidebarClickHandler(type)} />
            { type === 'Home' && <Feed />}
            { type === 'Profile' && <Profile click={(type) => sidebarClickHandler(type)}/>}
            <Widgets />
        </div>
    );
};

export default Home;