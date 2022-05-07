import {
  CHANGE_IMG,
  FETCH_USER,
  SWITCH_LOADING,
  UPDATE_PROFILE,
} from "../../constants";

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
    case UPDATE_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          value: {
            ...state.currentUser.value,
            email: action.payload.email,
            fullName: action.payload.fullName,
            phone: action.payload.phone,
          },
        },
      };

    default:
      return state;
  }
};

export default user;
