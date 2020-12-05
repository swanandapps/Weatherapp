<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      loader="bars"
      height="200"
      width="200"
      color="#00a6fa"
    ></loading>

    <div v-if="this.show">
      <SearchBar />
      <daily-forecast v-if="this.mount"></daily-forecast>
      <detailed-forecast v-if="this.mount"></detailed-forecast>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import SearchBar from "./SearchBar";
import DetailedForecast from "./DetailedForecast";
import axios from "axios";
import DailyForecast from "./DailyForecast.vue";
import { CONSTANTS } from "../Data/constants";

export default {
  name: "Home",

  components: {
    SearchBar,
    DailyForecast,
    DetailedForecast,
    DailyForecast,
    Loading,
  },
  data() {
    return {
      isLoading: true,

      lat: "",
      lon: "",
      error: "",
      mount: false,
      DailyForecast: {},
      HourlyForecast: {},
      show: false,
      location: {},
      locfound: false,
    };
  },

  mounted() {
    {
      setTimeout(() => {
        this.isLoading = false;
        this.show = true;
      }, 1500);

      //Getting the User Location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.location = position.coords;
          this.locfound = true;

          this.$store.commit(CONSTANTS.SET_LOCATION, this.location);
          this.GetLocationData(this.location);

          this.GetWeatherData(this.location);

          //Run Methods
        });
      } else {
        this.error = "Geolocation is not supported.";
      }
    }
  },

  methods: {
    GetWeatherData(loc) {
      let link =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        loc.latitude +
        "&lon=" +
        loc.longitude +
        "&exclude=current,minutelyalerts&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";

      axios.get(link).then((response) => {
        this.DailyForecast = response.data.daily;
        this.HourlyForecast = response.data.hourly;

        //Data Formatting- Changing the temp and date as required by UI

        this.DailyForecast.forEach((el, i) => {
          let date = new Date(el.dt * 1000).toDateString();

          this.DailyForecast[i].day = date.substring(0, 3);
          this.DailyForecast[i].temp.max = el.temp.max.toPrecision(2);
          this.DailyForecast[i].temp.min = el.temp.min.toPrecision(2);

          let rise = new Date(
            this.DailyForecast[i].sunrise * 1000
          ).toLocaleTimeString();
          let set = new Date(
            this.DailyForecast[i].sunset * 1000
          ).toLocaleTimeString();

          this.DailyForecast[i].sunrise = rise.substring(0, 4);
          this.DailyForecast[i].sunset = set.substring(0, 4);
        });

        this.$store.commit(CONSTANTS.SET_DAILY_DATA, this.DailyForecast);

        this.$store.commit(CONSTANTS.SET_HOURLY_DATA, this.HourlyForecast);

        //Finally Mounting all other components
        this.mount = true;
      });
    },

    GetLocationData(loc) {
      let link =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        loc.latitude +
        "&lon=" +
        loc.longitude +
        "&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";

      axios.get(link).then((response) => {
        let data = response.data;

        let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();

        let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        data.sunrise = sunrise;
        data.sunset = sunset;

        this.$store.commit(CONSTANTS.SET_WEATHER_DATA, data);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
