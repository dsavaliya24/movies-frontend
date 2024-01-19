import React, { useState } from "react";
import "./Header.scss";
import { useHistory } from "react-router-dom";
import movieAddIcon from "../../../assets/icons/Vector.svg";
import { useSelector } from "react-redux";
export default function Header() {
  const [drodown, setDrodown] = useState(false);
  const history = useHistory();
  const rememberMe = useSelector((state) => state.movies.rememberMe);
 
  const handleLogout=()=>{
    localStorage.clear();
    sessionStorage.clear();
    history.push("/login");
  }
  return (
    <div className="header-section">
      <div className="container">
        <div className="header-alignment">
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              className="header-logo-alignment"
              onClick={() => history.push("/")}
            >
              My Movies
            </div>
            <div
              style={{ color: "#fff" }}
              onClick={() => history.push("/create-movie")}
            >
              <img src={movieAddIcon} />
            </div>
          </div>

          <div className="header-option-alignment">
            <ul>
              <li>
                <div
                  className="user-icon-alignment"
                  onClick={() => setDrodown(!drodown)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z "
                      fill="#fff"
                    />
                  </svg>

                  <div
                    className={
                      drodown
                        ? "profile-dropdown-alignment open-dropdown"
                        : "profile-dropdown-alignment hidden-dropdown"
                    }
                  >
                    <p
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
