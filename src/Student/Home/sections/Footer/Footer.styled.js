import styled from "styled-components";
import theme from "../../../../Shared/Theme";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.main};
  padding: 2em 0;
  gap: 1em;

  img {
    width: 1em;
  }

  .icons {
    display: flex;
    align-items: center;
    gap: 1em;
  }
`;

export default StyledFooter;
