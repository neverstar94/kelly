import { actionUserLogout } from 'core/redux/auth.actions';
import Auth from 'core/services/auth'
import { LogoutWrapper } from 'core/theme/styles/auth.styled';
import { CircularProgress } from 'node_modules/@material-ui/core/index';
import { useRouter } from 'node_modules/next/router';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';


function Logout() {
    const router = useRouter();

    const dispatchAction = useDispatch();
    useEffect(() => {
        Auth.logout()
            .then(() => {

                dispatchAction(actionUserLogout())

                router.push("/");
            });
    }, []);
    return (
        <>

            <LogoutWrapper>
                <CircularProgress size="24px" color="primary" />
                <h1>Please wait... </h1>
                <p>
                    logging out from the system
                </p>
            </LogoutWrapper>
        </>
    )
}

export default Logout;