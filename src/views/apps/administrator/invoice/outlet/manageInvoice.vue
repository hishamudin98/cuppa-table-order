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
                          <p>{{ parseFloat(searchInvoice.data.invoice_TotalPrice).toFixed(2)}}</p>
                        </template>
                      </Column>
  
                      <Column field="invoice_Status" header="Status">
                        <template #body="searchInvoice">
                          <rs-badges variant="warning" v-if="searchInvoice.data.invoice_Status" @click="clickBtnStatus()">
                            Approved</rs-badges>
                          {{ "" }}
                          <Button icon="pi pi-info" class="p-button-rounded p-button-info" style="width: 25px;height:25px"
                            @click="clickBtnInfo()" />
                          <p v-if="searchInvoice.data.invoice_Status === '2'">Inactive</p>
  
                        </template>
                      </Column>
  
                      <Column :exportable="false" header="Details">
                        <template #body="searchInvoice">
                          <p v-if="searchInvoice.data.rm_Status === '1'" hidden>
                            Level 1
                          </p>
                          <router-link :to="{ name: 'manage-invoice-outlet-details', params: { id: searchInvoice.data.invoice_Id } }">
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
  
                      <template #expansion="searchInvoice12">
                        <div class="orders-subtable">
                          <h5 style="margin-bottom: 20px">
                            Delivery Order Record for Inv-00001
                            {{ searchInvoice12.data.sto_Status2 }}
                          </h5>
  
                          <DataTable :value="searchInvoice" :paginator="true" :rows="10" v-model:expandedRows="expandedRows"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                            <Column field="sto_Status" header="DO No.">
                              <template #body="searchInvoice">
                                <p v-if="searchInvoice.data.sto_Name === 'Store A'">
                                  D0-00001</p>
                                <p v-if="searchInvoice.data.sto_Name === 'Store B'">
                                  D0-00002</p>
                              </template>
                            </Column>
  
                            <Column field="sto_Status" header="DO Datetime">
                              <template #body="searchInvoice">
                                <p v-if="searchInvoice.data.sto_Name === 'Store A'">
                                  14/07/2022 12:00</p>
                                <p v-if="searchInvoice.data.sto_Name === 'Store B'">
                                  15/07/2022 12:00</p>
                              </template>
                            </Column>
  
                            <Column field="sto_Status" header="Remarks">
                              <template #body="searchInvoice">
                                <p v-if="searchInvoice.data.sto_Status == '1'">
                                  Wrap
                                </p>
                              </template>
                            </Column>
  
                            <Column field="sto_Status" header="Status">
                              <template #body="searchInvoice">
                                <rs-badges variant="success" v-if="searchInvoice.data.sto_Status">
                                  Received</rs-badges>
                                {{ "" }}
                                <Button icon="pi pi-info" class="p-button-rounded p-button-info"
                                  style="width: 25px;height:25px" @click="clickBtnInfo()" />
                                <p v-if="searchInvoice.data.sto_Status === '2'">Inactive</p>
  
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
  
        <label for="sto_Type">Delivery Order No.</label>
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
  
        <p>2022-11-18 12:00 : <b>Open</b> (Staff A)</p>
        <p>2022-11-18 12:00 : <b>Approved</b> (Staff A)</p>
        <p>2022-11-18 13:00 : <b>Accepted</b> (Staff A)</p>
        <p>2022-11-18 14:00 : <b>Delivery</b> (Staff A)</p>
        <p>2022-11-18 15:00 : <b>Received</b> (Staff A)</p>
      </rs-modal>
  
      <rs-modal title="Status" v-model="modalStatus" position="middle" size="md">
        <FormKit type="select" label="Status" :options="[
          'Open',
          'Approved',
          'Accepted',
          'Delivery',
          'Received',
        ]" />
  
        <rs-button style="float: right" @click="insertRawMaterial()" class="bg-heandshe hover:bg-heandshe">
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
      };
    },
    async created() {
      this.getdata();
  
    },
  
    methods: {
  
      async clickBtnInfo() {
        // this.users1 = user.data;
        this.modalInfo = true;
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
          console.log('listSelectDO', this.listSelectDO);
          this.item.push(this.listSelectDO);
        }
      },
  
      async getDO() {
        this.selectDO = [];
        this.listSelectDO = [];
        this.item = [];
        this.selectDONo = [];
        this.padam();
  
  
        var axios = require("axios");
        var data = JSON.stringify({
          staffId: this.staffId,
        });
        var config = {
          method: "post",
          url: process.env.VUE_APP_FNB_URL + "/admin/getDO",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        await axios(config)
          .then(
            function (response) {
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
  
      async clickBtnStatus() {
        // this.users1 = user.data;
        this.modalStatus = true;
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
                this.getDO();
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
        console.log("getInvoiceHq");
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
  