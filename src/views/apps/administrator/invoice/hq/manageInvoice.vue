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
              <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Invoice
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

                    <Column field="staff_Name" header="Outlet Name">
                    </Column>


                    <Column field="invoice_TotalPrice" header="Total Price">
                      <template #body="searchInvoice">
                        <p>{{ parseFloat(searchInvoice.data.invoice_TotalPrice).toFixed(2) }}</p>
                      </template>
                    </Column>

                    <Column field="invoice_Status" header="Status">
                      <template #body="searchInvoice">
                        <rs-badges variant="warning" v-if="searchInvoice.data.invoice_Status === '1'"
                          @click="clickBtnStatus(searchInvoice.data.invoice_Id)">
                          Open</rs-badges>

                        <rs-badges variant="warning" v-if="searchInvoice.data.invoice_Status === '2'"
                          @click="clickBtnStatus(searchInvoice.data.invoice_Id)">
                          Approved</rs-badges>

                        <rs-badges variant="info" v-if="searchInvoice.data.invoice_Status === '3'"
                          @click="clickBtnStatus(searchInvoice.data.invoice_Id)">
                          Payment Ready</rs-badges>

                        <rs-badges variant="info" v-if="searchInvoice.data.invoice_Status === '4'"
                          @click="clickBtnStatus(searchInvoice.data.invoice_Id)">
                          Paid</rs-badges>

                        <rs-badges variant="danger" v-if="searchInvoice.data.invoice_Status === '5'"
                          @click="clickBtnStatus(searchInvoice.data.invoice_Id)">
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
                          :to="{ name: 'hq-invoice-details', params: { id: searchInvoice.data.invoice_Id } }">
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

    <rs-modal title="Add Invoice" v-model="modalInvoice" position="middle" size="lg">

      <FormKit type="select" label="Outlet" v-model="selectOutlet" placeholder="Select Outlet"
        :options="this.listOutlet" @change="getDO()" />

      <label>Delivery Order No.</label>
      <Multiselect v-model="selectDO" mode="tags" :close-on-select="false" :searchable="true" :create-option="true"
        :options="this.listDO" @select="papar(selectDO)" @deselect="padamDO(selectDO)" @clear="padam()" />

      <br />

      <div v-for="(rm, l) in this.selectDO" :key="l">
        <table class="border-2">
          <tr>
            <th class="float-left ml-3 mb-3 text-lg">{{ this.selectDONo[l] }}</th>
          </tr>
          <tr>
            <div class="flex flex-row" v-for="(item, index) in this.listSelectDO" :key="index">
              <div>
                <FormKit type="text" label="Stock Name" v-model="this.item[l][index].rm_Name"
                  :value=this.item[l][index].rm_Name readonly />
              </div>
              <div>
                <FormKit type="number" label="Quantity Invoice" v-model="this.item[l][index].rm_QuantityRequested"
                  :value=this.item[l][index].rm_QuantityRequested />
              </div>
              <div>
                <FormKit type="text" label="Quantity DO" v-model="this.item[l][index].rm_Quantity"
                  :value=this.item[l][index].rm_Quantity readonly />
              </div>
              <div>
                <FormKit type="text" label="Quantity Available" v-model="this.item[l][index].rm_QuantityHq"
                  :value=this.item[l][index].rm_QuantityHq readonly />
              </div>
              <div>
                <FormKit type="text" label="Min. Quantity" v-model="this.item[l][index].rm_MinQuantityHq"
                  :value=this.item[l][index].rm_MinQuantityHq readonly />
              </div>
            </div>
          </tr>
        </table>
      </div>

      <br />
      <rs-button style="float: right" @click="insertInvoice()" class="bg-heandshe hover:bg-heandshe">
        Save
      </rs-button>
    </rs-modal><!-- INSERT -->

    <rs-modal title="Info Timeline" v-model="modalInfo" position="middle" size="md">

      <p v-for="(status, l) in this.listTimelineStatus" :key="l">{{ status.timeline_date }} : <b>{{
    status.timeline_statusName
}}</b> ({{ status.timeline_staffName }})</p>
    </rs-modal>

    <rs-modal title="Status" v-model="modalStatus" position="middle" size="md">
      <FormKit type="select" label="Status" :options="this.listStatus" v-model="selectStatus"
        placeholder="Select Status" />

      <rs-button style="float: right" @click="updateStatus()" class="bg-heandshe hover:bg-heandshe">
        Save
      </rs-button>
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

