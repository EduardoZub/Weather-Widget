<template>
  <div class="weather-widget-card-settings">
    <div class="weather-widget-card-settings__title">
      <span>
        <font-awesome-icon class="settings-icon" icon="sliders-h" />
        Settings
      </span>
      <font-awesome-icon
        class="close-icon"
        icon="times"
        @click="close()"/>
    </div>

    <draggable
      v-if="widgetsList.length"
      class="widgets-group"
      tag="ul"
      v-model="widgetsList"
      v-bind="dragOptions">

      <li class="widgets-group__sities" v-for="widget in widgetsList" :key="widget.id">
        <div class="city">
          <div class="city-content">
            <font-awesome-icon class="drop-icon" icon="arrows-alt" @mouseenter="onMouseenter" @mouseleave="onMouseleave"/>
            <div>{{widget.cityName}} <span>{{widget.country}}</span></div>
          </div>
          <font-awesome-icon class="delete-icon" icon="trash" @click="onDelete(widget.id)"/>
        </div>
      </li>
    </draggable>

    <div v-else class="no-cities">
      No cities
    </div>

    <form class="weather-widget-card-settings__new-city" @submit.prevent="">
      <input class="new-city-input" type="text" placeholder="Add Location" v-model="cityName">
      <button class="add-button" @click="addNewCity">Add</button>
    </form>

    <AlertWindow
      v-if="showAlert"
      @close="onClose"
      @agree="onAgree">

      <template v-slot:message v-if="isExist">
        <div>Already exist</div>
      </template>

      <template v-slot:actions v-if="isExist">
        <button class="alert-window-button" @click="onClose">Ok</button>
      </template>
    </AlertWindow>

    <AlertWindow v-if="getErrorMessage.isActive">
      <template v-slot:message>
        <div>{{getErrorMessage.message}}</div>
      </template>

      <template v-slot:actions>
        <button class="alert-window-button" @click="onClose">Cencel</button>
      </template>
    </AlertWindow>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import AlertWindow from './AlertWindow.vue'
import draggable from 'vuedraggable'

export default {
  name: 'WeatherWidgetSettings',
  components: {
    AlertWindow,
    draggable
  },
  data () {
    return {
      cityName: '',
      deletItemId: null,
      showAlert: false,
      isExist: false,
      options: {
        animation: 200,
        group: 'widgets',
        disabled: true
      }
    }
  },
  props: {
    widgets: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['widgetsConfig', 'getErrorMessage']),
    widgetsList: {
      get: function () {
        return this.widgets
      },
      set: function (values) {
        this.updateWidgetsConfig(values)
        this.updateLocalStorege()
      }
    },
    dragOptions: {
      get: function () {
        return this.options
      },
      set: function (disabled) {
        this.options.disabled = disabled
      }
    }
  },
  methods: {
    ...mapMutations(['deleteWidget', 'addNewCity', 'updateLocalStorege', 'updateWidgetsConfig']),
    ...mapActions(['getWeatherByName']),
    onDelete (id) {
      this.deletItemId = id
      this.showAlert = true
    },
    onAgree () {
      this.deleteWidget(this.deletItemId)
      this.updateLocalStorege()
      this.showAlert = false
    },
    onClose () {
      this.showAlert = false
      this.isExist = false
      this.getErrorMessage.isActive = false
    },
    addNewCity () {
      if (!this.cityName.trim()) { return }
      if (!this.widgetsConfig.some(el => el.cityName.toLowerCase() === this.cityName.toLowerCase())) {
        this.getWeatherByName(this.cityName)
        this.cityName = ''
      } else {
        this.isExist = true
        this.cityName = ''
        this.showAlert = true
      }
    },
    close () {
      this.$emit('close')
    },
    onMouseenter () {
      this.dragOptions = false
    },
    onMouseleave () {
      this.dragOptions = true
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.weather-widget-card-settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  padding: 30px 20px;
  border-radius: 5px;
  background-color: #19456b;
  box-shadow: 0px 5px 20px -4px #000;
  z-index: 9;

  &__title {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 20px;

    .close-icon {
      cursor: pointer;
      font-size: 18px;
    }
  }

  .no-cities {
    width: 100%;
    font-weight: bold;
    text-align: center;
    padding: 20px 0;
  }

  .settings-icon {
    font-size: 18px;
    margin-right: 5px;
  }

  .delete-icon {
    cursor: pointer;
    transition: color .2s;

    &:hover {
      color: #e24040;
      transition: color .2s;
    }
  }

  .city {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #e7d9ea;
    padding: 10px;
    color: #19456b;
    margin-bottom: 10px;

    .city-content {
      display: flex;
      flex-direction: row;
      align-items: center;

      .drop-icon {
        margin-right: 10px;
        cursor: move;
      }
    }
  }

  &__new-city {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    .new-city-input {
      width: 100%;
      padding: 10px;
      outline: none;
    }

    .add-button {
      font-weight: bold;
      font-size: 15px;
      margin-left: 10px;
      padding: 9px 15px;
      cursor: pointer;
      background-color: #fff;
      color: #11698e;
      border: 1px solid #fff;
      outline: none;
      transition: background-color .3s, color .3s, border .3s;

      &:hover {
        color: #fff;
        background-color: #11698e;
        border: 1px solid #fff;
        transition: background-color .3s, color .3s, border .3s;
      }
    }
  }
}
</style>
