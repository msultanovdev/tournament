import Home from "./pages/Home/Home";
import Competitions from "./components/competitions/Competitions";
import Login from "./pages/Login/Login";
import Forms from "./components/form/Forms";
import Choice from "./components/choice/Choice";
import Description from "./components/Description";
import Account from "./pages/Account/Account";
import Participants from "./pages/Participants/Participants";

export const guestRoutes = [
    {
        path: '/',
        element: Home
    },
    {
        path: 'competitions',
        element: Competitions
    },
    {
        path: 'login',
        element: Login
    },
    {
        path: 'form',
        element: Forms
    }
];

export const authRoutes = [
    {
        path: '/',
        element: Home
    },
    {
        path: 'competitions',
        element: Competitions
    },
    {
        path: 'choice',
        element: Choice
    },
    {
        path: 'account',
        element: Account
    },
    {
        path: 'participants',
        element: Participants
    }
];

export const refereeRoutes = [
    {
        path: '/',
        element: Home
    },
    {
        path: 'competitions',
        element: Competitions
    },
    {
        path: 'choice',
        element: Choice
    },
    {
        path: 'description',
        element: Description
    },
    {
        path: 'account',
        element: Account
    },
    {
        path: 'participants',
        element: Participants
    }
];