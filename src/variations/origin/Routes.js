import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AuthenticatedRoute from '../../routes/AuthenticatedRoute';
import UnauthenticatedRoute from '../../routes/UnauthenticatedRoute';
import NotFoundPage from '../../features/notFound/containers/NotFoundPage/NotFoundPage';
import HomePage from '../../features/home/containers/HomePage/HomePage';
import SignInPage from '../../features/auth/containers/SingInPage/SignInPage';
import SignUpPage from '../../features/auth/containers/SignUpPage/SignUpPage';
import DemographicFormPage from '../../features/demographicForm/containers/DemographicFormPage/DemographicFormPage';
import SurveyPage from '../../features/survey/containers/SurveyPage/SurveyPage';
import QuotesPage from '../../features/quotes/containers/QuotesPage/QuotesPage';
import CartPage from '../../features/quotes/containers/CartPage/CartPage';
import PaymentPage from '../../features/payment/containers/PaymentPage/PaymentPage';
import SuccessPage from '../../features/quotes/containers/SuccessPage/SuccessPage';
import ProfileAddress from '../../features/profile/containers/ProfileAddress/ProfileAddress';
import Dashboard from '../../features/profile/containers/Dashboard/Dashboard';
import ProfilePhone from '../../features/profile/containers/ProfilePhone/ProfilePhone';
import ClaimList from '../../features/claim/containers/ClaimList/ClaimList';
import ReportClaim from '../../features/claim/containers/ReportClaim/ReportClaim';
import ProfileContactUs from '../../features/profile/containers/ProfileConactUs/ProfileContactUs';
import PaymentSettings from '../../features/profile/containers/PaymentSettings/PaymentSettings';

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
        <AuthenticatedRoute
            props={childProps}
            component={HomePage}
            exact
            path="/"
        />
        <AuthenticatedRoute
            props={childProps}
            component={Dashboard}
            exact
            path="/profile/dashboard"
        />
        <AuthenticatedRoute
            props={childProps}
            component={ProfileAddress}
            exact
            path="/profile/address"
        />
        <AuthenticatedRoute
            props={childProps}
            component={ProfilePhone}
            exact
            path="/profile/phone"
        />
        <AuthenticatedRoute
            props={childProps}
            component={ProfileContactUs}
            exact
            path="/profile/contact-us"
        />
        <AuthenticatedRoute
            props={childProps}
            component={PaymentSettings}
            exact
            path="/profile/payment"
        />
        <AuthenticatedRoute
            props={childProps}
            component={DemographicFormPage}
            exact
            path="/demographic-form"
        />
        <AuthenticatedRoute
            props={childProps}
            component={SurveyPage}
            exact
            path="/survey"
        />
        <AuthenticatedRoute
            props={childProps}
            component={QuotesPage}
            exact
            path="/quotes"
        />
        <AuthenticatedRoute
            props={childProps}
            component={CartPage}
            exact
            path="/cart"
        />
        <AuthenticatedRoute
            props={childProps}
            component={PaymentPage}
            exact
            path="/purchase-plan"
        />
        <AuthenticatedRoute
            props={childProps}
            component={SuccessPage}
            exact
            path="/success"
        />
        <AuthenticatedRoute
            props={childProps}
            component={ClaimList}
            exact
            path="/claims"
        />
        
        <AuthenticatedRoute
            props={childProps}
            component={ReportClaim}
            exact
            path="/report-claim"
        />
        <Route
            component={NotFoundPage}
        />
    </Switch>;
