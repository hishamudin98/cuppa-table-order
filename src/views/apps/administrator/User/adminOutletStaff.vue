<template>
  <rs-layout>
    <!--  -->
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
                  placeholder="Search for a outlet..."
                  type="search"
                  :classes="{
                    inner:
                      'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                    outer: 'flex-1 mb-0',
                    input: 'h-10',
                  }"
                />
              </div>
              <div class="w-1/12" style="">
                <rs-button
                  @click="filter()"
                  class="bg-heandshe hover:bg-heandshe"
                  >Filter</rs-button
                >
              </div>
            </div>
            <div class="">
              <rs-card style="margin-top: 40px">
                <div>
                  <div>
                    <DataTable
                      :value="searchOutlet"
                      :paginator="true"
                      :rows="10"
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      :rowsPerPageOptions="[10, 20, 50]"
                      responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    >
                      <Column field="outlet_code" header="Code"></Column>
                      <Column field="outlet_name" header="Name"></Column>
                      <!-- <Column field="staff_name" header="Outlet Owner"></Column> -->
                      <!-- <Column field="outlet_phone" header="Phone No."></Column>
                      <Column field="outlet_address" header="Address"></Column>
                      <Column field="outlet_email" header="Email"></Column> -->
                      <Column
                        :exportable="false"
                        style="min-width: 8rem"
                        header="Actions"
                      >
                        <template #body="searchOutlet">
                          <!-- <Button
                            icon="pi pi-pencil"
                            class="p-button-rounded p-button-success"
                            @click="editOutlet(searchOutlet)"
                          /> -->
                          <router-link :to="{ name: 'admin-staff-outlet', params: { outletid: searchOutlet.data.outlet_id } }">
                           <Button
                            icon="pi pi-users"
                            class="p-button-rounded p-button-success"
                          />
                          
                          </router-link>
                          <!-- <Button
                            icon="pi pi-trash"
                            class="p-button-rounded p-button-warning"
                            @click="deleteTable(searchOutlet)"
                          /> -->
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
      title="Add Outlet"
      v-model="modalInsert"
      position="middle"
      size="md"
    >
      <FormKit label="Outlet Name" type="text" v-model="outlet_name" />
      <FormKit label="Phone No." type="number" v-model="outlet_phone" />
      <FormKit label="Email" type="email" v-model="outlet_email" />
      <FormKit label="Postcode" type="number" v-model="outlet_postcode" />
      <FormKit label="Address" type="textarea" v-model="outlet_address" />
      <FormKit
        type="file"
        label="Images"
        v-model="outlet_images"
        accept=".jpg, .png, .jpeg"
      />
      <hr />
      <br>
      <label><strong>Social Media's URL</strong></label>
      <br />
      <FormKit
        type="url"
        label="Facebook"
        placeholder="https://www.example.com..."
        validation="url"
      />
      <FormKit
        type="url"
        label="Instagram"
        placeholder="https://www.example.com..."
      />
      <FormKit
        type="url"
        label="Twitter"
        placeholder="https://www.example.com..."
      />
      <FormKit
        type="url"
        label="Official Website"
        placeholder="https://www.example.com..."
      />
      <rs-button style="float: right" @click="insertOutlet()"> Save </rs-button>
    </rs-modal>
    <!-- EDIT -->
    <rs-modal
      title="Edit Outlet"
      v-model="modalEdit"
      position="middle"
      size="md"
    >
      <FormKit label="Outlet Name" type="text" v-model="outlet1.outlet_name" />
      <FormKit label="Phone No." type="number" v-model="outlet1.outlet_phone" />
      <FormKit label="Email" type="email" v-model="outlet1.outlet_email" />
      <FormKit
        label="Address"
        type="textarea"
        v-model="outlet1.outlet_address"
      />
      <rs-button style="float: right" @click="editOutlets(outlet1)">
        Save
      </rs-button>
    </rs-modal>
    <rs-modal title="Filter" v-model="filterModal" position="middle" size="md">
      <FormKit
        v-model="role"
        type="radio"
        label="Organization Type"
        :options="['HQ' , 'Outlet' , 'Supplier']"
      />

      <rs-button
        style="float: right"
        variant="primary-outline"
        @click="filters()"
      >
        Clear
      </rs-button>
      <rs-button
        style="float: right"
        class="mx-1 bg-heandshe hover:bg-heandshe"
        @click="filters()"
      >
        All Filter
      </rs-button>
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
import RsButton from "@/components/Button.vue";
import RsModal from "@/components/Modal.vue";
import "primeicons/primeicons.css";
/* import moment from "moment"; */

