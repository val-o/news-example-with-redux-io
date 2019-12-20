import React, { FC } from "react";
import { News } from "../types";
import {
  Box,
  Heading,
  Image,
  Text} from "grommet";
import { PossibleSizes, mapSize } from "./helpers";


type NewsItemT = FC<{ onClick: () => void; width: PossibleSizes; news: News }>;
const NewsItem: NewsItemT = ({ onClick, width, news }) => (
  <Box
    onClick={onClick}
    width={mapSize(width)}
    align="center"
    margin={{ top: "50px" }}
    pad={{ left: "10px", right: "10px" }}
  >
    <Box width={{ max: mapSize(width) }}>
      <Heading size="16px" truncate={true}>
        {news.title.getOrElse("")}
      </Heading>
    </Box>
    <Box width={{ max: mapSize(width) }} height="300px">
      <Image
        fit="cover"
        src={news.urlToImage.getOrElse("https://via.placeholder.com/150")}
      />
    </Box>
    <Text>{news.description.getOrElse("")}</Text>
  </Box>
);

export default NewsItem;