import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const authURL = `${process.env.REACT_APP_API_URL}/api/user/login`;

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    const { data } = await axios.post(authURL, user);
    if (data.user.mentor) {
      console.log("data login>>", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } else {
      navigate(`/socket/${data.user.Username}`);
    }
  };

  return (
    <div className="loginPage">
      <div>
        <img alt="" width="100" style={{ alignSelf: "center" }} /> <br />
        <div
          class="title is-4"
          style={{ color: "white", "font-weight": "700" }}
        >
          Sign In
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <div className="button">
              <button className="loginBtn" onClick={login}>
                Sign In
              </button>{" "}
              <br />
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
