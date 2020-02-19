import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    // We also pass in the current path to the login page (redirect in the querystring).
    // We will use this later to redirect us back after the user logs in.
    return (
        <Route
            {...rest}
            render={props =>
                appProps.isAuthenticated
                    ? <C {...props} {...appProps} />
                    : <Redirect
                        to={`/login?redirect=${props.location.pathname}${props.location.search}`}
                    />}
        />
    );

}
