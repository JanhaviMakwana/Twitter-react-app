import React, { useState, createContext } from 'react';

const TwitterContext = createContext();

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [likes, setLikes] = useState();
    return (
        <TwitterContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                userId,
                setUserId,
                likes,
                setLikes
            }}>
            {props.children}
        </TwitterContext.Provider>
    );
};

const withAuth = (Child) => (props) => (
    <TwitterContext.Consumer>
        {(context) => <Child {...props} {...context} />}
    </TwitterContext.Consumer>
);

export { AuthProvider, withAuth };