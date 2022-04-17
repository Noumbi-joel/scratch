const initialState = {
    currentUser: null
}

const user = (state=initialState, action) => {
    return {
        ...state,
        currentUser: action.payload
    }
}

export default user;