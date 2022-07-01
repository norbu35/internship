import styled from "styled-components";

const StyledLogin = styled.div`
  .container {
    display: flex;
  }

  .left-half {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  img {
    width: 100%;
    min-width: 1000px;
  }

  button {
    margin-top: 3em;
  }

  .right-half {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 3%;
  }

  .title {
    margin: 16px;
    margin-bottom: 2em;
  }

  .form {
    margin-left: 16px;
  }

  .login {
    padding-left: 4em;
  }

  .fields {
    display: flex;
    flex-direction: column;
    width: 400px;
    gap: 2em;
  }

  .footer {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 1em;
    right: 20%;
  }

  container > div {
    flex: 1;
  }
`;

export default StyledLogin;
