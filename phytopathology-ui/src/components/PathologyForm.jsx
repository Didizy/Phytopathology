import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Input, Tab, Tabs, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function PathologyForm(props) {
  const [pathologyName, setPathologyName] = useState("");

  const [selectPathologyP, setSelectPathologyP] = useState("");
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

  const del_pathology = async () => {
    await axios({
      method: "delete",
      url: "http://127.0.0.1:8000/api/KnowledgeBase/",
      data: {
        name: selectPathologyP,
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
      <form>
        <h4>Удалить патологию</h4>
        <Box>
          <InputLabel id="www">Патология</InputLabel>
          <Select
            value={selectPathologyP}
            labelId="www"
            label="Патология"
            onChange={(e) => setSelectPathologyP(e.target.value)}
            sx={{ mb: 2, width: 200 }}
            size="small"
          >
            {pathologyList.map((pat, index) => (
              <MenuItem key={index} value={pat}>
                {pat}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button variant="contained" size="large" onClick={del_pathology}>
          Удалить
        </Button>
        {/* <Button size="large" onClick={get_pathology_list}>
          Refresh
        </Button> */}
      </form>
    </div>
  );
}

export default PathologyForm;
