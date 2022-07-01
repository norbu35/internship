// Images
import lamp from "./images/lamp.png";
import circles from "./images/circles.png";
import laptop from "./images/laptop.png";
import palette from "./images/palette.png";
import phone from "./images/phone.png";
import window from "./images/window.png";

import StyledAboutUs from "./AboutUs.styled";

const AboutUs = () => {
  return (
    <StyledAboutUs>
      <h1 className="title">Бидний нэг болсноор</h1>
      <div className="flex-container">
        <div className="flex-column">
          <div className="flex-item">
            <img src={lamp} alt="lamp" />
            <div className="flex-item-text">
              Эрч хүчтэй, бүтээлч, чадварлаг хамт олон
            </div>
          </div>
          <div className="flex-item">
            <img src={circles} alt="circles" />
            <div className="flex-item-text">
              Мэргэжлийн чадварлаг банкируудтай хамт өсөж дэвжих боломж
            </div>
          </div>
          <div className="flex-item">
            <img src={laptop} alt="laptop" />
            <div className="flex-item-text">Тасралтгүй сурч хөгжих боломж</div>
          </div>
        </div>
        <div className="flex-column">
          <div className="flex-item">
            <img src={window} alt="window" />
            <div className="flex-item-text">
              Ажлын байрны таатай орчин нөхцөл
            </div>
          </div>
          <div className="flex-item">
            <img src={palette} alt="palette" />
            <div className="flex-item-text">
              Өрсөлдөхүйц цалин хөлс, урамшуулал
            </div>
          </div>
          <div className="flex-item">
            <img src={phone} alt="phone" />
            <div className="flex-item-text">
              Бүх төрлийн нийгэм, ахуйн хөнгөлөлт, хангамж
            </div>
          </div>
        </div>
      </div>
    </StyledAboutUs>
  );
};

export default AboutUs;
