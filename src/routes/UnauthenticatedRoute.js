import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {queryString} from '../helpers/url';

const UnauthenticatedRoute = ({component: C, props: cProps, ...rest}) => {
    const redirect = queryString('redirect');
    const route = props =>
        !cProps.isLoggedIn
            ? <C {...props} {...cProps} />
            : <Redirect to={redirect ? redirect : '/'} />;
    
    return (
        <Route {...rest} render={route} />
    );
};

export default UnauthenticatedRoute;