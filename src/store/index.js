import { createStore } from 'vuex'


function getInfo(name){
  return fetch(`https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=USD&api_key=339fc8c0f96cb3a3b548f7c3bea4c7e35eda66a5bb026d8c81b65eff2ffe2e07`)
    .then((response) =>{
      return response.json()
    })
}

function getAllCoins(){
  return fetch(`https://min-api.cryptocompare.com/data/all/coinlist?summary=true`)
    .then((response) =>{
      return response.json()
    })
}


function getPaperMoney(){
  return fetch('https://api.getgeoapi.com/v2/currency/list?api_key=7f6727409f793f1845fce5e2463dfccf399f1b64&format=json')
    .then((response) => {
      return response.json()
    })
}

function getPaperValue(payload){
  return fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=7f6727409f793f1845fce5e2463dfccf399f1b64&from=${payload}&to=RUB`)
    .then((response) => {
      return response.json()
    })
}

export default createStore({
  state: {
    cards: [], // info for cards 
    coins: [], // for all coins 
    currencies: [], // for paper money 
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

    REMOVE_CARD(state, payload){
        state.cards = state.cards.filter(( item) => item['name'] != payload)
    }, 

    CLEAR_CARDS(state){
      // console.log(state.cards)
      // state.cards = state.cards.filter(item => item === 'abracadabra')
      // console.log(state.cards)
      state.cards = []
    }
  },
  actions: {
    async getAllCoins({commit}){
      try {
        const coins = await getAllCoins()
        // console.log(Object.keys(coins['Data']))
        commit('SET_NAMES', Object.keys(coins['Data']))

      } catch (error) {
        console.log(error)
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
        const info = {'code': value.base_currency_code, 'name': value.base_currency_name, 'rates': value.rates['RUB'].rate}
        commit('SET_VALUE', info)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
