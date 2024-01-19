import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utilities/ApiURL";
import { STATUS } from "../utilities/Status";


type datatype =  {
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
    category:datatype,

}

interface ProductState {
    data: datatype2[],
    status: string,
}

const initialState: ProductState = {
    data: [{id: 0, title:'', price:0, description:'', images:[''], category:{id: 0 , name: "", image: ""}}],
    status: STATUS.IDLE,
}


const productSlice = createSlice({
    name: "product",
    initialState,

    reducers: {
        setProducts(state, action:PayloadAction<{id: number, title:string, price:number, description:string, images:string[], category:{id: number , name: string, image: string}}[]>){
            state.data = action.payload;
        },
        setStatus(state, action:PayloadAction<string>){
            state.status = action.payload;
        },
    },
});

export const {setProducts, setStatus} = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = () => {
    return async function fetchProductThunk(dispatch: (arg0: { payload: string | { id: number,title:string,price:number,description:string,images:string[],category: { name: string, id: number, image: string } }[]; type: "product/setProducts" | "product/setStatus"; }) => void){
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response = await fetch(`${BASE_URL}products`);
            const data = await response.json();
            dispatch(setProducts(data));
            dispatch(setStatus(STATUS.IDLE));
        } catch(error){
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}

