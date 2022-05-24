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

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function AttrsDescription() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const [selectPat, setSelectPat] = useState("");
  const [ListPat, setListPat] = useState([]);

  const get_pathology_list = async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/get_pathology/",
    }).then((response) => {
      setListPat(response.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      get_pathology_list();
      get_attrs_list();
    });
  }, []);

  const get_attrs_list = async () => {
    setLeft([]);
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/list_attrs/",
    }).then((response) => {
      console.log(response.data);
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i][0]);
        setLeft((rows) => [...rows, response.data[i][0]]);
      }
    });
  };

  const add_attrs_desc = async () => {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/attrs_desc/",
      data: {
        pathology: selectPat,
        attrs: right,
      },
    }).then((response) => {
      alert(response.data);
    });
  };

  return (
    <>
      <Box>
        <InputLabel id="www">Патология</InputLabel>
        <Select
          value={selectPat}
          labelId="www"
          label="Патология"
          onChange={(e) => setSelectPat(e.target.value)}
          sx={{ mb: 2, width: 200 }}
          size="small"
        >
          {ListPat.map((pat, index) => (
            <MenuItem key={index} value={pat}>
              {pat}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
      <Box>
        <Button
          variant="contained"
          size="large"
          onClick={add_attrs_desc}
          sx={{ mt: 2 }}
        >
          Сохранить
        </Button>
      </Box>
    </>
  );
}
