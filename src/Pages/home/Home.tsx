import React, { useEffect } from 'react'
import SliderC from '../../components/slider/Slider';
import './Home.scss';
import Category from '../../components/category/Category';
import ProductList from '../../components/productList/ProductList';
import { useAppDispatch,useAppSelector } from '../../store/Store';

import { fetchCategories,fetchProductsByCategory } from '../../store/CategorySlice';
import SingleCategory from '../../components/singleCategory/SingleCategory';
import { fetchProducts } from '../../store/ProductSlice';

const Home = () => {
  const catDispatch = useAppDispatch();
  const {data: categories, status: categoryStatus} = useAppSelector((state) => state.category);
  const {catProductAll: productsByCategory,catProductAllStatus} = useAppSelector((state) => state.category);
  const {data: products, status: productStatus} = useAppSelector((state) => state.product);
  
  // type datatype =  {
  //   id: number,
  //   name: string,
  //   image: string,
  // };
  
  
//   type datatype2 = {
//     id: number,
//     title:string,
//     price:number,
//     description:string,
//     images:string[],
//     category:datatype,

// }


// type datatype3 = {
//     products: { id: number,title:string,price:number,description:string,images:string[],category: { name: string, id: number, image: string } }[],
//     status: string
//   }

  useEffect(() => {
    catDispatch(fetchProducts());
    catDispatch(fetchCategories());


    catDispatch(fetchProductsByCategory(1, 'all'));
    catDispatch(fetchProductsByCategory(2, 'all'));
    catDispatch(fetchProductsByCategory(3, 'all'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div className='home-page'>
      <SliderC/>
      <Category categories={categories} status={categoryStatus} />
      <ProductList products = {products} status = {productStatus} />
      <section>
        { productsByCategory[0] && <SingleCategory products = {productsByCategory[0]} status = {catProductAllStatus}/> }
      </section>
      <section>
        { productsByCategory[1] && <SingleCategory products = {productsByCategory[1]} status = {catProductAllStatus}/> }
      </section>
      <section>
        { productsByCategory[2] && <SingleCategory products = {productsByCategory[2]} status = {catProductAllStatus}/> }
      </section>
     

    </div>
  )
}

export default Home










// import axios from 'axios';
// import React, { Fragment, useEffect, useState } from 'react'
// import Slider from '../../components/slider/Slider';
// import Category from '../category/Category';
// import Error from '../../components/error/Error';
// import Loader from '../../components/loader/Loader';
// import SliderC from '../../components/slider/Slider';

// export default function Home() {
//   // const [categories,setcategories] = useState([]);

//   // useEffect(()=>{
//   //   axios.get('https://api.escuelajs.co/api/v1/categories').then((res)=>{
//   //     setcategories(res.data);
//   //   })
//   // },[]);

//   // type data ={
//   //   id: string,
//   //   name: string,
//   //   image: string,
//   // }

//   return (
//     <div className='home-page'>
//       <SliderC/>
//       <Category/>
//       {/* <h1>categories</h1>
//       <div>{categories && categories.slice(0,6).map((a:data)=>{
//         return(
//             <Fragment key={a.id}>
//               <p >{a.name}</p> - <img src={a.image} alt=""  style={{width:'50px', height:'px'}}/>
//             </Fragment>
//         )
//       })}
//       </div> */}
//     </div>
//   )
// }

// import React, { useEffect } from 'react';
// import './Home.scss';
// import Slider from '../../components/slider/Slider';
// import Category from '../../components/category/Category';
// import { fetchCategories, fetchProductsByCategory } from '../../store/CategorySlice';
// import { useSelector, useDispatch } from 'react-redux';
// import ProductList from '../../components/productList/ProductList';

// const Home = () => {

//   const dispatch = useDispatch();
//   const {data: categories, status: categoryStatus} = useSelector((state:any) => state.category);
//   const {data: products, status: productStatus} = useSelector((state:any) => state.product);
//   const {catProductAll: productsByCategory, catProductAllStatus} = useSelector((state:any) => state.category);
//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchCategories());
//     dispatch(fetchProductsByCategory(1, 'all'));
//     dispatch(fetchProductsByCategory(2, 'all'));
//     eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className='home-page'>
//       <Slider/>
//       <Category categories = {categories} status = {categoryStatus}/>
//     </div>
//   )
// }

// export default Home