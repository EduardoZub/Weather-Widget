import axios from 'axios'

const unitsFormat = 'metric'
const apiKey = 'f609939e60b9916ea2d4e198406f051b'
const urlApi = 'http://api.openweathermap.org/data/2.5/weather'
const urlApiBySeveralIds = 'http://api.openweathermap.org/data/2.5/group'

export default {
  fetchWeatherByCitiesId (ctx, ids) {
    if (!ids) { return }
    const params = {
      id: ids,
      units: unitsFormat,
      appid: apiKey
    }
    axios
      .get(urlApiBySeveralIds, { params })
      .then(resp => {
        resp.data.list.forEach((item) => {
          ctx.commit('setWidgetsConfig', item)
        })
      })
      .catch(err => {
        console.error('ERROR', err)
      })
  },
  getWeatherByName (ctx, cityName) {
    if (!cityName) { return }
    const params = {
      q: cityName,
      units: unitsFormat,
      appid: apiKey
    }
    axios
      .get(urlApi, { params })
      .then(response => {
        ctx.commit('setWidgetsConfig', response.data)
        ctx.commit('updateLocalStorege')
      })
      .catch(err => {
        ctx.commit('setErrorMessage', err.response.data.message)
      })
  }
}
