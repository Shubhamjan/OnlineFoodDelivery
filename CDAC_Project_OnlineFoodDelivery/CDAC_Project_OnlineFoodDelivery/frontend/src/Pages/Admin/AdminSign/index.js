import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { URL } from '../../../config';

const AdminSignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage["personType"] === "admin" && sessionStorage["loginStatus"] === "1") {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    const signInAdmin = () => {
        if (email.length === 0) {
            toast.warning("Please enter email");
        } else if (password.length === 0) {
            toast.warning("Please enter password");
        } else {
            const body = {
                email,
                password
            };
            const url = `${URL}/admin/signin`;
            axios.post(url, body).then((response) => {
                const result = response.data;

                if (result.status === "SUCCESS") {
                    toast.success("Welcome to Admin Dashboard");
                    const { id, name, email } = result.data;

                    sessionStorage['id'] = id;
                    sessionStorage['name'] = name;
                    sessionStorage['email'] = email;

                    sessionStorage['loginStatus'] = '1';
                    sessionStorage['personType'] = 'admin';

                    navigate('/admin/dashboard');
                } else {
                    toast.error(result.message);
                }
            }).catch((error) => {
                toast.error("Error during sign-in. Please try again.");
            });
        }
    };

    return (
        <div>
            <h2 className="title">Admin Sign In</h2>

            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <div className="form">

                        <div className="mb-3">
                            <label htmlFor="email" className="label-control">
                                Email Address
                            </label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="label-control">
                                Password
                            </label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={signInAdmin}>Sign In</button>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};

export default AdminSignIn;
