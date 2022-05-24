import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CheckForm(props) {
  const [pathology, setPathology] = useState("");

  const [attrs, setAttrs] = useState([]);

  const [state, setState] = useState({ values: [] });

  const handleChange = (e, index) => {
    state.values[index] = e.target.value;
    setState({ values: state.values });
  };

  const get_attrs = async () => {
    await axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/check/",
    }).then((response) => {
      console.log(response.data);
      setAttrs(response.data);
    });

    console.log(attrs);
  };

  const check = async () => {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/check/",
      data: {
        data: state.values,
        items: attrs,
      },
    }).then((response) => {
      console.log(response);
      setPathology(response.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      get_attrs();
    });
  }, []);

  return (
    <div>
      <form action="">
        <Box>
          <h4>{pathology}</h4>
          {attrs.map((attr, index) => (
            <TextField
              key={index}
              label={attr}
              sx={{ mb: 1 }}
              size={"small"}
              onChange={(e) => handleChange(e, index)}
              value={state.values[index]}
            />
          ))}

          {/* <TextField label="Наличие плодов" sx={{ mb: 1 }} size={"small"} />
          <TextField label="Размер" sx={{ mb: 1 }} size={"small"} /> */}
        </Box>
        <Button variant="contained" size="large" onClick={check}>
          Проверка
        </Button>
        {/* <Button size="large" onClick={get_attrs}>
          Refresh
        </Button> */}
      </form>
    </div>
  );
}

export default CheckForm;
