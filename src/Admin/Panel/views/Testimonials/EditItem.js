// Libraries
import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
// MUI components
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import * as moment from "moment";
// Custom components
import StyledButton from "../../../../Shared/Button";
// Form validation schema
import { schemaTestimonial as schema } from "../../services/FormValidation";
// Functions
import { editItem } from "../../../../Shared/services/requests";
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

const EditItem = ({ isOpen, onClose, item }) => {
  const [image, setImage] = useState(item?.image);
  const [firstName] = useState(
    JSON.parse(localStorage.getItem("user")).firstName
  );
  const [lastName] = useState(
    JSON.parse(localStorage.getItem("user")).lastName
  );
  useEffect(() => reset(item), [onClose]);
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

  const convert2base64 = (file) => {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const submitForm = async (data, e) => {
    e.preventDefault();

    const dataURL = await convert2base64(data.image[0]);

    const editedData = {
      ...item,
      ...data,
      modifiedEmployee: `${lastName} ${firstName}`,
      modifiedDate: moment().format(),
      methodId: 2,
      image: dataURL,
    };
    data = JSON.stringify(editedData);

    editItem("comment", data)
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

  const CHAR_LIMIT = 1000;

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <div style={MODAL_STYLES}>
      <h3>Сэтгэгдэл өөрчлөх</h3>
      <br />
      <form onSubmit={handleSubmit(submitForm)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <InputLabel required>Оюутны овог</InputLabel>
            <Controller
              name="lastname"
              {...register("lastname")}
              ref={null}
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  style={{ width: 285 }}
                  error={!!errors.lastname}
                  helperText={errors.lastname ? errors.lastname.message : null}
                />
              )}
            />
          </div>
          <div>
            <InputLabel required>Оюутны нэр</InputLabel>
            <Controller
              name="firstname"
              {...register("firstname")}
              ref={null}
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  style={{ width: 285 }}
                  error={!!errors.firstname}
                  helperText={
                    errors.firstname ? errors.firstname.message : null
                  }
                />
              )}
            />
          </div>
        </div>
        <br />
        <div>
          <InputLabel required>Оюутны мэргэжил</InputLabel>
          <Controller
            name="profession"
            {...register("profession")}
            ref={null}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                style={{ width: 600 }}
                error={!!errors.profession}
                helperText={
                  errors.profession ? errors.profession.message : null
                }
              />
            )}
          />
        </div>
        <br />
        <InputLabel required>Сэтгэгдэл</InputLabel>
        <Controller
          name="comment"
          {...register("comment")}
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
              inputProps={{ maxLength: CHAR_LIMIT }}
              error={!!errors.comment}
              helperText={
                errors.comment
                  ? errors.comment.message
                  : watch("comment")?.length
                  ? watch("comment").length + `/${CHAR_LIMIT}`
                  : `0/${CHAR_LIMIT}`
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
          <div style={{ margin: "0 12px" }}>
            <InputLabel>Зураг хавсаргах</InputLabel>
            <div
              style={{
                height: "2.5em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                accept="image/*"
                name="image"
                {...register("image")}
                onChange={function (event) {
                  setImage(URL.createObjectURL(event.target.files[0]));
                }}
              />
            </div>
            <img
              src={image ? image : item.image}
              alt="scholarship image"
              style={{ height: "75px" }}
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
          <StyledButton type="submit">Хадгалах</StyledButton>
          <StyledButton
            bgcolor="grey"
            color="black"
            onClick={() => {
              onClose();
              setImage();
            }}
          >
            Цуцлах
          </StyledButton>
        </div>
      </form>
    </div>,
    document.getElementById("portal")
  );
};

export default EditItem;
