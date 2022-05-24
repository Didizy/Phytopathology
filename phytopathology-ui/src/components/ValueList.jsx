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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function ValueList() {
  const [ListAttrs, setListAttrs] = useState([]);
  const [selectAttr, setSelectAttr] = useState("");
  const [selectType, setSelectType] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectMin, setSelectMin] = useState("");
  const [selectMax, setSelectMax] = useState("");

  const [del, setDel] = useState({ name: "", type: "", value: "" });

  const [rows, setRows] = useState([{ name: "", type: "", value: "" }]);

  const get_attrs_table = async () => {
    setRows([]);
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/list_values/",
    }).then((response) => {
      console.log(response.data);

      for (var i = 0; i < response.data.length; i++) {
        setRows((rows) => [
          ...rows,
          {
            name: response.data[i].la_name,
            type: response.data[i].la_type,
            value: response.data[i].la_value,
          },
        ]);
      }
    });
  };

  const get_attrs_list = async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/list_attrs/",
    }).then((response) => {
      setListAttrs(response.data);
    });
  };

  const add_attr_value = async () => {
    let value = "";

    if (selectAttr != "") {
      if (selectMin != "" && selectMax != "") {
        if (parseInt(selectMin) <= parseInt(selectMax)) {
          value = selectMin + "-" + selectMax;

          await axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/list_values/",
            data: {
              name: selectAttr,
              type: selectType,
              value: value,
            },
          }).then((response) => {
            alert(response.data);
          });
        } else {
          alert("Нижнее значение больше верхнего");
        }
      } else {
        if (selectValue != "") {
          value = selectValue;
          await axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/list_values/",
            data: {
              name: selectAttr,
              type: selectType,
              value: value,
            },
          }).then((response) => {
            alert(response.data);
          });
        } else {
          alert("Не введено значение признака");
        }
      }
    } else {
      alert("Не выбран признак");
    }
  };

  const del_attr_value = async () => {
    console.log(del);
    await axios({
      method: "delete",
      url: "http://127.0.0.1:8000/api/list_values/",
      data: {
        name: del.name,
        type: del.type,
        value: del.value,
      },
    }).then((response) => {
      console.log(del);
      alert(response.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      get_attrs_list();
      get_attrs_table();
    }, 1000);
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Button onClick={get_attrs_table}>REFRESH</Button>
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
                  <TableCell>Признак</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Значение</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.value}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        onClick={() => {
                          setDel({
                            name: row.name,
                            type: row.type,
                            value: row.value,
                          });
                          del_attr_value();
                        }}
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
          <form>
            <Box
              component={Paper}
              sx={{ height: 600, textAlign: "center", pt: 2 }}
            >
              <InputLabel id="www">Признак</InputLabel>
              <Select
                value={selectAttr}
                labelId="www"
                label="Признак"
                onChange={(e) => setSelectAttr(e.target.value)}
                sx={{ mb: 2, width: 200 }}
                size="small"
              >
                {ListAttrs.map((pat, index) => (
                  <MenuItem key={index} value={pat}>
                    {pat}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id="aaa">Тип признака</InputLabel>
              <Select
                value={selectType}
                labelId="aaa"
                label="Тип"
                onChange={(e) => setSelectType(e.target.value)}
                sx={{ mb: 2, width: 200 }}
                size="small"
              >
                <MenuItem value="Бинарный">Бинарный</MenuItem>
                <MenuItem value="Перечислимый">Перечислимый</MenuItem>
                <MenuItem value="Интервальный">Интервальный</MenuItem>
              </Select>
              {selectType == "Бинарный" ? (
                <>
                  <InputLabel id="qqq">Значение</InputLabel>
                  <Select
                    value={selectValue}
                    labelId="qqq"
                    label="Тип"
                    onChange={(e) => setSelectValue(e.target.value)}
                    sx={{ mb: 2, width: 200 }}
                    size="small"
                  >
                    <MenuItem value="Да">Да</MenuItem>
                    <MenuItem value="Нет">Нет</MenuItem>
                  </Select>
                </>
              ) : (
                <></>
              )}
              {selectType == "Перечислимый" ? (
                <>
                  <Box>
                    <TextField
                      label="Значение"
                      value={selectValue}
                      onChange={(e) => setSelectValue(e.target.value)}
                      sx={{ mb: 2, width: 200 }}
                      size="small"
                    />
                  </Box>
                </>
              ) : (
                <></>
              )}
              {selectType == "Интервальный" ? (
                <>
                  <Box>
                    <TextField
                      label="min"
                      value={selectMin}
                      onChange={(e) => setSelectMin(e.target.value)}
                      sx={{ mb: 2, width: 200 }}
                      size="small"
                    />
                    <TextField
                      label="max"
                      value={selectMax}
                      onChange={(e) => setSelectMax(e.target.value)}
                      sx={{ mb: 2, width: 200 }}
                      size="small"
                    />
                  </Box>
                </>
              ) : (
                <></>
              )}
              <Box>
                <Button variant="contained" onClick={add_attr_value}>
                  Добавить
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default ValueList;
