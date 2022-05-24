import React, { useCallback, useEffect, useState } from "react";
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
import CheckForm from "./CheckForm";
import UpdateForm from "./UpdateForm";

function Phathology() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState([
    { pathology: "", attr_name: "", attr_value: "" },
  ]);

  const [pathApi, setPathApi] = useState(
    "http://127.0.0.1:8000/api/KnowledgeBase/"
  );

  const show_table = async () => {
    setRows([]);
    await axios({
      method: "get",
      url: pathApi,
    }).then((response) => {
      console.log(response.data);

      for (var i = 0; i < response.data.length; i++) {
        setRows((rows) => [
          ...rows,
          {
            pathology: response.data[i].pathology,
            attr_name: response.data[i].attr_name,
            attr_value: response.data[i].attr_value,
          },
        ]);
      }
    });
  };

  // show_table();
  useEffect(() => {
    setTimeout(() => {
      show_table();
    }, 1000);
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Button onClick={show_table}>Refresh</Button>
          <TableContainer
            component={Paper}
            sx={{
              height: 550,
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                height: "max-content",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Название патологии</TableCell>
                  <TableCell>Название признака</TableCell>
                  <TableCell>Значение признака</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.attr_name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.pathology}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.attr_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.attr_value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3}>
          <Box component={Paper} sx={{ height: 600, textAlign: "center" }}>
            <CheckForm
             
            />
            {/* <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  centered
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Проверить" value="1" />
                  <Tab label="Добавить" value="4" />
                  <Tab label="Удалить" value="2" />
                  <Tab label="Изменить" value="3" />
                </TabList>
              </Box>
              <TabPanel value="4">
                <AddForm />
              </TabPanel>
              <TabPanel value="2">
                <DeleteForm />
              </TabPanel>
              <TabPanel value="3">
                <UpdateForm />
              </TabPanel>
              <TabPanel value="1">
                <CheckForm />
              </TabPanel>
            </TabContext> */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Phathology;