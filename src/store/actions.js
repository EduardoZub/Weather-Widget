import axios from 'axios'
import localStoregeService from '../services/local-storage-service'

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
        localStoregeService.setLocalStorageItem(response.data.id)
        ctx.commit('setWidgetsConfig', response.data)
      })
      .catch(err => {
        ctx.commit('setErrorMessage', err.response.data.message)
      })
  }

  // getCitiesAutocomplete (ctx, search) {
  // if (!search) { return }
  // axios
  //   .get(urlCitiesAutocomplete, { params: { search } })
  //   .then(cities => {
  //     console.log(cities.data._embedded['city:search-result'])
  //     debugger
  //     ctx.commit('setAutocompleteList', cities.data._embedded['city:search-result'])
  //   })
  //   const params = {
  //     libraries: 'places',
  //     key: 'AIzaSyDz8K45rQSIqan5kQHQ2vMBX3ImjeoAfeA'
  //   }
  //   axios
  //     // .get('https://maps.googleapis.com/maps/api/geocode/jsone/', { params })
  //     .get('https://maps.googleapis.com/maps/api/js/', { params })
  //     .then(cities => {
  //       console.log(cities.data._embedded['city:search-result'])
  //       debugger
  //       ctx.commit('setAutocompleteList', cities.data._embedded['city:search-result'])
  //     })
  // }
}
