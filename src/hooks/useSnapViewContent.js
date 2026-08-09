import { useEffect } from "react";

const useSnapViewContent = ({
  price,
  currency = "SAR",
  itemIds = [],
  itemCategory,
}) => {
  useEffect(() => {
    if (!window.snaptr) return;

    window.snaptr("track", "VIEW_CONTENT", {
      ...(price && { price }),
      currency,
      ...(itemIds.length && { item_ids: itemIds }),
      ...(itemCategory && { item_category: itemCategory }),
    });
  }, [price, currency, itemIds, itemCategory]);
};

export default useSnapViewContent;