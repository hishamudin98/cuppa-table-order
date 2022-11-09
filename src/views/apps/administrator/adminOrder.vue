<template>
  <rs-layout>
    <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <div class="welcome text-lg font-semibold text-white">Order</div>
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
          <arbitrary />
        </div>
        <div class="w-full h-1/4 flex flex-col">
          <div class="w-full flex flex-row mb-0">
            <div class="inline-block w-1/2 pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Total of Order by outlet </strong>
                </div>
                <hr />
                <div class="text-center py-8">{{ this.totalData }} Orders</div>
              </rs-card>
            </div>
            <div class="inline-block w-1/2 pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Order Total Amount ( RM )</strong>
                </div>
                <hr />
                <div class="text-center py-8">
                  {{ formatPrice(this.sumOrder) }}
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
                  placeholder="Search for order..."
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
                      :value="searchOrder"
                      :paginator="true"
                      :rows="10"
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      :rowsPerPageOptions="[10, 20, 50]"
                      responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    >
                      <Column field="order_no" header="Order No"></Column>
                      <Column field="order_status" header="Status"></Column>
                      <Column
                        field="orderDatetime"
                        header="Order Date"
                      ></Column>
                      <Column
                        field="order_totalAmount"
                        header="Order Total ( RM )"
                        :sortable="true"
                      >
                        <template #body="searchOrder">
                          {{ formatPrice(searchOrder.data.order_totalAmount) }}
                        </template>
                      </Column>
                      <Column
                        field="order_customer"
                        header="Customer Name"
                      ></Column>
                      <Column field="staffName" header="Staff Name"></Column>

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
import Menu from "@/views/apps/administrator/adminSidemenu.vue";

export default {
  name: "AdminDashboard",
  components: {
    DataTable,
    Column,
    Button,
    arbitrary: Menu,
  },
  setup() {
    const order = ref([]);
    const search = ref("");

    const searchOrder = computed(() => {
      return order.value.filter((orders) => {
        return (
          orders.order_customer
            .toLowerCase()
            .indexOf(search.value.toLowerCase()) != -1 ||
          orders.staffName.toLowerCase().indexOf(search.value.toLowerCase()) !=
            -1
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
      searchOrder,
      order,
      formatPrice,
    };
  },
  data() {
    return {
      staffid: "",
      staffName: "",
      totalData: 0,
      sumOrder: 0,
      status: "",
    };
  },
  async created() {
    this.getdata();
    this.getOrder();
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

    async getOrder() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/getOrder" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.Order_det.length; i++) {
              if (response.data.data.Order_det[i].order_status == 1) {
                this.status = "Completed";
              } else if (response.data.data.Order_det[i].order_status == 2) {
                this.status = "Pending";
              } else if (response.data.data.Order_det[i].order_status == 3) {
                this.status = "In Cart";
              } else if (response.data.data.Order_det[i].order_status == 4) {
                this.status = "Cancelled";
              } else {
                this.status = "Preparing";
              }
              this.order.push({
                order_no: response.data.data.Order_det[i].order_no,
                orderDatetime: moment(
                  response.data.data.Order_det[i].order_datetime
                ).format("DD-MM-YYYY HH:mm a"),
                order_status: this.status,
                order_totalAmount:
                  response.data.data.Order_det[i].order_totalAmount,
                order_customer: response.data.data.Order_det[i].order_customer,
                staffName: response.data.data.Order_det[i].staff_name,
              });
            }
            this.totalData = this.order.length;

            this.sumOrder = response.data.data.Order_sum[0].sums;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
