import React, { useContext, FC } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './shared/store';
import { Box, Grommet, ResponsiveContext, Heading, Button } from "grommet";
import AppBar from './ui/AppBar'
import NewsComponent from './features/news/ui/News';

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  }
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Grommet theme={theme}>
        <Box fill>
          <NewsComponent />
        </Box>
      </Grommet>
    </Provider>
  );
}

export default App;
