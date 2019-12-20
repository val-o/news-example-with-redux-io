import { Option } from "funfix";
import { PropertyObject } from "../../typeHelpers";

export type Categories = "Entertainment" | "General" | "Health" | "Science" | "Sport" | "Technology"

export type Category = {
  type: Categories,
  news: Array<News>,
  collapsed: Boolean
};

export type NewsAlike = {
  title: string;
  urlToImage: string;
  description: string;
  content: string;
};

export type News = {
  title: Option<string>;
  urlToImage: Option<string>;
  description: Option<string>;
  content: Option<string>;
};

export type Language = "GB" | "US";

export type Search = {
  query: string;
}

export type ConfigParams = {
  country: Option<Language>,
  apiKey: string,
  pageSize: Option<number>,
  q: Option<Search['query']>
  category: Option<Category['type']>
}

export type Config = {
  api: (params: ConfigParams) => string;
};

export type NewsID = number;
export type AppStatus = | "TopNews"
      | "CategoriesList"
      | "DisplayedNews"
      | "Search"
      | Categories

export class State {
  constructor(
    public config: Config,
    public categories: Array<Category>,
    public currentCategory: Option<Category>,
    public language: Language,
    public newsList: Array<News>,
    public displayedNews: Option<News>,
    public status: Array<AppStatus>
  ) {}

  copy(match: Partial<PropertyObject<typeof State>>): State {
    return { ...this, ...match, copy: this.copy, updateStatus: this.updateStatus };
  }

  updateStatus(a: AppStatus): State {
    return this.copy({ status: [...this.status, a]})
  }
};

