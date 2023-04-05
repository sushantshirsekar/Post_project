import React from "react";
import "./about.css";

const About = () => {
  return (
    <>
      <div className="aboutContainer">
        <h1 className="aboutHeader">About</h1>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit
            amet vulputate urna, at iaculis lectus. Etiam non sagittis libero.
            Donec vehicula tortor feugiat, sollicitudin nunc id, convallis sem.
            Praesent varius pharetra tortor, in posuere justo pharetra sit amet.
            Vivamus elementum molestie sollicitudin. Fusce fermentum convallis
            tellus, sit amet imperdiet eros sollicitudin eu. Sed vulputate ex
            mi, at tempus lorem pulvinar sed. Nullam quis commodo elit, vel
            porttitor ante. Integer faucibus hendrerit lacus sit amet vulputate.
            In interdum efficitur libero, a ultrices tortor vestibulum molestie.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec
            dapibus dui non nisi lobortis, et facilisis ligula suscipit. Duis ac
            aliquet orci, molestie iaculis quam. Ut volutpat venenatis sapien,
            non efficitur sapien efficitur ut. Morbi pellentesque hendrerit arcu
            ac facilisis. Praesent quis quam eu mauris iaculis facilisis sit
            amet vitae lacus.
          </p>
        </div>
        <div className="contact">
            <h3 style={{margin:"10px"}}>Contact</h3>
            <p>Email: <span>sushantshirsekar54@gmail.com</span></p>
            <p>Created By: <span>Sushant Shirsekar</span></p>
        </div>
      </div>
    </>
  );
};

export default About;
