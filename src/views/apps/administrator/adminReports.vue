<template>
  <rs-layout>
    <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <div class="welcome text-lg font-semibold text-white">
            Report Transaction
          </div>
        </div>

        <div class="flex gap-x-2 items-center">
          <div class="text-white">{{ this.staffName }}</div>
          <div class="bg-black h-10 w-10 p-1 rounded-full">
            <img class="flex-1" src="@/assets/images/logo/heandshe.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col">
      <div style="display: flex; flex-direction: row">
        <!-- UNTUK SEBELAH2 -->
        <div>
          <arbitrary />
        </div>
        <div class="w-full h-1/4 flex flex-col">
          <div class="w-full flex flex-row mb-0">
            <div class="inline-block w-1/2 pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Number of transaction by outlet</strong>
                </div>
                <hr />
                <div class="text-center py-8">{{ this.totalData }} transactions</div>
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
            <div style="display: flex; flex-direction: row; padding-top: 10px">
              <div class="w-full h-1">
                <FormKit
                  v-model="search"
                  id="search-sticky"
                  placeholder="Search for a ..."
                  type="search"
                  :classes="{
                    inner:
                      'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                    outer: 'flex-1 mb-0',
                    input: 'h-10',
                  }"
                />
              </div>
              <div class="w-1/12" style="padding-top: 10px">
                <rs-button
                  @click="filter()"
                  class="bg-heandshe hover:bg-heandshe"
                  >Filter</rs-button
                >
              </div> -->
            </div>
            <div class="">
              <rs-card style="margin-top: 10px">
                <div>
                  <div>
                    <DataTable
                      :value="searchTrans"
                      :paginator="true"
                      :rows="10"
                      ref="dt"
                      v-model:filters="filters1"
                      filterDisplay="menu"
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      :rowsPerPageOptions="[10, 20, 50]"
                      responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    >
                      <template #header>
                        <div style="text-align: left">
                          <Button
                            icon="pi pi-external-link"
                            label="Export"
                            @click="exportCSV($event)"
                          />
                        </div>
                        <div class="flex justify-content-between pb-10 pt-3">
                          <div class="w-11/12 h-1">
                            <FormKit
                              v-model="search"
                              id="search-sticky"
                              placeholder="Search for a ..."
                              type="search"
                              :classes="{
                                inner:
                                  'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                                outer: 'flex-1 mb-0',
                                input: 'h-10',
                              }"
                            />
                          </div>
                          <div class="w-1/12 h-2">
                            <rs-button
                              @click="filter()"
                              class="bg-heandshe hover:bg-heandshe"
                              >Filter</rs-button
                            >
                          </div>
                        </div>
                      </template>
                      <Column field="trans_no" header="Transaction No"></Column>
                      <Column
                        field="trans_date"
                        header="Transaction Date"
                      ></Column>
                      <Column
                        field="trans_amount"
                        header="Transaction Amount (RM)"
                      ></Column>
                      <Column
                        field="trans_status"
                        header="Transaction Status"
                      ></Column>
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
                        <Button type="button" icon="pi pi-cloud" class="p-button-text" />
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
    <rs-modal title="Filter" v-model="filterModal" position="middle" size="md">
      <FormKit
        v-model="trans_status"
        type="radio"
        label="Transaction Status"
        :options="['Success', 'Unknown', 'Failed', 'Refund', 'Pending']"
      />
      <FormKit
        v-model="trans_method"
        type="radio"
        label="Payment Method"
        :options="['FPX', 'CASH', 'DEBIT/CREDIT CARD']"
      />
      <FormKit type="date" v-model="start_date" label="Start Date" />

      <rs-button style="float: right" variant="primary-outline" @click="filters()">
        Clear
      </rs-button>
      <!-- <rs-button
        style="float: right"
        class="mx-1 bg-heandshe hover:bg-heandshe"
        @click="filters()"
      >
        Filter
      </rs-button> -->
    </rs-modal>
    <!--  -->
    <rs-modal
      title="Transaction Details"
      v-model="showTransDetail"
      position="middle"
      size="md"
    >
      <label><strong>Transaction No.</strong></label>
      <p>{{ this.transDetail.trans_no }}</p>
      <br />
      <label><strong>Date</strong></label>
      <p>{{ this.transDetail.trans_date }}</p>
      <br />
      <label><strong>Transaction Amount ( RM )</strong></label>
      <p>{{ this.transDetail.trans_amount }}</p>
      <br />
      <label><strong>Transaction Tax ( RM )</strong></label>
      <p>{{ this.transDetail.trans_tax }}</p>
      <br />
      <label><strong>Transaction Status</strong></label>
      <p>{{ this.transDetail.trans_status }}</p>
      <br />
      <label><strong>Payment Method</strong></label>
      <p>{{ this.transDetail.trans_method }}</p>
      <br />
      <label><strong>Order Details</strong></label>
      <div v-for="(input, k) in this.transDetail.orders" :key="k">
        <p>
          {{ input.menu_name }} x {{ input.menu_quantity }} - RM
          {{ formatPrice(input.menu_price) }}
        </p>
      </div>
    </rs-modal>
  </rs-layout>
