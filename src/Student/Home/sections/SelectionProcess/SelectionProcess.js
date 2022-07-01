// Images
import arrow from "./images/arrow.svg";
import StyledSelectionProcess from "./SelectionProcess.styled";

const SelectionProcess = () => {
  return (
    <StyledSelectionProcess>
      <h1 className="title">Сонгон шалгаруулалтын дараалал</h1>
      <div className="container">
        <div className="step-container">
          <div className="step">
            <div className="square">1</div>
            <div className="step-text">Анкет хүлээн авах</div>
          </div>
          <div className="arrow">
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="step-container">
          <div className="step">
            <div className="square">2</div>
            <div className="step-text">Оюутны анкеттай танилцах</div>
          </div>
          <div className="arrow">
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="step-container">
          <div className="step">
            <div className="square">3</div>
            <div className="step-text">Сонгон шалгаруулах</div>
          </div>
          <div className="arrow">
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="step-container">
          <div className="step">
            <div className="square">4</div>
            <div className="step-text" style={{ justifyContent: "flex-start" }}>
              Шийдвэр
            </div>
          </div>
        </div>
      </div>
    </StyledSelectionProcess>
  );
};

export default SelectionProcess;
