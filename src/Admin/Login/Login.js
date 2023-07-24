import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth";
import StyledButton from "../../Shared/Button";
import img from "./images/Login.png";
import StyledLogin from "./Login.styled";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/admin/panel");
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(data).then(() => {
        navigate("/admin/panel");
        window.location.reload();
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <StyledLogin>
      <div className="container">
        <div className="left-half">
          <img src={img} alt="Golomt HQ" />
        </div>
        <div className="right-half">
          <h2 className="title">Нэвтрэх хэсэг</h2>
          <form onSubmit={handleSubmit}>
            <Box className="form">
              <Box className="fields">
                <TextField
                  variant="standard"
                  placeholder="Нэвтрэх нэр"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  name="password"
                  type="password"
                  placeholder="Нууц үг"
                  value={data.password}
                  onChange={handleChange}
                />
              </Box>
              <StyledButton type="submit">Нэвтрэх</StyledButton>
            </Box>
          </form>
          <div className="footer">©2022 Голомт Банк</div>
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;
