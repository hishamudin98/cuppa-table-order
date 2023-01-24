<template>
  <rs-layout>
    <div class="w-full flex flex-col">
      <div style="display: flex; flex-direction: row">
        <!-- UNTUK SEBELAH2 -->

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
            <div v-if="outlet_id != ''">
              Filter By : {{ order_status }} , {{ order_from }}
            </div>
            <div style="display: flex; flex-direction: row; padding-top: 10px">
              <div class="w-11/12 h-1">
                <FormKit v-model="search" id="search-sticky" placeholder="Search for order..." type="search" :classes="{
                  inner:
                    'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                  outer: 'flex-1 mb-0',
                  input: 'h-10',
                }" />
              </div>
              <div class="w-1/12 h-2">
                <rs-button @click="filter()" class="bg-heandshe hover:bg-heandshe">Filter</rs-button>
              </div>
            </div>
            <div class="">
              <rs-card style="margin-top: 40px">
                <div>
                  <div>
                    <DataTable :value="searchOrder" :paginator="true" :rows="10"
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                      <Column field="order_no" header="Order No"></Column>
                      <Column field="order_status" header="Status" :sortable="true"></Column>

                      <Column field="orderDatetime" header="Order Date" :sortable="true"></Column>
                      <Column field="order_totalAmount" header="Order Total ( RM )" :sortable="true">
                        <template #body="searchOrder">
                          {{ formatPrice(searchOrder.data.order_totalAmount) }}
                        </template>
                      </Column>
                      <Column field="order_customer" header="Customer Name"></Column>
                      <Column field="staffName" header="Staff Name">
                        <template #body="searchOrder">
                          {{ searchOrder.data.staffName != null ? searchOrder.data.staffName : 'No Staff' }}
                        </template>
                      </Column>
                      <Column :exportable="false" style="min-width: 8rem" header="Actions">
                        <template #body="searchOrder">
                          <Button icon="pi pi-print" class="p-button-rounded p-button-warning"
                            @click="print(searchOrder)" />
                          <Button icon="pi pi-folder" class="p-button-rounded p-button-success"
                            @click="selectOrder(searchOrder)" />
                        </template>
                      </Column>
                      <Column :exportable="false" style="min-width: 8rem" header="More Actions">
                        <template #body="searchOrder">
                          <Button v-if="
                            searchOrder.data.order_status == 'Completed' ||
                            searchOrder.data.order_status == 'Preparing'
                          " class="p-button-rounded p-button-warning" @click="refunds(searchOrder)">
                            Refund
                          </Button>
                          <Button v-if="
                            searchOrder.data.order_status == 'In Cart' ||
                            searchOrder.data.order_status == 'Pending'
                          " class="p-button-rounded p-button-danger" @click="cancels(searchOrder)">
                            Cancel
                          </Button>
                        </template>
                      </Column>

                      <template #paginatorstart>
                        <Button type="button" icon="pi pi-refresh" class="p-button-text" />
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
    <rs-modal title="Order Details" v-model="show" position="middle" size="md">
      <label><strong>Order No.</strong></label>
      <br />
      {{ this.data.order_no }}
      <br />
      <label><strong>Date</strong></label>
      <br />
      {{ this.data.orderDatetime }}
      <br />
      <label><strong>Order Status</strong></label>
      <br />
      {{ this.data.order_status }}
      <br />
      <label><strong>Order Total ( RM )</strong></label>
      <br />
      {{ this.data.order_totalAmount }}
      <br />
      <label><strong>Order From </strong></label>
      <br />
      {{ this.data.order_from }}
      <br />
      <label><strong>Receipt No</strong></label>
      <br />
      {{ this.data.receipt_no }}
      <br />
      <!-- <label><strong>Order Type</strong></label>
      <br />
      {{ this.data.order_type }} -->
      <!-- <br /> -->
      <label><strong>Payment Method</strong></label>
      <br />
      {{ this.data.payment_method }}
      <br />
      <label><strong>Membership No. : </strong></label>
      <div v-for="(input, l) in this.data.order_detail" :key="l">
        <p>
          {{ input.membership_no }}
        </p>
      </div>
      <br />
      <label><strong>Order Details</strong></label>
      <div v-for="(input, k) in this.data.order_detail" :key="k">
        <p>
          {{ input.menu_name }} x {{ input.menu_quantity }} - RM
          {{ formatPrice(input.menu_price) }}
        </p>
      </div>
    </rs-modal>
    <rs-modal title="Filter" v-model="filterModal" position="middle" size="md">
      <FormKit v-model="outlet_id" type="radio" label="Outlet" :options="this.outlet" />

      <FormKit v-model="order_status" type="radio" label="Order Status"
        :options="['Cancelled', 'Completed', '	Pending', '	In Cart', 'Preparing']" />
      <FormKit v-model="order_from" type="radio" label="Order From" :options="['POS', 'Table']" />
      <FormKit type="date" v-model="start_date" label="From Date" />
      <FormKit type="date" v-model="end_date" label="To Date" />

      <rs-button style="float: right" variant="primary-outline" @click="filters()">
        Clear
      </rs-button>
      <rs-button style="float: right" class="mx-1 bg-heandshe hover:bg-heandshe" @click="filters()">
        All Filter
      </rs-button>
    </rs-modal>

    <!-- PRINT -->
    <rs-modal title="Receipt" v-model="qrcode" position="middle" size="md">
      <div class="text-center">
        <h5><strong> Receipt </strong></h5>

        <strong>Order Date :</strong>
        {{ this.receiptData.data.orderDatetime }}
        <br />
        <strong>Receipt No :</strong>
        {{ this.receiptData.data.receipt_no }}
        <br />
        <strong>Order Status :</strong>
        {{ this.receiptData.data.order_status }}
        <br />
        <strong>Staff Name :</strong>
        {{ this.receiptData.data.staffName }}
        <br />
        <strong>Order From :</strong>
        {{ this.receiptData.data.order_from }}
        <br />
        <strong>Payment Method :</strong>
        {{ this.receiptData.data.payment_method }}
        <br />

        <br />
        <label><strong>Order Details</strong></label>
        <div v-for="(input, k) in this.receiptData.data.order_detail" :key="k">
          <p>
            {{ input.menu_name }} x {{ input.menu_quantity }} - RM
            {{ formatPrice(input.menu_price) }}
          </p>
        </div>
        <br />
      </div>
      <!--  {{this.receiptData}} -->
      <div>
        <vue3-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
          :paginate-elements-by-height="1400" :filename="this.receiptData.data.receipt_no" :pdf-quality="2"
          :manual-pagination="false" pdf-format="a4" pdf-orientation="portrait" pdf-content-width="800px"
          @hasStartedGeneration="hasStartedGeneration()" @hasGenerated="hasGenerated($event)" ref="html2Pdf">
          <template v-slot:pdf-content>
            <div class="text-center mt-10">
              <h5><strong> Receipt </strong></h5>

              <strong>Order Date :</strong>
              {{ this.receiptData.data.orderDatetime }}
              <br />
              <strong>Receipt No :</strong>
              {{ this.receiptData.data.receipt_no }}
              <br />
              <strong>Order Status :</strong>
              {{ this.receiptData.data.order_status }}
              <br />
              <strong>Staff Name :</strong>
              {{ this.receiptData.data.staffName }}
              <br />
              <strong>Order From :</strong>
              {{ this.receiptData.data.order_from }}
              <br />
              <strong>Payment Method :</strong>
              {{ this.receiptData.data.payment_method }}
              <br />

              <br />
              <label><strong>Order Details</strong></label>
              <div v-for="(input, k) in this.receiptData.data.order_detail" :key="k">
                <p>
                  {{ input.menu_name }} x {{ input.menu_quantity }} - RM
                  {{ formatPrice(input.menu_price) }}

                </p>
              </div>
              <br />
            </div>
          </template>
        </vue3-html2pdf>
      </div>
      <div>
        <rs-button class="bg-heandshe hover:bg-heandshe w-full" @click="generateReport()">Print PDF</rs-button>
      </div>
    </rs-modal>
    <!-- REFUND -->
    <rs-modal title="Refund" v-model="refunded" position="middle" size="md">
      Refund
      <br />
      <FormKit v-model="refundsValue" type="checkbox" :options="this.refundData" />

      <rs-button @click="Refund()">Save</rs-button>
      <br />
    </rs-modal>
    <!-- Cancel -->
    <rs-modal title="Cancel" v-model="canceled" position="middle" size="md">
      Cancel
      <br />
      <FormKit v-model="cancelsValue" type="checkbox" :options="this.cancelData" />
      <rs-button @click="Cancel()">Save</rs-button>
    </rs-modal>
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
import RsButton from "@/components/Button.vue";
import RsModal from "@/components/Modal.vue";
import Vue3Html2pdf from "vue3-html2pdf";

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    RsModal,
    DataTable,
    Column,
    Button,
    Vue3Html2pdf,
  },
  setup() {
    const order = ref([]);
    const search = ref("");
    const filterModal = ref(false);
    const outlet = ref([]);
    const outlet_id = ref("");
    const order_status = ref("");
    const order_from = ref("");
    const start_date = ref("");
    const end_date = ref("");

    const searchOrder = computed(() => {
      return order.value.filter((orders) => {
        if (start_date.value != "" && end_date.value != "") {
          return (
            formatDate(start_date.value) < orders.orderDatetime &&
            formatDate(end_date.value) > orders.orderDatetime
          );
        } else if (search.value == "") {
          return (
            orders.outlet_id.toString().indexOf(outlet_id.value.toString()) !=
            -1 &&
            orders.order_status
              .toString()
              .indexOf(order_status.value.toString()) != -1 &&
            orders.order_from.toString().indexOf(order_from.value.toString()) !=
            -1 &&
            orders.order_customer
              .toLowerCase()
              .indexOf(search.value.toLowerCase()) != -1
          );
        } else {
          return (
            orders.order_no.toLowerCase().indexOf(search.value.toLowerCase()) != -1 ||
            orders.order_customer
              .toLowerCase()
              .indexOf(search.value.toLowerCase()) != -1
          );
        }
      });
    });

    const formatDate = (value) => {
      return moment(value).format("DD-MM-YYYY");
    };

    const formatPrice = (price) => {
      return parseFloat(price)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const filters = () => {
      outlet_id.value = "";
      order_status.value = "";
      order_from.value = "";
      start_date.value = "";
      end_date.value = "";
      filterModal.value = false;
    };

    const filter = () => {
      filterModal.value = true;
    };

    return {
      search,
      searchOrder,
      order,
      filterModal,
      outlet,
      outlet_id,
      order_status,
      order_from,
      start_date,
      end_date,
      formatPrice,
      formatDate,
      filter,
      filters,
    };
  },
  data() {
    return {
      staffid: "",
      staffName: "",
      totalData: 0,
      sumOrder: 0,
      status: "",
      outlet_details: "",
      data: "",
      show: false,
      payment: "",
      qrcode: false,
      receiptData: null,
      refunded: false,
      refundID: null,
      refundData: [],
      refundsValue: null,
      cancelID: null,
      canceled: false,
      cancelData: [],
      cancelsValue: null,
    };
  },
  async created() {
    this.getdata();
    this.getOrder();
    this.getOutlethq();
  },

  methods: {
    async print(data) {
      this.receiptData = data;
      this.qrcode = true;
    },
    async refunds(data) {
      this.refundData = [];
      for (let i = 0; i < data.data.order_detail.length; i++) {
        this.refundData.push({
          label: data.data.order_detail[i].menu_name,
          value: data.data.order_detail[i].menu_id,
        });
      }
      this.refundID = data.data.order_id;
      this.refunded = true;
    },
    async Refund() {
      var axios = require("axios");
      var data = JSON.stringify({
        refundsValue: this.refundsValue,
        refundID: this.refundID,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/updateRefundItem" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then(
          function (response) {
            console.log(response.data);
            if (response.data.response == 200) {
              alert(response.data.message);
              this.refunded = false;
              this.refundsValue = null;
            } else {
              alert(response.data.message);
              this.refunded = false;
              this.refundsValue = null;
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async cancels(data) {
      this.cancelData = [];
      for (let i = 0; i < data.data.order_detail.length; i++) {
        this.cancelData.push({
          label: data.data.order_detail[i].menu_name,
          value: data.data.order_detail[i].menu_id,
        });
      }
      this.cancelID = data.data.order_id;
      this.canceled = true;
    },
    async Cancel() {
      /* CANCEL API this.cancelsValue */
      var axios = require("axios");
      var data = JSON.stringify({
        cancelsValue: this.cancelsValue,
        cancelID: this.cancelID,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/updateCancelItem" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then(
          function (response) {
            console.log(response.data);
            if (response.data.response == 200) {
              alert(response.data.message);
              this.canceled = false;
              this.cancelsValue = null;
            } else {
              alert(response.data.message);
              this.canceled = false;
              this.cancelsValue = null;
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    async generateReport() {
      this.$refs.html2Pdf.generatePdf();
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

    async selectOrder(searchOrder) {
      this.data = searchOrder.data;
      this.show = true;
    },

    async getOutlethq() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getOutletDetails" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.outlet_details = response.data.data.Outlet_det;
            for (let i = 0; i < this.outlet_details.length; i++) {
              this.outlet.push({
                value: this.outlet_details[i].outlet_id,
                label: this.outlet_details[i].outlet_name,
              });
            }
            this.totalData = this.outlet.length;

            /* this.sumShifts = response.data.data.Shift_sum[0].sums */
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
        url: process.env.VUE_APP_FNB_URL + "/admin/getOrder" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log(response.data.data.Order_det);
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

              if (response.data.data.Order_det[i].transaction_method == 1) {
                this.payment = "Cash";
              } else if (
                response.data.data.Order_det[i].transaction_method == 2
              ) {
                this.payment = "FPX";
              } else if (
                response.data.data.Order_det[i].transaction_method == 3
              ) {
                this.payment = "Credit/Debit Card";
              } else if (
                response.data.data.Order_det[i].transaction_method == 4
              ) {
                this.payment = "QR Payment";
              }
              this.order.push({
                order_id: response.data.data.Order_det[i].order_id,
                order_no: response.data.data.Order_det[i].order_no,
                orderDatetime: moment(
                  response.data.data.Order_det[i].order_datetime
                ).format("DD-MM-YYYY HH:mm a"),
                order_status: this.status,
                order_totalAmount:
                  response.data.data.Order_det[i].order_totalAmount,
                order_customer: response.data.data.Order_det[i].order_customer,
                staffName: response.data.data.Order_det[i].staff_name,
                outlet_id: response.data.data.Order_det[i].outlet_id,
                order_detail: JSON.parse(
                  response.data.data.Order_det[i].order_detail
                ),
                order_from: response.data.data.Order_det[i].order_from,
                payment_method: this.payment,
                receipt_no: response.data.data.Order_det[i].transaction_no,
                order_type: response.data.data.Order_det[i].order_type,
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
