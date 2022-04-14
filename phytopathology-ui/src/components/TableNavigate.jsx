import { Box } from "@mui/system";
import React from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function TableNavigate() {
  return (
    <div>
      <Box component={Paper} >
        <Button>Патологии</Button>
        <Button>Признаки</Button>
        <Button>Возможные значения</Button>
        <Button>Признаковое описание</Button>
        <Button>Нормальные значения</Button>
      </Box>
    </div>
  );
}

export default TableNavigate;
