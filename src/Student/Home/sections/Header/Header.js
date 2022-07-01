// Components
import BasicPopover from "./Popover";
import StyledHeader from "./Header.styled";
// Images
import LogoWhite from "./images/GolomtLogo_white.png";
import LogoBlue from "./images/GolomtLogo_blue.png";
// Icons
import Email from "./images/email.svg";
import Phone from "./images/phone.svg";

const Header = ({ logoColor }) => {
  return (
    <StyledHeader>
      <div className="logo">
        {logoColor === "white" ? (
          <img src={LogoWhite} alt="Golomt logo" />
        ) : (
          <img src={LogoBlue} alt="Golomt logo" />
        )}
      </div>
      <div className="contact">
        <img src={Phone} className="icon" alt="email icon" /> 7575 -1111 (-1705)
        (-1706) (-1665)
        <img src={Email} className="icon" alt="phone icon" />
        hr@golomtbank.com
      </div>
      <nav className="menu">
        <BasicPopover />
      </nav>
    </StyledHeader>
  );
};

export default Header;
