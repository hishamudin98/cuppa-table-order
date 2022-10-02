<template>
  <rs-layout>
    <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <div class="welcome text-lg font-semibold text-white"></div>
        </div>

        <div class="flex gap-x-2 items-center">
          <div class="text-white">{{ this.staffName }}</div>
          <div class="bg-black h-10 w-10 p-1 rounded-full">
            <img
              class="flex-1"
              src="@/assets/images/logo/heandshe.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="inline-block w-1/6">
      <aside class="w-64" aria-label="Sidebar">
        <div
          class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800"
        >
          <ul class="space-y-2">
            <li>
              <router-link :to="{ name: 'dashboard' }">
                <a
                  href="#"
                  class="
                    flex
                    items-center
                    p-2
                    text-base
                    font-normal
                    text-gray-900
                    rounded-lg
                    dark:text-white
                    hover:bg-gray-300
                    dark:hover:bg-gray-700
                  "
                >
                  <span class="ml-3">Dashboard</span>
                </a>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'admin-user' }">
                <a
                  href="#"
                  class="
                    flex
                    items-center
                    p-2
                    text-base
                    font-normal
                    text-gray-900
                    rounded-lg
                    dark:text-white
                    hover:bg-gray-300
                    dark:hover:bg-gray-700
                  "
                >
                  <span class="flex-1 ml-3 whitespace-nowrap">User</span>
                </a>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'admin-staff' }">
                <a
                  href="#"
                  class="
                    flex
                    items-center
                    p-2
                    text-base
                    font-normal
                    text-gray-900
                    rounded-lg
                    dark:text-white
                    hover:bg-gray-300
                    dark:hover:bg-gray-700
                  "
                >
                  <span class="flex-1 ml-3 whitespace-nowrap">Staff</span>
                </a>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'admin-menu' }">
                <a
                  href="#"
                  class="
                    flex
                    items-center
                    p-2
                    text-base
                    font-normal
                    text-gray-900
                    rounded-lg
                    dark:text-white
                    hover:bg-gray-300
                    dark:hover:bg-gray-700
                  "
                >
                  <span class="flex-1 ml-3 whitespace-nowrap">Menu</span>
                </a>
              </router-link>
            </li>
            <li>
              <a
                href="#"
                class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                "
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Membership</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                "
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Outlet</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="
                  flex
                  items-center
                  p-2
                  text-base
                  font-normal
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                "
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Counter</span>
              </a>
            </li>
            <li>
              <div>
                <a
                  href="#"
                  class="
                    flex
                    items-center
                    p-2
                    text-base
                    font-normal
                    text-gray-900
                    rounded-lg
                    dark:text-white
                    hover:bg-gray-300
                    dark:hover:bg-gray-700
                  "
                  @click="triggerDropdown()"
                >
                  <span class="flex-1 ml-3 whitespace-nowrap">Report</span>
                </a>
              </div>
              <div v-if="this.show == true">
                <ul>
                  <li>
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Report Transaction</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Report Shift</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Report Refund</span
                      >
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <router-link :to="{ name: 'login' }">
                <a
                  href="#"
                  class="
                    flex
                    items-center
                    p-2
                    text-base
                    font-normal
                    text-gray-900
                    rounded-lg
                    dark:text-white
                    hover:bg-gray-300
                    dark:hover:bg-gray-700
                  "
                >
                  <span class="flex-1 ml-3 whitespace-nowrap">Log Out</span>
                </a>
              </router-link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
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
  </rs-layout>
</template>
<script>
import Chart from "chart.js/auto";
import { onMounted } from "vue";
import moment from "moment";
export default {
  name: "AdminDashboard",
  components: {},

  setup() {
    onMounted(() => {});
  },
  data() {
    return {
      staffid: "",
      staffName: "",
      show: false,
    };
  },
  async created() {
    if (this.$route.params.staffid != null) {
      this.staffid = this.$route.params.staffid;
      localStorage.staff = this.staffid;
    }
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
    async triggerDropdown() {
      if(this.show == false)
      {
        this.show = true
      }
      else
      {
        this.show = false
      }
    },
    async getdata() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/dashboard" /*  */,
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
