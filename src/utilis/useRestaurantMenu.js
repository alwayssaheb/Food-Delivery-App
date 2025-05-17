import { useEffect, useState } from "react";
import restaurantMenuData from "./restaurantMenuData";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            // In a real app, you would uncomment this to fetch from an API
            // const data = await fetch(MENU_API + resId);
            // const json = await data.json();
            
            // For now, directly use the mock data
            const mockData = restaurantMenuData[resId]?.data;
            
            if (mockData) {
                setResInfo(mockData);
            } else {
                console.error("No mock data found for restaurant ID:", resId);
                setResInfo(null);
            }
        } catch (error) {
            console.error("Error fetching menu data:", error);
            setResInfo(null);
        }
    };
    
    return resInfo;
};

export default useRestaurantMenu;