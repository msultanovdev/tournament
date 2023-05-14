import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar/NavBar";
import {Routes, Route} from "react-router-dom";
import Footer from './components/Footer/Footer';
import { authRoutes, guestRoutes, refereeRoutes } from './routes';
import { useContext } from 'react';
import { Context } from '.';
import NotFound from './pages/NotFound/NotFound';
import {observer} from "mobx-react-lite";

function App () {  
  const {store} = useContext(Context);

  return (
    <>
      <NavBar />
      <Routes>
          {(store.role === 'Referee' || store.role === 'Admin') ? refereeRoutes.map((route) => {
            return <Route key={route.path} exact path={route.path} element={<route.element />} />
          }) : store.isAuth ? authRoutes.map((route) => {
            return <Route key={route.path} exact path={route.path} element={<route.element />} />
          }) : guestRoutes.map((route) => {
            return <Route key={route.path} exact path={route.path} element={<route.element />} />
          })}
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default observer(App);
