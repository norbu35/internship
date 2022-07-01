import styled from "styled-components";
import theme from "../../../../Shared/Theme";

const StyledSelectionProcess = styled.section`
  color: ${theme.colors.font};
  background: white;
  text-align: center;
  font-size: 1.2rem;
  padding-bottom: 2em;
}

.arrow {
  transform: rotate(90deg);
  position: relative;
  left: -104px;
}

.container {
  padding: 4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  display: block;
  font-size: 1.75rem;
  font-weight: 400;
  padding: 1em;
}

.step {
  display: flex;
  justify-content: center;
  gap: 2.5em;
}

.square {
  font-size: 1.2rem;
  font-style: italic;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.main};
  width: 75px;
  height: 75px;
  border-radius: 20px;
}

.step-text {
  display: flex;
  width: 8em;
  align-items: center;
  justify-content: center;
  text-align: left;
}

.arrow {
  padding: 0.5em 0;
}

@media (min-width: ${theme.sizes.xlarge}) {
  .title {
    font-size: 2rem;
  }

  padding: 2em;
  img {
    transform: rotate(-90deg);
    height: 2rem;
  }

  .container {
    margin-left: -10em;
    flex-direction: row;
    justify-content: space-around;
  }

  .step-container {
    display: flex;
    width: 20px;
  }

  .step-text {
    margin-left: -1em;
  }

  .arrow {
    margin-left: 1em;
    margin-top: 0.70em;
    left: -5px;
    top: -5px;
  }

`;

export default StyledSelectionProcess;
