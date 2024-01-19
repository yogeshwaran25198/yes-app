import { PayloadAction, createSlice } from "@reduxjs/toolkit";



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
    data: datatype2,
    isModelVisible: boolean,
}

const initialState: ProductState = {
    data: {id: 0, title:'', price:0, description:'', images:[''], category:{id: 0 , name: "", image: ""}},
    isModelVisible: false,
}
const modalSlice = createSlice({
    name: "model",
    initialState,
    reducers: {
        setModalData(state, action:PayloadAction<{ id: number,title:string,price:number,description:string,images:string[],category: { name: string, id: number, image: string } }>){
            state.data = action.payload;
            
        },
        setIsModalVisible(state, action:PayloadAction<boolean>){
            state.isModelVisible = action.payload;
            
        }
    }
});

export const { setModalData, setIsModalVisible} = modalSlice.actions;
export default modalSlice.reducer;