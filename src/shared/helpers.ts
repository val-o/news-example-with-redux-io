import { Option, Future, IO } from "funfix";

export const fetchFuture = <T>(url: string, config: {}) =>
  Future.fromPromise(
    fetch(url, config).then(res => (res.json() as unknown) as T)
  );
export const fetchIO = <T>(url: string, config: {}) =>
  IO.deferFuture(() => fetchFuture<T>(url, config));

export const mapToOptional = <
  T extends { [a in string]: unknown },
  K extends { [a in string]: Option<unknown> }
>(
  a: T
): K =>
  Object.keys(a).reduce(
    (acc, key) => ({ ...acc, [key]: Option.of(a[key]) }),
    {}
  ) as K;
