export default {
  widgetsConfig (state) {
    return state.widgetsConfig
  },
  getLSCitiesId () {
    return localStorage.getItem('weatherWidgetConfig')
  },
  getErrorMessage (state) {
    return state.errorMessage
  }
}
