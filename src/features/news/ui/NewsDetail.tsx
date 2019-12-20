import React, {  } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goBack
} from "../actions";
import { reduxStateT } from "../../../shared/reducers";
import { State as NewsState } from "../types";
import {
  Box,
  Heading,
  Image,
  Text,
  Button
} from "grommet";

const NewsDetail = () => {
  const newsState = useSelector<reduxStateT, NewsState>(
    state => state.ioNews[1]
  );
  const dispatch = useDispatch();
  return (
    <Box
      width="100vw"
      align="center"
      margin={{ top: "50px" }}
    >
      {newsState.displayedNews.fold(
        () => (
          <p>Something went wrong</p>
        ),
        news => (
          <>
            <Heading size="small" truncate={true}>
              {news.title.getOrElse("")}
            </Heading>
            <Box width="100vw" height="600px">
              <Image
                fit="cover"
                src={news.urlToImage.getOrElse(
                  "https://via.placeholder.com/150"
                )}
              />
            </Box>
            <Text>{news.content.getOrElse(news.description)}</Text>
          </>
        )
      )}
      <Button type="button" primary={true} onClick={() => dispatch(goBack())}>Back</Button>
    </Box>
  );
};

export default NewsDetail;
