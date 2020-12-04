import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    CurrentLocation: {

      Latitude: '18.516726',
      Longitude: '73.856255',
    },

    WeatherData: {},
    DailyData: {},
    HourlyData: {},
    CurrentDay: 0

  },
  mutations: {

    SetLocation(state, loc) {

      state.CurrentLocation = loc



    },

    SetDailyData(state, loc) {

      state.DailyData = loc





    },

    SetHourlyData(state, loc) {

      state.HourlyData = loc





    },



    SetWeatherData(state, data) {

      state.WeatherData = data

    }

  },
  actions: {},
  modules: {},

  getters: {
    GetWeatherData: state => {
      return state.WeatherData
    },

    GetLocation: state => {
      return state.CurrentLocation
    },
    GetDailyData: state => {
      return state.DailyData
    },
    GetHourlyData: state => {
      return state.HourlyData
    },
    GetCurrentDay: state => {
      return state.CurrentDay
    },

  }
});
