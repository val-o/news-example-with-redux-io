import {
  Option,
  IO} from "funfix";

/**
 * News algebra definition
 *
 * @export
 * @class NewsAlgebra
 * @template Category
 * @template News
 * @template NewsID
 * @template Language
 * @template Search
 * @template Path
 * @template State
 */
export default class NewsAlgebra<Category, News, Language, Search, Path, State> {
  /**
   *Creates an instance of NewsAlgebra.
   * @param {(
   *       l: Language
   *     ) => (s: State) => IO<Language>} changeLanguage
   * @param {() => (s: State) => IO<Array<News>>} listTopNews
   * @param {(
   *       c: Category
   *     ) => (s: State) => IO<Array<News>>} listNewsByCategory
   * @param {(
   *       news: News
   *     ) => (s: State) => IO<Option<News>>} showNewsDetail
   * @param {(
   *       c: Category
   *     ) => (s: State) => IO<Array<News>>} expandCategory
   * @param {(
   *       search: Search
   *     ) => (s: State) => IO<Array<News>>} searchNews
   * @param {(
   *       route: Path 
   *     ) => (s: State) => IO<State>} navigate
   * @param {() => (s: State) => IO<State>} goBack
   * @memberof NewsAlgebra
   */
  constructor(
    public changeLanguage: (
      l: Language
    ) => (s: State) => IO<Language>,
    public listTopNews: () => (s: State) => IO<Array<News>>,
    public listNewsByCategory: (
      c: Category
    ) => (s: State) => IO<Array<News>>,
    public showNewsDetail: (
      news: News
    ) => (s: State) => IO<Option<News>>,
    public expandCategory: (
      c: Category
    ) => (s: State) => IO<Array<News>>,
    public searchNews: (
      search: Search
    ) => (s: State) => IO<Array<News>>,
    public navigate: (
      route: Path 
    ) => (s: State) => IO<State>,
    public goBack: () => (s: State) => IO<State>
  ) {}
}
