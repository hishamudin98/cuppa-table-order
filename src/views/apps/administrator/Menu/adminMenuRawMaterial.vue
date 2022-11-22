<template>
  <rs-layout>
    <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <div class="welcome text-lg font-semibold text-white">
            <router-link
              class="flex items-center justify-center"
              :to="{
                name: 'admin-menu',
              }"
            >
              <vue-feather class="text-white" type="chevron-left">
              </vue-feather>
              Menu Raw Material Management
            </router-link>
          </div>
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
              <!-- <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Total of Raw Material </strong>
                </div>
                <hr />
                <div class="text-center py-8">
                  {{ this.totalData }} raw material
                </div>
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
              </rs-card> -->
            </div>
          </div>
          <div class="w-full" style="flex-direction: column">
            <!-- UNTUK ATAS BAWAH -->
            <div style="display: flex; flex-direction: row; padding-top: 10px">
              <div class="w-full h-1">
                <FormKit
                  v-model="search"
                  id="search-sticky"
                  placeholder="Search"
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
                      :value="searchRawMaterial"
                      :paginator="true"
                      :rows="10"
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      :rowsPerPageOptions="[10, 20, 50]"
                      responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    >
                      <Column header="Name">
                        <template #body=""> Mushroom </template>
                      </Column>
                      <Column header="Quantity">
                        <template #body=""> 1 </template>
                      </Column>
                      <Column header="Measurement">
                        <template #body=""> gram </template>
                      </Column>
                      <Column header="Unit Cost ( RM )">
                        <template #body=""> 5.00 </template>
                      </Column>

                      <Column header="Total Cost">
                        <template #body=""> 30.00 </template>
                      </Column>

                      <Column header="Status">
                        <template #body=""> Active </template>
                      </Column>

                      <Column :exportable="false" style="min-width: 8rem">
                        <template #body="searchRawMaterial">
                          <Button
                            icon="pi pi-pencil"
                            class="p-button-rounded p-button-success mr-2"
                            @click="editUser(searchRawMaterial)"
                          />
                          <Button
                            icon="pi pi-trash"
                            class="p-button-rounded p-button-warning"
                            @click="deleteUser(searchRawMaterial)"
                          />
                        </template>
                      </Column>

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

    <rs-modal
      title="Add Raw Material"
      v-model="modalRawMaterial"
      position="middle"
      size="md"
    >
      <FormKit label="Name" type="text" v-model="name" />
      <FormKit label="SKU" type="text" v-model="sku" />
      <FormKit label="Min. Quantity" type="number" v-model="minquantity" />
      <FormKit label="Quantity" type="number" v-model="quantity" />
      <FormKit label="Price (RM)" type="number" v-model="price" />
      <FormKit
        type="select"
        label="Packaging Type"
        v-model="packaging_type"
        placeholder="Choose Packaging Type"
        :options="this.typePackaging"
      />
      <FormKit
        type="select"
        label="Unit Measurement"
        v-model="measurement"
        placeholder="Choose Unit Measurement"
        :options="this.unitMeasurement"
      />

      <rs-button
        style="float: right"
        @click="insertRawMaterial()"
        class="bg-heandshe hover:bg-heandshe"
      >
        Save
      </rs-button> </rs-modal
    ><!-- INSERT -->
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
import Menu from "@/views/apps/administrator/adminSidemenu.vue";

export default {
  name: "RawMaterial",
  components: {
    RsButton,
    DataTable,
    RsModal,
    Column,
    Button,
    arbitrary: Menu,
  },
  setup() {
    const rawMaterial = ref([]);
    const typePackaging = ref([]);
    const unitMeasurement = ref([]);
    const search = ref("");

    const searchRawMaterial = computed(() => {
      return rawMaterial.value.filter((rawMaterial) => {
        return (
          rawMaterial.rm_Name
            .toLowerCase()
            .indexOf(search.value.toLowerCase()) != -1 ||
          rawMaterial.rm_Name
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
      searchRawMaterial,
      rawMaterial,
      formatPrice,
      typePackaging,
      unitMeasurement,
    };
  },
  data() {
    return {
      staffid: "",
      staffName: "",
      totalData: 0,
      show: false,
      outletDrop: false,
      sumPrice: 0,
      menuDrop: false,
      /* BARU */

      name: null,
      sku: null,
      quantity: null,
      minquantity: null,
      price: null,
      packaging_type: null,
      measurement: null,
      modalRawMaterial: false,
    };
  },
  async created() {
    this.getdata();
    this.getRawMaterial();
    this.getTypePackaging();
    this.getUnitMeasurement();
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

    async getTypePackaging() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/getTypePackaging",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.typePackaging.push({
                label: response.data.data[i].packaging_Name,
                value: response.data.data[i].packaging_Value,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getUnitMeasurement() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/getUnitMeasurement",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.unitMeasurement.push({
                label: response.data.data[i].packaging_Name,
                value: response.data.data[i].packaging_Value,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getRawMaterial() {
      var axios = require("axios");
      // var data = JSON.stringify({
      //     staffid: localStorage.staff,
      // });
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/getRawMaterial",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            // console.log("price", response.data.data.rm_Price[0]);
            /* this.rawMaterial = response.data.data; */
            this.rawMaterial.push({ rm_Name: "mushroom", rm_Sku: "123123" });
            this.totalData = this.rawMaterial.length;

            let price = 0;
            for (let i = 0; i < response.data.data.length; i++) {
              price += response.data.data[i].rm_Price;
            }
            this.sumPrice = price;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async clickBtnAdd() {
      // this.users1 = user.data;
      this.modalRawMaterial = true;
    },

    async insertRawMaterial() {
      var axios = require("axios");
      var data = JSON.stringify({
        name: this.name,
        sku: this.sku,
        quantity: this.quantity,
        minquantity: this.minquantity,
        price: this.price,
        packaging_type: this.packaging_type,
        measurement: this.measurement,
      });
      console.log("Insert data :", data);
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertRawMaterial",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status == 200) {
              this.modalRawMaterial = false;
              alert(response.data.message);
              this.users.splice(0);
              this.getRawMaterial();
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
  