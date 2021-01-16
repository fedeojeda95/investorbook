import { useReducer } from "react";

const initialState = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

function columnSizesReducer(state, action) {
  const {
    type,
    value: { column, width },
  } = action;
  if (type === "update") {
    return { ...state, [column]: width };
  }

  throw new Error();
}

export function useColumnSizes() {
  const [state, dispatch] = useReducer(columnSizesReducer, initialState);

  function onSizeUpdate(column, width) {
    dispatch({
      type: "update",
      value: {
        column,
        width,
      },
    });
  }

  return {
    columnSizes: state,
    onSizeUpdate,
  };
}
