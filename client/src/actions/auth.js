import * as api from '../api/api';

export const login = (email, password)=>(async (dispatch)=>{
    try{
        const {data} = await api.login(email, password);
        dispatch({type: "AUTH", payload: data});
    }catch(err){
        console.log(err);
    }
});

export const register = (info)=>(async (dispatch)=>{
    try{
        const {data} = await api.register(info);
        dispatch({type: "AUTH", payload: data});
    }catch(err){
        console.log(err.message);
    }
});

export const logout = ()=>(async (dispatch)=>{
    try{
        dispatch({type: 'LOGOUT'})
    }catch(err){
        console.log(err.message);
    }
});