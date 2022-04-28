export const getPaperValue = (payload) => {
    return fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=7f6727409f793f1845fce5e2463dfccf399f1b64&from=${payload[0]}&to=${payload[1]}`)
    .then((response) => {
      return response.json()
    })
}

export const getHistValue = (payload1, payload2) => {
  return fetch(`https://api.getgeoapi.com/v2/currency/historical/${payload1}?api_key=7f6727409f793f1845fce5e2463dfccf399f1b64&from=${payload2}&to=RUB`)
  .then((response) => {
    return response.json()
  })
}