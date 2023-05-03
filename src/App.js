import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar/NavBar";
import Forms from "./components/form/Forms";
import {Routes, Route} from "react-router-dom";
import NotFound from "./components/NotFound";
import Description from "./components/Description";
import Competitions from "./components/competitions/Competitions";
import Choice from "./components/choice/Choice";
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar/>}>
          <Route index element={<Home/>}/>
          <Route path="description" element={<Description/>}/>
          <Route path="competitions" element={<Competitions/>}/>
          <Route path="form" element={<Forms/>}/>
          <Route path="choice" element={<Choice/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
