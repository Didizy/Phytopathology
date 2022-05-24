import React, { useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, Input, Tab, Tabs, TextField } from "@mui/material";
import { Box } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import { base, names } from "../base";

function KnowledgeBase() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [columns, setColumns] = useState({ field1: "", field2: "" });
  const [rows, setRows] = useState([]);
  const [pathApi, setPathApi] = useState(
    "http://127.0.0.1:8000/api/KnowledgeBase/"
  );

  const table1 = async () => {
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
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {names.map((item, i) => {
                    return <TableCell key={i}>{item}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {base.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.pathology}
                    </TableCell>
                    <TableCell>{row.att1}</TableCell>
                    <TableCell>{row.att2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          <Box component={Paper} sx={{ height: 600, textAlign: "center" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} centered>
                  <Tab label="Добавить" value="1" />
                  <Tab label="Удалить" value="2" />
                  <Tab label="Изменить" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <AddForm />
              </TabPanel>
              <TabPanel value="2">
                <DeleteForm />
              </TabPanel>
              <TabPanel value="3">{}</TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default KnowledgeBase;
