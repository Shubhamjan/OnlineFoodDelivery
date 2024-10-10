import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../config"; // Assuming you have a config file with the base URL
import { toast } from "react-toastify";
import './ad.css'; // Use your styling here

const DeliveryPersonList = () => {
    const [deliveryPersons, setDeliveryPersons] = useState([]);

    useEffect(() => {
        // Fetch delivery persons when the component mounts
        const fetchDeliveryPersons = async () => {
            try {
                const response = await axios.get(`${URL}/admin/viewDp`); // Adjust the API endpoint accordingly
                const result = response.data;

                console.log("API Response:", result); // Log the response for debugging
                if (Array.isArray(result)) {
                    console.log("Number of delivery persons:", result.length);
                    setDeliveryPersons(result); // Directly set the delivery persons array
                } else {
                    toast.error("Unexpected response format.");
                }
            } catch (error) {
                toast.error("Error fetching delivery persons. Please try again.");
            }
        };

        fetchDeliveryPersons();
    }, []);

    // Delete delivery person function
    const deleteDeliveryPerson = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this delivery person?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${URL}/admin/deleteDeliveryPerson/${id}`);
                if (response.status === 200) {
                    setDeliveryPersons(deliveryPersons.filter(person => person.id !== id));
                    toast.success("Delivery person deleted successfully.");
                } else {
                    toast.error("Failed to delete delivery person.");
                }
            } catch (error) {
                toast.error("Error deleting delivery person. Please try again.");
            }
        }
    };

    return (
        <div className="table-responsive">
            <h2 className="m">Delivery Persons</h2>
            {deliveryPersons.length === 0 ? (
                <p>No delivery persons available yet.</p>
            ) : (
                <table className="table table-striped table-bordered table-hover">
                    <thead className="head">
                        <tr>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>ID</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Name</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Email</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Availability</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryPersons.map((person) => (
                            <tr key={person.id}>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{person.id}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{person.name}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{person.email}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{person.available ? "Available" : "Not Available"}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteDeliveryPerson(person.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DeliveryPersonList;
