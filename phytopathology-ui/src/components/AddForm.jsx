import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Input, Tab, Tabs, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function AddForm(props) {
  const [pathologyName, setPathologyName] = useState("");

  const [pathologyList, setPathologyList] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [selectPathology, setSelectPathology] = useState("");
  const [selectType, setSelectType] = useState("");

  const get_pathology_list = async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_pathology/",
    }).then((response) => {
      setPathologyList(response.data);
    });
  };

  const add_attr = async () => {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/Attributes/",
      data: {
        type: selectType,
        pathology: selectPathology,
        name: name,
        value: value,
      },
    }).then((response) => {
      alert(response.data);
    });
  };

  const add_pathology = async () => {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/KnowledgeBase/",
      data: {
        name: pathologyName,
      },
    }).then((response) => {
      alert(response.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      get_pathology_list();
    }, 1000);
  }, []);

  return (
    <div>
      <form action="">
        <Box>
          <h4>Добавить признак</h4>
          <InputLabel id="lll">Патология</InputLabel>
          <Select
            value={selectPathology}
            labelId="lll"
            label="Патология"
            onChange={(e) => setSelectPathology(e.target.value)}
            sx={{ width: 200 }}
            size="small"
          >
            {pathologyList.map((pat, index) => (
              <MenuItem key={index} value={pat}>
                {pat}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="ttt">Тип данных</InputLabel>
          <Select
            value={selectType}
            labelId="ttt"
            label="Патология"
            onChange={(e) => setSelectType(e.target.value)}
            sx={{ mb: 2, width: 200 }}
            size="small"
          >
            <MenuItem value="Булево">Булево</MenuItem>
            <MenuItem value="Интервал">Интервал</MenuItem>
            <MenuItem value="Перечислимый">Перечислимый</MenuItem>
          </Select>
          <TextField
            label="Название"
            value={name}
            size="small"
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Значение"
            value={value}
            size="small"
            onChange={(e) => setValue(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>
        <Button variant="contained" size="large" onClick={add_attr}>
          Добавить
        </Button>
        {/* <Button size="large" onClick={get_pathology_list}>
          Refresh
        </Button> */}
      </form>
      <form>
        <h4>Добавить патологию</h4>
        <Box>
          <TextField
            label="Значение"
            value={pathologyName}
            size="small"
            onChange={(e) => setPathologyName(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>
        <Button variant="contained" size="large" onClick={add_pathology}>
          Добавить
        </Button>
      </form>
    </div>
  );
}

export default AddForm;
