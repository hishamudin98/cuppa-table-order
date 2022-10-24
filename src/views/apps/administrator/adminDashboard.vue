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
    <div class="w-full flex flex-col">
      <div style="display: flex; flex-direction: row">
        <div class="inline-block w-1/6">
          <aside aria-label="Sidebar">
            <div class="h-full py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
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
                        bg-gray-300
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
                      <span class="flex-1 ml-3 whitespace-nowrap"
                        >Membership</span
                      >
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
                      @click="dropdownMenu()"
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap">Menu</span>
                    </a>
                  </div>
                  <div v-if="this.menuDrop == true">
                    <ul>
                      <li>
                        <router-link :to="{ name: 'admin-menu' }">
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
                              >Menu Management</span
                            >
                          </a>
                        </router-link>
                      </li>
                    </ul>
                  </div>
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
                      @click="dropdownOutlet()"
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap">Outlet</span>
                    </a>
                  </div>
                  <div v-if="this.outletDrop == true">
                    <ul>
                      <li>
                        <router-link :to="{ name: 'admin-table' }">
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
                              >Table Management</span
                            >
                          </a>
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'admin-report-s' }">
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
                              >Counter Management</span
                            >
                          </a>
                        </router-link>
                      </li>
                    </ul>
                  </div>
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
                        <router-link :to="{ name: 'admin-report-t' }">
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
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'admin-report-s' }">
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
                        </router-link>
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
    async dropdownMenu() {
      if (this.menuDrop == false) {
        this.menuDrop = true;
      } else {
        this.menuDrop = false;
      }
    },
    async dropdownOutlet() {
      if (this.outletDrop == false) {
        this.outletDrop = true;
      } else {
        this.outletDrop = false;
      }
    },
    async triggerDropdown() {
      if (this.show == false) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
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
