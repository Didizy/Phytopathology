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
import ValuesCreateForPat from "./ValuesCreateForPat";

function ValiesCreate() {
  const [rows, setRows] = useState([{ name: "", type: "", value: "" }]);
  const [vals, setVals] = useState([]);
  const [selectVal, setSelectVal] = useState([]);

  const get_attrs_table = async () => {
    setRows([]);
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/attrs_val_desc/",
    }).then((response) => {
      console.log(response.data);

      for (var i = 0; i < response.data.length; i++) {
        setRows((rows) => [
          ...rows,
          {
            name: response.data[i].attr_name,
            type: response.data[i].attr_type,
            value: response.data[i].attr_value,
          },
        ]);
      }
    });
  };

  const [valName, setValName] = useState("");
  const [valType, setValType] = useState("");
  const [selectRow, setSelectRow] = useState({ name: "", type: "", value: "" });

  const get_bin_val = async () => {
    setVals([]);
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/attrs_val_desc/",
      data: {
        name: selectRow.name,
        type: selectRow.type,
      },
    }).then((response) => {
      console.log(response.data);
      setVals(response.data);
      console.log(vals);
    });
  };

  const set_val = async () => {
    console.log(selectRow);
    await axios({
      method: "put",
      url: "http://127.0.0.1:8000/api/attrs_val_desc/",
      data: {
        name: selectRow.name,
        type: selectRow.type,
        value: selectVal,
      },
    }).then((response) => {
      alert(response.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      get_attrs_table();
    }, 1000);
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <h4>???????????????????? ????????????????</h4>
            <Box>
              <InputLabel id="www">??????????????</InputLabel>
              <Select
                value={selectRow.name}
                labelId="www"
                label="??????????????"
                onChange={(e) => {
                  setSelectRow({
                    name: e.target.value.name,
                    type: e.target.value.type,
                    value: e.target.value.value,
                  });
                }}
                sx={{ mb: 2, width: 200 }}
                size="small"
              >
                {rows.map((pat, index) => (
                  <MenuItem key={index} value={pat}>
                    {pat.name}
                  </MenuItem>
                ))}
              </Select>
              {selectRow.type == "" ? (
                <Box>
                  <h5>?????? ????????????????</h5>
                </Box>
              ) : (
                <></>
              )}
              {selectRow.type == "????????????????" ? (
                <>
                  <Box>
                    ???????????????? <h5>{selectRow.value}</h5>
                  </Box>
                  <Box>
                    <Box>
                      <Button onClick={get_bin_val} size="small">
                        ????????????????
                      </Button>
                    </Box>
                    <Select
                      value={selectVal}
                      labelId="aaa"
                      label="??????????????"
                      onChange={(e) => {
                        setSelectVal(e.target.value);
                      }}
                      sx={{ mb: 2, width: 200 }}
                      size="small"
                    >
                      {vals.map((pat, index) => (
                        <MenuItem key={index} value={pat}>
                          {pat}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Button onClick={set_val} variant="contained" size="large">
                    ??????????????????
                  </Button>
                </>
              ) : (
                <></>
              )}
              {selectRow.type == "????????????????????????" ? (
                <>
                  <Box>
                    ???????????????? <h5>{selectRow.value}</h5>
                  </Box>
                  <Box>
                    <Box>
                      <Button onClick={get_bin_val} size="small">
                        ????????????????
                      </Button>
                    </Box>
                    <Select
                      value={selectVal}
                      labelId="aaa"
                      label="??????????????"
                      onChange={(e) => {
                        setSelectVal(e.target.value);
                      }}
                      sx={{ mb: 2, width: 200 }}
                      size="small"
                    >
                      {vals.map((pat, index) => (
                        <MenuItem key={index} value={pat}>
                          {pat}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Button onClick={set_val} variant="contained" size="large">
                    ??????????????????
                  </Button>
                </>
              ) : (
                <></>
              )}
              {selectRow.type == "????????????????????????" ? (
                <>
                  {/* <Box>
                    ???????????????? <h5>{selectRow.value}</h5>
                  </Box> */}
                  <Box>
                    <TextField
                      label="?????????? ????????????????"
                      value={selectVal}
                      onChange={(e) => {
                        setSelectVal(e.target.value);
                      }}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  </Box>
                  <Button onClick={set_val} variant="contained" size="large">
                    ??????????????????
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>

          {/* <Box>
            <Button onClick={get_attrs_table}>aaa</Button>
            <h4>???????????????????? ????????????????</h4>{" "}
            {rows.map((row, index) => (
              <Box component={Paper} sx={{ mb: 1, p: 1 }}>
                {row.name}
                {row.type == "" ? <span>?????? ????????????????</span> : <></>}
                {row.type == "????????????????" ? (
                  <>
                    <Button
                      size="small"
                      onClick={() => {
                        setValName(row.name);
                        setValType(row.type);
                        get_bin_val();
                      }}
                    >
                      ????????????????
                    </Button>
                    <Select
                      value={selectVal[index]}
                      labelId="www"
                      label="??????????????"
                      onChange={(e) => {
                        setSelectVal(e.target.value);
                      }}
                      sx={{ mb: 2, width: 200 }}
                      size="small"
                    >
                      {vals.map((pat, index) => (
                        <MenuItem key={index} value={pat}>
                          {pat}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectRow({
                          name: row.name,
                          type: row.type,
                          value: selectVal,
                        });
                        set_val();
                      }}
                    >
                      ??????????????????
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {row.type == "????????????????????????" ? (
                  <>
                    <Button
                      size="small"
                      onClick={() => {
                        setValName(row.name);
                        setValType(row.type);
                        get_bin_val();
                      }}
                    >
                      ????????????????
                    </Button>
                    <Select
                      value={selectVal[index]}
                      labelId="www"
                      label="??????????????"
                      onChange={(e) => {
                        setSelectVal(e.target.value);
                      }}
                      sx={{ mb: 2, width: 200 }}
                      size="small"
                    >
                      {vals.map((pat, index) => (
                        <MenuItem key={index} value={pat}>
                          {pat}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectRow({
                          name: row.name,
                          type: row.type,
                          value: selectVal,
                        });
                        set_val();
                      }}
                    >
                      ??????????????????
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {row.type == "????????????????????????" ? <span>??</span> : <></>}
              </Box>
            ))}
          </Box> */}
        </Grid>
        <Grid item xs={6}>
          <ValuesCreateForPat />
        </Grid>
      </Grid>
    </div>
  );
}

export default ValiesCreate;
