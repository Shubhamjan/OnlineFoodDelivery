import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../config"; // Assuming you have a config file with the base URL
import { toast } from "react-toastify";
import './ad.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch customers when the component mounts
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${URL}/admin/viewCust`);
                const result = response.data;
                
                console.log(result)
                console.log("Result Status:", result.status);
                if (Array.isArray(result)) {
                    console.log("Number of customers:", result.length);
                    setCustomers(result); // Directly set the customers array
                } else {
                    toast.error("Unexpected response format.");
                }
            } catch (error) {
                toast.error("Error fetching customers. Please try again.");
            }
        };

        fetchCustomers();
    }, []);
    // console.log(result.data.length);


    const deleteCustomer = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${URL}/admin/delete/${id}`);
                if (response.status === 200) {
                    setCustomers(customers.filter(customer => customer.id !== id));
                    toast.success("Customer deleted successfully.");
                } else {
                    toast.error("Failed to delete customer.");
                }
            } catch (error) {
                toast.error("Error deleting customer. Please try again.");
            }
        }
    };



    return (
        <div className="table-responsive">
            <h2 className="m">Registered Customers</h2>
            {customers.length === 0 ? (
                <p>No customers registered yet.</p>
            ) : (
                <table className="table table-striped table-bordered table-hover">
                    <thead className="head">
                        <tr>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>ID</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Name</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Email</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Address</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Pin Code</th>
                            <th style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{customer.id}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{customer.name}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{customer.email}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{customer.addressText}</td>
                                <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{customer.pinCode}</td>
                                <td><button className="btn btn-danger" onClick={() => deleteCustomer(customer.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CustomerList;
