export default {
  getLocalStorageItem () {
    return JSON.parse(localStorage.getItem('weatherConfigIds')).join()
  },

  setLocalStorageItem (id) {
    const localStorageIdis = JSON.parse(localStorage.getItem('weatherConfigIds')) || []
    localStorageIdis.push(id)
    localStorage.setItem('weatherConfigIds', JSON.stringify(localStorageIdis))
  },

  updateOrderLocalStoregeItem (data) {
    const updatedIdis = data.map(elem => elem.id)
    localStorage.setItem('weatherConfigIds', JSON.stringify(updatedIdis))
  },

  deleteIdFromLocalStoregeItem (id) {
    let localStorageIdis = JSON.parse(localStorage.getItem('weatherConfigIds'))
    localStorageIdis = localStorageIdis.filter(i => i !== id)
    localStorage.setItem('weatherConfigIds', JSON.stringify(localStorageIdis))
  }
}
