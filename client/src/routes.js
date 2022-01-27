//ALL ROUTES IN THE APP
import {ADMIN_ROUTE, CAR_ROUTE, JADE_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Admin from "./pages/Admin";
import Order from "./pages/Order";
import Jade from "./pages/Jade";
import CarPage from "./pages/CarPage";
import Auth from "./pages/Auth";

export const authRoutes = [                             //ROUTS FOR AUTHORIZED USERS
    {
        path: ADMIN_ROUTE,             //ADMIN-PANEL
        Component: Admin
    }
]

export const publicRoutes = [                            //ROUTS FOR NON-AUTHORIZED USERS
    {
        path: JADE_ROUTE,              //MAIN-PAGE
        Component: Jade
    },
    {
        path: LOGIN_ROUTE,             //LOGIN-PAGE
        Component: Auth
    },

    {
        path: REGISTRATION_ROUTE,       //REGISTRATION-PAGE
        Component: Auth
    },
    {
        path: ORDER_ROUTE,               //ORDER-PAGE
        Component: Order
    },
    {
        path: CAR_ROUTE + '/:id',         //CAR-PAGE (ex: host/car/3, where 3 - car id)
        Component: CarPage
    },
]