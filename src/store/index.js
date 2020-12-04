import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    CurrentLocation:{

      Latitude:'18.516726',
      Longitude:'73.856255',
    },
  
    WeatherData:{},
    DailyData:{},
    HourlyData:{}

  },
  mutations: {

    SetLocation(state, loc){

      state.CurrentLocation=loc


     
    },

    SetDailyData(state, loc){

      state.DailyData=loc

      console.log("DAILY DATA BEING SET",loc)


     
    },

    SetHourlyData(state, loc){

      state.HourlyData=loc

      console.log("HOURLY DATA BEING SET",loc)


     
    },
  
  
  
    SetWeatherData(state,data){

      state.WeatherData=data

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
   
  }
});
