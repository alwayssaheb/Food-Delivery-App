import Shimmer1 from "./Shimmer1";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useRestaurantMenu from "../utilis/useRestaurantMenu";
import ResCategory from "./ResCategory";

const RestaurantMenuCard = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(0);

  if (resInfo === null) return <Shimmer1 />;

  // Find the restaurant info card - it's in the first card in our mock data
  const restaurantCard = resInfo?.cards?.find(card => 
    card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );

  // Restaurant info from the card
  const {
    name,
    cuisines,
    costForTwoMessage,
    totalRatingsString,
    avgRatingString,
    areaName,
    sla,
    feeDetails,
  } = restaurantCard?.card?.card?.info || {};

  // Find the grouped card that contains menu categories
  const menuGroupedCard = resInfo?.cards?.find(card => card?.groupedCard);

  // Get all item categories from REGULAR cards
  const categories = menuGroupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  console.log("Restaurant Info:", restaurantCard?.card?.card?.info);
  console.log("Categories:", categories);

  return (
    <div className="text-center">
      <div>
        Home/India/{restaurantCard?.card?.card?.text || name || "Restaurant"}
      </div>
      
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm">
            ★ {avgRatingString} ({totalRatingsString}) • {costForTwoMessage}
          </span>
        </div>
        
        <div className="text-gray-500 my-2">
          {cuisines && cuisines.join(", ")}
        </div>
        
        <div className="flex justify-between w-full max-w-2xl px-4 my-4">
          <div className="outlet">
            <span className="font-bold">Outlet</span>
            <span className="mx-2">{areaName}▾</span>
            <span className="text-gray-500">{sla?.slaString}</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          {feeDetails?.message?.replace("2.3 kms", "2.3 km ")}
        </div>
      </div>
      
      {/* Categories Accordion */}
      <div className="max-w-3xl mx-auto">
        {categories && categories.map((category, index) => (
          <ResCategory 
            key={index}
            data={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenuCard;