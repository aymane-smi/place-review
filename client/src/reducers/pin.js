export default (state=[], action)=>{
    switch(action.type){
        case 'GET_PINS':
            return [...action.payload?.allPins];
        case 'ADD_PIN':
            return [...state, action.payload?.newPin];
        default:
            return state;
    }
}; 