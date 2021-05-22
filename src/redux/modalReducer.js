import { CLOSE_MODAL, OPEN_MODAL } from "./action";

const initialState = {
  selectedPoster: "",
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, selectedPoster: action.payload.url };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}
