import { ROLE_KEYS } from '@/constants/app.constants';
import { useAppSelector } from '@/redux/reduxHook';
import React, { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children, allowedRoles }: { allowedRoles: string[] } & ProtectedRouteProps) => {
    const { user, isSignedIn, role } = useAppSelector((state) => state.authState);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || isSignedIn === false || role === null) navigate("/signin", { replace: true });
        else if (!allowedRoles.includes(role)) navigate("/", { replace: true })
    }, [navigate, user])

    return children;
}
export default ProtectedRoute