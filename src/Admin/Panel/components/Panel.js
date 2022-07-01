// Libraries
import React, { useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
// MUI Components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// Table views
import ScholarshipTable from "../views/Scholarships/ScholarshipTable";
import FAQTable from "../views/FAQ/FAQTable";
import TestimonialTable from "../views/Testimonials/TestimonialTable";
// Icons
import ScholarshipIcon from "../icons/Scholarship.svg";
import FaqIcon from "../icons/Faq.svg";
import TestimonialIcon from "../icons/Testimonial.svg";
import MenuIcon from "../icons/Menu.svg";
import ChevronLeft from "../icons/ChevronLeft.svg";
// Images
import Logo from "../images/Logo.png";
// Components
import StyledButton from "../../../Shared/Button";
import { logout } from "../../../Shared/services/requests";
// Pages
import Login from "../../Login/Login";

const drawerWidth = 290;

const openedMixin = (theme) => ({
  width: drawerWidth,
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "white",
  borderBottom: "1px solid lightgrey",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: "white",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Frame() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  var location = useLocation();

  useEffect(() => {
    const dtNow = new Date().getTime();
    if (dtNow >= localStorage.getItem("loginExpiration")) handleLogout();
  });

  const itemList = [
    {
      text: "Хөтөлбөр",
      url: "ScholarshipTable",
      icon: ScholarshipIcon,
    },
    {
      text: "Оюутны сэтгэгдэл",
      url: "TestimonialTable",
      icon: TestimonialIcon,
    },
    {
      text: "Түгээмэл асуулт хариулт",
      url: "FAQTable",
      icon: FaqIcon,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/admin/");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!localStorage.getItem("user")) {
    return <Login />;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} elevation={0}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              color="default"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <img src={MenuIcon} width={30} alt="menu icon" />
            </IconButton>
            {open ? (
              <img
                src={Logo}
                style={{ margin: "0 auto" }}
                alt="Golomt Bank Logo"
              />
            ) : (
              <img src={Logo} alt="Golomt Bank Logo" />
            )}
            <div onClick={handleLogout}>
              <StyledButton bgcolor={"gray"} color={"black"}>
                Гарах
              </StyledButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader
            elevation={0}
            sx={{
              bgcolor: "white",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              <img
                src={ChevronLeft}
                style={{ position: "relative", left: "245px", width: "40px" }}
                alt="Chevron left icon"
              />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List sx={{ pl: "1px" }}>
            {itemList.map((item) => {
              const { text, url, icon } = item;
              return (
                <ListItem button key={text}>
                  <Link to={url}>
                    <ListItemIcon>
                      <img src={icon} width={30} alt="icon" />
                    </ListItemIcon>
                  </Link>
                  <Link
                    to={url}
                    style={{
                      textDecoration: "none",
                      color: "grey",
                      ...(location.pathname === `/admin/panel/${url}` && {
                        color: "black",
                      }),
                    }}
                  >
                    <ListItemText primary={text} />
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader sx={{ mb: "-1.5em" }} />
          <Routes>
            <Route path="/" element={<ScholarshipTable />} />
            <Route path="ScholarshipTable" element={<ScholarshipTable />} />
            <Route path="FAQTable" element={<FAQTable />} />
            <Route path="TestimonialTable" element={<TestimonialTable />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
