export default (state={data:null}, action)=>{
    switch(action.type){
        case 'AUTH':
            localStorage.setItem('user', JSON.stringify(action.payload));

            return {data: action?.payload};
        case 'LOGOUT':
            localStorage.removeItem('user');
            return {data: null};
        default:
            return {data: null};
    }
};