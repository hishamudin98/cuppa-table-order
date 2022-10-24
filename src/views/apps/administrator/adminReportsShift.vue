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
        <!-- UNTUK SEBELAH2 -->
        <div>
          <div class="w-64">
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
        </div>
        <div class="w-full h-1/4 flex flex-col">
          <div class="w-full flex flex-row mb-0">
            <div class="inline-block w-1/2 pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Total of Shift by outlet </strong>
                </div>
                <hr />
                <div class="text-center py-8">{{ this.totalData }} shifts</div>
              </rs-card>
            </div>
            <div class="inline-block w-1/2 pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Shift Net Sales ( RM )</strong>
                </div>
                <hr />
                <div class="text-center py-8">
                  {{ formatPrice(this.sumShifts) }}
                </div>
              </rs-card>
            </div>
          </div>
          <div class="w-full" style="flex-direction: column">
            <!-- UNTUK ATAS BAWAH -->
            <div style="display: flex; flex-direction: row; padding-top: 10px">
              <div class="w-full h-1">
                <FormKit
                  v-model="search"
                  id="search-sticky"
                  placeholder="Search for a staff..."
                  type="search"
                  :classes="{
                    inner:
                      'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                    outer: 'flex-1 mb-0',
                    input: 'h-10',
                  }"
                />
              </div>
            </div>
            <div class="">
              <rs-card style="margin-top: 40px">
                <div>
                  <div>
                    <DataTable
                      :value="searchShift"
                      :paginator="true"
                      :rows="10"
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      :rowsPerPageOptions="[10, 20, 50]"
                      responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    >
                      <Column field="shift_start" header="Shift Start Date"></Column>
                      <Column
                        field="shift_end"
                        header="Shift End Date"
                      ></Column>
                      <Column
                        field="shift_staff"
                        header="Shift Staff Name"
                      ></Column>
                      <Column
                        field="shift_gross"
                        header="Shift Gross Sales"
                      ></Column>
                      <Column
                        field="shift_net"
                        header="Shift Net Sales"
                      ></Column>
                      <Column
                        field="shift_refund"
                        header="Shift Refund Sales"
                      ></Column>

                      <template #paginatorstart>
                        <Button
                          type="button"
                          icon="pi pi-refresh"
                          class="p-button-text"
                        />
                      </template>
                      <template #paginatorend>
                        <Button
                          type="button"
                          icon="pi pi-cloud"
                          class="p-button-text"
                        />
                      </template>
                    </DataTable>
                  </div>
                </div>
              </rs-card>
            </div>

            <!-- UNTUK ATAS BAWAH -->
          </div>
        </div>
        <!-- UNTUK SEBELAH2 -->
      </div>
    </div>
  </rs-layout>
</template>
<script>
import { ref, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import moment from "moment";

export default {
  name: "AdminDashboard",
  components: {
    DataTable,
    Column,
    Button,
  },
  setup() {
    const shift = ref([]);
    const search = ref("");

    const searchShift = computed(() => {
      return shift.value.filter((shifts) => {
        return (
          shifts.shift_staff.toLowerCase().indexOf(search.value.toLowerCase()) !=
            -1 ||
          shifts.shift_staff
            .toLowerCase()
            .indexOf(search.value.toLowerCase()) != -1
        );
      });
    });
    const formatPrice = (price) => {
      return parseFloat(price)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return {
      search,
      searchShift,
      shift,
      formatPrice,
    };
  },
  data() {
    return {
      staffid: "",
      staffName: "",
      totalData: 0,
      show: false,
      outletDrop: false,
      sumShifts: 0,
      menuDrop: false,
      /* BARU */
    };
  },
  async created() {
    this.getdata();
    this.getShifts();
  },

  methods: {
    async dropdownMenu() {
      if (this.menuDrop == false) {
        this.menuDrop = true;
      } else {
        this.menuDrop = false;
      }
    },
    async dropdownOutlet(){
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

    async getShifts() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getShift" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log("SEBELUM :", response.data.data.Shift_det.length)
            for (let i = 0; i < response.data.data.Shift_det.length; i++) {
              this.shift.push({
                shift_net: response.data.data.Shift_det[i].shift_netSales,
                shift_start: moment(response.data.data.Shift_det[i].shift_start).format("DD-MM-YYYY HH:mm a"),
                shift_end: moment(response.data.data.Shift_det[i].shift_end).format("DD-MM-YYYY HH:mm a"),
                shift_gross: response.data.data.Shift_det[i].shift_grossSales,
                shift_refund: response.data.data.Shift_det[i].shift_refund,
                shift_staff: response.data.data.Shift_det[i].staff_name
              });
            }
            this.totalData = this.shift.length;
            
            this.sumShifts = response.data.data.Shift_sum[0].sums
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
