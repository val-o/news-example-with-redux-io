import {
  initializeState,
  newsAlgebraImplementation as algebra
} from './NewsAlgebraImplementation';
import { IO, Option } from "funfix";
import { actionT } from "./actions";
import { State, AppStatus, Categories } from "./types";

const fst = <A, B>(a: [A, B]): A => a[0];
const snd = <A, B>(a: [A, B]): B => a[1];
const lift = <T>(c: T) => IO.of(() => c);

export default function ioCallReducer(
  state: [IO<State>, State] = [IO.of(() => initializeState()), initializeState()],
  action: actionT
): [IO<State>, State] {
  const [io, current] = state;
  const inject = <T>(fn: ((s: State) => IO<T>)): IO<T> => fn(snd(state));

  const update = (a: IO<State>): [IO<State>, State] => {
    return [a, snd(state)];
  };

  const categories: Array<Categories> = ["Entertainment", "General", "Health", "Science", "Sport", "Technology"];
  switch (action.type) {
    case 'init': {
      return [lift(initializeState()), initializeState()];
    }
    case 'changeLanguage': {
      return update(
        inject(algebra.changeLanguage(action.payload.language))
          .chain(language => IO.of(() => current.copy({ language, newsList: [] })))
      );
    }
    case 'listTopNews': {
      return update(
        inject(algebra.listTopNews())
          .chain(newsList => IO.of(() => current.copy({ newsList: newsList || [] })))
      )
    }
    case 'expandCategory': {
      return update(
        inject(algebra.expandCategory(action.payload.category))
          .chain(news => IO.of(() => current.copy({ 
            currentCategory: Option.of({ news, type: action.payload.category, collapsed: false })
          })))
      )
    }
    case 'listNewsByCategory': {
      return update(
        inject(state => IO.gather(categories.map(cat => algebra.listNewsByCategory(cat)(state))))
          .chain(([entertainment, general, health, science, sport, technology]) => IO.of(() => current.copy({
          categories: [{
              news: entertainment,
              type: 'Entertainment',
              collapsed: false
            },
            {
              news: general,
              type: 'General',
              collapsed: false
            },
            {
              news: health,
              type: 'Health',
              collapsed: false
            },
            {
              news: science,
              type: 'Science',
              collapsed: false
            },
            {
              news: sport,
              type: 'Sport',
              collapsed: false
            }
          ]
      }))))
    }
    case 'showNewsDetail': {
      return update(
        inject(algebra.showNewsDetail(action.payload.news))
          .chain(displayedNews => IO.of(() => current.copy({ displayedNews }).updateStatus('DisplayedNews')))
      )
    }
    case 'searchNews': {
      return update(
        inject(algebra.searchNews(action.payload.search))
          .chain(newsList => IO.of(() => current.copy({ newsList: newsList || [] })))
      );
    }
    case 'navigate': {
      return update(
        inject(algebra.navigate(action.payload.route)).chain(s => IO.of(() => s.copy({ newsList: []})))
      )
    }
    case 'goBack': {
      return update(
        inject(algebra.goBack())
      )
    }
    case 'commit': {
      return [fst(state), action.payload];
    }
    default:
      return state;
  }
}
