import * as React from "react";
import { useState } from "react";
// MUI
import { styled } from "@mui/material/styles";
import expandeIcon from "./images/expand.png";
import collapseIcon from "./images/collapse.png";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import Theme from "../../../../Shared/Theme";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  justifySelf: "stretch",
  alignSelf: "strech",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    border: "1px solid lightgrey",
    borderRadius: "15px",
    color: `${Theme.colors.main}`,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .01)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: "none",
}));

export default function CustomizedAccordions(inData, index) {
  const [item] = useState(inData.data);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Accordion onChange={handleChange(index)} sx={{ marginBottom: "1em" }}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "15px",
              marginLeft: "-5px",
            }}
          >
            <img
              src={expanded ? collapseIcon : expandeIcon}
              alt="expand icon"
              style={{
                width: "15px",
              }}
            />
          </div>
          <Typography fontWeight="bold">{item.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{item.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
