import React from "react";
import "./Signup.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useCallback } from "react";
import { userSignup } from "../Home/redux/reducer";
import toast from "react-hot-toast";
import CloseEyeIcon from "../../Icons/closeEye";
import EyeIcon from "../../Icons/eyeIcon";

const initial = { name: "", confirmpassword: "", email: "", password: "" };
export default function SignUp() {
  const [formState, setFormState] = useState({ ...initial });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({});

  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await dispatch(userSignup(formState))
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success("Signup successfully");
              history.push("/login");
            } else {
              toast.error(res?.message);
            }
          });
      } catch (error) {
        toast.error(error?.message);
      }
    },
    [
      formState.email,
      formState.password,
      formState.name,
      formState.confirmpassword,
    ]
  );
  const handleTogglePassword = (e) => {
    e.stopPropagation()
    setShowPassword(!showPassword)
  };
  return (
    <div className="signup-section">
      <div className="signup-details-alignment">
        <div className="signup-header-alignment">
          <h1>Sign up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="signup-form-alignment">
            <div className="signup-form-input">
              <div class="field">
                <input
                  type="text"
                  required
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
                <label
                  for="name"
                  title="Full name"
                  data-title="Full name"
                ></label>
              </div>
            </div>
            <div className="signup-form-input">
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
                  data-title="Email Id"
                ></label>
              </div>
            </div>
            <div className="signup-form-input">
              <div class="field">
                <input
                  type={showPassword?"text":"password"}
                  required
                  name="password"
                  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  title="Must contain at least one number, uppercase, lowercase, specialchar and at least 8 or more characters"
                  onChange={handleChange}
                  id="password"
                />
                     <div className="close-icon-alignment" onClick={handleTogglePassword}>
                {showPassword?<CloseEyeIcon className="icon" />:<EyeIcon className="icon"/>}
                </div>
                <label
                  for="password"
                  title="Password"
                  data-title="Password"
                ></label>
              </div>
            </div>
            <div className="signup-form-input">
              <div class="field">
                <input
                  type="password"
                  required
                  name="confirmpassword"
                  title="Confirm Password must match the password!"
                  pattern={formState?.password}
                  onChange={handleChange}
                  id="confirmpassword"
                />
                <label
                  for="confirmpassword"
                  title="Confirm password"
                  data-title="Confirm password"
                ></label>
              </div>
            </div>

            <div className="button-alignment">
              <button>Signup</button>
            </div>
            <div className="signup-link-alignment">
              <p>
                Already have a signup ?{" "}
                <span onClick={() => history.push("/login")}>Log in</span>{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
