import { CHANGE_IMG, FETCH_USER, SWITCH_LOADING } from "../../constants";

const initialState = {
  currentUser: {
    value: null,
    isLoading: false,
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          value: action.payload,
        },
      };
    case SWITCH_LOADING:
      return {
        ...state,
        currentUser: { ...state.currentUser, isLoading: action.loading },
      };
    case CHANGE_IMG:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          value: { ...state.currentUser.value, imageUrl: action.payload },
        },
      };
    default:
      return state;
  }
};

export default user;
