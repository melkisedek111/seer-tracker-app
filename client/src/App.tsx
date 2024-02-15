import './App.css'
import ThemedApp from './ThemedApp'
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import UserPage from './components/UserPage';
import * as Spotlight from '@spotlightjs/spotlight';
import { Toaster } from "@/components/ui/toaster"
import Loading from "./assets/loading.svg";
import SignInPage from './components/SignInPage';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoadingSection from './components/LoadingSection';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './constants/app.constants';
import { useAppDispatch, useAppSelector } from './redux/reduxHook';
import { useEffect } from 'react';
import { setRedirectUnauthorizeToDashboard } from './redux/features/global/globalSlice';
import ProtectedSettingPage from './components/SettingsPage';
import RequestPage from './components/RequestPage';
import DesignationPage from './components/DesignationPage';


// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Navbar />,
//         errorElement: <div>Error</div>,
//         children: [
//             {
//                 path: "",
//                 element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.REGULAR]}>
//                     <Dashboard />
//                 </ProtectedRoute>
//             },
//             {
//                 path: "requests",
//                 element:
//                     <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.REGULAR]}>
//                         <RequestSection />
//                     </ProtectedRoute>
//             },
//             {
//                 path: "services",
//                 element: <div>Services</div>
//             },
//             {
//                 path: "users",
//                 element: <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
//                     <UserSection />
//                 </ProtectedRoute>
//             },
//             {
//                 path: "settings",
//                 element: <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
//                     <SettingsPage />
//                 </ProtectedRoute>
//             },
//         ]
//     },
//     {
//         path: "/signin",
//         element: <SignInPage />
//     }
// ])

function App() {
    const { isRedirectUnauthorizeToDashboard } = useAppSelector((state) => state.globalState)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isRedirectUnauthorizeToDashboard) {
            navigate("/", { replace: true });

            dispatch(setRedirectUnauthorizeToDashboard({ isRedirectUnauthorizeToDashboard: false }));
        }
    }, [isRedirectUnauthorizeToDashboard]);


    return (
        <ThemedApp>
            <div className="relative flex min-h-screen flex-col bg-background">
                {/* <RouterProvider router={router} /> */}
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route path="" element={
                            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.REGULAR]}>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="requests" element={
                            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.REGULAR]}>
                                <RequestPage />
                            </ProtectedRoute>
                        } />
                        <Route path="users" element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                                <UserPage />
                            </ProtectedRoute>
                        } />
                        <Route path="settings" element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                                <ProtectedSettingPage />
                            </ProtectedRoute>
                        } />
                        <Route path="designations" element={
                            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
                                <DesignationPage />
                            </ProtectedRoute>
                        } />
                    </Route>
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="*" element={<div>ERROR</div>} />
                </Routes>
            </div>
            <LoadingSection />
        </ThemedApp>
    )
}

export default App



