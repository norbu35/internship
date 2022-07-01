import StyledFooter from "./Footer.styled";
// Icons
import facebook from "./images/facebook.svg";
import twitter from "./images/twitter.svg";
import instagram from "./images/instagram.svg";
import linkedin from "./images/linkedin.svg";

const Footer = () => {
  return (
    <StyledFooter>
      <div className="icons">
        <a href="https://www.facebook.com/Golomtbank/" target="_blank">
          <img src={facebook} alt="facebook icon" />
        </a>
        <a href="https://twitter.com/golomtbank/" target="_blank">
          <img src={twitter} alt="twitter icon" />
        </a>
        <a href="https://www.instagram.com/golomtbank/" target="_blank">
          <img src={instagram} alt="instagram icon" />
        </a>
        <a href="https://mn.linkedin.com/company/golomtbank" target="_blank">
          <img src={linkedin} alt="linkedin icon" />
        </a>
      </div>
      <div className="text">&#169;Copyright 2022. Golomt bank</div>
    </StyledFooter>
  );
};

export default Footer;
