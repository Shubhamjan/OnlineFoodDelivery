import { useNavigate } from 'react-router';
import './index.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Header = () => {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <Container style={{ width: '100%' }}>
            <div className="d-flex flex-md-row align-items-center p-2 px-md-4 mb-3 bg-red border-bottom shadow-sm im" style={{ width: '100%', maxWidth: 'none' }}>
                <div className="logo-container">
                    <img className="logo" src='https://st5.depositphotos.com/20923550/70481/v/450/depositphotos_704816210-stock-illustration-cartoon-pizza-delivery-boy-scooter.jpg' style={{ width: '100px', height: '100px', marginRight: '0.05px' }} alt="logo" />
                </div>

                <nav className="navbar navbar-danger">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '50px', fontWeight: 'bold', marginRight: '0.1px' }}>MealsOnWheels</Link>
                    </div>
                </nav>

                {/* Display Home, About, View Restaurant Links only if no user is logged in */}
                {!sessionStorage["loginStatus"] && (
                    <nav className="ml-auto d-flex align-items-center">
                        <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder', textDecoration: 'none', fontSize: '20px' }} to="/">Home</Link>
                        <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder', textDecoration: 'solid', fontSize: '20px' }} to="/about">About</Link>
                        <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder', textDecoration: 'none', fontSize: '20px' }} to="/Home/fooditems">View Restaurant</Link>
                    </nav>
                )}

                {/* Conditional Links based on user roles */}
                {(sessionStorage["personType"] === "customer" && sessionStorage["loginStatus"] === "1") && (
                    <div className='d-flex align-items-center flex-md-row'>
                        <nav className="my-5 my-md-3 mr-md-3">
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder',marginLeft:'300px' }} to="/customer/home">Home</Link>
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder' }} to="/customer/orders">All Orders</Link>
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder' }} to="/customer/cart">Cart</Link>
                        </nav>
                        <a className="btn btn-outline-primary" href="#" onClick={() => logout()}>Log Out</a>
                    </div>
                )}

                {(sessionStorage["personType"] === "manager" && sessionStorage["loginStatus"] === "1") && (
                    <div className='d-flex align-items-center'>
                        <nav className="my-2 my-md-0 mr-md-3">
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder' }} to="/manager/home">Home</Link>
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder' }} to="/manager/restaurantmenu">Restaurant Menu</Link>
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder' }} to="/manager/allorders">All Orders</Link>
                        </nav>
                        <a className="btn btn-outline-primary" href="#" onClick={() => logout()}>Log Out</a>
                    </div>
                )}

                {(sessionStorage["personType"] === "deliveryPerson" && sessionStorage["loginStatus"] === "1") && (
                    <div className='d-flex align-items-center'>
                        <nav className="my-2 my-md-0 mr-md-3">
                            <Link className="p-2 text-dark bar" to="/dp/home">Home</Link>
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder',marginRight:'20px'}} to="/dp/allorders">All Orders</Link>
                        </nav>
                        <a className="btn btn-outline-primary" href="#" onClick={() => logout()}>Log Out</a>
                    </div>
                )}

                {/* Admin Navigation */}
                {(sessionStorage["personType"] === "admin" && sessionStorage["loginStatus"] === "1") && (
                    <div className='d-flex align-items-center'>
                        <nav className="my-2 my-md-0 mr-md-4 n">
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder' }} to="/admin/customerList">Customers</Link>
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder' }} to="/admin/managers">Managers</Link>
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder' }} to="/admin/restaurants">Restaurants</Link>
                            <Link className="p-2 text-dark" style={{ fontFamily: 'cursive', fontWeight: 'bolder' }} to="/admin/DeliveryPerson">DeliveryPerson</Link>
                        </nav>
                        <a className="btn btn-outline-primary" href="#" onClick={() => logout()}>Log Out</a>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Header;
