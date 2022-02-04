const productsReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, action.data];
        default:
            return state;
    }
}

export default productsReducer;