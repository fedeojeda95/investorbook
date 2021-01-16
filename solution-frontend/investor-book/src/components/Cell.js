import { useState } from "react";

export function Cell({ column, row, columnSizes, setText, updateItem }) {
  const { text, id: columnId } = column;
  const { id: rowId } = row;

  const [value, setValue] = useState(text);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setValue(value);
    updateItem(rowId, columnId, value);
  };

  const columnWidth = columnSizes[columnId];
  const id = `cell-${columnId}-${rowId}`;
  const columnStyle = { width: columnWidth === 0 ? undefined : columnWidth };

  return (
    <div className="cell" style={columnStyle}>
      <textarea
        className="cellInput"
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
