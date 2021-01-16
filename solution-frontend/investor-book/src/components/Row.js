import { Cell } from "./Cell";

export function Row({ row, positionFromTop, columnSizes, updateItem }) {
  const { id, columns: rowColumns } = row;

  const rowNumber = (
    <div className="rowNumber">
      <p>{id}</p>
    </div>
  );

  const columns = Object.values(rowColumns);
  const cells = columns.map((column) => (
    <Cell
      key={column.id}
      column={column}
      row={row}
      columnSizes={columnSizes}
      updateItem={updateItem}
    />
  ));

  return (
    <div
      className="rowContainer"
      style={{ position: "absolute", top: `${positionFromTop}px` }}
    >
      {rowNumber}
      {cells}
    </div>
  );
}
