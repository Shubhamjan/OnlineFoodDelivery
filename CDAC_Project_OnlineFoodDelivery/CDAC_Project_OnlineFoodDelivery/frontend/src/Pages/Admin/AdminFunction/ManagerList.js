import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../config"; // Assuming you have a config file with the base URL
import { toast } from "react-toastify";
import './ad.css';

const ManagerList = () => {
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        // Fetch managers when the component mounts
        const fetchManagers = async () => {
            try {
                const response = await axios.get(`${URL}/admin/viewManager`);
                const result = response.data;
                console.log(result)
                console.log(result);
                console.log("Result Status:", result.status);
                if (Array.isArray(result)) {
                    console.log("Number of managers:", result.length);
                    setManagers(result); // Directly set the managers array
                } else {
                    toast.error("Unexpected response format.");
                }
            } catch (error) {
                toast.error("Error fetching managers. Please try again.");
            }
        };

        fetchManagers();
    }, []);

    // Delete manager function
    const deleteManager = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this manager?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${URL}/admin/deleteManager/${id}`);
                if (response.status === 200) {
                    setManagers(managers.filter(manager => manager.id !== id));
                    toast.success("Manager deleted successfully.");
                } else {
                    toast.error("Failed to delete manager.");
                }
            } catch (error) {
                toast.error("Error deleting manager. Please try again.");
            }
        }
    };

    return (
        <div className="table-responsive">
            <h2 className="m">Registered Managers</h2>
            {managers.length === 0 ? (
                <p>No managers registered yet.</p>
            ) : (
                <table className="table table-striped table-bordered table-hover">
                    <thead className="head">
                        <tr>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>ID</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Name</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Email</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Restaurant ID</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager) => (
                            <tr key={manager.id}>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{manager.id}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{manager.name}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{manager.email}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{manager.restaurantId}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteManager(manager.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManagerList;
