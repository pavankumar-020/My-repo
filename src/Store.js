import React from 'react'
import Veg from './Veg'

import NonVeg from './NonVeg'
import { configureStore, createSlice } from '@reduxjs/toolkit';

    const productSlice=createSlice({
        name:'products',
        initialState:{
            Veg:[{name:'Tomato', price:200.0},
                {name:'Potato', price:100.05},
                {name:'ladyfinger', price:90.5}
            ],
            NonVeg:[
                {name:'Chicken', price:800.0},
                {name:'Fish', price:1000.0}
            ],
        },
        reducers:{}
    });

    



//Cart to slice
const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const status=state.find(item=>item.name===action.payload.name)

            if(status)
            {
                status.quantity+=1;
            }
            else{
                state.push({...action.payload,quantity:1});
            };
        },

        incrementQuant:(state,action)=>{
            const statInc=state.find(item=>item.name===action.payload.name)

            if(statInc){
                statInc.quantity+=1;
            }
        },

        decrementQuant:(state,action)=>{
            const statDec=state.find(item=>item.name===action.payload.name)

            if(statDec && statDec.quantity>1){
                statDec.quantity-=1;
            }
        },

        removeFromCart: (state, action) => {
            return state.filter(item => item.name !== action.payload.name);
        }
        
    },


})
  
const store=configureStore({
    reducer:{ 
     products:productSlice.reducer,
     cart:cartSlice.reducer,
    }
 })


export default store
export const {addToCart, incrementQuant, decrementQuant, removeFromCart}=cartSlice.actions


