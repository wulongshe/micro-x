import { expect, describe, it } from 'vitest'
import { defineStore } from '../src/store'
import { OptionsStore } from '../src/type'

describe('[store]: options', () => {
  it('state', async () => {
    const useUserStore = defineStore({
      id: 'user',
      state: () => ({
        count: 1
      })
    })
    const userStore = useUserStore()
    const { count } = userStore

    expect(userStore()).toEqual({ count: 1 })
    expect(count()).toBe(1)
  })
  it('getters', async () => {
    const useUserStore = defineStore({
      id: 'user',
      state: () => ({
        count: 1
      }),
      getters: (state) => ({
        double: () => state.count() * 2
      })
    })
    const userStore = useUserStore()
    const { double } = userStore

    expect(userStore()).toEqual({ count: 1 })
    expect(double()).toBe(2)
  })
  it('actions', async () => {
    const useUserStore = defineStore({
      id: 'user',
      state: () => ({
        count: 1
      }),
      actions: (store) => ({
        add(value: number) {
          const { count } = store
          setTimeout(() => count(count() + value), 100)
          return count() + value
        }
      })
    })
    const userStore = useUserStore()

    expect(userStore()).toEqual({ count: 1 })
    expect(userStore.add(2)).toBe(3)
  })
})
