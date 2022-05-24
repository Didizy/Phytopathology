import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Phathology from "./Pathology";
import KnowledgeBase from "./KnowledgeBase";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("Frozen yoghurt", 159),
//   createData("Ice cream sandwich", 237),
//   createData("Eclair", 262),
//   createData("Cupcake", 305),
//   createData("Gingerbread", 356),
// ];

export default function TableBase() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {/* <Box component={Paper} sx={{mb: 1 }}>
        <Button
          // onClick={
          //   table1
          //   // (table1, setPathApi("http://127.0.0.1:8000/api/KnowledgeBase/"))
          // }
        >
          Патологии
        </Button>
        <Button>Признаки</Button>
        <Button>Возможные значения</Button>
        <Button>Признаковое описание</Button>
        <Button>Нормальные значения</Button>
      </Box> */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} centered>
              <Tab label="Признаки" value="1" />
              <Tab label="Возможные значения" value="2" />
              <Tab label="Признаковое описание" value="3" />
              <Tab label="Нормальные значения" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Phathology />
          </TabPanel>
          <TabPanel value="2">
            <KnowledgeBase />
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item 4</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
