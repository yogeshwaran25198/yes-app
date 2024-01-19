import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import modalReducer from "./ModelSlice";
import productReducer from './ProductSlice';
import cartReducer from './CartSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


const store = configureStore({
    reducer: {
        category: categoryReducer,
        model: modalReducer,
        product: productReducer,
        cart: cartReducer,
      
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
