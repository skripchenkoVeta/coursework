import {
    ADMIN_ROUTE,
    DEVICE_EDIT_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE, 
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    REPORT_ONE_ROUTE,
    REPORT_ALL_ROUTE
} from './utils/consts';

import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DrivingSchoolPage from "./pages/DrivingSchoolPage";
import DrivingSchoolPageEdit from "./pages/DrivingSchoolPageEdit";
import Report from "./pages/Report";
import ReportAll from './pages/ReportAll';

export const authRouters = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    
    {
        path: DEVICE_EDIT_ROUTE + '/:id',
        Component: DrivingSchoolPageEdit
    },
    {
        path: REPORT_ONE_ROUTE + '/:id',
        Component: Report
    },
    {
        path: REPORT_ALL_ROUTE,
        Component: ReportAll
    },

];

export const publicRouters = [
   
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DrivingSchoolPage
    },
   
];