export default {
  name: "AdminDashboard",
  components: {
    RsModal,
    RsButton,
    DataTable,
    Column,
    Button,
  },
  setup() {
    const outlet = ref([]);
    const search = ref("");
    const filterModal = ref(false);
    const role = ref("");

    const searchOutlet = computed(() => {
      return outlet.value.filter((outlets) => {
        return (
          outlets.org_type
            .toLowerCase()
            .indexOf(role.value.toLowerCase()) != -1 
         
        );
      });
    });
    const formatPrice = (price) => {
      return parseFloat(price)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const filters = () => {
      role.value = "";
      filterModal.value = false;
    };

    const filter = () => {
      filterModal.value = true;
    };

    return {
      search,
      searchOutlet,
      outlet,
      formatPrice,
      filter,
      filters,
      filterModal,
      role,
    };
  },
  data() {
    return {
      staffid: "",
      staffName: "",
      totalData: 0,
      sumShifts: 0,
      outlet1: "",
      /* BARU */
      outlet_details: "",
      modalInsert: false,
      modalEdit: false,
      outlet_name: "",
      outlet_phone: "",
      outlet_email: "",
      outlet_postcode: "",
      outlet_address: "",
      outlet_images: "",
      orgType: "",
    };
  },
  async created() {
    this.getdata();
    this.getOutlethq();
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

    async getOutlethq() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url:
          process.env.VUE_APP_FNB_URL + "/admin/getOutletDetails" /*   */,
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
              if(this.outlet_details[i].org_type == 2)
              {
                this.orgType = "HQ"
              }
              else if(this.outlet_details[i].org_type == 3)
              {
                this.orgType = "Outlet"
              }
              else if(this.outlet_details[i].org_type == 4)
              {
                this.orgType = "Supplier"
              }
              this.outlet.push({
                outlet_id: this.outlet_details[i].outlet_id,
                outlet_code: this.outlet_details[i].outlet_code,
                outlet_name: this.outlet_details[i].outlet_name,
                outlet_phone: this.outlet_details[i].outlet_phone,
                outlet_email: this.outlet_details[i].outlet_email,
                outlet_address: this.outlet_details[i].outlet_address,
                staff_name: this.outlet_details[i].staff_name,
                org_type : this.orgType,
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

    async addOutlet() {
      this.modalInsert = true;
    },

    async editOutlet(outlet) {
      this.outlet1 = outlet.data;
      this.modalEdit = true;
    },

    async insertOutlet() {
      var axios = require("axios");
      var data = JSON.stringify({
        outlet_name: this.outlet_name,
        outlet_phone: this.outlet_phone,
        outlet_email: this.outlet_email,
        outlet_postcode: this.outlet_postcode,
        outlet_address: this.outlet_address,
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertOutlet",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status == "Success") {
              this.modalInsert = false;
              this.outlet_name = "";
              this.outlet_phone = "";
              this.outlet_email = "";
              this.outlet_address = "";
              alert(response.data.message);
              this.outlet.splice(0);
              this.getOutlethq();
            } else {
              alert(response.data.message);
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async editOutlets(outlet1) {
      var axios = require("axios");
      var data = JSON.stringify({
        outlet_name: outlet1.outlet_name,
        outlet_phone: outlet1.outlet_phone,
        outlet_email: outlet1.outlet_email,
        outlet_address: outlet1.outlet_address,
        outlet_id: outlet1.outlet_id,
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/updateOutlet",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status == "Success") {
              this.modalEdit = false;
              this.outlet_name = "";
              this.outlet_phone = "";
              this.outlet_email = "";
              this.outlet_address = "";
              alert(response.data.message);
              this.outlet.splice(0);
              this.getOutlethq();
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
