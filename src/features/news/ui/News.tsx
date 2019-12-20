import React, { FC, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionT, changeLanguage, searchNews, showNewsDetail  } from "../actions";
import { reduxStateT } from "../../../shared/reducers";
import { State as NewsState, AppStatus, News } from "../types";
import { Box, ResponsiveContext, Heading, Image, Text, TextInput } from "grommet";
import NewsDetail from './NewsDetail';
import TopNews from './TopNews';
import SearchNews from './SearchNews';
import Categories from "./Categories";
import Category from "./Category";

const Route: React.FC<{ route: AppStatus[] }> = ({ route }) => {
  const selected = route[route.length - 1];
  switch(selected) {
    case 'TopNews': return <TopNews />
    case 'DisplayedNews': return <NewsDetail />
    case 'Search': return <SearchNews />
    case 'CategoriesList': return <Categories />
    case "Entertainment":
    case "General":
    case "Health":
    case "Science":
    case "Sport":
    case "Technology": return <Category selected={selected}/>
    default: return <div></div>
  }
}

const NewsComponent = () => {
  const newsState = useSelector<reduxStateT, NewsState>(state => state.ioNews[1]);
  
  const { status } = newsState;
  return <Route route={status} />;
};

export default NewsComponent;
