import React from "react";
// Images
import StyledTestimonials from "./Testimonials.styled";
import { useState, useEffect } from "react";
// Images
import Next from "./images/next-arrow.png"; //prev-arrow is next-arrow rotated 180deg
import Avatar from "./images/avatar.png";
import Quote from "./images/quote.svg";
// Functions
import { getItems } from "../../../../Shared/services/requests";

const Testimonials = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 150) {
      nextPage();
    }

    if (touchStart - touchEnd < -150) {
      prevPage();
    }
  }

  useEffect(() => {
    getItems("comment")
      .then((resp) => setData(resp.data.filter((item) => item.status === 1)))
      .catch((err) => alert("Алдаа гарлаа ", err));
  }, []);

  const nextPage = () => {
    setPage(page + 1);
    if (page >= data.length - 1) setPage(0);
  };

  const prevPage = () => {
    setPage(page - 1);
    if (page <= 0) setPage(data.length - 1);
  };

  return (
    <StyledTestimonials>
      <div
        className="testimonial-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="prev-arrow">
          <input type="image" src={Next} onClick={prevPage} />
        </div>
        <div className="testimonial">
          <img src={Quote} className="quote-mark" alt="quote icon" />
          <img
            src={data[page]?.image ? data[page].image : Avatar}
            className="avatar"
            alt="user avatar"
          />
          <p className="student-name">
            {data[page]?.firstname} {data[page]?.lastname}
          </p>
          <p className="student-profession">{data[page]?.profession}</p>
          <p className="testimonial-text">{data[page]?.comment}</p>
        </div>
        <div className="next-arrow">
          <input type="image" src={Next} onClick={nextPage} />
        </div>
      </div>
    </StyledTestimonials>
  );
};

export default Testimonials;
