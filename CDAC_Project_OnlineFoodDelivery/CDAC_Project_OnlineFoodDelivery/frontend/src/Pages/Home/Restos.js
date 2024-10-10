import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; // useParams to get restaurant ID from URL
import { toast } from "react-toastify";
import FoodItemVertical from "../../Components/FoodItemVertical";
import { URL } from "../../config";

const Restos = () => {
    const { restId } = useParams(); // Get restaurant ID from the URL parameters
    const [foodItems, setFoodItems] = useState([]);
    const navigate = useNavigate(); // Used to navigate to the login page

    const loadFoodItems = () => {
        const url = `${URL}/fooditems/restaurant/${restId}`;
        axios.get(url).then(response => {
            const result = response.data;
            if (result.status === "SUCCESS") {
                setFoodItems(result.data);
            } else {
                toast.error(result.message);
            }
        }).catch(err => {
            toast.error("Error fetching food items");
        });
    };

    // Redirect to login on "Add to Cart" click
    const redirectToLogin = () => {
        toast.info("Please sign in to add items to your cart.");
        navigate("/customer/signin");
    };

    useEffect(() => {
        console.log("Restaurant ID from params:", restId); // Debugging statement
        if (restId) {
            loadFoodItems();
        } else {
            toast.error("Restaurant ID is missing.");
        }
    }, [restId]);

    return (
        <div>
            {restId ? ( // Ensure restId is defined
                <div>
                    <h2 className="mt-3">Food Items</h2>
                    <div className="food-items-container">
                        {foodItems.map(foodItem => (
                            <FoodItemVertical
                                key={foodItem.id}
                                id={foodItem.id}
                                name={foodItem.name}
                                price={foodItem.price}
                                imagePath={foodItem.imagePath}
                                restaurantId={foodItem.restaurantId}
                                addToCart={redirectToLogin} // Redirect to login on click
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h3>No restaurant information available.</h3>
                    <p>Please go back and select a restaurant.</p>
                </div>
            )}
        </div>
    );
};

export default Restos;
