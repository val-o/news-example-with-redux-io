import React, { FC, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listTopNews,
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
import { PossibleSizes } from "./helpers";
import NewsItem from "./NewsItem";
import AppBar from './AppBar';

const TopNews = () => {
  const dispatch = useDispatch();
  const newsState = useSelector<reduxStateT, NewsState>(
    state => state.ioNews[1]
  );

  useEffect(() => {
    dispatch(listTopNews())
  }, [])

  const { newsList, language } = newsState;
  const size = useContext(ResponsiveContext) as PossibleSizes;


  return (
    <>
      <AppBar onGBChange={() => {dispatch(listTopNews());}} onUSChange={() => {dispatch(listTopNews())}} />
      <Text>Top news from {language}</Text>
      <Box
        responsive={true}
        wrap={true}
        width={{ min: "100vw", max: "100vw" }}
        flex={true}
        direction="row"
      >
        {newsList.map((news) => (
          <NewsItem
            width={size}
            news={news}
            onClick={() => dispatch(showNewsDetail(news))}
          />
        ))}
      </Box>
    </>
  );
};

export default TopNews;
