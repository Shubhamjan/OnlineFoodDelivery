import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../config"; // Assuming you have a config file with the base URL
import { toast } from "react-toastify";
import './ad.css';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // Fetch restaurants when the component mounts
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`${URL}/admin/Restos`); // Adjust the API endpoint accordingly
                const result = response.data;

                console.log("API Response:", result); // Log the response for debugging
                if (Array.isArray(result)) {
                    console.log("Number of restaurants:", result.length);
                    setRestaurants(result); // Directly set the restaurants array
                } else {
                    toast.error("Unexpected response format.");
                }
            } catch (error) {
                toast.error("Error fetching restaurants. Please try again.");
            }
        };

        fetchRestaurants();
    }, []);

    // Delete restaurant function
    const deleteRestaurant = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${URL}/admin/deleteResto/${id}`);
                if (response.status === 200) {
                    setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
                    toast.success("Restaurant deleted successfully.");
                } else {
                    toast.error("Failed to delete restaurant.");
                }
            } catch (error) {
                toast.error("Error deleting restaurant. Please try again.");
            }
        }
    };

    return (
        <div className="table-responsive">
            <h2 className="m">Restaurants</h2>
            {restaurants.length === 0 ? (
                <p>No restaurants registered yet.</p>
            ) : (
                <table className="table table-striped table-bordered table-hover">
                    <thead className="head">
                        <tr>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Name</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Location</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Manager</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant) => (
                            <tr key={restaurant.id}>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{restaurant.restaurant_name}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{restaurant.location}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{restaurant.manager_name}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RestaurantList;
