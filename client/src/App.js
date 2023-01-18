import logo from './logo.svg';
import './App.css';
import ProductsList from './pages/products/ProductsList.js';
import WelcomePage from './pages/welcomePage';
import CreateProduct from './pages/products/CreateProduct';
import EditProduct from './pages/products/EditProduct';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import NavMenu from './pages/NavMenu.js';


function App() {

  
  // const navegate = useNavigate()
  return (
    <div className="App">

      <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route path='/' element={<WelcomePage />} exact></Route>
          <Route path='/products' element={<ProductsList />} exact></Route>
          <Route path='/createproduct' element={<CreateProduct />} exact></Route>
          <Route path='/editproduct/:idproduct' element={<EditProduct />} exact></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
