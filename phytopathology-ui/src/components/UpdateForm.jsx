import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function UpdateForm(props) {
  const [pathologyName, setPathologyName] = useState("");

  const [pathologyList, setPathologyList] = useState([]);
  const [attrList, setAttrList] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [selectPathologyA, setSelectPathologyA] = useState("");
  const [selectPathologyP, setSelectPathologyP] = useState("");
  const [selectAttr, setSelectAttr] = useState("");

  const get_pathology_list = async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_pathology/",
    }).then((response) => {
      setPathologyList(response.data);
    });
  };

  const get_attr_list = async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/Attributes/",
    }).then((response) => {
      setAttrList(response.data);
    });
  };

  const put_attr = async () => {
    await axios({
      method: "put",
      url: "http://127.0.0.1:8000/api/Attributes/",
      data: {
        pathology: selectPathologyA,
        name: selectAttr,
        value: value,
      },
    }).then((response) => {
      alert(response.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      get_pathology_list();
      get_attr_list();
    }, 1000);
  }, []);

  return (
    <div>
      <form action="">
        <Box>
          <h4>Изменить признак</h4>
          <InputLabel id="lll">Патология</InputLabel>
          <Select
            value={selectPathologyA}
            labelId="lll"
            label="Патология"
            onChange={(e) => setSelectPathologyA(e.target.value)}
            sx={{ width: 200 }}
            size="small"
          >
            {pathologyList.map((pat, index) => (
              <MenuItem key={index} value={pat}>
                {pat}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="aaa">Признак</InputLabel>
          <Select
            value={selectAttr}
            labelId="aaa"
            label="Патология"
            onChange={(e) => setSelectAttr(e.target.value)}
            sx={{ mb: 2, width: 200 }}
            size="small"
          >
            {attrList.map((pat, index) => (
              <MenuItem key={index} value={pat}>
                {pat}
              </MenuItem>
            ))}
          </Select>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Новое значение"
            size="small"
            sx={{ mb: 2 }}
          />
        </Box>
        <Button variant="contained" size="large" onClick={put_attr}>
          Изменить
        </Button>
        {/* <Button
          size="large"
          onClick={() => {
            get_pathology_list();
            get_attr_list();
          }}
        >
          Refresh
        </Button> */}
      </form>
    </div>
  );
}

export default UpdateForm;
