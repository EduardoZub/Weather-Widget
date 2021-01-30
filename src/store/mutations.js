export default {
  addNewCity (state, city) {
    state.citysNames.unshift(city)
  },
  setWidgetsConfig (state, data) {
    const widget = {
      id: data.id,
      cityName: data.name,
      temp: data.main.temp,
      iconCode: data.weather[0].icon,
      country: data.sys.country,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      weatherMain: data.weather[0].main,
      weatherDescription: data.weather[0].description
    }
    state.widgetsConfig.push(widget)
    state.citiesIds.push(widget.id)
  },
  deleteWidget (state, id) {
    state.widgetsConfig = state.widgetsConfig.filter(w => w.id !== id)
    state.citiesIds = state.citiesIds.filter(i => i !== id)
  },
  updateLocalStorege (state) {
    const parsed = state.citiesIds.join()
    localStorage.setItem('weatherWidgetConfig', parsed)
  },
  setErrorMessage (state, errorMessage) {
    state.errorMessage.isActive = true
    state.errorMessage.message = errorMessage
  },
  updateWidgetsConfig (state, data) {
    state.widgetsConfig = data
    state.citiesIds = data.map(elem => elem.id)
  }
}
