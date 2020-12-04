<template>
  <div>
    <div class="SearchContainer">
      <svg class="SearchIcon IconPosition" viewBox="0 0 512 512">
        <path
          d="M256 0C153.755 0 70.573 83.182 70.573 185.426c0 126.888 165.939 313.167 173.004 321.035 6.636 7.391 18.222 7.378 24.846 0 7.065-7.868 173.004-194.147 173.004-321.035C441.425 83.182 358.244 0 256 0zm0 278.719c-51.442 0-93.292-41.851-93.292-93.293S204.559 92.134 256 92.134s93.291 41.851 93.291 93.293-41.85 93.292-93.291 93.292z"
        ></path>
      </svg>
      <input
        type="text"
        v-model="CurrentCity"
        class="Searchinput"
        placeholder="Search"
      />
      <button class="SearchButton">
        <svg class="SearchIcon" viewBox="0 0 511.999 511.999">
          <path
            d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z"
          ></path>
        </svg>
      </button>
      <section v-if="this.showDropdown" class="DropdownContainer">
        <div
          @click="SelectLocation(item, index)"
          v-for="(item, index) in this.FilteredCityList"
          :key="item"
          class="SearchList"
        >
          <span
            ><span
              ><b>{{ item.city }}</b></span
            >, <span> {{ item.state }}</span></span
          >

          <div class="flex gap">
            <div class="flex column">
              <span>{{ item.temp }} °C </span>
              <span>{{ item.condition }}</span>
            </div>

            <img
              v-if="
                item.condition == 'Smoke' ||
                item.condition == 'Clear' ||
                item.condition == 'Haze'
              "
              class="WeatherIcon"
              src="../icons/sunny.svg"
              alt="Smoke"
            />
            <img
              v-if="
                item.condition == 'Clouds' ||
                item.condition == 'Rain' ||
                item.condition == 'Mist' ||
                item.condition == 'Fog' ||
                item.condition == 'Drizzle'
              "
              class="WeatherIcon"
              src="../icons/cloudy.svg"
              alt="Cloudy"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import data from "../Data/cities.js";
import { CONSTANTS } from "../Data/constants";

export default {
  data() {
    return {
      Citylist: [],
      CurrentCity: "Pune, Maharashtra",
      FilteredCityList: [],
      showDropdown: true,
      City: "",
      DailyForecast: {},
      HourlyForecast: {},
    };
  },

  watch: {
    CurrentCity: function () {
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      let term = capitalizeFirstLetter(this.CurrentCity);

      this.FilteredCityList = this.Citylist.filter((el) =>
        el.city.includes(term)
      );

      this.FilteredCityList.forEach((element) => {
        let link =
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          element.city +
          "&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";

        axios.get(link).then((response) => {
          element.temp = response.data.main.temp.toPrecision(2);
          element.condition = response.data.weather[0].main;
        });
      });
    },
  },

  created() {
    this.Citylist = data.Cities;
  },

  methods: {
    SelectLocation: function (item, index) {
      let location = {
        Latitude: item.lat,
        Longitude: item.lng,
      };

      this.CurrentCity = item.city + ", " + item.state;

      this.$store.commit(CONSTANTS.SET_LOCATION, location);

      this.showDropdown = true;

      this.City = item.city + ", " + item.state;

      let link =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        item.lat +
        "&lon=" +
        item.lng +
        "&exclude=minutely,alerts&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";

      axios.get(link).then((response) => {
        this.DailyForecast = response.data.daily;
        this.HourlyForecast = response.data.hourly;

        this.DailyForecast.forEach((el, i) => {
          var date = new Date(el.dt * 1000).toDateString();

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
      });
    },
  },
};
</script>


<style scoped>
.SearchList {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  -webkit-animation: SearchList_slideIn- 0.5s;
  animation: SearchList_slideIn- 0.5s;
}
.Searchinput {
  box-shadow: 0 8px 10px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 -8px 12px 0 rgba(0, 0, 0, 0.05),
    0 -2px 3px -2px rgba(0, 0, 0, 0.01);
  border-radius: 8px;
  border: none;
  display: block;
  height: 0.1rem;
  padding: 1.75rem 1.75rem 1.75rem 3rem;
  font-weight: 600;
  text-transform: capitalize;
  transition: box-shadow 0.2s ease;
  width: 100%;
}
.WeatherIcon {
  height: 40px;
  width: 40px;
  margin-left: 0.5rem;
}
@-webkit-keyframes SearchList_slideIn- {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes SearchList_slideIn- {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.SearchContainer {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1.5rem;
}
.SearchBar_searchInput {
  box-shadow: 0 8px 10px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 -8px 12px 0 rgba(0, 0, 0, 0.05),
    0 -2px 3px -2px rgba(0, 0, 0, 0.01);
  border-radius: 8px;
  border: none;
  display: block;
  height: 2.5rem;
  padding: 1.75rem 1.75rem 1.75rem 3rem;
  font-weight: 600;
  text-transform: capitalize;
  transition: box-shadow 0.2s ease;
  width: 100%;
}
.SearchBar_searchInput:focus {
  outline: 0;
  box-shadow: 0 0 1px 2px #00a6fa;
}
.SearchIcon {
  height: 1.25rem;
  width: 1.25rem;
}
.IconPosition {
  position: absolute;
  left: 1rem;
}
.SearchButton {
  background: 0 0;
  border: none;
  position: absolute;
  right: 1rem;
  margin: 0;
}
.DropdownContainer {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 10px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 -8px 12px 0 rgba(0, 0, 0, 0.05),
    0 -2px 3px -2px rgba(0, 0, 0, 0.01);
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  z-index: 10;
}
.flex {
  display: flex;
}
.gap {
  justify-content: space-between;
}
.column {
  flex-direction: column;
}
</style>





