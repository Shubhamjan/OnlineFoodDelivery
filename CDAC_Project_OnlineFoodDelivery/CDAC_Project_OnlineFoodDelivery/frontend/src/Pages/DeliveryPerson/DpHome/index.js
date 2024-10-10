import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL } from '../../../config';
import { Card, CardBody, CardTitle, CardText, FormGroup, Label, Input } from 'reactstrap';
// import 'Pages/DpHome/style.css'

const DeliveryPersonHome = () => {
    const [personDetails, setPersonDetails] = useState({});
    const deliveryPersonId = sessionStorage["id"]; // Assuming delivery person ID is stored in session

    const loadPersonDetails = () => {
        const url = `${URL}/deliveryperson/${deliveryPersonId}`;
        axios.get(url).then((response) => {
            console.log("API Response:", response.data);
            setPersonDetails(response.data);
        }).catch(error => {
            console.error("Error fetching person details:", error);
            toast.error("Failed to load delivery person details");
        });
    };

    const toggleAvailability = (availabilityStatus) => {
        const url = `${URL}/deliveryperson/${deliveryPersonId}/${availabilityStatus}`; // Update URL to include status
        console.log(availabilityStatus);
        axios.put(url).then((response) => {
            setPersonDetails((prevDetails) => ({
                ...prevDetails,
                available: availabilityStatus,
            }));
            toast.success("Availability updated successfully");
        }).catch(error => {
            console.error("Error updating availability:", error);
            toast.error("Failed to update availability");
        });
    };

    const handleAvailabilityChange = (event) => {
        const newAvailability = event.target.value === "true"; // Convert string to boolean
        console.log(newAvailability);
        toggleAvailability(newAvailability);
    };

    useEffect(() => {
        loadPersonDetails();
    }, []);

    return (
        <div className="container mt-4">
            {personDetails && personDetails.name ? (
                <Card>
                    <CardBody>
                        <CardTitle style={{fontSize:'25px', fontWeight:'bolder',fontFamily:'cursive',color:'red'}}>Details</CardTitle>
                        <CardText>
                            <strong>Id:</strong> {personDetails.id} <br />
                            <strong>Name:</strong> {personDetails.name} <br />
                            <strong>Email:</strong> {personDetails.email} <br />
                            <strong>Available:</strong> {personDetails.available ? "Yes" : "No"}
                        </CardText>

                        {/* Radio buttons to toggle availability */}
                        <FormGroup>
                            <Label>Set Availability:</Label>
                            <div>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="availability"
                                            value="true" // Pass "true" as a string
                                            checked={personDetails.available === true}
                                            onChange={handleAvailabilityChange}
                                        />
                                        Available
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="availability"
                                            value="false" // Pass "false" as a string
                                            checked={personDetails.available === false}
                                            onChange={handleAvailabilityChange}
                                        />
                                        Unavailable
                                    </Label>
                                </FormGroup>
                            </div>
                        </FormGroup>
                    </CardBody>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DeliveryPersonHome;
