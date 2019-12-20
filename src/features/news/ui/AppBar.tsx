import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage, navigate  } from "../actions";
import { reduxStateT } from "../../../shared/reducers";
import { State as NewsState } from "../types";
import { Box, Button, Anchor } from "grommet";

const AppBar: FC<{ onGBChange: () => void, onUSChange: () => void }> = ({ onGBChange, onUSChange }) => {
  const dispatch = useDispatch();
  const newsState = useSelector<reduxStateT, NewsState>(state => state.ioNews[1]);

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      <Box direction="row">
        <Anchor href="#" onClick={() => dispatch(navigate('TopNews'))} label="Top News" />
        <span>|</span>
        <Anchor href="#" onClick={() => dispatch(navigate('CategoriesList'))} label="Categories" />
        <span>|</span>
        <Anchor href="#" onClick={() => dispatch(navigate('Search'))} label="Search" />
      </Box>
      <Box direction="row">
        <Button
          margin={{ right: "20px" }}
          onClick={() => {
            dispatch(changeLanguage("GB"));
            onGBChange();
          }}
        >
          GB
        </Button>
        <br />
        <Button
          onClick={() => {
            dispatch(changeLanguage("US"));
            onUSChange();
          }}
        >
          US
        </Button>
      </Box>
    </Box>
  );};

export default AppBar;
