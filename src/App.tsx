import React from 'react';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import {Home, Category, Cart} from './Pages';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import store from './store/Store';
import { Provider } from 'react-redux';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/category/:id' element={<Category />}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
