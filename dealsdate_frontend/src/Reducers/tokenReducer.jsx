const tokenReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SETTOKEN':
            return action.token;
        case 'REMOVETOKEN':
            return "";
        default:
            return state;
    }
}

export default tokenReducer;