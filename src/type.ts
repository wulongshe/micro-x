import type { Reactive } from 'micro-reactive'

export type Getters = {
  [key: string]: () => any
}

export type Actions = {
  [key: string]: (...args: any[]) => void
}

export type Options<
  Id extends string,
  S extends object,
  G extends Getters,
  A extends Actions,
  > = {
    id: Id
    state: () => S
    getters?: (state: Reactive<S>) => G
    actions?: (state: Reactive<S>, getters: G) => A
  }

export type Store<
  Id extends string,
  S extends object,
  G extends Getters,
  A extends Actions,
  > = { $id: Id }
  & Reactive<S>
  & Readonly<G>
  & Readonly<A>
