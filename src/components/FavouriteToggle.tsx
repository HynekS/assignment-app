import { useEffect, useState } from "react";

import { HeartIcon } from "@heroicons/react/24/outline";

interface Props {
  chartId: "chartOne" | "chartTwo";
}

const FavouriteToggle = ({ chartId }: Props) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(localStorage.getItem(chartId) === "true" ? true : false);
  }, [chartId]);

  const toggleFavourite = () => {
    if (!globalThis.localStorage) return false;
    globalThis.localStorage.setItem(chartId, String(!isFavourite));
    setIsFavourite(!isFavourite);
  };

  return (
    <button onClick={toggleFavourite}>
      <HeartIcon
        className={`h-5 w-5 ${
          isFavourite ? `fill-red-500 stroke-red-500` : ""
        }`}
      />
    </button>
  );
};

export default FavouriteToggle;
