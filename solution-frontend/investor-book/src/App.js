import { useShownItems, useColumnSizes, useItems } from "./hooks";
import { Row, ColumnNames } from "./components";

import "./App.css";

function App() {
  const { items: fetchedItems, fetchMoreItems, updateItem } = useItems();
  const { columnSizes, onSizeUpdate } = useColumnSizes();
  const { items, contentHeight, onScroll } = useShownItems(
    fetchedItems,
    fetchMoreItems
  );

  const rowItems = items.map(({ row, positionFromTop }) => (
    <Row
      key={row.id}
      row={row}
      positionFromTop={positionFromTop}
      columnSizes={columnSizes}
      updateItem={updateItem}
    />
  ));

  return (
    <div className="container" onScroll={onScroll}>
      <div style={{ position: "relative", height: `${contentHeight}px` }}>
        <ColumnNames onSizeUpdate={onSizeUpdate} />
        {rowItems}
      </div>
    </div>
  );
}

export default App;
