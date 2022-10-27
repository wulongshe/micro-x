import type { Getter, Signal, Reactive, ReadonlyReactive, Accessor } from 'micro-reactive'

export type Getters = {
  [key: string]: Accessor<any> | Getter<any>
}

export type Actions = {
  [key: string]: ((...args: any[]) => any)
}

export type Options<
  S extends object,
  G extends Getters = {},
  A extends Actions = {},
> = {
  id: string
  state: () => S
  getters?: (state: Reactive<S>, getters: StoreComputed<G>) => G
  actions?: (store: OptionsStore<S, G, {}>) => A
}

export type SetupReturn = {
  [key: string]: Getter<any> | Signal<any> | Reactive<any> | ReadonlyReactive<any>
}

export type Computed<T> =
  T extends Accessor<infer V>
  ? Reactive<V>
  : T extends Getter<infer R>
  ? ReadonlyReactive<R>
  : never

export type StoreComputed<G extends Getters = {}> = Readonly<{ [key in keyof G]: Computed<G[key]> }>

export type OptionsStore<
  S extends object,
  G extends Getters = {},
  A extends Actions = {},
> = Reactive<S>
  & StoreComputed<G>
  & Readonly<A>

export type SetupStore<SR extends SetupReturn> = () => SR
