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
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >Membership</span
                    >
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
        </div>
        <div class="w-full h-1/4 flex flex-col">
          <div class="w-full flex flex-row mb-0">
            <div class="inline-block w-1/2 pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Number of transaction by outlet</strong>
                </div>
                <hr />
                <div class="text-center py-8">
                  {{ this.totalData }} transactions
                </div>
              </rs-card>
            </div>
            <div class="inline-block w-1/2 pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Transaction Amount ( RM )</strong>
                </div>
                <hr />
                <div class="text-center py-8">
                  {{ formatPrice(this.sumTrans) }}
                </div>
              </rs-card>
            </div>
          </div>
          <div class="w-full" style="flex-direction: column">
            <!-- UNTUK ATAS BAWAH -->
            <div style="display: flex; flex-direction: row">
              <div class="w-11/12 h-10">
                <FormKit
                  v-model="search"
                  id="search-sticky"
                  placeholder="Search for a staff..."
                  type="search"
                  :classes="{
                    inner:
                      'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                    outer: 'flex-1 mb-0',
                    input: 'h-12',
                  }"
                />
              </div>
              <div class="w-1/12" style="padding-top: 10px">
                <rs-button
                  @click="filter()"
                  class="bg-heandshe hover:bg-heandshe"
                  >Filter</rs-button
                >
              </div>
            </div>
            <div class="h-4/6">
              <div>
                <div>
                  <DataTable
                    :value="searchTrans"
                    :paginator="true"
                    :rows="10"
                    filterDisplay="menu"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[10, 20, 50]"
                    responsiveLayout="scroll"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                  >
                    <Column field="trans_no" header="Transaction No"></Column>
                    <Column
                      field="trans_date"
                      header="Transaction Date"
                      :sortable="true"
                    ></Column>
                    <Column
                      field="trans_amount"
                      header="Transaction Amount (RM)"
                    ></Column>
                    <Column field="trans_status" header="Transaction Status">
                    </Column>
                    <Column
                      field="trans_method"
                      header="Transaction Method"
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
            </div>
            <!-- UNTUK ATAS BAWAH -->
          </div>
        </div>
        <!-- UNTUK SEBELAH2 -->
      </div>
    </div>
    <rs-modal title="Filter" v-model="filterModal" position="middle" size="md">
      <FormKit
        v-model="trans_status"
        type="radio"
        label="Transaction Status"
        :options="['Success', 'Unknown', 'Failed']"
      />
      <FormKit
        v-model="trans_method"
        type="radio"
        label="Payment Method"
        :options="['FPX', 'CASH', 'DEBIT/CREDIT CARD']"
      />
      
      <rs-button
        style="float: right"
        variant="primary-outline"
        @click="this.filterModal = false"
      >
        Clear
      </rs-button>
      <rs-button
        style="float: right"
        class="mx-1 bg-heandshe hover:bg-heandshe"
        @click="filters()"
      >
        Filter
      </rs-button>
    </rs-modal>
  </rs-layout>
</template>

<script>
import { ref, computed } from "vue";
import DataTable from "primevue/datatable";
import RsButton from "@/components/Button.vue";
import RsModal from "@/components/Modal.vue";
import Column from "primevue/column";
import Button from "primevue/button";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import moment from "moment";
/* import Calendar from 'primevue/calendar'; */

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    RsModal,
    DataTable,
    Column,
    Button,
  },
  setup() {
    const trans = ref([]);
    const search = ref("");
    const trans_status = ref("");
    const filterModal = ref(false);
    const trans_method = ref("");
    const trans_start = ref("");
    const trans_end = ref("");

    const searchTrans = computed(() => {
      if (trans_status.value == "") {
        return trans.value.filter((trans) => {
          return (
            trans.trans_no.toLowerCase().indexOf(search.value.toLowerCase()) !=
              -1 ||
            trans.trans_status
              .toLowerCase()
              .indexOf(search.value.toLowerCase()) != -1
          );
        });
      } else {
        return trans.value.filter((trans) => {
          return (
            trans.trans_status
              .toLowerCase()
              .indexOf(trans_status.value.toLowerCase()) != -1 &&
            trans.trans_method
              .toLowerCase()
              .indexOf(trans_method.value.toLowerCase()) != -1 
          );
        });
      }
    });

    const filter = () => {
      filterModal.value = true;
    };

    const formatPrice = (price) => {
      return parseFloat(price)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return {
      search,
      searchTrans,
      trans_start,
      trans_end,
      trans,
      trans_status,
      filterModal,
      trans_method,
      formatPrice,
      filter,
    };
  },
  data() {
    return {
      staffid: "",
      staffName: "",
      totalData: 0,
      status: "",
      sumTrans: 0,
      transMethod: "",
      show: false,
      outletDrop: false,
      /* BARU */
    };
  },
  async created() {
    this.getdata();
    this.getuser();
  },

  methods: {
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
    /* get Transaction */
    async getuser() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url:
          process.env.VUE_APP_FNB_URL + "/admin/getTransaction" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.trans_details.length; i++) {
              /* STATUS */
              if (response.data.data.trans_details[i].trans_status == 1) {
                this.status = "Success";
              } else if (
                response.data.data.trans_details[i].trans_status == 2
              ) {
                this.status = "Pending";
              } else if (
                response.data.data.trans_details[i].trans_status == 3
              ) {
                this.status = "Failed";
              } else if (
                response.data.data.trans_details[i].trans_status == 4
              ) {
                this.status = "Unknown";
              } else if (
                response.data.data.trans_details[i].trans_status == 5
              ) {
                this.status = "Refund";
              }
              /* METHOD */
              if (response.data.data.trans_details[i].trans_method == 1) {
                this.transMethod = "Cash";
              } else if (
                response.data.data.trans_details[i].trans_method == 2
              ) {
                this.transMethod = "FPX";
              } else if (
                response.data.data.trans_details[i].trans_method == 3
              ) {
                this.transMethod = "Credit/Debit Card";
              }

              this.trans.push({
                trans_no: response.data.data.trans_details[i].trans_no,
                trans_date: moment(
                  response.data.data.trans_details[i].trans_date
                ).format("DD-MM-YYYY"),
                trans_amount: response.data.data.trans_details[i].trans_amount,
                trans_status: this.status,
                trans_method: this.transMethod,
              }); /*   */
            }

            this.totalData = this.trans.length;
            this.sumTrans = response.data.data.trans_sum[0].sums;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
