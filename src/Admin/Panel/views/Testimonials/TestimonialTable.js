import { useState, useEffect, useRef } from "react";
//MUI Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
// Views
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
// Components
import StyledButton from "../../../../Shared/Button";
// Functions
import { getItems } from "../../../../Shared/services/requests";
// Icons
import EditIcon from "../../icons/Edit.png";
import DeleteIcon from "../../icons/Delete.png";

export default function BasicTable() {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState();

  useEffect(() => {
    getItems("comment")
      .then((resp) => setData(resp.data))
      .catch((err) => alert("Алдаа гарлаа: " + err));
  }, [editModalIsOpen, deleteModalIsOpen, addModalIsOpen]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setTimeout(() => {
        getItems("comment")
          .then((resp) => setData(resp.data))
          .catch((err) => alert("Алдаа гарлаа: " + err));
      }, 200);
    }
  }, [editModalIsOpen, deleteModalIsOpen, addModalIsOpen]);

  const formatDate = (str) => {
    return str?.split("T")[0];
  };

  return (
    <>
      <EditItem
        isOpen={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        item={item}
      />
      <DeleteItem
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
        item={item}
      />
      <AddItem
        isOpen={addModalIsOpen}
        onClose={() => setAddModalIsOpen(false)}
      />
      <div style={{ float: "left", margin: "1.5em 1em", fontWeight: "bold" }}>
        Оюутны сэтгэгдэл
      </div>
      <div
        style={{ float: "right", margin: "1em -1px" }}
        onClick={() => setAddModalIsOpen(true)}
      >
        <StyledButton>Нэмэх</StyledButton>
      </div>
      <TableContainer
        sx={{
          border: "1px solid lightgrey",
          borderRadius: "15px",
        }}
      >
        <Table aria-label="testimonial table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Статус</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Зураг</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Овог</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Нэр</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Мэргэжил</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Сэтгэгдэл</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Бүртгэсэн огноо</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Бүртгэсэн ажилтан
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Өөрчилсөн огноо</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Өөрчилсөн ажилтан
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell>
                  {item.status ? (
                    <span style={{ color: "green" }}>Идэвхтэй</span>
                  ) : (
                    <span style={{ color: "red" }}>Идэвхгүй</span>
                  )}
                </TableCell>
                <TableCell>
                  {item.image ? (
                    <img src={item.image} style={{ width: "75px" }} />
                  ) : (
                    "Зураг"
                  )}
                </TableCell>
                <TableCell>{item.lastname}</TableCell>
                <TableCell>{item.firstname}</TableCell>
                <TableCell sx={{ maxWidth: 300, overflowWrap: "break-word" }}>
                  {item.profession}
                </TableCell>
                <TableCell
                  sx={{
                    width: "150",
                    maxWidth: 300,
                    overflowWrap: "break-word",
                  }}
                >
                  {item.comment}
                </TableCell>
                <TableCell>{formatDate(item.createdDate)}</TableCell>
                <TableCell>{item.createdEmployee}</TableCell>
                <TableCell>{formatDate(item.modifiedDate)}</TableCell>
                <TableCell>{item.modifiedEmployee}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setItem(item);
                      setEditModalIsOpen(true);
                    }}
                  >
                    <img src={EditIcon} alt="icon" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setItem(item);
                      setDeleteModalIsOpen(true);
                    }}
                  >
                    <img src={DeleteIcon} alt="delete icon" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
