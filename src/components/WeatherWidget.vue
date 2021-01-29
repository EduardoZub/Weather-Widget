<template>
  <div class="weather-widget">
    <div class="weather-widget-header">
      <span class="weather-widget-header__title">
          Weather Widget
        <font-awesome-icon
            class="city-icon"
            icon="cloud-sun-rain"/>
      </span>
      <font-awesome-icon
        class="gear-icon"
        icon="cog"
        @click="showSettings = true"/>
    </div>

    <ul v-if="widgetsConfig.length">
      <li v-for="widget in widgetsConfig" :key="widget.id">
        <WeatherWidgetCard :widget="widget"/>
      </li>
    </ul>

    <div v-else class="no-cities">
      No cities,
      <button @click="showSettings = true" class="add-button">
        <font-awesome-icon
          class="city-icon"
          icon="map-marker-alt"/>
          Add city
      </button>
    </div>

    <WeatherWidgetSettings
      :widgetsList="widgetsConfig"
      v-if="showSettings"
      @close="showSettings = false"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import WeatherWidgetCard from './WeatherWidgetCard.vue'
import WeatherWidgetSettings from './WeatherWidgetSettings.vue'

export default {
  name: 'WeatherWidget',
  data () {
    return {
      showSettings: false
    }
  },
  components: {
    WeatherWidgetCard,
    WeatherWidgetSettings
  },
  computed: mapGetters(['widgetsConfig', 'getLSCitiesId']),
  methods: mapActions(['fetchWeatherByCitiesId']),
  created () {
    const citiesIds = this.getLSCitiesId
    if (citiesIds && citiesIds.length) { this.fetchWeatherByCitiesId(citiesIds) }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.weather-widget {
  position: relative;
  width: 100%;
  min-width: 270px;
  max-width: fit-content;
  padding: 15px;
  border-radius: 10px;
  background-color: #16c79a;
  color: #fff;
  box-shadow: 0px 0px 9px -1px #11698e;
}

.add-button {
  border: solid 1px  #fff;
  padding: 8px 15px;
  background-color: #11698e;
  color: #fff;
  outline: none;
  font-weight: bold;
  cursor: pointer;
  margin-left: 15px;
  transition: background-color .3s, color .3s, border .3s;

  &:hover {
    border: solid 1px  #11698e;
    color: #11698e;
    background-color: #e7d9ea;
    transition: background-color .3s, color .3s, border .3s;
  }
}

.no-cities {
  font-weight: bold;
  padding: 15px 15px;
  background-color: #11698e;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
}

.city-icon {
  margin-right: 10px;
}

.weather-widget-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  .gear-icon {
    cursor: pointer;
    color: #fff;
    transition: color .3s;

    &:hover {
      color: #11698e;
      transition: color .3s;
    }
  }

  &__title {
    font-weight: bold;
  }
}
</style>
