import styled from "styled-components";
import theme from "../../../../Shared/Theme";

const StyledFAQ = styled.section`
  margin: 4em auto;
  width: 75%;

  .title {
    text-align: center;
    font-size: 1.75rem;
    font-weight: 500;
    margin-bottom: 2em;
    color: ${theme.colors.main};
  }

  @media (min-width: ${theme.sizes.large}) {
    .container {
      gap: 1em;
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: repeat(5, auto);
    }
  }

  @media (min-width: ${theme.sizes.xlarge}) {
    .title {
      font-size: 2rem;
    }
  }
`;

export default StyledFAQ;
