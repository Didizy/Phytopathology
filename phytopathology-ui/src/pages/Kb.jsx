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
import Phathology from "../components/Pathology";
import PathologyList from "../components/PathologyList";
import ListAttrs from "../components/ListAttrs";
import ValueList from "../components/ValueList";
import AttrsDescription from "../components/AttrsDescription";
import ValiesCreate from "../components/ValiesCreate";
import CheckIntegrity from "../components/CheckIntegrity";

function Kb() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {/* <TableNavigate /> */}
      {/* <TableBase /> */}
//dev commit
<<<<<<< HEAD
//feature commit
=======
//feature commit test update
>>>>>>> front-test
//new feature commit
//hotfix
//new feature commit update
      <Box component={Paper} sx={{ height: 700, textAlign: "center" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              centered
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Проверка" value="1" />
              <Tab label="Патологии" value="2" />
              <Tab label="Признаки" value="4" />
              <Tab label="Возможные значения" value="5" />
              <Tab label="Признаковое описание" value="3" />
              <Tab label="Значения" value="6" />
              <Tab label="Проверка целостности" value="7" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Phathology />
          </TabPanel>
          <TabPanel value="2">
            <PathologyList />
          </TabPanel>
          <TabPanel value="3">
            <AttrsDescription />
          </TabPanel>
          <TabPanel value="4">
            <ListAttrs />
          </TabPanel>
          <TabPanel value="5">
            <ValueList />
          </TabPanel>
          <TabPanel value="6">
            <ValiesCreate />
          </TabPanel>
          <TabPanel value="7">
            <CheckIntegrity />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Kb;
