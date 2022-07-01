// Libraries
import React, { useState } from "react";
import ReactDom from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";
// Datepicker
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import * as moment from "moment";
// Custom components
import StyledButton from "../../../../Shared/Button";
import { schemaScholarship as schema } from "../../services/FormValidation";
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
  const [firstName] = useState(
    JSON.parse(localStorage.getItem("user")).firstName
  );
  const [lastName] = useState(
    JSON.parse(localStorage.getItem("user")).lastName
  );
  const [image, setImage] = useState();

  useEffect(() => {
    reset(item);
  }, [onClose]);

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
    let dataURL = item.image;
    if (data.image !== item.image) {
      dataURL = await convert2base64(data.image[0]);
    }

    data.startDate = moment(data.startDate).format();
    data.endDate = moment(data.endDate).format();
    const editedData = {
      ...item,
      ...data,
      image: dataURL,
      modifiedEmployee: `${lastName} ${firstName}`,
      modifiedDate: moment().format(),
      methodId: 2,
    };
    data = JSON.stringify(editedData);

    editItem("scholarship", data)
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

  const CHAR_LIMIT_SCHOLARSHIPNAME = 100;
  const CHAR_LIMIT_SCHOLARSHIPDESCRIPTION = 1000;

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <div style={MODAL_STYLES}>
      <h3>Хөтөлбөр өөрчлөх</h3>
      <form onSubmit={handleSubmit(submitForm)}>
        <br />
        <InputLabel required>Хөтөлбөрийн нэр</InputLabel>
        <Controller
          name="scholarshipName"
          {...register("scholarshipName")}
          ref={null}
          control={control}
          defaultValue={item.scholarshipName}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              style={{ width: 600 }}
              inputProps={{ maxLength: CHAR_LIMIT_SCHOLARSHIPNAME }}
              error={!!errors.scholarshipName}
              helperText={
                errors.scholarshipName
                  ? errors.scholarshipName.message
                  : watch("scholarshipName")?.length
                  ? watch("scholarshipName").length +
                    `/${CHAR_LIMIT_SCHOLARSHIPNAME}`
                  : `0/${CHAR_LIMIT_SCHOLARSHIPNAME}`
              }
            ></TextField>
          )}
        />
        <br />
        <br />
        <InputLabel required>Хөтөлбөрийн тайлбар</InputLabel>
        <Controller
          name="scholarshipDescription"
          {...register("scholarshipDescription")}
          ref={null}
          control={control}
          defaultValue={
            item.scholarshipDescription ? item.scholarshipDescription : ""
          }
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              style={{ width: 600 }}
              multiline
              minRows={3}
              inputProps={{ maxLength: CHAR_LIMIT_SCHOLARSHIPDESCRIPTION }}
              error={!!errors.scholarshipDescription}
              helperText={
                errors.scholarshipDescription
                  ? errors.scholarshipDescription.message
                  : watch("scholarshipDescription")?.length
                  ? watch("scholarshipDescription").length +
                    `/${CHAR_LIMIT_SCHOLARSHIPDESCRIPTION}`
                  : `0/${CHAR_LIMIT_SCHOLARSHIPDESCRIPTION}`
              }
            ></TextField>
          )}
        />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
              <InputLabel required>Хөтөлбөр эхлэх хугацаа</InputLabel>
              <Controller
                name="startDate"
                {...register("startDate")}
                ref={null}
                defaultValue={item.startDate}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    openTo="day"
                    views={["year", "month", "day"]}
                    inputFormat="yyyy-MM-dd"
                    mask={null}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {errors.startDate ? (
                          <input
                            ref={inputRef}
                            {...inputProps}
                            style={{
                              padding: "0.75em",
                              width: "230px",
                              borderWidth: "0px",
                              border: "none",
                              borderBottom: "2px solid #c62828",
                            }}
                          />
                        ) : (
                          <input
                            ref={inputRef}
                            {...inputProps}
                            style={{
                              padding: "0.75em",
                              width: "230px",
                              borderWidth: "0px",
                              border: "none",
                              borderBottom: "1px solid gray",
                            }}
                          />
                        )}
                        {InputProps?.endAdornment}
                      </Box>
                    )}
                  />
                )}
              />
              <div style={{ fontSize: 12, color: "#d32f2f" }}>
                {errors.startDate ? errors.startDate.message : null}
              </div>
            </div>
            <div>
              <InputLabel required>Хөтөлбөр дуусах хугацаа</InputLabel>
              <Controller
                {...register("endDate")}
                ref={null}
                control={control}
                defaultValue={item.endDate}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    openTo="day"
                    views={["year", "month", "day"]}
                    inputFormat="yyyy-MM-dd"
                    mask={null}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {errors.endDate ? (
                          <input
                            ref={inputRef}
                            {...inputProps}
                            style={{
                              padding: "0.75em",
                              width: "230px",
                              borderWidth: "0px",
                              border: "none",
                              borderBottom: "2px solid #c62828",
                            }}
                          />
                        ) : (
                          <input
                            ref={inputRef}
                            {...inputProps}
                            style={{
                              padding: "0.75em",
                              width: "230px",
                              borderWidth: "0px",
                              border: "none",
                              borderBottom: "1px solid gray",
                            }}
                          />
                        )}
                        {InputProps?.endAdornment}
                      </Box>
                    )}
                  />
                )}
              />
              <div style={{ fontSize: 12, color: "#c62828" }}>
                {errors.endDate ? errors.endDate.message : null}
              </div>
            </div>
          </LocalizationProvider>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <InputLabel required>Хөтөлбөрийн статус</InputLabel>
            <Controller
              name="status"
              {...register("status")}
              ref={null}
              defaultValue={item.status}
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    variant="standard"
                    defaultValue=""
                    MenuProps={{ disableScrollLock: true }}
                    error={!!errors.status}
                    sx={{
                      width: 230,
                      height: "2.5em",
                      borderWidth: "0px",
                      border: "none",
                      padding: "0.75em",
                    }}
                  >
                    <MenuItem value="1">Идэвхитэй</MenuItem>
                    <MenuItem value="0">Идэвхгүй</MenuItem>
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
                name="image"
                accept="image/*"
                {...register("image")}
                onChange={function (event) {
                  setImage(URL.createObjectURL(event.target.files[0]));
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginTop: "1em" }}>
            <InputLabel required id="open">
              Илгээлт нээлттэй эсэх
            </InputLabel>
            <Controller
              name="open"
              {...register("open")}
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
                      padding: "0.75em",
                    }}
                  >
                    <MenuItem value={1}>Нээлттэй</MenuItem>
                    <MenuItem value={0}>Нээлтгүй</MenuItem>
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
          <div style={{ width: 230 }}>
            <img
              id="image"
              src={image ? image : item.image}
              alt="scholarship image"
              style={{ height: "75px" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
