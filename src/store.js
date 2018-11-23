import Vue from 'vue'
import Vuex from 'vuex'

import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

const wallet = {}
const account = {}

db.defaults({
  wallet,
  account
}).write()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wallet: {
      addr: '' || db.get('wallet.addr').value(),
      amount: '' || db.get('wallet.amount').value(),
      mnemonic: '' || db.get('wallet.mnemonic').value(),
      prvKey: '' || db.get('wallet.prvKey').value(),
      pubKey: '' || db.get('wallet.pubKey').value()
    },
    account: {
      name: '' || db.get('account.name').value(),
      password: '' || db.get('account.password').value()
    }
  },
  mutations: {
    setWallet (state, payload) {
      state.wallet = payload
      db.set('wallet', payload).write()
    },
    setAccount (state, payload) {
      state.account = payload
      db.set('account', payload).write()
    },
    setAmount (state, payload) {
      state.wallet.amount = payload
      db.set('wallet.amount', payload).write()
    }
  },
  actions: {
    createWalletData ({ commit }, payload) {
      commit('setWallet', payload)
    },
    createAccountData ({ commit }, payload) {
      commit('setAccount', payload)
    }
  }
})
