// Libraries
import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
// Datepicker
import * as moment from "moment";
// Custom components
import StyledButton from "../../../../Shared/Button";
// Form validation schema
import { schemaFaq as schema } from "../../services/FormValidation";
// Functions
import { addItem } from "../../../../Shared/services/requests";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import authService from "../../../services/auth";

const newSwal = withReactContent(Swal);

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  backgroundColor: "#FFF",
  padding: "2em 3em",
  zIndex: 1250,
  borderRadius: "12px",
  border: "1px solid #005AAA",
};

const AddItem = ({ isOpen, onClose }) => {
  useEffect(() => reset(), [onClose]);

  const [firstName] = useState(
    JSON.parse(localStorage.getItem("user")).firstName
  );
  const [lastName] = useState(
    JSON.parse(localStorage.getItem("user")).lastName
  );

  useEffect(() => {
    const dtNow = new Date().getTime();
    if (dtNow >= localStorage.getItem("loginExpiration")) handleLogout();
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    navigate("/admin/");
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data, e) => {
    e.preventDefault();

    data.createdDate = moment().format();
    data.createdEmployee = `${lastName} ${firstName}`;
    data.modifiedDate = moment().format();
    data.modifiedEmployee = "";
    data.methodId = 1;

    data = JSON.stringify(data);
    addItem("faq", data)
      .then((resp) => {
        if (
          resp.status >= 200 &&
          resp.status < 300 &&
          resp.data.status === "SUCCESS"
        ) {
          newSwal.fire({
            title: "Амжилттай",
          });
          onClose();
        } else {
          alert("Алдаа гарлаа: " + resp.data.message);
        }
      })
      .catch((err) => {
        alert("Алдаа гарлаа: ", err);
      });
  };

  const CHAR_LIMIT_ANSWER = 1000;
  const CHAR_LIMIT_QUESTION = 100;

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <div style={MODAL_STYLES}>
      <h3>Асуулт хариулт нэмэх</h3>
      <br />
      <form onSubmit={handleSubmit(submitForm)}>
        <InputLabel required>Асуулт</InputLabel>
        <Controller
          name="question"
          {...register("question")}
          ref={null}
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              style={{ width: 600 }}
              error={!!errors.question}
              inputProps={{ maxLength: CHAR_LIMIT_ANSWER }}
              helperText={
                errors.question
                  ? errors.question.message
                  : watch("question")?.length
                  ? watch("question").length + `/${CHAR_LIMIT_QUESTION}`
                  : `0/${CHAR_LIMIT_QUESTION}`
              }
            />
          )}
        />
        <br />
        <br />
        <InputLabel required>Хариулт</InputLabel>
        <Controller
          name="answer"
          {...register("answer")}
          ref={null}
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              style={{ width: 600 }}
              multiline
              minRows={3}
              inputProps={{ maxLength: CHAR_LIMIT_ANSWER }}
              error={!!errors.answer}
              helperText={
                errors.answer
                  ? errors.answer.message
                  : watch("answer")?.length
                  ? watch("answer").length + `/${CHAR_LIMIT_ANSWER}`
                  : `0/${CHAR_LIMIT_ANSWER}`
              }
            ></TextField>
          )}
        />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <InputLabel required id="status">
              Статус
            </InputLabel>
            <Controller
              name="status"
              {...register("status")}
              ref={null}
              defaultValue=""
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    variant="standard"
                    MenuProps={{ disableScrollLock: true }}
                    error={!!errors.status}
                    sx={{
                      width: 230,
                      height: "2.5em",
                      borderWidth: "0px",
                      border: "none",
                    }}
                  >
                    <MenuItem value={1}>Идэвхитэй</MenuItem>
                    <MenuItem value={0}>Идэвхгүй</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.status ? (
                      <span style={{ color: "#c62828" }}>
                        {errors.status.message}
                      </span>
                    ) : null}
                  </FormHelperText>
                </>
              )}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1em",
            marginTop: "3em",
          }}
        >
          <StyledButton type="submit">Нэмэх</StyledButton>
          <StyledButton bgcolor="grey" color="black" onClick={onClose}>
            Цуцлах
          </StyledButton>
        </div>
      </form>
    </div>,
    document.getElementById("portal")
  );
};

export default AddItem;
