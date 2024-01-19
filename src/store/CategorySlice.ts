import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATUS  } from '../utilities/Status';
import {BASE_URL} from '../utilities/ApiURL'
import axios from 'axios';
import { AppDispatch } from './Store';


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

interface CategoryState {
        data: datatype[]
        status: string;
        catProductAll: [datatype2][]; 
        catProductAllStatus: string;
        catProductSingle: datatype; 
        catProductSingleStatus: string;
}
  
const initialState: CategoryState = {
    data: [{id: 0 , name: "", image: ""}],
    status: STATUS.IDLE,
    catProductAll : [],
    catProductAllStatus: STATUS.IDLE,
    catProductSingle : {id: 0 , name: "", image: ""},
    catProductSingleStatus: STATUS.IDLE
}

const categorySlice = createSlice({
    name: 'category',
    initialState,

    reducers: {
        setCategories(state, action:PayloadAction<datatype[]>){
            state.data = action.payload;
        },
        setStatus(state, action:PayloadAction<string>){
            state.status = action.payload;
        },
        setCategoriesProductAll(state, action:PayloadAction<[{id: number, title:string, price:number, description:string, images:string[], category:{id: 0 , name: "", image: ""},}]>){
            state.catProductAll.push(action.payload);
        },
        setCategoriesStatusAll(state, action:PayloadAction<string>){
            state.catProductAllStatus = action.payload;
        },
        setCategoriesProductSingle(state, action:PayloadAction<{id: 0 , name: "", image: ""}>){
            state.catProductSingle = action.payload;
        },
        setCategoriesStatusSingle(state, action:PayloadAction<string>){
            state.catProductSingleStatus = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchData.pending, (state) => {
    //         state.loading = true;
    //     });
    //     builder.addCase(fetchData.fulfilled, (state, action) => {
    //         state.data = action.payload;
    //         state.loading = false;
    //     });
    //     builder.addCase(fetchData.rejected, (state) => {
    //         state.loading = false;
    //     });
    // },
});

export const { setCategories, setStatus, setCategoriesProductAll, setCategoriesStatusAll, setCategoriesProductSingle, setCategoriesStatusSingle } = categorySlice.actions;
export default categorySlice.reducer;



export const fetchCategories = () => {
    return async function fetchCategoryThunk(dispatch: (arg0: { payload: string | datatype[]; type: "category/setCategories" | "category/setStatus"; }) => void){
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response = await fetch(`${BASE_URL}categories`);
            const data = await response.json();
            dispatch(setCategories(data.slice(0, 5)));
            dispatch(setStatus(STATUS.IDLE));
        } catch(error){
            dispatch(setStatus(STATUS.ERROR));
        }
    }
};

// export const fetchData = createAsyncThunk(axios.get('http://localhost:3003/categories').then((res)=>{
//     setCategories(res.data)}));



export const fetchProductsByCategory = (categoryID: number, dataType: string) => {
    return async function fetchCategoryProductThunk(dispatch: (arg0: { payload: string | [{ id: number; title: string; price: number; description: string; images: string[]; category: datatype; }] | { id: 0; name: ""; image: ""; }; type: "category/setCategoriesProductAll" | "category/setCategoriesStatusAll" | "category/setCategoriesProductSingle" | "category/setCategoriesStatusSingle"; }) => void){
        if(dataType === 'all') dispatch(setCategoriesStatusAll(STATUS.LOADING));
        if(dataType === 'single') dispatch(setCategoriesStatusSingle(STATUS.LOADING));
        
        try{
            const response = await fetch(`${BASE_URL}categories/${categoryID}/products`);
            const data = await response.json();
            if(dataType === 'all'){
                dispatch(setCategoriesProductAll(data.slice(0, 10)));
                dispatch(setCategoriesStatusAll(STATUS.IDLE));
            }
            if(dataType === 'single'){
                dispatch(setCategoriesProductSingle(data.slice(0, 20)));
                dispatch(setCategoriesStatusSingle(STATUS.IDLE));
            }
        } catch(error){
            dispatch(setCategoriesStatusAll(STATUS.ERROR));
        }
    }
}
