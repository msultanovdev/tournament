import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar/NavBar";
import {Routes, Route} from "react-router-dom";
import Footer from './components/Footer/Footer';
import { authRoutes, guestRoutes } from './routes';
import { useContext } from 'react';
import { Context } from '.';
import NotFound from './pages/NotFound/NotFound';

function App() {  
  const {store} = useContext(Context);

  return (
    <>
      <NavBar />
      <Routes>
          {store.isAuth ? authRoutes.map((route) => {
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

export default App;
