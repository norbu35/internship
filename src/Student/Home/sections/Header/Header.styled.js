import styled from "styled-components";
import theme from "../../../../Shared/Theme";

const StyledHeader = styled.header`
  position: absolute;
  padding: 2em;
  margin-top: -2em;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  z-index: 10;
  font-size: 10px;

  .logo > * {
    width: 15em;
  }

  .icon {
    width: 1em;
    vertical-align: center;
    margin-left: 1em;
    margin-right: 0.5em;
  }

  .logo {
    width: 18%;
    display: flex;
    align-items: center;
  }

  .contact {
    font-size: rem;
    font-weight: bold;
    color: ${theme.colors.main};
    display: none;
    align-items: center;
    justify-content: center;
  }

  .menu {
    font-size: 0.9rem;
    color: ${theme.colors.main};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    width: 18%;
  }

  @media (min-width: ${theme.sizes.medium}) {
    padding: 3em;

    .logo > * {
      width: 18em;
    }

    .contact {
      display: flex;
      font-size: 1.3em;
    }

    .menu {
      font-size: 1rem;
    }
  }

  @media (min-width: ${theme.sizes.large}) {
    padding: 3em 7em;

    .logo > * {
      width: 20em;
    }
`;

export default StyledHeader;
