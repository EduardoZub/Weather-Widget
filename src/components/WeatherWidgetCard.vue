<template>
  <div class="weather-widget-card">
    <div class="weather-widget-card__location">
      <div>
        <font-awesome-icon class="gear-icon" icon="map-marked-alt" />
        <span class="city">{{widget.cityName}} </span>
        <span>"{{widget.country}}"</span>
      </div>
    </div>

    <div class="weather-widget-card__main-data">
      <img :src="`http://openweathermap.org/img/wn/${widget.iconCode}@2x.png`" alt="weather icon">
      <div class="weather-description">
        <div class="temperature">{{widget.temp | roundUp}} &#8451;</div>
        <div class="weather-main">{{widget.weatherMain}}</div>
        <small>{{widget.weatherDescription}}</small>
      </div>
    </div>

    <div class="weather-widget-card__additional-data">
      <ul>
        <li><span>Feels like:</span> <span>{{widget.feels_like | roundUp}}</span></li>
        <li><span>Humidity:</span> <span>{{widget.humidity}}</span></li>
        <li><span>Pressure:</span> <span>{{widget.pressure}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherWidgetCard',
  props: {
    widget: {
      type: Object,
      default: null
    }
  },
  filters: {
    roundUp: function (value) {
      if (!value || typeof value !== 'number') { return value }
      return Math.round(value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common';

ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  li {
    width: 100%;
    display: flex;
    flex-direction: revert;
    align-items: center;
    justify-content: space-between;
    margin-right: 10px;
    padding: 5px 0;
  }
}

.weather-widget-card {
  width: 270px;
  padding: 20px;
  border-radius: 10px;
  background-color: $main-light;
  color: $white;
  margin-bottom: 10px;

  &__location {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 19px;

    .city {
      margin-left: 10px;
    }
  }

  &__main-data {
    display: flex;
    flex-direction: column;
    align-items: center;

    .weather-icon {
      font-size: 50px;
      margin: 25px 0;
    }

    .weather-description {
      text-align: center;
      font-weight: bold;

      .weather-main,
      .temperature {
        font-size: 25px;
      }
    }
  }

  &__additional-data {
    margin-top: 20px;
  }
}
</style>
