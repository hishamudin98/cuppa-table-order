<template>
  <rs-layout>

    <div style="display: flex; flex-direction: row">

      <div class="w-full h-1/4 flex flex-col">
        <div class="w-full flex flex-row mb-0"></div>
        <div class="w-full" style="flex-direction: column">
          <!-- UNTUK ATAS BAWAH -->
          <div style="display: flex; flex-direction: row; padding-top: 10px">
            <div class="w-11/12 h-1">
              <FormKit v-model="search" id="search-sticky" placeholder="Search" type="search" :classes="{
  inner:
    'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
  outer: 'flex-1 mb-0',
  input: 'h-10',
}" />
            </div>

            <div class="w-1/12" style="">
              <rs-button class="bg-heandshe hover:bg-heandshe">Filter
              </rs-button>
            </div>
          </div>
          <div class="">
            <rs-card style="margin-top: 40px">
              <div>
                <div>
                  <DataTable :value="searchInvoice" :paginator="true" :rows="10" v-model:expandedRows="expandedRows"
                    @rowExpand="onRowExpand"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                    <Column :expander="true" headerStyle="width: 3rem" />
                    <Column field="invoice_No" header="Invoice No.">
                    </Column>
                    <Column field="invoice_CreatedDate" header="Date">
                    </Column>

                    <Column field="staff_Name" header="Staff">
                    </Column>

                    <Column field="invoice_TotalPrice" header="Total Price">
                      <template #body="searchInvoice">
                        <p>{{ parseFloat(searchInvoice.data.invoice_TotalPrice).toFixed(2) }}</p>
                      </template>
                    </Column>

                    <Column field="invoice_Status" header="Status">
                      <template #body="searchInvoice">
                        <rs-badges variant="warning" v-if="searchInvoice.data.invoice_Status === '1'">
                          Open</rs-badges>

                        <rs-badges variant="warning" v-if="searchInvoice.data.invoice_Status === '2'">
                          Approved</rs-badges>

                        <rs-badges variant="info" v-if="searchInvoice.data.invoice_Status === '3'">
                          Payment Ready</rs-badges>

                        <rs-badges variant="info" v-if="searchInvoice.data.invoice_Status === '4'">
                          Paid</rs-badges>

                        <rs-badges variant="danger" v-if="searchInvoice.data.invoice_Status === '5'">
                          Cancelled</rs-badges>

                        {{ "" }}
                        <Button icon="pi pi-info" class="p-button-rounded p-button-info" style="width: 25px;height:25px"
                          @click="clickBtnInfo(searchInvoice.data.invoice_Id)" />

                      </template>
                    </Column>

                    <Column :exportable="false" header="Details">
                      <template #body="searchInvoice">
                        <p v-if="searchInvoice.data.rm_Status === '1'" hidden>
                          Level 1
                        </p>
                        <router-link
                          :to="{ name: 'manage-invoice-outlet-details', params: { id: searchInvoice.data.invoice_Id } }">
                          <Button icon="pi pi-truck" class="p-button-rounded p-button-info" />
                        </router-link>
                      </template>
                    </Column>

                    <Column :exportable="false" style="min-width: 8rem" header="Actions">
                      <template #body="searchInvoice">
                        <Button icon="pi pi-print" class="p-button-rounded p-button-warning mr-2"
                          @click="editUser(searchOrderStock)" /> {{ "" }}

                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                          @click="editUser(searchInvoice)" />
                        {{ "" }}
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                          @click="deleteUser(searchInvoice)" />
                      </template>
                    </Column>

                    <template #expansion="headerInv">
                      <div class="orders-subtable">
                        <h5 style="margin-bottom: 20px">
                          Delivery Order Record for
                          {{ headerInv.data.invoice_No }}
                        </h5>

                        <DataTable :value="resultFilter" :paginator="true" :rows="10"
                          v-model:expandedRows="expandedRows"
                          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                          :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                          <Column field="do_No" header="DO No.">
                          </Column>

                          <Column field="do_CreatedDate" header="DO Datetime">
                          </Column>

                          <Column field="do_TotalPrice" header="Total Price (RM)">
                            <template #body="resultFilter">
                              {{
    formatPrice(resultFilter.data.do_TotalPrice)
}}
                            </template>
                          </Column>

                          <Column field="do_Status" header="Status DO">
                          </Column>

                          <template #paginatorstart>
                            <Button type="button" icon="pi pi-refresh" class="p-button-text" />
                          </template>
                          <template #paginatorend>
                            <Button type="button" icon="pi pi-cloud" class="p-button-text" />
                          </template>
                        </DataTable>
                      </div>
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

    <rs-modal title="Info Timeline" v-model="modalInfo" position="middle" size="md">

      <p v-for="(status, l) in this.listTimelineStatus" :key="l">{{ status.timeline_date }} : <b>{{
    status.timeline_statusName
}}</b> ({{ status.timeline_staffName }})</p>
    </rs-modal>

  </rs-layout>
