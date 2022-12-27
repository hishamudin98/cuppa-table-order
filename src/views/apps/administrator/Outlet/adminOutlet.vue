<template>
  <rs-layout>
    <div style="display: flex; flex-direction: row">
      <div class="w-full h-1/4 flex flex-col">
        <div class="w-full flex flex-row mb-0">
          <div class="inline-block w-full pr-10">
            <rs-card>
              <div class="text-center pt-10 pb-2">
                <strong>Total of Outlet Under HQ </strong>
              </div>
              <hr />
              <div class="text-center py-8">{{ this.totalData }} outlets</div>
            </rs-card>
          </div>
          <!-- <div class="inline-block w-1/2 pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Total of outlets income ( RM )</strong>
                </div>
                <hr />
                <div class="text-center py-8">
                  {{ formatPrice(this.sumShifts) }}
                </div>
              </rs-card>
            </div> -->
        </div>
        <div class="w-full" style="flex-direction: column">
          <!-- UNTUK ATAS BAWAH -->
          <div style="display: flex; flex-direction: row; padding-top: 10px">
            <div class="w-11/12 h-1">
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
            <div class="w-1/12">
              <rs-button
                @click="addOutlet()"
                class="bg-heandshe hover:bg-heandshe"
                >Add Outlet</rs-button
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
                    <Column field="outlet_code" header="Outlet Code"></Column>
                    <Column field="outlet_name" header="Outlet Name"></Column>
                    <!-- <Column field="staff_name" header="Outlet Owner"></Column> -->
                    <Column field="outlet_phone" header="Phone No."></Column>
                    <Column field="outlet_address" header="Address"></Column>
                    <Column field="outlet_email" header="Email"></Column>
                    <Column
                      :exportable="false"
                      style="min-width: 8rem"
                      header="Actions"
                    >
                      <template #body="searchOutlet">
                        <Button
                          icon="pi pi-pencil"
                          class="p-button-rounded p-button-success"
                          @click="editOutlet(searchOutlet)"
                        />
                        {{ "" }}
                        <router-link :to="{ name: 'admin-table' }">
                          <Button
                            icon="pi pi-table"
                            class="p-button-rounded p-button-success"
                          />
                        </router-link>
                        {{ "" }}
                        <router-link :to="{ name: 'admin-station' }">
                          <Button
                            icon="pi pi-bars"
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
        type="radio"
        label="Outlet Type"
        v-model="outlet_type"
        :options="[
          { label: 'HQ', value: 2 },
          { label: 'Branch', value: 3 },
        ]"
      />
      <FormKit
        type="file"
        label="Images"
        v-model="outlet_images"
        accept=".jpg, .png, .jpeg"
      />
      <hr />
      <br />
      <label><strong>Organization's Information</strong></label>
      <br />
      <FormKit
        label="Owner"
        type="select"
        v-model="Organizationowner"
        :options="this.owner"
      />
      <!-- <FormKit label="Phone No." type="number" />
      <FormKit label="Email" type="email" />
      <FormKit label="Address" type="textarea" /> -->
      <hr />
      <br />
      <label><strong>Social Media's URL</strong></label>
      <br />
      <FormKit
        type="url"
        label="Official Website"
        placeholder="https://www.example.com..."
      />
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
    const owner = ref([]);

    const searchOutlet = computed(() => {
      return outlet.value.filter((shifts) => {
        return (
          shifts.outlet_name
            .toLowerCase()
            .indexOf(search.value.toLowerCase()) != -1 ||
          shifts.outlet_code
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
      searchOutlet,
      outlet,
      owner,
      formatPrice,
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
       outlet_type: "",
      Organizationowner: "",
    };
  },
  async created() {
    this.getdata();
    this.getOutlethq();
    this.getOrganizationOwner();
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
              this.outlet.push({
                outlet_id: this.outlet_details[i].outlet_id,
                outlet_code: this.outlet_details[i].outlet_code,
                outlet_name: this.outlet_details[i].outlet_name,
                outlet_phone: this.outlet_details[i].outlet_phone,
                outlet_email: this.outlet_details[i].outlet_email,
                outlet_address: this.outlet_details[i].outlet_address,
                staff_name: this.outlet_details[i].staff_name,
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

    async getOrganizationOwner() {
      var axios = require("axios");
      var config = {
        method: "get",
        url:
          process.env.VUE_APP_FNB_URL +
          "/admin/getOrganizationOwner" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.owner.push({
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
        outlet_type: this.outlet_type,
        Organizationowner: this.Organizationowner,
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
