// Libraries
import React from "react";
import ReactDom from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Custom components
import StyledButton from "../../../../Shared/Button";
import authService from "../../../services/auth";
// Functions
import { deleteItem } from "../../../../Shared/services/requests";

const newSwal = withReactContent(Swal);

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  backgroundColor: "#FFF",
  padding: "3em",
  zIndex: 1250,
  borderRadius: "12px",
  border: "1px solid #005AAA",
};

const DeleteItem = ({ isOpen, onClose, item }) => {
  const handleSubmit = () => {
    const id = item.id;
    deleteItem("scholarship", id)
      .then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          newSwal.fire({
            title: "Амжилттай",
          });
          onClose();
        }
      })
      .catch((err) => {
        alert("Алдаа гарлаа: ", err);
      });
    onClose();
  };

  useEffect(() => {
    const dtNow = new Date().getTime();
    if (dtNow >= localStorage.getItem("loginExpiration")) handleLogout();
  });

  const formatDate = (str) => {
    return str?.split("T")[0];
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    navigate("/admin/");
  };

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <div style={MODAL_STYLES}>
      <h3 style={{ paddingLeft: "3px", margin: "" }}>Хөтөлбөрийг устгах уу?</h3>
      <br />
      <hr />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h4>Хөтөлбөрийн нэр</h4>
        <p>{item.scholarshipName}</p>
        <br />
        <h4>Хөтөлбөрийн тайлбар</h4>
        <p style={{ maxWidth: "700px", overflowWrap: "break-word" }}>
          {item.scholarshipDescription}
        </p>
        <br />
        <h4>Бүртгэсэн огноо</h4>
        <p>{formatDate(item.createdDate)}</p>
        <br />
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2em",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1em",
            }}
          >
            <StyledButton bgcolor="grey" color="black" onClick={onClose}>
              Цуцлах
            </StyledButton>
            <StyledButton bgcolor="#a51919" onClick={handleSubmit}>
              Устгах
            </StyledButton>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DeleteItem;
