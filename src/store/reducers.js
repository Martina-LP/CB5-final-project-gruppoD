import { actions } from "./actions";

const globalReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USERNAME:
      localStorage.setItem("user", action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    case actions.REMOVE_USERNAME:
      localStorage.removeItem("user");
      return {
        ...state,
        user: {
          ...state.user,
          username: "",
        },
      };
    case actions.SET_AVATAR:
      localStorage.setItem("avatar", action.payload);
      return {
        ...state,
        avatar: {
          ...state.avatar,
          avatarId: action.payload,
        },
      };
    default:
      return state;
  }
};

export { globalReducer };
