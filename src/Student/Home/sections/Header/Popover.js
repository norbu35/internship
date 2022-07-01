import * as React from "react";
import { useState, useEffect } from "react";
// MUI components
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { List, ListItem } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// Functions
import { getItems } from "../../../../Shared/services/requests";

const theme = createTheme({
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: "15px",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: "1em",
          ":hover": {
            backgroundColor: "rgba(33,40,106,0.2)",
          },
        },
      },
    },
  },
});

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getItems("scholarship")
      .then((resp) => setData(resp.data))
      .catch((err) => alert("Алдаа гарлаа ", err));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
        <div onClick={handleClick}>Хөтөлбөрүүд</div>
        <Popover
          id={id}
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          disableScrollLock={true}
        >
          <Typography component={"div"}>
            <List sx={{ listStyleType: "none" }}>
              {data.map((item, i) => (
                <ListItem key={i}>{data[i].scholarshipName}</ListItem>
              ))}
            </List>
          </Typography>
        </Popover>
      </div>
    </ThemeProvider>
  );
}
