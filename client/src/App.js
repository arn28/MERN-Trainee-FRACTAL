import logo from './logo.svg';
import './App.css';
import ProductsList from './pages/products/ProductsList.js';
import WelcomePage from './pages/welcomePage';
import CreateProduct from './pages/products/CreateProduct';
import EditProduct from './pages/products/EditProduct';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <a href="/" className="navbar__pagetitle">BLAZE</a>
        <ul>
          <li><a className="navbar__option" href="/orders">Orders</a></li>
          <li><a className="navbar__option" href="/products">Products</a></li>
        </ul>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage/>} exact></Route>
          <Route path='/products' element={<ProductsList/>} exact></Route>
          <Route path='/createproduct' element={<CreateProduct/>} exact></Route>
          <Route path='/editproduct' element={<EditProduct/>} exact></Route>
        </Routes>
    </BrowserRouter>   
    </div>
    
  );
}

export default App;
