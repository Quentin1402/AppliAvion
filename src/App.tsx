import {BrowserRouter ,Routes , Route} from "react-router-dom"
import './App.css';
import Home from './components/home'
import Vols from "./components/vols";
import Navbar from "./components/navbar";
import Airport from "./components/airport";
import Favori from "./components/Favori";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ < Home />} />
        <Route path="/airport" element={ < Airport />} />
        <Route path="/vols" element={ < Vols />} />
        <Route path="/favori" element={ < Favori />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
