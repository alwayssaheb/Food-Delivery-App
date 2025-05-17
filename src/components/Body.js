import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utilis/useOnlineStatus";
import userContext from "../utilis/UserContext";
import restaurantData from "../utilis/restaurantData"; // Import the mock data

// definition of state react variable
// ! Whenever state variable updates, react triggers a reconciliation cycle (re-renders the component)
const Body = () => {
  const [listOfRestaurant, setlistOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  console.log("body rendering", listOfRestaurant);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      // Try to fetch from API first
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      
      const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      
      if (restaurants && restaurants.length > 0) {
        // If API call is successful, use the API data
        setlistOfRestaurant(restaurants);
        setFilteredRestaurant(restaurants);
      } else {
        // If API data is not available, use mock data
        const mockRestaurants = restaurantData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setlistOfRestaurant(mockRestaurants);
        setFilteredRestaurant(mockRestaurants);
      }
    } catch (error) {
      console.error("Error fetching data from API, using mock data instead:", error);
      // If API call fails, use mock data
      const mockRestaurants = restaurantData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setlistOfRestaurant(mockRestaurants);
      setFilteredRestaurant(mockRestaurants);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (<h1>Looks like you are offline !! check your Internet Connection</h1>)
  }
  
  const {isLoggedUser, setLoggedinInfo} = useContext(userContext)
  
  // conditional rendering - Rendering on the basis of Condition
  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="cont-bn">
        <div className="Search">
          <input
            className="search-box"
            data-testid="search-input"
            placeholder="Search your Restaurant..."
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="btn"
            onClick={() => {
              // filter the restaurant cards & update the UI
              const filteredRestaurant = listOfRestaurant.filter((res) => 
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
              // search Text
              console.log(searchText);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredData = listOfRestaurant.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurant(filteredData);
            console.log(filteredData);
          }}
        >
          Top Rated Restaurants
        </button>
        <div>
          <label htmlFor="username">Username :</label>
          <input
            id="username"
            className="search-box"
            type="text"
            value={isLoggedUser}
            onChange={(e) => {
              setLoggedinInfo(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {restaurant.info.isOpen ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;