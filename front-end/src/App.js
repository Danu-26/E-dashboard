import './App.css';
import Nav from './components/Nav';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
           <Routes>
            <Route element={<PrivateComponent/>}>
            <Route path="/" element={<h1>Product </h1>}> </Route>
            <Route path="/add" element={<h1>Add Product </h1>}> </Route>
            <Route path="/update" element={<h1>Update Product </h1>}> </Route>
            <Route path="/logout" element={<h1> Logout </h1>}> </Route>
            <Route path="/profile" element={<h1>Profile </h1>}> </Route>
            </Route>
            <Route path="/signup" element={<Signup/>}> </Route>
            <Route path="/login" element={<Login/>}> </Route>
           </Routes>
  
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
