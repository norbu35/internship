import styled from "styled-components";
import theme from "../../../../Shared/Theme";

const StyledSlide = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  color: ${theme.colors.font};
  padding: 3em 1em;
  background: linear-gradient(
    101.34deg,
    #e2b795 0%,
    #c0a8db 47.92%,
    #f0ece9 100%
  );

  .container,
  .left-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .container {
    padding: 3em 0;
  }

  .title {
    font-family: ${theme.fonts.header};
    font-size: 2.25rem;
    font-weight: 500;
    text-align: center;
  }

  .subtitle {
    text-align: center;
    padding: 0em 2em;
  }

  .date {
    margin-top: 2em;
    font-size: 0.9em;
  }

  .left-box {
    padding-top: 1em;
    gap: 3em;
  }

  button {
    width: 15em;
  }

  .right-box {
    padding-top: 5em;
    display: flex;
    justify-content: center;
    object-fit: cover;
    width: 100%;
    max-width: 300px;
  }

  img {
    width: 90%;
  }

  @media (min-width: ${theme.sizes.small}) {
    padding: 6em 4em;

    .title {
      font-weight: 500;
    }

    .subtitle {
      font-size: 1.25rem;
    }

    .left-box {
      gap: 4em;
    }

    .btn {
      font-size: 1.25em;
    }

    .right-box {
      padding-top: 6em;
      max-width: 400px;
      width: 90%;
    }
  }

  @media (min-width: ${theme.sizes.medium}) {
    .container {
      padding: 2em 5em;
    }

    .title {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.5rem;
    }

    .btn {
      font-size: 0.75em;
    }

    .left-box {
      min-width: 400px;
    }

    .right-box {
      width: 90%;
    }
  }

  @media (min-width: ${theme.sizes.large}) {
    height: 100vh;
    padding-top: 10em;

    .container {
      flex-direction: row;
    }

    .title {
      font-size: 3rem;
      text-align: left;
    }

    .subtitle {
      font-size: 1rem;
      width: 70%;
      text-align: left;
      padding: 0em;
    }

    .left-box {
      max-width: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 2.5em;
    }

    .btn {
      text-align: center;
      font-size: 1.125em;
    }

    .right-box {
      min-width: 300px;
      max-width: 400px;
      padding-top: 0em;
    }
  }
`;

export default StyledSlide;
