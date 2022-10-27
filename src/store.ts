import { useComputed, useReactive } from 'micro-reactive'
import { Options, SetupReturn, OptionsStore, SetupStore, Actions, Getters } from './type'

export function defineStore<
  S extends object,
  G extends Getters = {},
  A extends Actions = {},
>(
  options: Options<S, G, A>
): () => OptionsStore<S, G, A>

export function defineStore<SR extends SetupReturn>(id: string, setup: () => SR): () => SetupStore<SR>

export function defineStore(idOrOptions: any, setup?: any) {
  return typeof idOrOptions === 'string'
    ? defineSetupStore(idOrOptions, setup)
    : defineOptionsStore(idOrOptions)
}

function defineSetupStore(id: string, setup: any) {
  const store = setup()
  store.$id = id
  return () => store
}

function defineOptionsStore({ state, getters, actions }: any) {
  const store = useReactive(state()) as any
  if (getters) {
    const gets = getters(store)
    for (const key in gets) {
      store[key] = useComputed(gets[key])
    }
  }
  if (actions) {
    const acts = actions(store)
    for (const key in acts) {
      store[key] = acts[key]
    }
  }
  return () => store
}
