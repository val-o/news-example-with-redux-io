import React, { FC, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNewsDetail, expandCategory } from "../actions";
import { reduxStateT } from "../../../shared/reducers";
import { State as NewsState, Categories } from "../types";
import {
  Box,
  ResponsiveContext,
  Text
} from "grommet";
import { PossibleSizes } from "./helpers";
import NewsItem from "./NewsItem";
import AppBar from "./AppBar";

const Category: FC<{ selected: Categories }> = ({ selected }) => {
  const dispatch = useDispatch();
  const newsState = useSelector<reduxStateT, NewsState>(
    state => state.ioNews[1]
  );

  useEffect(() => {
    dispatch(expandCategory(selected));
  }, []);

  const { language, currentCategory } = newsState;
  const size = useContext(ResponsiveContext) as PossibleSizes;

  return (
    <>
      <AppBar
        onGBChange={() => {
          dispatch(expandCategory(selected));
        }}
        onUSChange={() => {
          dispatch(expandCategory(selected));
        }}
      />
      <Text>
        {selected} from {language}
      </Text>
      <Box
        responsive={true}
        wrap={true}
        width={{ min: "100vw", max: "100vw" }}
        flex={true}
        direction="row"
      >
        {currentCategory.fold(
          () => (
            <>No news in category</>
          ),
          c => (
            <>
              {c.news.map(news => (
                <NewsItem
                  width={size}
                  news={news}
                  onClick={() => dispatch(showNewsDetail(news))}
                />
              ))}
            </>
          )
        )}
      </Box>
    </>
  );
};

export default Category;
