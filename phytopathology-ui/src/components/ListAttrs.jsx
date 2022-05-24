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
import PathologyForm from "./PathologyForm";
import ListAttrsForm from "./ListAttrsForm";

function ListAttrs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [ListAttrs, setListAttrs] = useState([]);
  const get_attrs_list = async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/list_attrs/",
    }).then((response) => {
      setListAttrs(response.data);
    });
  };

  const [rows, setRows] = useState([]);

  const show_table = async () => {
    setRows([]);
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/list_attrs/",
    }).then((response) => {
      console.log(response.data);

      for (var i = 0; i < response.data.length; i++) {
        setRows((rows) => [...rows, response.data[i]]);
      }
    });
  };

  const [selectAttr, setselectAttr] = useState("");

  const del_attrs = async () => {
    await axios({
      method: "delete",
      url: "http://127.0.0.1:8000/api/list_attrs/",
      data: {
        name: selectAttr,
      },
    }).then((response) => {
      alert(response.data);
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
                  <TableCell>Название признака</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        onClick={() => {
                          setselectAttr(row);
                          del_attrs();
                        }}
                        // onClick={(setselectAttr("row"), del_attrs())}
                      >
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3}>
          <Box component={Paper} sx={{ height: 600, textAlign: "center" }}>
            <ListAttrsForm />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ListAttrs;
