import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/lab/node_modules/@mui/system";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { TextField } from "@mui/material";

function CheckIntegrity() {
  const [text, setText] = useState("");
  const check = async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/check_integrity/",
    }).then((response) => {
      setText(response.data);
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          check();
        }}
      >
        Проверка
      </Button>
      
        <p>{text}</p>
     
    </div>
  );
}

export default CheckIntegrity;
