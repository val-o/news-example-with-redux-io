import { Language, News, Search, State, AppStatus, Categories } from "./types";

type actionTypeT = | 'init' | 'commit' | 'navigate' | 'goBack' | 'changeLanguage' | 'listTopNews' | 'listNewsByCategory' | 'showNewsDetail' | 'expandCategory' | 'searchNews'

type ack<typeT extends actionTypeT, payloadT> = {
  payload: payloadT;
  type: typeT;
  target: '@ioNews' // needed for io middleware
};

export type actionT =
  | ack<"init", {}> // +
  | ack<"commit", State> // +
  | ack<"changeLanguage", { language: Language }> // +
  | ack<"navigate", { route: AppStatus }> // +
  | ack<"goBack", { }> // +
  | ack<"listTopNews", {}>
  | ack<"listNewsByCategory", { }>
  | ack<"showNewsDetail", { news: News }>
  | ack<"expandCategory", { category: Categories }>
  | ack<"searchNews", { search: Search }>; //

type InitT = () => actionT;
export const init: InitT = () => {
  return {
    type: 'init', 
    payload: { },
    target: '@ioNews'
  };
};

type CommitT = (s: State) => actionT;
export const commit: CommitT = (s: State) => {
  return {
    type: 'commit', 
    payload: s,
    target: '@ioNews'
  };
};

type ChangeLanguageT = (language: Language) => actionT;
export const changeLanguage: ChangeLanguageT = language => {
  return {
    type: "changeLanguage",
    payload: { language },
    target: "@ioNews"
  };
};

type ListTopNewsT = () => actionT;
export const listTopNews: ListTopNewsT = () => {
  return {
    type: "listTopNews",
    payload: { },
    target: "@ioNews"
  }
}

type ListNewsByCategoryT = () => actionT;
export const listNewsByCategory: ListNewsByCategoryT = () => {
  return {
    type: "listNewsByCategory",
    payload: { },
    target: "@ioNews"
  }
}

type ExpandCategoryT = (category: Categories) => actionT;
export const expandCategory: ExpandCategoryT = (category) => {
  return {
    type: "expandCategory",
    payload: { category },
    target: "@ioNews"
  }
}

type ShowNewsDetailT = (news: News) => actionT;
export const showNewsDetail: ShowNewsDetailT = (news) => {
  return {
    type: "showNewsDetail",
    payload: { news },
    target: "@ioNews"
  }
}

type NavigateT = (route: AppStatus) => actionT;
export const navigate: NavigateT = (route) => {
  return {
    type: "navigate",
    payload: { route },
    target: "@ioNews"
  }
}

type GoBackT = () => actionT;
export const goBack: GoBackT = () => {
  return {
    type: "goBack",
    payload: { },
    target: "@ioNews"
  }
}

type SearchNewsT = (search: Search) => actionT;
export const searchNews: SearchNewsT = (search: Search) => {
  return {
    type: "searchNews",
    payload: { search },
    target: "@ioNews"
  }
}