</template>
<script>
import RsButton from "@/components/Button.vue";
import RsModal from "@/components/Modal.vue";
import { ref, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import moment from "moment";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Menu from '@/views/apps/administrator/adminSidemenu.vue';
/* import Calendar from "primevue/calendar"; */

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    RsModal,
    DataTable,
    Column,
    Button,
    'arbitrary': Menu,
    /* Calendar, */
  },
  setup() {
    const dt = ref();
    const trans = ref([]);
    const search = ref("");
    const filterModal = ref(false);
    const trans_method = ref("");
    const trans_status = ref("");
    const order = ref([]);
    const start_date = ref("");

    const exportCSV = () => {
      dt.value.exportCSV();
    };

    const formatDate = (value) => {
      return moment(value).format("DD/MM/YYYY");
    };

    const searchTrans = computed(() => {
      return trans.value.filter((trans) => {
        return (
          trans.trans_status
            .toLowerCase()
            .indexOf(trans_status.value.toLowerCase()) != -1 &&
          trans.trans_method
            .toLowerCase()
            .indexOf(trans_method.value.toLowerCase()) != -1 &&
            trans.trans_no.toLowerCase().indexOf(search.value.toLowerCase())
        );
      });
    });

    const filters = () => {
      trans_method.value = "";
      trans_status.value = "";
      filterModal.value = false;
    };

    const filter = () => {
      filterModal.value = true;
    };

    const formatPrice = (price) => {
      return parseFloat(price)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const filters1 = ref({
      trans_date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
    });

    const initFilters1 = () => {
      filters1.value = {
        trans_date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
      };
    };
    return {
      start_date,
      search,
      searchTrans,
      trans,
      filters1,
      initFilters1,
      formatPrice,
      formatDate,
      filter,
      filters,
      exportCSV,
      trans_status,
      filterModal,
      trans_method,
      order,
      dt,
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
      menuDrop: false,
      /* BARU */
      showTransDetail: false,
      transDetail: "",
    };
  },
  async created() {
    this.getdata();
    this.getuser();
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
    /* get Transaction */
    async getuser() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url:
          process.env.VUE_APP_FNB_URL_LOCAL + "/admin/getTransaction" /*   */,
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
              } else if (response.data.data.trans_details[i].trans_status == 2) {
                this.status = "Pending";
              } else if (response.data.data.trans_details[i].trans_status == 3) {
                this.status = "Failed";
              } else if (response.data.data.trans_details[i].trans_status == 4) {
                this.status = "Unknown";
              } else if (response.data.data.trans_details[i].trans_status == 5) {
                this.status = "Refund";
              }
              /* METHOD */
              if (response.data.data.trans_details[i].trans_method == 1) {
                this.transMethod = "Cash";
              } else if (response.data.data.trans_details[i].trans_method == 2) {
                this.transMethod = "FPX";
              } else if (response.data.data.trans_details[i].trans_method == 3) {
                this.transMethod = "Credit/Debit Card";
              }

              this.trans.push({
                trans_no: response.data.data.trans_details[i].trans_no,
                trans_date: moment(response.data.data.trans_details[i].trans_date).format(
                  "DD-MM-YYYY"
                ),
                trans_amount: response.data.data.trans_details[i].trans_amount,
                trans_status: this.status,
                trans_method: this.transMethod,
                trans_tax: response.data.data.trans_details[i].trans_tax,
                trans_discount:
                  response.data.data.trans_details[i].trans_discount,
                orders: JSON.parse(
                  response.data.data.trans_details[i].order_details
                ),
              });
            }

            this.totalData = this.trans.length;
            this.sumTrans = response.data.data.trans_sum[0].sums;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    /* SELECT STATEMENT */
    async select(selectTrans) {
      this.transDetail = selectTrans.data;
      if (this.showTransDetail == false) {
        this.showTransDetail = true;
      } else {
        this.showTransDetail = false;
      }
    },
  },
};
</script>
