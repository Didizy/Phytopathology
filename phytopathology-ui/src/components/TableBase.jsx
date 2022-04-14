import React, { useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

export default function TableBase() {
  const [columns, setColumns] = useState({ field1: "", field2: "" });
  const [rows, setRows] = useState([]);
  const [pathApi, setPathApi]=useState("http://127.0.0.1:8000/api/KnowledgeBase/")

  async function table1() {
    setRows([]);
    await axios({
      method: "get",
      url: pathApi,
    }).then((response) => {
      // console.log(response.data)
      for (var i = 0; i < response.data.length; i++) {
        setRows((row) => [
          ...row,
          {
            field1: response.data[i]["attribute"],
            field2: response.data[i]["description"],
          },
        ]);
      }
    });
    // console.log(rows)
    setColumns({ field1: "Патология", field2: "Описание" });
  };

  return (
    <>
      <Box component={Paper} sx={{ mb: 1 }}>
        <Button onClick={table1}>Патологии</Button>
        <Button>Признаки</Button>
        <Button>Возможные значения</Button>
        <Button>Признаковое описание</Button>
        <Button>Нормальные значения</Button>
      </Box>
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{columns.field1}</TableCell>
              <TableCell>{columns.field2}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.field1}
                </TableCell>
                <TableCell>{row.field2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
