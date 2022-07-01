// Libraries
import React from "react";
import { useEffect } from "react";
import ReactDom from "react-dom";
import StyledButton from "../../../../Shared/Button";
import { deleteItem } from "../../../../Shared/services/requests";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import authService from "../../../services/auth";
import { useNavigate } from "react-router-dom";

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
    deleteItem("faq", id)
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

  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    navigate("/admin/");
  };

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <div style={MODAL_STYLES}>
      <h3 style={{ paddingLeft: "3px", margin: "" }}>
        Асуулт хариултыг устгах уу?
      </h3>
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
        <h3>Асуулт</h3>
        <p>{item.question}</p>
        <br />
        <h3>Хариулт</h3>
        <p>{item.answer}</p>
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
