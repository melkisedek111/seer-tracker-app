import { useAppSelector } from '@/redux/reduxHook';
import React, { ComponentType, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from "../assets/loading.svg";
import { ALLOWED_PAGE_BY_ROLE } from '@/constants/app.constants';

const WithAuthenticate = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const withAuthenticate = (props: any): React.ReactNode => {
        const { user, isSignedIn, role } = useAppSelector((state) => state.authState);
        const navigate = useNavigate();
        const [isLoadingComponent, setIsLoadingComponent] = useState<boolean>(true);
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
        const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
        const location = useLocation();

        useEffect(() => {
            try {
                if (user !== null && isSignedIn === true && role !== null) {
                    if(ALLOWED_PAGE_BY_ROLE[role].includes(location.pathname)){
                        setTimeout(() => {
                            setIsAuthenticated(true);
                            setIsAuthorized(true);
                            setIsLoadingComponent(false);
                        }, 1500)
                    } else {
                        setTimeout(() => {
                            setIsLoadingComponent(false);
                        }, 1500)
                    }
                }
            } catch (error) {
                setIsLoadingComponent(false);
                setIsAuthenticated(false);
            }
        }, [])

        if (isLoadingComponent) {
            return <div className="h-screen flex items-center justify-center">
                <img src={Loading} alt="loading" />
            </div>
        }

        if(isAuthenticated && isAuthorized) {
            return <WrappedComponent {...props as P} />; 
        }

        if(!isAuthenticated) {
            navigate("/signin", { replace: true });
            return;
        }

        if(!isAuthorized) {
            navigate("/", { replace: true });
            return;
        }
    }

    return withAuthenticate;
}

export default WithAuthenticate