import Multiselect from "@vueform/multiselect";

export default {
  name: "RawMaterial",
  components: {
    RsButton,
    RsBadges,
    DataTable,
    RsModal,
    Column,
    Button,
    Multiselect,
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

      selectDO: null,
      listDO: [],
      listSelectDO: [],
      listDOItem: [],
      item: [],
      selectDONo: [],
      listOutlet: [],
      selectOutlet: null,

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
    this.getStatusInvoice();
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

    async papar(DO_id) {
      this.listSelectDO = [];
      this.item = [];
      this.selectDONo = [];

      let rawMaterial = null;

      for (var i = 0; i < DO_id.length; i++) {
        rawMaterial = this.listDOItem.filter((item) => {
          return item.do_Id == DO_id[i];
        });

        this.selectDONo.push(rawMaterial[0].do_No);
        this.listSelectDO = [];

        for (let i = 0; i < rawMaterial.length; i++) {

          this.listSelectDO.push({
            rm_Id: rawMaterial[i].rm_Id,
            rm_Name: rawMaterial[i].rm_Name,
            rm_Quantity: rawMaterial[i].rm_Quantity,
            rm_Price: rawMaterial[i].rm_Price,
            rm_QuantityRequested: rawMaterial[i].rm_Quantity,
            rm_QuantityHq: rawMaterial[i].rm_QuantityHq,
            rm_MinQuantityHq: rawMaterial[i].rm_MinQuantityHq,
            do_Id: rawMaterial[i].do_Id,
            do_No: rawMaterial[i].do_No,
            item_DoHqOutletId: rawMaterial[i].item_DoHqOutletId,


          });

        }
        this.item.push(this.listSelectDO);
      }
    },

    async getDO() {
      this.selectDO = [];
      this.listSelectDO = [];
      this.item = [];
      this.selectDONo = [];
      this.padam();
      this.listDO = [];


      var axios = require("axios");
      var data = JSON.stringify({
        staffId: this.staffId,
        outletId: this.selectOutlet,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getDOHq",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log('response', response);
            for (let i = 0; i < response.data.data.length; i++) {
              this.listDO.push({
                label: response.data.data[i].do_No,
                value: response.data.data[i].do_Id,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getDOItem() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffId: this.staffId,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getDOItem",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log('getDOItem', response.data.data);
            this.listDOItem = response.data.data;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },


    async padam() {
      this.order1 = false;
      this.order2 = false;
    },

    async redirectPayment() {
      window.location.href = "https://dev1.toyyibpay.com/dev1-iserve-ewallet";
    },

    async clickBtnStatus(value) {
      // this.users1 = user.data;
      this.modalStatus = true;
      this.selectInvoiceId = value;

    },

    async updateStatus() {
      console.log('update status', this.selectStatus);

      var axios = require("axios");
      var data = JSON.stringify({
        staffId: this.staffId,
        invoiceId: this.selectInvoiceId,
        status: this.selectStatus,
      });

      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/updateStatusInvoice",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log('response status', response.data.data);
            if (response.data.status == 200) {
              this.modalStatus = false;
              alert(response.data.message);
              this.getInvoiceHq();
            } else {
              alert(response.data.message);
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
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
            this.getDO();
            this.getDOItem();
            this.getInvoiceHq();
            this.getOutlet();
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

    async insertInvoice() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffId: this.staffId,
        order: this.item,
        outletId: this.selectOutlet,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertInvoiceHq",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status == 200) {
              this.modalInvoice = false;
              alert(response.data.message);
              this.getInvoiceHq();
            } else {
              alert(response.data.message);
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getInvoiceHq() {
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

    async getOutlet() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffId: this.staffId,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getOutlet",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {

            for (let i = 0; i < response.data.data.length; i++) {
              this.listOutlet.push({
                label: response.data.data[i].outlet_name,
                value: response.data.data[i].outlet_id,
              });
            }
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

    async getStatusInvoice() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/getStatusInvoiceHq",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {

            for (let i = 0; i < response.data.data.length; i++) {
              this.listStatus.push({
                label: response.data.data[i].title,
                value: response.data.data[i].id,
              });
            }
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
    },

    addRawMaterial(index) {
      this.counter++;
      console.log("ADD", index);
      this.rawMaterial.push({
        type: "",
      });
    },
    removeRawMaterial(index) {
      this.counter--;
      console.log("REMOVE", index);
      this.rawMaterial.splice(index, 1);
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css">

</style>
