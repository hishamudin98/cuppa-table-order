<template>
  <rs-layout>
    <div class="w-full flex flex-col">
      <div class="inline-block pt-4 w-5/6">
        <div class="inline-block w-1/2 pr-10">
          <rs-card>
            <canvas id="myChart" width="700" height="300"></canvas>
          </rs-card>
        </div>

        <div class="inline-block w-1/2 pr-10">
          <rs-card>
            <canvas id="myChart1" width="700" height="300"></canvas>
          </rs-card>
        </div>
      </div>
    </div>
  </rs-layout>
</template>
<script>
/* eslint-disable */
import Chart from "chart.js/auto";
import { onMounted } from "vue";
import moment from "moment";

export default {
  name: "AdminDashboard",
  setup() {
    onMounted(() => {});
  },
  data() {
    return {
      staffid: "",
      staffName: "",
      show: false,
      outletDrop: false,
      menuDrop: false,
    };
  },
  async created() {
    if (this.$route.params.staffid != null) {
      this.staffid = this.$route.params.staffid;
      localStorage.staff = this.staffid;
    }
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("staff", this.staffid);
    });
    this.getdata();
  },

  async mounted() {
    const today = moment();
    const ctx1 = document.getElementById("myChart1");
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Income for " + today.format("YYYY"),
          data: [65, 59, 80, 81, 56, 55, 40, 55, 70, 77, 76, 80],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const myChart = new Chart(ctx1, {
      type: "line",
      data: data,
    });
    myChart;
    /* SECOND CHART */
    const ctx = document.getElementById("myChart");
    const labels1 = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data1 = {
      labels: labels1,
      datasets: [
        {
          label: "Income for 2021",
          data: [65, 59, 80, 81, 56, 55, 70, 72, 71, 65, 72, 80],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const myChart1 = new Chart(ctx, {
      type: "line",
      data: data1,
    });
    myChart1;
  },

  methods: {
    async getdata() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/dashboard" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.staffName = response.data.data[0].staff_name;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
