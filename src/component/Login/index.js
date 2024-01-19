import React from "react";
import "./Login.scss";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRememberMe, userLogin } from "../Home/redux/reducer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import toast from "react-hot-toast";
import { getToken, setToken } from "../../utils";
import EyeIcon from "../../Icons/eyeIcon";
import CloseEyeIcon from "../../Icons/closeEye";

const initial = { email: "", password: "" };

export default function Login() {
  const [formState, setFormState] = useState({ ...initial });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({});
  const rememberMe = useSelector((state) => state.movies.rememberMe);
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await dispatch(userLogin(formState))
          .unwrap()
          .then((res) => {
            if (res?.success) {
              if (res?.payload?.token) {
                toast.success("Login successfully");
                setToken(res?.payload?.token, "access_token", rememberMe);
                history.push("/");
              } else {
                toast.error(res?.messages);
              }
            }
          });
      } catch (error) {
        toast.error(error?.messages);
      }
    },
    [formState.email, formState.password]
  );
  const handleTogglePassword = (e) => {
    e.stopPropagation()
    setShowPassword(!showPassword)
  };
  return (
    <div className="login-section">
      <div className="login-details-alignment">
        <div className="login-header-alignment">
          <h1>Log in</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-form-alignment">
            <div className="login-form-input">
              <div class="field">
                <input
                  type="email"
                  name="email"
                  required
                  id="email"
                  onChange={handleChange}
                  pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$"
                  tabIndex="0"
                />
                <label
                  for="email"
                  title="Email Id"
                  data-title="Email Id"></label>
              </div>
            </div>
            <div className="login-form-input">
              <div class="field">
                <input
                  type={showPassword?"text":"password"}
                  name="password"
                  required
                  id="password"
                  onChange={handleChange}
                />
                <div className="close-icon-alignment" onClick={handleTogglePassword}>
                {showPassword?<CloseEyeIcon className="icon" />:<EyeIcon className="icon"/>}
                </div>
                <label
                  for="password"
                  title="Password"
                  data-title="Password"></label>
              </div>
            </div>
            <div className="remember-me-text-alignment">
              <div className="check-box-alignment">
                <label class="container">
                  Remember me
                  <input
                    type="checkbox"
                    id="checkmark"
                    checked={rememberMe}
                    onChange={() => dispatch(setRememberMe(!rememberMe))}
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="button-alignment">
              <button>Login</button>
            </div>
            <div className="login-link-alignment">
              <p>
                Don't have an account ?{" "}
                <span onClick={() => history.push("/signup")}>Sign up</span>{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
