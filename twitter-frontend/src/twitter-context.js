import React, { createContext, useReducer } from 'react';
import reducer, { initialState } from './store/reducer/auth';

const TwitterContext = createContext();

const AuthProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TwitterContext.Provider
            value={{
                state,
                dispatch
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