<template>
  <div>
    <section class="DetailedForecastSection">
      <div class="CurrentTempDiv">
        <h1 class="CurrentTemp">{{ CurrentData.temp.max }}°C</h1>
        <img class="CurrentTempImg" src="../icons/cloudy.svg" alt="Clouds" />
      </div>
      <div class="ApexGraph">
        <apexchart
          v-if="this.showGraph"
          type="area"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div class="OtherForecastData">
        <div class="OtherData">
          <span class="bold">Pressure</span
          ><span>{{ CurrentData.pressure }} hpa</span>
        </div>
        <div class="OtherData">
          <span class="bold">Humidity</span
          ><span>{{ CurrentData.humidity }} %</span>
        </div>
      </div>
      <div>
        <div class="flex justify">
          <div class="SunriseData">
            <span class="bold">Sunrise</span
            ><span>{{ CurrentData.sunrise }}am</span>
          </div>
          <div class="SunriseData">
            <span class="bold">Sunset</span
            ><span>{{ CurrentData.sunset }}pm</span>
          </div>
        </div>
        <div style="height: 200px">
          <div
            class="recharts-responsive-container"
            style="width: 100%; height: 100%"
          >
            <div
              class="recharts-wrapper"
              style="
                position: relative;
                cursor: default;
                width: 100%;
                height: 200px;
              "
            >
              <svg
                class="recharts-surface"
                style="width: 100%"
                height="200"
                viewBox="0 0 704 200"
                version="1.1"
              >
                <defs>
                  <clipPath id="recharts6-clip">
                    <rect x="18" y="0" height="170" width="676"></rect>
                  </clipPath>
                </defs>
                <defs>
                  <linearGradient id="time" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stop-color="#F7E0AF"
                      stop-opacity="0.6"
                    ></stop>
                    <stop
                      offset="90%"
                      stop-color="#F7E0AF"
                      stop-opacity="0.1"
                    ></stop>
                  </linearGradient>
                </defs>
                <g
                  style="width: 100%"
                  class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
                >
                  <line
                    class="recharts-cartesian-axis-line"
                    style="width: 100%"
                    height="30"
                    x="18"
                    y="170"
                    stroke="#666"
                    fill="none"
                    x1="18"
                    y1="170"
                    x2="694"
                    y2="170"
                  ></line>
                  <g style="width: 100%" class="recharts-cartesian-axis-ticks">
                    <g class="recharts-layer recharts-cartesian-axis-tick">
                      <text
                        style="width: 100%"
                        height="30"
                        x="18"
                        y="178"
                        stroke="none"
                        fill="#666"
                        class="recharts-text recharts-cartesian-axis-tick-value"
                        text-anchor="middle"
                      >
                        <tspan x="18" dy="0.71em">5am</tspan>
                      </text>
                    </g>
                    <g class="recharts-layer recharts-cartesian-axis-tick">
                      <text
                        width="676"
                        height="30"
                        x="187"
                        y="178"
                        stroke="none"
                        fill="#666"
                        class="recharts-text recharts-cartesian-axis-tick-value"
                        text-anchor="middle"
                      >
                        <tspan x="187" dy="0.71em"></tspan>
                      </text>
                    </g>
                    <g class="recharts-layer recharts-cartesian-axis-tick">
                      <text
                        width="676"
                        height="30"
                        x="356"
                        y="178"
                        stroke="none"
                        fill="#666"
                        class="recharts-text recharts-cartesian-axis-tick-value"
                        text-anchor="middle"
                      >
                        <tspan x="356" dy="0.71em">2am</tspan>
                      </text>
                    </g>
                    <g class="recharts-layer recharts-cartesian-axis-tick">
                      <text
                        width="676"
                        height="30"
                        x="525"
                        y="178"
                        stroke="none"
                        fill="#666"
                        class="recharts-text recharts-cartesian-axis-tick-value"
                        text-anchor="middle"
                      >
                        <tspan x="525" dy="0.71em"></tspan>
                      </text>
                    </g>
                    <g class="recharts-layer recharts-cartesian-axis-tick">
                      <text
                        width="676"
                        height="30"
                        x="688.0062494277954"
                        y="178"
                        stroke="none"
                        fill="#666"
                        class="recharts-text recharts-cartesian-axis-tick-value"
                        text-anchor="middle"
                      >
                        <tspan x="688.0062494277954" dy="0.71em">6pm</tspan>
                      </text>
                    </g>
                  </g>
                </g>
                <g class="recharts-layer recharts-area">
                  <g class="recharts-layer">
                    <path
                      stroke="none"
                      fill="url(#time)"
                      fill-opacity="0.6"
                      width="676"
                      height="170"
                      class="recharts-curve recharts-area-area"
                      d="M187,141.66666666666666C243.33333333333334,113.33333333333333,299.6666666666667,56.666666666666664,356,56.666666666666664C412.3333333333333,56.666666666666664,468.6666666666667,113.33333333333333,525,141.66666666666666C581.3333333333334,170,637.6666666666666,170,553.1666666666666,170C468.6666666666667,170,243.33333333333334,170,158.83333333333334,170C74.33333333333333,170,130.66666666666666,170,187,141.66666666666666M525,170C468.6666666666667,170,412.3333333333333,170,356,170C299.6666666666667,170,243.33333333333334,170,187,170C130.66666666666666,170,74.33333333333333,170,158.83333333333334,170C243.33333333333334,170,468.6666666666667,170,553.1666666666666,170C637.6666666666666,170,581.3333333333334,170,525,170"
                    ></path>
                    <path
                      stroke="#FEDB41"
                      fill="none"
                      fill-opacity="0.6"
                      width="676"
                      height="170"
                      class="recharts-curve recharts-area-curve"
                      d="M187,141.66666666666666C243.33333333333334,113.33333333333333,299.6666666666667,56.666666666666664,356,56.666666666666664C412.3333333333333,56.666666666666664,468.6666666666667,113.33333333333333,525,141.66666666666666C581.3333333333334,170,637.6666666666666,170,553.1666666666666,170C468.6666666666667,170,243.33333333333334,170,158.83333333333334,170C74.33333333333333,170,130.66666666666666,170,187,141.66666666666666"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <div
              style="
                position: absolute;
                width: 0px;
                height: 0px;
                visibility: hidden;
                display: none;
              "
            ></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from "axios";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },

        labels: [],

        yaxis: {
          type: "datetime",
        },
        legend: {
          horizontalAlign: "left",
        },
      },

      showGraph: false,
      DeatiledData: {},
      CurrentData: {
        temp: "",
        pressure: "",
        humidity: "",
        sunrise: "",
        sunset: "",
      },
      Location: {},
      Data: {},
      HourlyData: {},
      Day0Hours: 0,
      Day1Hours: 0,
      Day2Hours: 0,
    };
  },

  computed: {
    //Getting the Necessary Data from the store

    GetData() {
      return this.$store.getters.GetWeatherData;
    },

    GetLocation() {
      return this.$store.getters.GetLocation;
    },
    GetDailyData() {
      return this.$store.getters.GetDailyData;
    },
    GetHourlyData() {
      return this.$store.getters.GetHourlyData;
    },
    GetCurrentDay() {
      return this.$store.getters.GetCurrentDay;
    },
  },

  watch: {
    GetLocation(old) {
      this.GetForecast();
    },
    GetData(old) {
      //Setup Detaileddata

      var day = this.GetCurrentDay;

      console.log(day);

      var labels2 = [];
      var series2 = [];

      if (day == 0) {
        console.log("day0");
        this.Day0Hours = 24 - new Date().getHours();
        const HourlyData = this.GetHourlyData;
        var Hourdata = HourlyData.slice(0, this.Day0Hours);
      } else if (day == 1) {
        const HourlyData = this.GetHourlyData;
        this.Day2Hours = this.Day0Hours + 25;
        var Hourdata = HourlyData.slice(this.Day0Hours, this.Day2Hours);
      } else if (day == 2) {
        const HourlyData = this.GetHourlyData;
        var Hourdata = HourlyData.slice(30, 47);
      }
      //  old = old.slice(24, 48);

      console.log(Hourdata);

      Hourdata.forEach((el, i) => {
        let hour = new Date(el.dt * 1000).toLocaleTimeString();

        hour = hour.replace(":", "  ");
        hour = hour.slice(0, 3);

        Hourdata[i].hour = hour;

        labels2.push(hour);

        series2.push(Hourdata[i].temp.toPrecision(2));
      });

      //Updating the Graphs with new Data

      (this.series = [
        {
          data: series2,
        },
      ]),
        (this.chartOptions = {
          labels: labels2,
        });

      this.UpdateDetailedForecastData(old);
    },

    GetHourlyData(old) {
      // this.updateGraph(old);
    },

    GetDailyData(old) {
      //Get today's day data

      old = old[0];

      this.UpdateDetailedForecastData(old);
    },
  },

  methods: {
    UpdateDetailedForecastData(data) {
      this.CurrentData.temp = data.temp;
      this.CurrentData.pressure = data.pressure;
      this.CurrentData.humidity = data.humidity;
      this.CurrentData.sunrise = data.sunrise;
      this.CurrentData.sunset = data.sunset;
    },

    updateGraph(old) {
      this.chartOptions.labels = [];
      this.series[0].data = [];

      var labels = [];
      var series = [];

      old = old.slice(0, 13);

      //Formatting the Hourly data and ppopulating the graph at the end

      old.forEach((el, i) => {
        let hour = new Date(el.dt * 1000).toLocaleTimeString();
        hour = hour.slice(0, 2);
        hour = hour.replace(":", "");

        old[i].hour = hour;

        labels.push(hour);

        series.push(old[i].temp.toPrecision(2));
      });

      //Updating the Graphs with new Data

      (this.series = [
        {
          data: series,
        },
      ]),
        (this.chartOptions = {
          labels: labels,
        });
    },
  },

  mounted() {
    let TempData = this.GetDailyData[0];

    this.UpdateDetailedForecastData(TempData);

    //Getting the data of next 13 hours

    this.HourlyData = this.GetHourlyData.slice(0, this.Day0Hours);

    //Formatting the Data Accordingly and populating the Graph Data

    this.HourlyData.forEach((el, i) => {
      let hour = new Date(el.dt * 1000).toLocaleTimeString();
      hour = hour.slice(0, 2);
      hour = hour.replace(":", "");

      this.HourlyData[i].hour = hour;

      this.chartOptions.labels.push(hour);
      this.series[0].data.push(this.HourlyData[i].temp.toPrecision(2));
    });

    this.showGraph = true;
  },
};
</script>

<style scoped>
.DetailedForecastSection {
  border-radius: 8px;
  box-shadow: 0 8px 10px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 -8px 12px 0 rgba(0, 0, 0, 0.05),
    0 -2px 3px -2px rgba(0, 0, 0, 0.01);
  padding: 1.5rem 1rem 0;
}
.CurrentTempDiv {
  display: flex;
  align-items: baseline;
  margin-bottom: 1.5rem;
}
.CurrentTemp {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: #000;
}
.CurrentTempImg {
  height: 3em;
  margin-left: 1rem;
}
.ApexGraph {
  overflow: scroll;
  margin-bottom: 2rem;
}
.OtherForecastData {
  display: flex;
  margin-bottom: 3rem;
  text-align: left;
}
.OtherData {
  background: #f3fbff;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem;
}
.OtherData:first-of-type {
  margin-right: 0.5rem;
}
.SunriseData {
  display: flex;
  flex-direction: column;
}
.flex {
  display: flex;
}
.justify {
  justify-content: space-between;
}
.bold {
  font-weight: 700;
}
</style>
