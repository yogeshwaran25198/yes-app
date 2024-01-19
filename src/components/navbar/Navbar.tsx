import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
// import { useSelector,useDispatch } from 'react-redux';
// import { fetchCategories } from '../../store/CategorySlice';
// import { RootState } from '../../store/Store';
import axios from 'axios';
import {  useAppDispatch,useAppSelector } from '../../store/Store';
import { fetchCategories } from '../../store/CategorySlice';
import { getCartTotal } from '../../store/CartSlice';


const Navbar = () => {
  const [isSideBarOpen,setIsSideBarOpen] = useState(false); 

  // const {data, loading} = useAppSelector((state) => state.catFacts);
  const catDispatch = useAppDispatch();
  const {data : fetCategories} = useAppSelector((state)=>state.category);
  const {totalItems} = useAppSelector((state)=>state.cart);



  // const [categories,setcategories] = useState([]);

  // useEffect(()=>{
  //   axios.get('http://localhost:3003/categories').then((res)=>{
  //     setcategories(res.data);
  //   })
  // },[]);

  type datatype ={
    id: number,
    name: string,
    image: string,
  }



  
  useEffect(() => {
    catDispatch(fetchCategories());
    catDispatch(getCartTotal());
  }, []);

  return (
  <nav className = "navbar">
    <div className='navbar-content'>
      <div className = "container">
        <div className = "navbar-top flex flex-between">
            <Link to = "/" className = "navbar-brand">
              <span className = "text-regal-blue">Yes</span><span className='text-gold'>App</span>
            </Link>

            <form className = "navbar-search flex">
              <input type = "text" placeholder='Search here ...' />
              <button type = "submit" className = "navbar-search-btn">
                <i className = "fas fa-search"></i>
              </button>
            </form>

            <div className = "navbar-btns">
              <Link to = "/cart" className="add-to-cart-btn flex">
                <span className = "btn-ico">
                  <i className = "fas fa-shopping-cart"></i>
                </span>
                <div className='btn-txt fw-5'>Cart
                  <span className='cart-count-value'>{totalItems}</span>
                </div>
              </Link>
            </div>
        </div>
      </div>
      
      <div className='navbar-bottom bg-regal-blue'>
        <div className='container flex flex-between'>
          <ul className = {`nav-links flex ${isSideBarOpen ? 'show-nav-links' : ''}`}>
            <button type = "button" className='navbar-hide-btn text-white' onClick={()=>{setIsSideBarOpen(false)}} >
              <i className='fas fa-times'></i>
            </button>
            {/* {
                categories && categories.slice(0,5).map((category:data) => (
                  <li key = {category.id}><Link to = {`/category/${category.id}`} className = "nav-link text-white" onClick={() => setIsSideBarOpen(false)}>{category.name}</Link></li>
                ))
            } */}
             {
               fetCategories.map((category:datatype) => {
                return(<li key = {category.id}><Link to = {`/category/${category.id}`} className = "nav-link text-white" onClick={() => setIsSideBarOpen(false)}>{category.name}</Link></li>)
              })
            } 
          </ul>

          <button type = "button" className='navbar-show-btn text-gold' onClick={()=>setIsSideBarOpen(true)}>
            <i className = "fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar



