import styled from "styled-components";
import theme from "../../../../Shared/Theme";

const StyledAboutUs = styled.section`
  padding-top: 4em;
  color: ${theme.colors.font};
  background: white;
  text-align: center;

  .title {
    font-size: 1.75rem;
    font-weight: 400;
    padding: 1em;
    margin-bottom: 2em;
  }

  .flex-container {
    gap: 1em;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
  }

  .flex-column {
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
  }

  .flex-item {
    margin-bottom: 1em;
    display: flex;
    height: 10em;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .flex-item-text {
    height: 60%;
    max-width: 10em;
  }

  @media (min-width: ${theme.sizes.medium}) {
    .flex-container {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2em;
    }
    .flex-column {
      width: 80%;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 4em;
    }

    flex-item {
      max-width: 10em;
    }

    .flex-item-text {
      height: 60%;
      max-width: 15em;
    }
  }

  @media (min-width: ${theme.sizes.large}) {
    .title {
      padding: 1.5em 0;
    }
    .flex-container {
      padding: 4em 0 2em 0;
      gap: 6em;
    }
    .flex-column {
      gap: 10em;
    }
    .flex-item {
      max-width: 8em;
    }
  }

  @media (min-width: ${theme.sizes.xlarge}) {
    .title {
      font-size: 2rem;
    }
    .flex-container {
      padding: 2em;
      gap: 8em;
    }
    .flex-column {
      gap: 12em;
    }
    .flex-item {
      max-width: 8em;
    }
  }
`;

export default StyledAboutUs;
