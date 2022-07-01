import styled from "styled-components";
import theme from "../../../../Shared/Theme";
import Background from "./images/background.png";

const StyledTestimonials = styled.section`
  background-image: url(${Background});
  background-size: cover;
  height: 450px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-wrap: anywhere;

  .prev-arrow {
    transform: rotate(180deg);
  }

  .prev-arrow,
  .next-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
  }
}

  button {
    border-radius: 50%;
  }

  .testimonial-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .testimonial {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & * {
    margin: 0.3em;
  }

  img {
    height: 100%;
    width: 100%;
  }

  .quote-mark {
    position: relative;
    top: 2em;
    left: -3em;
    width: 30px;
    height: auto;
  }

  .avatar {
    vertical-align: middle;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }

  .student-name {
    font-family: "Times New Roman", serif;
    font-size: 0.9em;
  }

  .student-profession {
    color: grey;
    font-size: 0.9em;
  }

  .testimonial-text {
    padding: 0.25em;
    width: 95%;
  }

  @media (min-width: ${theme.sizes.medium}) {
    height: 580px;

    .testimonial-container {
      margin-top: -4em;
      gap: 1.5em;
      width: 95%;
      height: 70%;
    }

    .testimonial {
      gap: 0.5em;
    }

    .quote-mark {
      top: 2.5em;
      left: -4em;
      width: 40px;
    }

    .avatar {
      width: 100px;
      height: 100px;
    }

    .prev-arrow,
    .next-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      display: block;
    }
  }

  @media (min-width: ${theme.sizes.large}) {
    background-size: cover;
    height: 900px;
    background-repeat: no-repeat;

    .testimonial-container {
      margin-top: 6em;
      width: 85%;
      height: 70%;
      align-items: center;
    }

    .quote-mark {
      top: 3em;
      left: -5em;
    }

    .avatar {
      height: 110px;
      width: 110px;
    }

    .testimonial-text {
      max-width: 800px;
    }
    
    .prev-arrow, .next-arrow {
      position: relative;
      top: -5em;
    }
  }
`;

export default StyledTestimonials;
