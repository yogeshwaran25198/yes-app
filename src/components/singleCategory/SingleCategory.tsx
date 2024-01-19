import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setIsModalVisible, setModalData } from '../../store/modalSlice';
// import { formatPrice } from '../../utils/helpers';
// import SingleProduct from '../SingleProduct/SingleProduct';
import Error from '../error/Error';
import Loader from '../loader/Loader';
import {STATUS} from "../../utilities/Status";
import SingleProduct from '../singleProduct/SingleProduct';
import { useAppDispatch,useAppSelector } from '../../store/Store';
import './SingleCategory.scss';
import { formatPrice } from '../../utilities/Helpers';
import { setIsModalVisible,setModalData } from '../../store/ModelSlice';


type datatype = {
     //   products: {name: string, id: string, image: string},
  products: { id: number,title:string,price:number,description:string,images:string[],category: { name: string, id: number, image: string } }[],
  status: string
}

type datatype1 =  {
    id: number,
    name: string,
    image: string,
};
type datatype2 = {
    id: number,
    title:string,
    price:number,
    description:string,
    images:string[],
    category:datatype1,

}

const SingleCategory:React.FC<datatype> = ({products, status}) => {
    // const dispatch = useDispatch();
    const catDispatch = useAppDispatch();
    const {isModelVisible} = useAppSelector((state) => state.model);

    const viewModelHandler = (data:datatype2) => {
        // console.log(data);
        
        catDispatch(setModalData(data));
        catDispatch(setIsModalVisible(true));
    }
   
      

    if(status === STATUS.ERROR) return (<Error />);
    if(status === STATUS.LOADING) return (<Loader />);
    // console.log(products);
    

    return (
        <section className='cat-single py-5 bg-ghost-white'>
            { isModelVisible && <SingleProduct />}

            <div className='container'>
                <div className='cat-single-content'>
                    <div className='section-title'>
                     <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>{products[0].category.name}</h3>
                
                    </div>
                    <div className='product-items grid'>
                        {
                            products.map((product:datatype2) => (
                                <div className='product-item bg-white' key = {product.id} onClick = {() => viewModelHandler(product)}>
                                    <div className='product-item-img'>
                                        <img src = {product.images[0]} alt = "" />
                                        
                                        <div className = "product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{product.category.name}</div>
                                    </div>
                                    
                                    <div className='product-item-body'>
                                        <h6 className = "product-item-title text-pine-green fw-4 fs-15">{product.title}</h6>

                                        {/* <div className = "product-item-price text-regal-blue fw-7 fs-18">{product.price}$</div> */}
                                        <div className = "product-item-price text-regal-blue fw-7 fs-18">{formatPrice(product.price)}</div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleCategory;