<template>
  <rs-layout>
    <rs-breadcrumb />
    <div class="w-full flex flex-col">
      <div style="display: flex; flex-direction: row">
        <!-- UNTUK SEBELAH2 -->

        <div class="w-full h-1/4 flex flex-col">
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
              <div class="w-1/12">
                <rs-button
                  @click="clickBtnAdd()"
                  class="bg-heandshe hover:bg-heandshe"
                  >Add Raw Material</rs-button
                >
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
                      <Column field="rm_Name" header="Name"></Column>
                      <Column field="rm_Quantity" header="Quantity"></Column>
                      <Column field="rm_Unit" header="Measurement"></Column>
                      <Column field="rm_totalprice" header="Total Cost (RM)"></Column>
                      <Column field="rm_unitcost" header="Unit Cost (RM)"></Column>

                      <!-- <Column :exportable="false" style="min-width: 8rem">
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
                      </Column> -->

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
      <FormKit
        type="select"
        label="Name"
        v-model="name"
        placeholder="Choose Raw Material Name"
        :options="this.rawMaterials"
      />

      <FormKit label="Quantity" type="number" v-model="quantity" />

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

export default {
  name: "RawMaterial",
  components: {
    RsButton,
    DataTable,
    RsModal,
    Column,
    Button,
  },
  setup() {
    const rawMaterial = ref([]);
    const typePackaging = ref([]);
    const unitMeasurement = ref([]);
    const search = ref("");
    const rawMaterials = ref([]);
    const listRawMaterial = ref([]);

    const searchRawMaterial = computed(() => {
      return listRawMaterial.value.filter((rawMaterial) => {
        return (
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
      rawMaterials,
      listRawMaterial,
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
    this.getRawMaterialName();
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
            console.log(response)
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getRawMaterialName() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/admin/getRawMaterialName",
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(config)
      await axios(config)
        .then(
          function (response) {
            console.log("data : ",response)
            for (let i = 0; i < response.data.data.length; i++) {
              this.rawMaterials.push({
                label: response.data.data[i].rm_Name,
                value: response.data.data[i].rm_Id,
              });
            }
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
       var data = JSON.stringify({
           menu: this.$route.params.menuid,
       });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getRawMaterialMenu",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log(response.data)
            for (let i = 0; i < response.data.data.length; i++) {
              this.listRawMaterial.push({
                rm_Name: response.data.data[i].rm_Name,
                rm_Quantity: response.data.data[i].rm_Quantity,
                rm_Unit: response.data.data[i].rm_Unit,
                rm_totalprice: response.data.data[i].rm_totalprice,
                rm_unitcost: response.data.data[i].rm_unitcost,
                mrm_id: response.data.data[i].mrm_id,
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
      this.modalRawMaterial = true;
    },

    async insertRawMaterial() {
      var axios = require("axios");
      var data = JSON.stringify({
        name: this.name,
        quantity: this.quantity,
        measurement: this.measurement,
        menu: this.$route.params.menuid,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertRawMaterialMenu",
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
  