import NewsAlgebra from '../../algebras/NewsAlgebra';
import { Option, None, Future, IO, Duration, Try, Some, Failure } from "funfix";
import { Category, Categories, News, Language, NewsID, Search, Config, ConfigParams, State, AppStatus, NewsAlike } from "./types";
import { fetchIO, mapToOptional } from '../../shared/helpers';

const pick = (c: ConfigParams, key: keyof ConfigParams) => {
  switch (key) {
    case 'category': return c[key].fold(
      () => '',
      (a: Category['type']) => `&${key}=${a}`)
    case 'q': return c[key].fold(
      () => '',
      (a: Search['query']) => `&${key}=${a}`)
    case 'country': return c[key].fold(
      () => '',
      (a: Language) => `&${key}=${a}`)
    case 'apiKey': return `&${key}=${c[key]}`
    case 'pageSize': return c[key].fold(
      () => '',
      (a: number) => `&${key}=${a}`)
  }
}

const config: Config = {
  api: (params) => {
    return `https://newsapi.org/v2/top-headlines?${Object.keys(params).reduce(
    (acc: string, key): string => {
      const p = pick(params, key as keyof ConfigParams);
      return acc + (acc === '' ? p.slice(1) : p)},
    ''
  )}`}
}

const fetchApiIO = <T>(p: ConfigParams) => fetchIO<T>(config.api(p), {});

type ApiResult = {status: string, totalResults: number, articles: Array<NewsAlike>}

export const initializeState = () => new State(config, [], None, 'US', [], None, ["TopNews"])

export const newsAlgebraImplementation = new NewsAlgebra<
  Categories,
  News,
  NewsID,
  Language,
  Search,
  AppStatus,
  State
>(
  // changeLanguage
  (lang: Language) => _ => IO.of(() => lang),
  // listTopNews
  () => (s: State): IO<Array<News>> =>
    fetchApiIO<ApiResult>({
      country: Option.of(s.language).orElse(Some("US")),
      apiKey: process.env.REACT_APP_NEWS_API,
      pageSize: None,
      q: None,
      category: None
    }).map(result => result.articles.map(article => mapToOptional<NewsAlike, News>(article))),
  // listNewsByCategory
  (c: Categories) => (s: State): IO<Array<News>> =>
    fetchApiIO<ApiResult>({
      country: Option.of(s.language).orElse(Some("US")),
      apiKey: process.env.REACT_APP_NEWS_API,
      pageSize: Some(5),
      q: None,
      category: Some(c)
    }).map(result => result.articles.map(article => mapToOptional<NewsAlike, News>(article))),
  // showNewsDetail
  (news: News) => (s: State): IO<Option<News>> =>
    IO.of(() => Option.of(news)),
  // expandCategory:
  (c: Categories) => (s: State): IO<Array<News>> =>
    fetchApiIO<ApiResult>({
      country: Option.of(s.language).orElse(Some("US")),
      apiKey: process.env.REACT_APP_NEWS_API,
      pageSize: None,
      q: None,
      category: Some(c)
    }).map(result => result.articles.map(article => mapToOptional<NewsAlike, News>(article))),
  // searchNews
  (search: Search) => (s: State): IO<Array<News>> =>
    fetchApiIO<ApiResult>({
      country: Option.of(s.language).orElse(Some("US")),
      apiKey: process.env.REACT_APP_NEWS_API,
      pageSize: None,
      q: Option.of(search.query),
      category: None
    }).map(result => result.articles.map(article => mapToOptional<NewsAlike, News>(article))),
  // navigate
  (route: AppStatus) => (s: State) => {
    return IO.of(() => s.copy({ status: [...s.status, route] }))
  },
  // go Back
  () => (s: State) => IO.of(() => s.copy({ status: s.status.slice(0, -1)}))
);