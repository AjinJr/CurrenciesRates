export const getPaperMoney = () =>{
    return fetch('https://api.getgeoapi.com/v2/currency/list?api_key=7f6727409f793f1845fce5e2463dfccf399f1b64&format=json')
    .then((response) => {
      return response.json()
    })
}