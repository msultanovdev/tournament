import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Forms from "./components/form/Forms";
import Choice from "./components/Choice/Choice";
import Description from "./components/Description";
import Account from "./pages/Account/Account";
import Participants from "./pages/Participants/Participants";
import Competitions from "./pages/Сompetitions/Сompetitions";
import Players from "./pages/Players/Players";
import Schedule from "./pages/Schedule/Schedule";

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
        path: 'account',
        element: Account
    },
    {
        path: 'choice/players',
        element: Players
    },
    {
        path: 'choice',
        element: Choice
    },
    {
        path: 'choice/schedule',
        element: Schedule
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
    },
    {
        path: 'choice',
        element: Choice
    },
    {
        path: 'choice/players',
        element: Players
    },
    {
        path: 'choice/schedule',
        element: Schedule
    }
];
