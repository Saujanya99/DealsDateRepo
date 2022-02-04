const userReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SETUSER':
            return action.user;
        case 'REMOVEUSER':
            return {};
        default:
            return state;
    }
}

export default userReducer;