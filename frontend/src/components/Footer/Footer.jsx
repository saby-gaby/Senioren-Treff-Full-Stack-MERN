import React, { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  return (
    <div className="Copyright">
      <button onClick={handleClick}>Copyright &copy; by us</button>
      {isShown && (
        <div className="footer-team">
          <h2>Our Team</h2>

          <div className="Footer">
            <a href="https://github.com/saby-gaby" target="_blank">
              <p>Sabina</p>
              <img src="http://localhost:3000/Sabina.jpeg" alt="" />
            </a>
            <a href="https://github.com/Holledrums" target="_blank">
              <p>Holger</p>
              <img src="http://localhost:3000/Holger.jpeg" alt="" />
            </a>
            <a href="https://github.com/Tom-Necke" target="_blank">
              <p>Tom</p>
              <img src="http://localhost:3000/Tom.jpeg" alt="" />
            </a>
            <a href="https://github.com/DennisPiecha" target="_blank">
              <p>Dennis</p>
              <img src="http://localhost:3000/Dennis.jpeg" alt="" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
