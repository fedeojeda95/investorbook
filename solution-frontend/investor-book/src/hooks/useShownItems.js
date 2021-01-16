import { useState } from "react";

const TOP_PADDING = 50;

export function useShownItems(rows, fetchMore) {
  const itemsCount = rows.length;
  const itemHeight = 150;
  const windowHeight = window.innerHeight; // Hardcoded, it's the size of the scrolling container

  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = (event) => {
    const {
      currentTarget: { scrollTop },
    } = event;
    setScrollTop(scrollTop);
  };

  const contentHeight = itemsCount * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    itemsCount - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  const items = [];
  for (let index = startIndex; index <= endIndex; index++) {
    const row = rows[index];
    const positionFromTop = index * itemHeight + TOP_PADDING;
    items.push({ row, positionFromTop });
  }

  if (endIndex >= itemsCount - 1) {
    fetchMore();
  }

  return {
    items,
    contentHeight,
    onScroll,
  };
}
