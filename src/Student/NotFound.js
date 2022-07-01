import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../Shared/Theme";
// Components
import Header from "../Student/Home/sections/Header/Header";
import StyledButton from "../Shared/Button";

const StyledNotFound = styled.div`
  display: flex;
  position: relative;
  top: 4em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 8em;
  color: ${theme.colors.font};

  h1 {
    font-size: 200px;
  }

  h5 {
    font-size: 40px;
    padding-left: 0.5em;
  }

  h6 {
    font-size: 14px;
    margin: 2em 0;
    color: #404046;
  }

  button {
    width: 15em;
    height: 3em;
  }
`;

const NotFound = () => {
  return (
    <>
      <Header />
      <StyledNotFound>
        <h1>404</h1>
        <h5>Oops...</h5>
        <h6>Таны хайсан хуудас байхгүй байна.</h6>
        <Link to="/">
          <StyledButton color={"white"}>Нүүр хуудасруу буцах</StyledButton>
        </Link>
      </StyledNotFound>
    </>
  );
};

export default NotFound;
