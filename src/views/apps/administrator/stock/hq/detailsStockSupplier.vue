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

                    <Column field="sup_Status" header="Account No"> <template #body="searchSupplier">
                        <p v-if="searchSupplier.data.sup_Status === '1'">123123123</p>
                        <p v-if="searchSupplier.data.sup_Status === '2'">Inactive</p>
                      </template></Column>

                    <Column field="rm_Quantity" header="Quantity">
                      <template #body="searchSupplier">
                        <p v-if="(searchSupplier.data.rm_Quantity <= searchSupplier.data.rm_MinQuantity)"
                          style="color:red; font-weight: bold;">
                          {{ searchSupplier.data.rm_Quantity }}</p>
                        <p v-else>{{ searchSupplier.data.rm_Quantity }}</p>
                      </template>
                    </Column>
                    <Column field="rm_MinQuantity" header="Min. Quantity"></Column>

                    <Column field="rm_Price" header="Unit Price (RM)">
                      <template #body="searchSupplier">
                        {{ formatPrice(searchSupplier.data.rm_Price) }}
                      </template>
                    </Column>

                    <Column field="rm_Price" header="Total Price (RM)">
                      <template #body="searchSupplier">
                        {{ formatPrice(searchSupplier.data.rm_TotalPrice) }}
                      </template>
                    </Column>

                    <Column field="rm_Status" header="Status">
                      <template #body="searchSupplier">
                        <rs-badges variant="danger"
                          v-if="(searchSupplier.data.rm_Quantity <= searchSupplier.data.rm_MinQuantity)">
                          Low Stock</rs-badges>
                        <rs-badges variant="success" v-else>
                          In Stock</rs-badges>

                      </template>

                    </Column>

                    <Column field="sup_Status" header="Status"> <template #body="searchSupplier">
                        <p v-if="searchSupplier.data.sup_Status === '1'">Active</p>
                        <p v-if="searchSupplier.data.sup_Status === '2'">Inactive</p>
                      </template></Column>

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

      <FormKit type="select" label="Supplier" v-model="selectSupplier" placeholder="Select Supplier"
        :options="this.listSupplier" />

      <FormKit label="Min. Quantity" type="number" v-model="minquantity" />
      <FormKit label="Quantity" type="number" v-model="quantity" />

      <FormKit label="Price (RM)" type="number" v-model="price" />
      <FormKit label="Discount (RM)" type="number" v-model="discount" />

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
import RsBadges from "@/components/Badges.vue";

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    DataTable,
    RsBadges,
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

      selectSupplier: null,
      minquantity: null,
      quantity: null,
      price: null,
      discount: null,

      listOutlet: [],
      listOrganization: [],
      listBank: [],
      listSupplier: [],


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

            this.getSupplierByRawMaterial();
            this.getAllSupplier();
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getSupplierByRawMaterial() {
      var axios = require("axios");
      var data = JSON.stringify({
        rawMaterialId: this.$route.params.id,
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

            if (response.data.status == 200) {
              this.supplier = response.data.data;
              this.totalData = response.data.data.length;

            } else {
              alert(response.data.message);
            }

          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getAllSupplier() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffId: this.staffId,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getSupplierHq",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status == 200) {
              for (let i = 0; i < response.data.data.length; i++) {
                this.listSupplier.push({
                  label: response.data.data[i].sup_Name,
                  value: response.data.data[i].sup_Id,
                });
              }

            } else {
              alert(response.data.message);
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
            if (response.data.status == 200) {
              for (let i = 0; i < response.data.data.length; i++) {
                this.listBank.push({
                  label: response.data.data[i].bank_name,
                  value: response.data.data[i].bank_id,
                });
              }
            } else {
              alert(response.data.message);
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

            if (response.data.status == 200) {
              for (let i = 0; i < response.data.data.length; i++) {
                this.listOutlet.push({
                  label: response.data.data[i].outlet_name,
                  value: response.data.data[i].outlet_id,
                });
              }

            } else {
              alert(response.data.message);
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
        supplierId: this.selectSupplier,
        minQuantity: this.minquantity,
        quantity: this.quantity,
        price: this.price,
        discount: this.discount,
        rawMaterial: this.$route.params.id,
      });

      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertSupplierRawMaterial",
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
              this.getSupplierByRawMaterial();

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
  