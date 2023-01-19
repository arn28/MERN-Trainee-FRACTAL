import './App.css';
import ProductsList from './pages/products/ProductsList.js';
import WelcomePage from './pages/welcomePage';
import CreateProduct from './pages/products/CreateProduct';
import EditProduct from './pages/products/EditProduct';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavMenu from './pages/NavMenu.js';
import OrdersList from './pages/orders/OrdersList';
import CreateOrder from './pages/orders/CreateOrder';
import EditOrder from './pages/orders/EditOrder';


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
          
          <Route path='/orders' element={<OrdersList />} exact></Route>
          <Route path='/createorder' element={<CreateOrder />} exact></Route>
          <Route path='/editorder/:orderNumber' element={<EditOrder />} exact></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
