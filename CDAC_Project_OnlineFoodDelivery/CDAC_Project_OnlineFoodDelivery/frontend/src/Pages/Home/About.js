import React from 'react';
import { Container } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="mt-5">
            <h1>About MealsOnWheels</h1>
            <p style={{ fontSize: '18px', fontFamily: 'Poppins, sans-serif', textAlign: 'justify' }}>
                MealsOnWheels is a cutting-edge online food delivery platform designed to connect customers with a variety 
                of restaurants in their area. Our mission is to bring delicious meals right to your doorstep, quickly and efficiently.
            </p>
            
            <h3>Our Story</h3>
            <p style={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif', textAlign: 'justify' }}>
                Founded in 2024, MealsOnWheels was created to make meal ordering convenient for everyone, whether you're a busy professional, 
                a family on the go, or anyone who enjoys a hassle-free meal. We collaborate with restaurants and delivery partners to provide 
                seamless food delivery experiences.
            </p>

            <h3>Features</h3>
            <ul style={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>
                <li><strong>Wide Range of Restaurants:</strong> Choose from a variety of restaurants and cuisines.</li>
                <li><strong>Easy Online Ordering:</strong> Our platform makes it simple to place orders and pay online.</li>
                <li><strong>Real-time Tracking:</strong> Track your orders in real-time and know exactly when your food will arrive.</li>
                <li><strong>Customer Support:</strong> We're here to assist you with any questions or concerns.</li>
            </ul>

            <h3>Why MealsOnWheels?</h3>
            <p style={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif', textAlign: 'justify' }}>
                Our platform is designed with user experience in mind. We prioritize speed, convenience, and reliability in every order. 
                With an ever-growing network of restaurants and delivery partners, we're committed to delivering the best dining experience to you.
            </p>
        </Container>
    );
};

export default About;
