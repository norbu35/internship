import StyledFAQ from "./FAQ.styled";
import MuiAccordion from "./MuiAccordion";
import { useEffect, useState } from "react";
import { getItems } from "../../../../Shared/services/requests";

const FAQ = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getItems("faq").then((resp) =>
      setData(resp.data.filter((item) => item.status === 1))
    );
  }, []);

  return (
    <StyledFAQ>
      <h1 className="title">Түгээмэл асуулт, хариулт</h1>
      <div className="container">
        {data.map((item, i) => (
          <MuiAccordion data={item} key={i} index={i} />
        ))}
      </div>
    </StyledFAQ>
  );
};

export default FAQ;
