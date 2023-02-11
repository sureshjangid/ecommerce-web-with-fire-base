import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter , Switch , Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Addproduct from './components/Addproduct';
import Cart from './components/Cart';
import Footer from './components/Footer';


function App() {
  return (
    <>

    <BrowserRouter>
            
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/addproduct" component={Addproduct}/>
        <Route exact path="/cart" component={Cart}/>
      
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
