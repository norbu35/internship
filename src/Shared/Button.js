import styled from "styled-components";
import theme from "../Shared/Theme";

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.bgcolor ? props.bgcolor : theme.colors.buttonAlt};
  color: ${(props) => (props.color ? props.color : "white")};
  width: 10em;
  height: 3em;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  box-shadow: none;
`;

const Button = ({ children, color, bgcolor, ...props }) => {
  return (
    <StyledButton color={color} bgcolor={bgcolor} onClick={props.onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
