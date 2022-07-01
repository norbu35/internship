import React from "react";
import defaultImg from "./images/img.png";
import StyledButton from "../../../../Shared/Button";
import StyledSlide from "./Slide.styled";
import { useNavigate, Link } from "react-router-dom";
import { formatDate } from "../../../../Admin/Panel/views/Scholarships/ScholarshipTable";

function Slide({ data, slideNo }) {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/form");
  // };

  return (
    <StyledSlide>
      <div className="container">
        <div className="left-box">
          <div className="title">{data[slideNo]?.scholarshipName}</div>
          <div className="subtitle">
            {data[slideNo]?.scholarshipDescription}
            <div class="date">
              Хөтөлбөр явагдах хугцаа:
              <br />
              {formatDate(data[slideNo]?.startDate)} -{" "}
              {formatDate(data[slideNo]?.endDate)}
            </div>
          </div>
          <div className="btn">
            {data[slideNo]?.open ? (
              <Link to="/form" state={data[slideNo]}>
                <StyledButton bgcolor={"#21286A"}>АНКЕТ ИЛГЭЭХ</StyledButton>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="right-box">
          <img
            src={data[slideNo]?.image ? data[slideNo].image : defaultImg}
            alt="scholarship image"
          />
        </div>
      </div>
    </StyledSlide>
  );
}

export default Slide;
