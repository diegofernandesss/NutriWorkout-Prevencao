import React, { useContext } from "react";
import { AuthContext } from '../Context/Auth';
import { Navigate } from "react-router-dom";
import { Painel0, Painel1, Painel2, Painel3 } from "../pages";

export const PrivateRoute = ({ panelType }) => {
    const { signed } = useContext(AuthContext);

    const isAllowed = signed && ['0', '1', '2', '3'].includes(panelType);

    return isAllowed ? getPanelComponent(panelType) : <Navigate to="/login" />;
};

const getPanelComponent = (panelType) => {
    switch (panelType) {
        case '0':
            return <Painel0 />;
        case '1':
            return <Painel1 />;
        case '2':
            return <Painel2 />;
        case '3':
            return <Painel3 />;
        default:
            return <Navigate to="/login" />;
    }
};
