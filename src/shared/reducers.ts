import newsReducer from '../features/news/reducer';
import { State as NewsState } from '../features/news/types'
import { IO } from 'funfix';

export type reduxStateT = {
  ioNews: [IO<NewsState>, NewsState];
};

export const reducers = {
  ioNews: newsReducer
}

export default reducers;