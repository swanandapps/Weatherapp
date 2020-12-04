<template>
  <div>
    <section class="DailyForecastSection">
      <div
        @click="ShowDetailedForecast(forecast, index)"
        v-for="(forecast, index) in GetDailyData"
        :key="forecast"
        class="DailyForecastDiv"
      >
        <input
          class="DailyForecastInput"
          type="radio"
          name="active_day"
          value="0"
          checked=""
        />
        <div class="ForecastData">
          <p>{{ forecast.day }}</p>
          <p>
            <span>{{ forecast.temp.max }} °</span>
            <span>{{ forecast.temp.min }} °</span>
          </p>
          <img
            v-if="forecast.clouds >= 50"
            class="ForecastIcon"
            src="../icons/cloudy.svg"
            alt="Clouds"
          />
          <p v-if="forecast.clouds >= 50">Clouds</p>

          <img
            v-if="forecast.clouds < 50"
            class="ForecastIcon"
            src="../icons/sunny.svg"
            alt="Clear"
          />
          <p v-if="forecast.clouds < 50">Clear</p>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from "axios";

import { CONSTANTS } from "../Data/constants";

export default {
  data() {
    return {
      DailyForecast: {},

      WeatherData: {},
      Location: {},
    };
  },

  computed: {
    GetData() {
      return this.$store.getters.GetWeatherData;
    },
    GetDailyData() {
      return this.$store.getters.GetDailyData;
    },

    GetLocation() {
      return this.$store.getters.GetLocation;
    },
  },

  methods: {
    ShowDetailedForecast(forecast, index) {
      this.$store.state.WeatherData = forecast;
      this.$store.state.CurrentDay = index;
    },
  },
};
</script>


<style scoped>
.DailyForecastSection {
  display: flex;
  font-size: 0.95rem;
  overflow-x: scroll;
  margin-bottom: 1.5rem;
  white-space: nowrap;
}
.DailyForecastDiv {
  position: relative;
  margin: 0.25rem;
}
.DailyForecastInput {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  display: block;
}
.DailyForecastInput:checked ~ .ForecastData {
  background: #fffdf7;
  box-shadow: 0 0 1px 3px #00a6fa;
  display: block;
}
.ForecastData {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  transition: box-shadow 0.3s ease-in;
}
.ForecastData p {
  margin: 0 0 0.25rem;
  font-weight: 600;
}
.ForecastIcon {
  margin: 0.5rem;
  width: 27px;
}
</style>

