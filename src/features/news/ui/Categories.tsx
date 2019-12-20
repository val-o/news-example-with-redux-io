import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNewsDetail, listNewsByCategory, navigate } from "../actions";
import { reduxStateT } from "../../../shared/reducers";
import { State as NewsState } from "../types";
import {
  Box,
  ResponsiveContext,
  Heading,
  Anchor
} from "grommet";
import { PossibleSizes } from "./helpers";
import NewsItem from "./NewsItem";
import AppBar from "./AppBar";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const newsState = useSelector<reduxStateT, NewsState>(
    state => state.ioNews[1]
  );

  useEffect(() => {
    dispatch(listNewsByCategory());
  }, []);

  const { language, categories } = newsState;
  const size = useContext(ResponsiveContext) as PossibleSizes;

  return (
    <>
      <AppBar
        onGBChange={() => {
          dispatch(listNewsByCategory());
        }}
        onUSChange={() => {
          dispatch(listNewsByCategory());
        }}
      />
      <Box
        responsive={true}
        wrap={true}
        width={{ min: "100vw", max: "100vw" }}
        flex={true}
        direction="row"
      >
        {categories.map(category => {
          return (<Box>
          <Heading>Top <Anchor href="#" onClick={() => dispatch(navigate(category.type))} label={category.type}></Anchor> News from {language}</Heading>
            <Box direction="row">
            {category.news.map((news) => (
              <NewsItem
                width={size}
                news={news}
                onClick={() => dispatch(showNewsDetail(news))}
              />
            ))}
            </Box>
          </Box>)})
        }
      </Box>
    </>
  );
};

export default CategoriesList;