</template>
<script>
import { ref, computed } from "vue";
import RsButton from "@/components/Button.vue";
import RsModal from "@/components/Modal.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import RsBadges from "@/components/Badges.vue";


export default {
  name: "RawMaterial",
  components: {
    RsButton,
    RsBadges,
    DataTable,
    RsModal,
    Column,
    Button,
  },
  setup() {
    const invoice = ref([]);
    const typePackaging = ref([]);
    const unitMeasurement = ref([]);
    const search = ref("");

    const searchInvoice = computed(() => {
      return invoice.value.filter((invoice) => {
        return (
          invoice.invoice_No.toLowerCase().indexOf(search.value.toLowerCase()) !=
          -1 ||
          invoice.invoice_No.toLowerCase().indexOf(search.value.toLowerCase()) != -1
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
      searchInvoice,
      invoice,
      formatPrice,
      typePackaging,
      unitMeasurement,
    };
  },
  data() {
    return {
      staffId: "",
      staffName: "",
      totalData: 0,
      show: false,
      outletDrop: false,
      sumPrice: 0,
      menuDrop: false,
      /* BARU */
      expandedRows: [],

      modalInvoice: false,
      modalStatus: false,
      modalInfo: false,

      headerInv: [],
      resultFilter: [],
      listInvoice: [],

      listTimelineStatus: [],
      listStatus: [],
      selectInvoiceId: null,
      selectStatus: null,

    };
  },
  async created() {
    this.getdata();

  },

  methods: {

    async clickBtnInfo(value) {
      // this.users1 = user.data;
      this.modalInfo = true;
      this.listTimelineStatus = [];

      var axios = require("axios");
      var data = JSON.stringify({
        invoiceId: value
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getTimelineStatusInvoice",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log('response status', response.data.data);
            this.listTimelineStatus = response.data.data;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async redirectPayment() {
      window.location.href = "https://dev1.toyyibpay.com/dev1-iserve-ewallet";
    },

    async clickBtnStatus() {
      // this.users1 = user.data;
      // this.modalStatus = true;
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
            this.staffId = response.data.data[0].staff_id;
            this.getInvoiceOutlet();
            this.getDOByInvoiceHqOutlet();
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async clickBtnAdd() {
      // this.users1 = user.data;
      this.modalInvoice = true;
    },

    async getInvoiceOutlet() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffId: this.staffId,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getInvoice",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.invoice = response.data.data;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getDOByInvoiceHqOutlet() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffId: this.staffId,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getDOByInvoiceHqOutlet",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.listInvoice = response.data.data;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    onRowExpand(event) {

      this.resultFilter = this.listInvoice.filter((item) => {
        // console.log("item", item);
        if (item.invoice_Id == event.data.invoice_Id) {
          return item;
        }
      });

      this.headerInv = this.resultFilter;
    }

  },
};
</script>
<style src="@vueform/multiselect/themes/default.css">

</style>
  