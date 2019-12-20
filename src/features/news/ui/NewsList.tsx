import React, { FC, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionT,
  changeLanguage,
  searchNews,
  showNewsDetail
} from "../actions";
import { reduxStateT } from "../../../shared/reducers";
import { State as NewsState, AppStatus, News } from "../types";
import {
  Box,
  ResponsiveContext,
  Heading,
  Image,
  Text,
  TextInput
} from "grommet";
import { number } from "prop-types";



export default () => {};
