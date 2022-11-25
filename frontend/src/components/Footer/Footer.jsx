import React, { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  return (
    <div>
      <button onClick={handleClick}>Copyright &copy; by us</button>
      {isShown && (
        <div>
          <h2>Our Team</h2>
        </div>
      )}
      {isShown && (
        <div>
          <div>
            <p>
              Sabina
              <button>
                <img src="oma.svg" alt="" />
              </button>
            </p>
          </div>
          <div>
            <p>
              Tom
              <button>
                <img src="oma.svg" alt="" />
              </button>
            </p>
          </div>
          <div>
            <p>
              Holger
              <button>
                <img src="oma.svg" alt="" />
              </button>
            </p>
          </div>
          <div>
            <p>
              Dennis
              <button>
                <img src="oma.svg" alt="" />
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
