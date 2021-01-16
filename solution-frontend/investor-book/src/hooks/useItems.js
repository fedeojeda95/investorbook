import { useState } from "react";

function createNewRows(index) {
  const rows = {};
  for (let i = index; i < index + 500; i = i + 1) {
    rows[i] = {
      id: i,
      columns: {
        A: { id: "A", text: "First" },
        B: { id: "B", text: "Second" },
        C: { id: "C", text: "Third" },
        D: { id: "D", text: "Fourth" },
        E: { id: "E", text: "Fifth" },
        F: { id: "F", text: "Sixth" },
      },
    };
  }

  return rows;
}

export function useItems() {
  const [items, setItems] = useState({});

  function updateItem(rowId, columnId, text) {
    if (
      items[rowId] &&
      items[rowId].columns &&
      items[rowId].columns[columnId]
    ) {
      const row = items[rowId];
      const newColumn = { id: columnId, text };
      const newRow = {
        ...row,
        columns: {
          ...row.columns,
          [columnId]: newColumn,
        },
      };

      setItems({ ...items, [rowId]: newRow });
    }
  }

  function fetchMoreItems() {
    const rowsLength = Object.keys(items).length;
    const newItems = createNewRows(rowsLength);
    setItems({ ...items, ...newItems });
  }

  const itemsList = Object.values(items);

  return {
    fetchMoreItems,
    items: itemsList,
    updateItem,
  };
}
