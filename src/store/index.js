import { createStore } from 'vuex'
import {getAllCoins} from '@/API/allCoins'
import {getInfo} from '@/API/getCardInfo'
import {getPaperMoney} from '@/API/getPaperValues'
import {getPaperValue, getHistValue} from '@/API/getCurrentPaperValue'


export default createStore({
  state: {
    cards: [], // info for cards 
    coins: [], // for all coins 
    currencies: [], // for paper money 
    histValues: [],
    value: {}
  },
  getters: {
    getCardInfo(state){
      return state.cards
    },
   
    getCardsLength: state =>{
      return state.cards.length
    },

    getCurrentValue(state){
      return state.value
    }
  },
  mutations: {
    SET_CARD(state, payload){
      for(let i = 0; i < state.cards.length; ++i){
        if(state.cards[i]['name'] === payload['name']){
          state.cards[i]['price'] = payload['price']
          return
        }
      }
      state.cards.push(payload)
    }, 
    SET_NAMES(state, payload){
      state.coins = payload
    },

    SET_MONEY(state, payload){
      state.currencies = payload
    },

    SET_VALUE(state, payload){
      state.value = payload
    },
    SET_HIST(state, payload){
      state.histValues = payload
      console.log(state.histValues)
    },
    REMOVE_CARD(state, payload){
        state.cards = state.cards.filter(( item) => item['name'] != payload)
    }, 

    CLEAR_CARDS(state){
      state.cards = []
    }
  },
  actions: {
    async getAllCoins({commit}){
      try {
        const coins = await getAllCoins()
        commit('SET_NAMES', Object.keys(coins['Data']))

      } catch (error) {
        console.error(error)
      }
    },

    async getInfo({commit}, name){
      try{
        const price = await getInfo(name)
        let info = {'name': name, 'price': price['USD']}
        commit('SET_CARD', info)
       
      }
      catch(error){
        console.error(error)
      }
    },

    async getPaperMoney({commit}){
      try{
        const arr = await getPaperMoney()
        let info = Object.entries(arr.currencies)
        commit('SET_MONEY', info) 
      }
      catch(error){
        console.error(error)
      }
    }, 

    async getPaperValue({commit}, payload){
      try {
        console.log(payload)
        const value = await getPaperValue(payload)
        const info = {'code': value.base_currency_code, 'name': value.base_currency_name, 'rates': value.rates[payload[1]].rate}
        console.log(info)
        commit('SET_VALUE', info)
      } catch (error) {
        console.error(error)
      }
    }, 
    async getHistCurrency({commit}, payload){
      console.log(payload)
      try {
        let result =[]
        for(let i = 0; i < payload['dates'].length; ++i){
          const value = await getHistValue(payload['dates'][i], payload['value'])
          const info = {'date': value.updated_date, 'rates': value.rates.RUB.rate}
          result.push(info)
        }
        commit('SET_HIST', result)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
