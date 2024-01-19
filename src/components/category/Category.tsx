import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {STATUS} from '../../utilities/Status';
import Error from "../../components/error/Error";
import Loader from "../../components/loader/Loader";
import './Category.scss';

type datatype = {
    categories: {name: string, id: number , image: string}[],
    status: string
}
const Category:React.FC<datatype> = ({categories,status}) => {
  if(status === STATUS.ERROR) return (<Error />);
  if(status === STATUS.LOADING) return (<Loader />);



 
//   const [categories,setcategories] = useState([]);

//   useEffect(()=>{
//     axios.get('http://localhost:3003/categories').then((res)=>{
//       setcategories(res.data);
//     })
//   },[]);

  type data =
    {name: string, id: number , image: string}
  


  return (
  <section className = "categories py-5 bg-ghost-white" id = "categories">
      <div className = "container">
          <div className = "categories-content">
              <div className='section-title'>
                  <h3 className = "text-uppercase fw-7 text-regal-blue ls-1">Category</h3>
              </div>
              <div className = "category-items grid">
                  {
                      categories.slice(0, 5).map((category:data) => (
                          <Link to = {`category/${category.id}`} key = {category.id}>
                              <div className = "category-item" >
                                  <div className='category-item-img'>
                                      <img src = {category.image} alt = "" />
                                  </div>
                                  <div className = "category-item-name text-center">
                                      <h6 className='fs-20'>{category.name}</h6>
                                  </div>
                              </div>
                          </Link>
                      ))
                  }
                  
              </div>
          </div>
      </div>
  </section>
)
}

export default Category

