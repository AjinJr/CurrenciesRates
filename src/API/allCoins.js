export const getAllCoins = () => {
    return fetch(`https://min-api.cryptocompare.com/data/all/coinlist?summary=true`)
    .then((response) =>{
      return response.json()
    })
}