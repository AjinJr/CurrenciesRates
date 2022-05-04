import { createStore } from 'vuex'
import {getAllCoins} from '@/API/allCoins'
import {getInfo} from '@/API/getCardInfo'
import {getPaperMoney} from '@/API/getPaperValues'
import {getPaperValue, getHistValue} from '@/API/getCurrentPaperValue'
// import { values } from 'core-js/core/array'


export default createStore({
  state: {
    cards: [], // info for cards 
    coins: [], // for all coins 
    currencies: [], // for paper money 
    histValues: {},
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
    FETCH_HIST(state){
      state.histValues = {
        data: [],
        loading: true,
        error: null,
      };
    },
    FETCH_HIST_SUCCESS(state, payload){
      state.histValues = {
        data: payload,
        loading: false,
        error: null,
      };
      console.log(state.histValues)
    },
    FETCH_HIST_FAILURE(state, payload){
      state.histValues = {
        data: [],
        loading: false,
        error: payload,
      };
      console.log(state.histValues)
    },

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
        const value = await getPaperValue(payload)
        const info = {'code': value.base_currency_code, 'name': value.base_currency_name, 'rates': value.rates[payload[1]].rate}
        commit('SET_VALUE', info)
      } catch (error) {
        console.error(error)
      }
    }, 
    async getHistCurrency({commit}, payload){
      commit('FETCH_HIST')
      try {
        const promises = payload.dates.map(async (date) => {
          const value = await getHistValue(date, payload.value)
          const info = {'date' : value.updated_date, 'rates': value.rates.RUB.rate}
          return info
        })
        const result = await Promise.all(promises)
        
        commit('FETCH_HIST_SUCCESS', result)
      } catch (error) {
        commit('FETCH_HIST_FAILURE')
      }
    }
  },
  modules: {
  }
})
