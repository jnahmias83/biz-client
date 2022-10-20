import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import SignIn from './components/SignIn';
import { ToastContainer} from 'react-toastify'
import About from './components/About';
import SignUp from './components/SignUp';
import NewCard from './components/NewCard';
import MyCards from './components/MyCards';
import AllCards from './components/AllCards';
import EditCard from './components/EditCard';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import { getIsLogged } from "./services/usersService";

function App() {
  const myName: string = "Yonathan Nahmias";

  return (
    <div className="App">
      <ToastContainer/>
       <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/SignIn"/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/newcard" element={<NewCard />} />
           <Route path="/mycards">
            <Route index element={<MyCards />} />   
            <Route path=":id" element={<EditCard />} />
          </Route> 
          <Route path="/allcards" element={<AllCards />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Footer myName={myName} />
    </div>
  );
}

export default App;
