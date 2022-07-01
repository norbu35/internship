import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import Home from "./Student/Home/sections";
import NotFound from "./Student/NotFound";
import Form from "./Student/Form/Anket";
import Login from "./Admin/Login/Login";
import Panel from "./Admin/Panel/components/Panel";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ""}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/panel/*" element={<Panel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
