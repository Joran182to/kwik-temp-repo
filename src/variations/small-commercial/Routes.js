import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AuthenticatedRoute from '../../routes/AuthenticatedRoute';
import UnauthenticatedRoute from '../../routes/UnauthenticatedRoute';
import SignInPage from '../../features/auth/containers/SingInPage/SignInPage';
import SignUpPage from '../../features/auth/containers/SignUpPage/SignUpPage';
import NotFoundPage from '../../features/notFound/containers/NotFoundPage/NotFoundPage';
import LandingPage from './features/landing/containers/LandingPage/LandingPage';
import ProfilePage from './features/profile/containers/ProfilePage/ProfilePage';
import ReportClaimPage from './features/claim/containers/ReportClaimPage/ReportClaimPage';
import RecommendationsPage from './features/recommendations/containers/RecommendationPage/RecommendationsPage';

export default ({childProps}) =>
    <Switch>
        <UnauthenticatedRoute
            props={childProps}
            component={SignInPage}
            exact
            path="/login/"
        />
        <UnauthenticatedRoute
            props={childProps}
            component={SignUpPage}
            exact
            path="/signup/"
        />
        <UnauthenticatedRoute
            props={childProps}
            component={LandingPage}
            exact
            path="/"
        />
        <AuthenticatedRoute
            props={childProps}
            component={ProfilePage}
            exact
            path="/profile"
        />
        <AuthenticatedRoute
            props={childProps}
            component={RecommendationsPage}
            exact
            path="/recommendations"
        />
        <AuthenticatedRoute
            props={childProps}
            component={ReportClaimPage}
            exact
            path="/report-claim"
        />
        <Route
            component={NotFoundPage}
        />
    </Switch>;
