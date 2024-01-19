import React from 'react';
import { STATUS } from '../../utilities/Status';
import "./ProductList.scss";
import { setModalData, setIsModalVisible } from '../../store/ModelSlice';
import SingleProduct from '../singleProduct/SingleProduct';
import { useAppDispatch,useAppSelector } from '../../store/Store';
import { formatPrice } from '../../utilities/Helpers';
import Loader from '../loader/Loader';
import Error from '../error/Error';

type datatype = {
    //   products: {name: string, id: string, image: string},
      products: { id: number,title:string,price:number,description:string,images:string[],category: { name: string, id: number, image: string } }[],
      status: string
    }


    // type datatyped = {
    //     //   products: {name: string, id: string, image: string},
    //       data: { id: number,title:string,price:number,description:string,images:string[],category: { name: string, id: number, image: string } }[],
    //       isModelVisible: boolean,
    //     }    
    
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


const ProductList:React.FC<datatype> = ({products, status}) => {
    const ProDispatch = useAppDispatch();
    const {isModelVisible} = useAppSelector((state) => state.model);

    

    const viewModalHandler = (data:datatype2) => {
        console.log(data);
        
        ProDispatch(setModalData(data));
        ProDispatch(setIsModalVisible(true));
    }

    if(status === STATUS.ERROR) return (<Error />);
    if(status === STATUS.LOADING) return (<Loader />);

    return (
        <section className='product py-5 bg-ghost-white' id = "products">
            { isModelVisible && <SingleProduct />}

            <div className='container'>
                <div className='product-content'>
                    <div className='section-title'>
                        <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>Our Products</h3>
                    </div>
                    <div className='product-items grid'>
                        {
                            products.slice(0, 20).map(product => (
                                <div className='product-item bg-white' key = {product.id} onClick = {() => viewModalHandler(product)}>
                                    <div className='product-item-img'>
                                        <img src = {product.images[0]} alt = "" />
                                        <div className = "product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{product.category.name}</div>
                                    </div>
                                    <div className='product-item-body'>
                                        <h6 className = "product-item-title text-pine-green fw-4 fs-15">{product.title}</h6>
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

export default ProductList

