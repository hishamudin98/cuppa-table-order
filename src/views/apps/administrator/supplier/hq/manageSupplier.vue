<template>
  <rs-layout>
    <div style="display: flex; flex-direction: row">
      <!-- UNTUK SEBELAH2 -->
      <div>
        <arbitrary />
      </div>
      <div class="w-full h-1/4 flex flex-col">
        <!-- <div class="w-full flex flex-row mb-0">
          <div class="inline-block w-1/2 pr-10">
            <rs-card>
              <div class="text-center pt-10 pb-2">
                <strong>Total of Supplier </strong>
              </div>
              <hr />
              <div class="text-center py-8">{{ this.totalData }} supplier</div>
            </rs-card>
          </div>
          <div class="inline-block w-1/2 pr-10">
            <rs-card>
              <div class="text-center pt-10 pb-2">
                <strong>Total Price Raw Material ( RM )</strong>
              </div>
              <hr />
              <div class="text-center py-8">
                {{ formatPrice(this.sumPrice) }}
              </div>
            </rs-card>
          </div>
        </div> -->
        <div class="w-full" style="flex-direction: column">
          <!-- UNTUK ATAS BAWAH -->
          <div style="display: flex; flex-direction: row; padding-top: 10px">
            <div class="w-full h-1">
              <FormKit v-model="search" id="search-sticky" placeholder="Search" type="search" :classes="{
                inner:
                  'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                outer: 'flex-1 mb-0',
                input: 'h-10',
              }" />
            </div>
            <div class="w-1/12" style="padding-top: 10px">
              <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Supplier
              </rs-button>
            </div>
          </div>
          <div class="">
            <rs-card style="margin-top: 40px">
              <div>
                <div>
                  <DataTable :value="searchSupplier" :paginator="true" :rows="10"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                    <Column field="sup_Name" header="Name"></Column>
                    <Column field="sup_Code" header="Code"></Column>
                    <Column field="sup_PhoneNo" header="Phone No."></Column>
                    <Column field="sup_Email" header="Email"></Column>
                    <Column field="sup_Address" header="Address"></Column>

                    <Column field="sup_Status" header="Account No"> <template #body="searchSupplier">
                        <p v-if="searchSupplier.data.sup_Status === '1'">123123123</p>
                        <p v-if="searchSupplier.data.sup_Status === '2'">Inactive</p>
                      </template></Column>

                    <Column field="sup_Status" header="Bank"> <template #body="searchSupplier">
                        <p v-if="searchSupplier.data.sup_Status === '1'">Bank Islam</p>
                        <p v-if="searchSupplier.data.sup_Status === '2'">Inactive</p>
                      </template></Column>

                    <Column field="sup_Status" header="Status"> <template #body="searchSupplier">
                        <p v-if="searchSupplier.data.sup_Status === '1'">Active</p>
                        <p v-if="searchSupplier.data.sup_Status === '2'">Inactive</p>
                      </template></Column>

                    <Column :exportable="false" header="Details">
                      <template #body="searchSupplier">
                        <router-link
                          :to="{ name: 'supplier-stock-details', params: { id: searchSupplier.data.sup_Id } }">
                          <Button icon="pi pi-truck" class="p-button-rounded p-button-info" />
                        </router-link>
                      </template>
                    </Column>

                    <Column header="Actions" :exportable="false" style="min-width: 8rem">
                      <template #body="searchSupplier">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                          @click="editUser(searchSupplier)" /> {{ " " }}
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                          @click="deleteUser(searchSupplier)" />
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

    <rs-modal title="Add Supplier" v-model="modalSupplier" position="middle" size="md">
      <FormKit label="Name" type="text" v-model="name" />
      <FormKit label="Code" type="text" v-model="code" />
      <FormKit label="Phone No." type="number" v-model="phone" />
      <FormKit label="Email" type="text" v-model="email" />

      <FormKit label="Organization" type="select" v-model="selectOrganization" placeholder="Select Organization"
        :options="this.listOrganization" />
      <FormKit label="Bank" type="select" v-model="selectBank" placeholder="Select Bank" :options="this.listBank" />

      <FormKit label="Account No." type="number" v-model="accNo" />
      <FormKit label="Postcode" type="text" v-model="postcode" />
      <FormKit label="Address" type="textarea" v-model="address" />
      <FormKit v-model="supplierType" type="radio" label="Supplier Type" :options="[
        { label: 'HQ', value: 1 },
        { label: 'Outlet', value: 2 },
      ]" />

      <div v-if="(supplierType == 2)">
        <FormKit type="select" label="Outlet" v-model="selectOutlet" placeholder="Select Outlet"
          :options="this.listOutlet" />
      </div>

      <rs-button style="float: right" @click="insertSupplier()">
        Save
      </rs-button>
    </rs-modal><!-- INSERT -->

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

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    DataTable,
    RsModal,
    Column,
    Button,
  },
  setup() {
    const supplier = ref([]);
    const search = ref("");

    const searchSupplier = computed(() => {
      return supplier.value.filter((supplier) => {
        return (
          supplier.sup_Name.toLowerCase().indexOf(search.value.toLowerCase()) !=
          -1 ||
          supplier.sup_Name
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
      searchSupplier,
      supplier,
      formatPrice,
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

      modalSupplier: false,
      name: null,
      code: null,
      phone: null,
      email: null,
      address: null,
      postcode: null,
      accNo: null,
      selectOrganization: null,
      selectBank: null,
      supplierType: null,
      selectOutlet: null,

      listOutlet: [],
      listOrganization: [],
      listBank: [],


    };
  },
  async created() {
    this.getdata();

    this.getBank();
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
            this.staffId = response.data.data[0].staff_id;
            console.log('staff id', this.staffId);
            this.getSupplier();
            this.getOutlet();
            this.getOrganization();
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getSupplier() {
      var axios = require("axios");
      var data = JSON.stringify({
        rawMaterialId: null,
        staffId: this.staffId,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getSupplier",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.supplier = response.data.data;
            this.totalData = response.data.data.length;

          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getOrganization() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/admin/getOrganizationOwner",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {

            for (let i = 0; i < response.data.data.length; i++) {
              this.listOrganization.push({
                label: response.data.data[i].org_name,
                value: response.data.data[i].org_id,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getBank() {
      var axios = require("axios");
      // var data = JSON.stringify({
      //     staffid: localStorage.staff,
      // });
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/getBank",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.listBank.push({
                label: response.data.data[i].bank_name,
                value: response.data.data[i].bank_id,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async clickBtnAdd() {
      // this.users1 = user.data;
      this.modalSupplier = true;
    },

    async getOutlet() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/admin/getOutlet",
        headers: {
          "Content-Type": "application/json",
        },
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

    async insertSupplier() {
      var axios = require("axios");
      var data = JSON.stringify({
        name: this.name,
        code: this.code,
        phone: this.phone,
        email: this.email,
        address: this.address,
        postcode: this.postcode,
        organization: this.selectOrganization,
        bank: this.selectBank,
        accNo: this.accNo,
        supplierType: this.supplierType,
        staffId: this.staffId,
        outletId: this.selectOutlet,
      });
      console.log("Insert data :", data);
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertSupplier",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status == 200) {
              alert(response.data.message);
              this.modalSupplier = false;
              this.getSupplier();
            } else {
              alert(response.data.message);
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
  