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
import NewsItem from './NewsItem';
import AppBar from "./AppBar";
import { PossibleSizes } from "./helpers";


type SearchT = FC<{ onSubmit: (res: string) => void }>;
const Search: SearchT = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const update = (charCode: number) => {
    if (charCode === 13) {
      onSubmit(value);
    }
  };
  return (
    <TextInput
      placeholder="type here"
      value={value}
      onChange={event => setValue(event.target.value)}
      onKeyDown={event => update(event.keyCode)}
    />
  );
};

const SearchNews = () => {
  const dispatch = useDispatch();
  const newsState = useSelector<reduxStateT, NewsState>(
    state => state.ioNews[1]
  );
  const [currentQuery, setCurrentQuery] = useState("");

  const { newsList, language } = newsState;
  const size = useContext(ResponsiveContext) as PossibleSizes;

  return (
    <>
      <AppBar onGBChange={() => {dispatch(searchNews({ query: currentQuery  }));}} onUSChange={() => {dispatch(searchNews({ query: currentQuery  }))}} />
      <Text>Search news from {language}</Text>
      <Search
        onSubmit={query => {
          dispatch(searchNews({ query }));
          setCurrentQuery(query);
        }}
      />
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

export default SearchNews;
