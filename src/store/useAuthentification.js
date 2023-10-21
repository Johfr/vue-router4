import { defineStore } from 'pinia'

export const useAuthentification = defineStore('authentification', {
  state: () => ({
    auth: false,
    roles: [],
  }),
  actions: {
    // change the state au auth
    updateAuth() {
      this.auth = !this.auth
    },
  },
})