import React from "react"
import "./index.css";
const Footer=()=>{
const current= new Date;
const year= `${current.getFullYear()}`;
  return(
    <div className="footer" style={{
      position: 'fixed', 
      bottom: '0', 
      width: '100%', 
      backgroundColor: 'tomato', 
      textAlign: 'center', 
      padding: '5px', 
      color: 'white'
  }}>
      <h4>MealsOnWheels &copy; 2024</h4>
  </div>
  
)
}
export default Footer;