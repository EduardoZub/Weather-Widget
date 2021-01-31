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
  },

  deleteWidget (state, id) {
    state.widgetsConfig = state.widgetsConfig.filter(w => w.id !== id)
  },

  setErrorMessage (state, errorMessage) {
    state.errorMessage.isActive = true
    state.errorMessage.message = errorMessage
  },

  updateWidgetsConfig (state, data) {
    state.widgetsConfig = data
  },

  setAutocompleteList (state, list) {
    debugger
    state.autocompleteList = list
    debugger
  }
}
