import { useRef, useEffect, useReducer } from "react";
import { useResizeObserver } from "../hooks/useResizeObserver";

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

function ColumnName({ name, onSizeUpdate }) {
  const columnNameRef = useRef(null);
  const { width } = useResizeObserver(columnNameRef);

  useEffect(() => onSizeUpdate(name, width), [name, width]);

  return (
    <div ref={columnNameRef} className="columnName">
      <p>{name}</p>
    </div>
  );
}

export function ColumnNames({ onSizeUpdate }) {
  return (
    <div className="columnNames">
      <ColumnName name="A" onSizeUpdate={onSizeUpdate} />
      <ColumnName name="B" onSizeUpdate={onSizeUpdate} />
      <ColumnName name="C" onSizeUpdate={onSizeUpdate} />
      <ColumnName name="D" onSizeUpdate={onSizeUpdate} />
      <ColumnName name="E" onSizeUpdate={onSizeUpdate} />
      <ColumnName name="F" onSizeUpdate={onSizeUpdate} />
    </div>
  );
}
