import React from 'react';
import './SidebarOptions.css';

const SidebarOptions = ({ active, text, Icon, click }) => {
    return (
        <div className={`sidebarOption ${active && "sidebarOption--active"}`}  onClick={click}>
            <Icon />
            <h2>{text}</h2>
        </div>
    );
};

export default SidebarOptions;