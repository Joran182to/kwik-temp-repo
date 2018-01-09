import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthenticatedRoute = ({component: C, props: cProps, ...rest}) => {
    const route = props =>
        cProps.isLoggedIn
            ? <C {...props} {...cProps} />
            : <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`}/>;
    
    return <Route {...rest} render={route} />;
};

export default AuthenticatedRoute;