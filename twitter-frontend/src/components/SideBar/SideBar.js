import React from 'react';
import './SideBar.css';
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOptions from '../SidebarOptions/SidebarOptions';
import HomeIcon from "@material-ui/icons/Home";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

const SideBar = (props) => {
    return (
        <div className="sidebar">
            <TwitterIcon className="sidebar__twitterIcon" />
            <SidebarOptions active={props.type === 'Home' ? true : false} Icon={HomeIcon} text="Home" click={() => props.click('Home')} />
            <SidebarOptions active={props.type === 'Profile' ? true : false} Icon={PermIdentityIcon} text="Profile" click={() => props.click('Profile')} />
        </div>
    );

};

export default SideBar;