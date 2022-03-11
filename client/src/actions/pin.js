import * as api from '../api/api';

export const getPins = ()=>(async (dispatch)=>{
    try{
        const {data} = await api.getPins();
        dispatch({type:'GET_PINS', payload: data});
    }catch(err){
        console.log(err.message);
    }
});

export const createPin = (pin)=>(async (dispatch)=>{
    try{
        const {data} = await api.createPin(pin);
        dispatch({type: 'ADD_PIN', payload: data});
    }catch(err){
        console.log(err.message);
    }
});