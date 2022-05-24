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

function ValuesCreateForPat() {
  const [rows, setRows] = useState([{ name: "", type: "", value: "" }]);
  const [vals, setVals] = useState([]);
  const [selectVal, setSelectVal] = useState([]);

  const [pathologyList, setPathologyList] = useState([]);
  const [selectPathologyP, setSelectPathologyP] = useState("");
  const get_pathology_list = async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_pathology/",
    }).then((response) => {
      setPathologyList(response.data);
    });
  };

  const get_attrs_table = async () => {
    setRows([]);
    console.log(selectPathologyP);
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/attrs_val_desc_pat/",
      data: {
        pathology: selectPathologyP,
      },
    }).then((response) => {
      console.log(response.data);

      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i].attr_type);
        setRows((rows) => [
          ...rows,
          {
            name: response.data[i].attr_name,
            type: response.data[i].attr_type,
            value: response.data[i].attr_value,
          },
        ]);
      }
      console.log(rows);
    });
  };

  const [valName, setValName] = useState("");
  const [valType, setValType] = useState("");
  const [selectRow, setSelectRow] = useState({ name: "", type: "", value: "" });

  const get_bin_val = async () => {
    setVals([]);
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/attrs_val_desc_pat_val/",
      data: {
        name: selectRow.name,
        type: selectRow.type,
      },
    }).then((response) => {
      console.log("vals");
      setVals(response.data);
      console.log(vals);
    });
  };

  const set_val = async () => {
    console.log(selectRow);
    await axios({
      method: "put",
      url: "http://127.0.0.1:8000/api/attrs_val_desc_pat_val/",
      data: {
        pathology: selectPathologyP,
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
      //   get_attrs_table();
      get_pathology_list();
    }, 1000);
  }, []);

  return (
    <div>
      <Box>
        <h4>Значения для патологий</h4>
        <Box>
          <InputLabel id="sss">Патология</InputLabel>
          <Select
            value={selectPathologyP}
            labelId="sss"
            label="Патология"
            onChange={(e) => {
              setSelectPathologyP(e.target.value);
            }}
            sx={{ mb: 2, width: 200 }}
            size="small"
          >
            {pathologyList.map((pat, index) => (
              <MenuItem key={index} value={pat}>
                {pat}
              </MenuItem>
            ))}
          </Select>
          <Box>
            <Button onClick={() => get_attrs_table()} size="small">
              Выбрать
            </Button>
          </Box>
        </Box>
        <Box>
          <InputLabel id="www">Признак</InputLabel>
          <Select
            value={selectRow.name}
            labelId="www"
            label="Признак"
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
              <h5>Нет значений</h5>
            </Box>
          ) : (
            <></>
          )}
          {selectRow.type == "Бинарный" ? (
            <>
              <Box>
                Значение <h5>{selectRow.value}</h5>
              </Box>
              <Box>
                <Box>
                  <Button onClick={get_bin_val} size="small">
                    Изменить
                  </Button>
                </Box>
                <Select
                  value={selectVal}
                  labelId="aaa"
                  label="Признак"
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
                Сохранить
              </Button>
            </>
          ) : (
            <></>
          )}
          {selectRow.type == "Перечислимый" ? (
            <>
              <Box>
                Значение <h5>{selectRow.value}</h5>
              </Box>
              <Box>
                <Box>
                  <Button onClick={get_bin_val} size="small">
                    Изменить
                  </Button>
                </Box>
                <Select
                  value={selectVal}
                  labelId="aaa"
                  label="Признак"
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
                Сохранить
              </Button>
            </>
          ) : (
            <></>
          )}
          {selectRow.type == "Интервальный" ? (
            <>
              {/* <Box>
                    Значение <h5>{selectRow.value}</h5>
                  </Box> */}
              <Box>
                <TextField
                  label="Новый интервал"
                  value={selectVal}
                  onChange={(e) => {
                    setSelectVal(e.target.value);
                  }}
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Box>
              <Button onClick={set_val} variant="contained" size="large">
                Сохранить
              </Button>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>

      {/* <Box>
            <Button onClick={get_attrs_table}>aaa</Button>
            <h4>Нормальные значения</h4>{" "}
            {rows.map((row, index) => (
              <Box component={Paper} sx={{ mb: 1, p: 1 }}>
                {row.name}
                {row.type == "" ? <span>Нет значений</span> : <></>}
                {row.type == "Бинарный" ? (
                  <>
                    <Button
                      size="small"
                      onClick={() => {
                        setValName(row.name);
                        setValType(row.type);
                        get_bin_val();
                      }}
                    >
                      Значения
                    </Button>
                    <Select
                      value={selectVal[index]}
                      labelId="www"
                      label="Признак"
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
                      Сохранить
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {row.type == "Перечислимый" ? (
                  <>
                    <Button
                      size="small"
                      onClick={() => {
                        setValName(row.name);
                        setValType(row.type);
                        get_bin_val();
                      }}
                    >
                      Значения
                    </Button>
                    <Select
                      value={selectVal[index]}
                      labelId="www"
                      label="Признак"
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
                      Сохранить
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {row.type == "Интервальный" ? <span>И</span> : <></>}
              </Box>
            ))}
          </Box> */}
    </div>
  );
}

export default ValuesCreateForPat;
