<template>
  <rs-layout>
    <rs-breadcrumb />

    <div style="display: flex; flex-direction: row">
      <div class="w-full flex flex-col">
        <div class="w-full flex flex-row mb-1"></div>
        <div class="w-full" style="flex-direction: column">
          <!-- UNTUK ATAS BAWAH -->
          <div style="display: flex; flex-direction: row">
            <div class="w-11/12 h-10">
              <FormKit
                v-model="search"
                id="search-sticky"
                placeholder="Search for a staff..."
                type="search"
                :classes="{
                  inner:
                    'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                  outer: 'flex-1 mb-0',
                  input: 'h-12',
                }"
              />
            </div>
            <div
              v-if="this.staff_role != 3 || this.staff_category != 3"
              class="w-2/12"
              style="padding-top: 3px"
            >
              <rs-button
                @click="addUser()"
                class="bg-heandshe hover:bg-heandshe"
                >Add Organization Owner</rs-button
              >
            </div>
            <div class="w-1/12" style="padding-top: 3px">
              <rs-button @click="filter()" class="bg-heandshe hover:bg-heandshe"
                >Filter</rs-button
              >
            </div>
          </div>
          <div class="">
            <rs-card style="padding-top: 10px">
              <div>
                <div>
                  <DataTable
                    :value="searchUsers"
                    :paginator="true"
                    :rows="10"
                    v-model:expandedRows="expandedRows"
                    @rowExpand="onRowExpand"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[10, 20, 50]"
                    responsiveLayout="scroll"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                  >
                    <Column
                      :expander="true"
                      style="min-width: 8rem"
                      header="Actions"
                    >
                    </Column>
                    <Column field="organization_Name" header="Name"></Column>
                    <Column
                      field="organization_address"
                      header="Address"
                    ></Column>
                    <Column
                      field="organization_phone"
                      header="Phone No."
                    ></Column>

                    <template #expansion="">
                      <div class="orders-subtable">
                        <h5 style="margin-bottom: 20px">
                          Organization's Informations
                        </h5>

                        <DataTable
                          :value="filterOrganization"
                          :paginator="true"
                          :rows="10"
                          v-model:expandedRows="expandedRows"
                          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                          :rowsPerPageOptions="[10, 20, 50]"
                          responsiveLayout="scroll"
                          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        >
                          <Column field="org_name" header="Name"></Column>
                          <Column field="org_phone" header="Phone No."></Column>
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
    <!-- </div> -->

    <rs-modal title="Staff" v-model="selectStaff" position="middle" size="md">
      <label><strong>Name</strong></label>
      <p>{{ users1.data.user_name }}</p>
      <br />
      <label><strong>Phone No.</strong></label>
      <p>{{ users1.data.user_phone }}</p>
      <br />
      <label><strong>Email</strong></label>
      <p>{{ users1.data.user_email }}</p>
      <br />
      <label><strong>Password</strong></label>
      <p>{{ users1.data.user_password }}</p>
      <br />
      <label><strong>Pin Code</strong></label>
      <p>{{ users1.data.user_pincode }}</p>
      <br />
      <label><strong>Address</strong></label>
      <p>{{ users1.data.user_address }}</p>
      <br />
      <label><strong>Date of Birth.</strong></label>
      <p>{{ users1.data.dob }}</p>
      <br />
      <label><strong>Position</strong></label>
      <p>{{ users1.data.user_position }}</p>
      <br /> </rs-modal
    ><!-- SELECT -->

    <rs-modal title="Filter" v-model="filterModal" position="middle" size="md">
      <!-- <FormKit
        v-model="role"
        type="radio"
        label="Role Status"
        :options="['Admin', 'User']"
      /> -->
      <FormKit
        v-model="category"
        type="radio"
        label="Organization Type"
        :options="[
          { label: 'HQ', value: 2 },
          { label: 'Branch', value: 3 },
          { label: 'Supplier', value: 4 },
        ]"
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

    <rs-modal
      title="Add Organization's Owner"
      v-model="modalPOS"
      position="middle"
      size="md"
    >
      <FormKit label="Fullname" type="text" v-model="fullname" />
      <FormKit label="Phone No." type="number" v-model="phone" />
      <FormKit label="Email" type="email" v-model="email" />
      <!-- <FormKit label="Password " type="password" v-model="password" /> -->
      <!-- <FormKit
        label="Pin Code"
        help="for POS system login"
        type="number"
        v-model="pincode"
      /> -->
      <FormKit label="Address" type="textarea" v-model="address" />
      <FormKit label="Date of Birth." type="date" v-model="dob" />

      <rs-button style="float: right" @click="insertUser()">
        Save
      </rs-button> </rs-modal
    ><!-- INSERT -->
    <rs-modal
      title="Edit Staff"
      v-model="modalEdit"
      position="middle"
      size="md"
    >
      <FormKit label="Fullname" type="text" v-model="users1.user_name" />
      <FormKit label="Phone No." type="number" v-model="users1.user_phone" />
      <FormKit label="Email" type="email" v-model="users1.user_email" />
      <FormKit
        label="Password No."
        type="password"
        v-model="users1.user_password"
      />
      <FormKit
        label="Pin Code"
        help="for POS system login"
        type="number"
        v-model="users1.user_pincode"
      />
      <FormKit label="Address" type="textarea" v-model="users1.user_address" />
      <FormKit label="Date of Birth." type="date" v-model="users1.user_dob" />
      <FormKit
        type="select"
        label="Staff Position"
        :options="[
          { label: 'Admin', value: '2' },
          { label: 'User/Staff', value: '3' },
        ]"
        v-model="users1.user_position"
      />
      <FormKit
        type="select"
        label="Staff Category"
        :options="[
          { label: 'HQ', value: '2' },
          { label: 'Outlet', value: '3' },
          { label: 'Supplier', value: '4' },
        ]"
        v-model="users1.user_position"
      />

      <rs-button style="float: right" @click="updateUser(users1)">
        Save
      </rs-button> </rs-modal
    ><!-- EDIT -->
    <rs-modal
      title="Delete User"
      v-model="modalDelete"
      position="middle"
      size="md"
    >
      <p>Are you sure you want to delete this user?</p>
      <rs-button
        style="float: right"
        class="bg-heandshe hover:bg-heandshe"
        @click="this.modalDelete = false"
      >
        No
      </rs-button>
      <rs-button
        style="float: right"
        class="mx-1"
        variant="danger"
        @click="UserDelete(users1.data.user_id)"
      >
        Yes
      </rs-button> </rs-modal
    ><!-- DELETE -->
  </rs-layout>
</template>
<script>
import { ref, computed } from "vue";
import RsButton from "@/components/Button.vue";
import RsModal from "@/components/Modal.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
/* import Button from "primevue/button"; */
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
/* import Menu from "@/views/apps/administrator/adminSidemenu.vue"; */

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    RsModal,
    DataTable,
    Column,
    /* Button, */
    /* arbitrary: Menu, */
  },
  setup() {
    const organization = ref([]);
    const search = ref("");
    const filterModal = ref(false);
    const role = ref("");
    const category = ref("");
    const belowOrganization = ref([]);

    const searchUsers = computed(() => {
      return organization.value.filter((user) => {
        /* if (category.value == "") { */
        return (
          user.organization_Name
            .toLowerCase()
            .indexOf(search.value.toLowerCase()) != -1
        );

        /* } else {
          return (
            user.outlet_type.toString().indexOf(category.value.toString()) !=
              -1 &&
            user.organization_Name
              .toLowerCase()
              .indexOf(search.value.toLowerCase()) != -1
          );
        } */
      });
    });

    const filterOrganization = computed(() => {
      return belowOrganization.value.filter((user) => {
        return (
          user.type_code
            .toString()
            .indexOf(category.value.toString()) != -1
        );
      });
    });

    const filters = () => {
      role.value = "";
      category.value = "";
      filterModal.value = false;
    };

    const filter = () => {
      filterModal.value = true;
      console.log(category.value);
    };

    return {
      search,
      searchUsers,
      filterOrganization,
      organization,
      belowOrganization,
      filter,
      filters,
      filterModal,
      category,
    };
  },
  data() {
    return {
      staffPosition: [],
      /* DATA V-MODEL */
      staffid: "",
      staffName: "",
      staff_category: 0,
      staff_role: 0,

      fullname: "",
      phone: null,
      email: "",
      address: "",
      password: "",
      pincode: "",
      dob: "",
      position: "",
      expandedRows: [],

      /* MODAL SHOW */
      modalDelete: false,
      modalPOS: false,
      modalEdit: false,
      selectStaff: false,
      users1: "",
      show: false,
      outletDrop: false,
      menuDrop: false,
      totalStaff: 2,
      outlet: 0,
      user_position: "",
      user_category: "",
      Outlet_Suppliername: "",
      type: "",

      return_data: "",
      oos_id: "",
      org_name: "",
      org_id: "",
      org_phone: "",
      type_code: "",
    };
  },
  async created() {
    this.outlet = this.$route.params.outletid;
    this.staffid = localStorage.staff;
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("staff", this.staffid);
    });
    this.getdata();
    this.getuser();
    this.getPosition();
  },
  methods: {
    async onRowExpand(event) {
      this.belowOrganization = [];
      var axios = require("axios");
      var data = JSON.stringify({
        orgid: event.data.organization_id,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/listOrganizationMenu",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.return_data = response.data.data;
            for (let i = 0; i < this.return_data.length; i++) {
              if (this.return_data[i].outlet_name != null) {
                this.oos_id = this.return_data[i].oos_id;
                this.org_name = this.return_data[i].outlet_name;
                this.org_id = this.return_data[i].outletid;
                this.org_phone = this.return_data[i].outlet_phone;
                this.type_code = this.return_data[i].type_code;
                this.belowOrganization.push({
                  oos_id: this.oos_id,
                  org_name: this.org_name,
                  org_id: this.org_id,
                  org_phone: this.org_phone,
                  type_code: this.type_code,
                });
              } else if (this.return_data[i].supplier_name != null) {
                this.oos_id = this.return_data[i].oos_id;
                this.org_name = this.return_data[i].supplier_name;
                this.org_id = this.return_data[i].supplierid;
                this.org_phone = this.return_data[i].supplier_phone;
                this.type_code = this.return_data[i].type_code;
                this.belowOrganization.push({
                  oos_id: this.oos_id,
                  org_name: this.org_name,
                  org_id: this.org_id,
                  org_phone: this.org_phone,
                  type_code: this.type_code,
                });
              }
            }
            console.log(this.belowOrganization);
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    expandAll() {
      this.expandedRows = this.searchUsers.filter((p) => p.owner_id);
    },
    collapseAll() {
      this.expandedRows = null;
    },

    async staffSelect(user) {
      this.users1 = user;
      this.selectStaff = true;
    },

    async getPosition() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/admin/getPosition" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.staffPosition.push({
                label: response.data.data[i].pos_name,
                value: response.data.data[i].pos_id,
              });
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
            this.staff_category = response.data.data[0].category;
            this.staff_role = response.data.data[0].role;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getuser() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/listOrganization" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.organization.push({
                organization_id: response.data.data[i].organization_id,
                organization_Name: response.data.data[i].organization_Name,
                organization_address:
                  response.data.data[i].organization_address,
                organization_phone: response.data.data[i].organization_phone,
              });
            }
            console.log(response.data.data);
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async editUser(user) {
      this.users1 = user.data;
      this.modalEdit = true;
    },

    async deleteUser(user) {
      this.users1 = user;
      this.modalDelete = true;
    },

    async UserDelete(users) {
      var axios = require("axios");
      var data = JSON.stringify({
        user_id: users,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/deleteStaff" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status == "Success") {
              this.modalDelete = false;
              alert(response.data.message);
              this.users.splice(0);
              this.getuser();
            } else {
              alert(response.data.message);
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async updateUser(users) {
      var axios = require("axios");
      var data = JSON.stringify({
        user_name: users.user_name,
        user_phone: users.user_phone,
        user_email: users.user_email,
        user_id: users.user_id,
        address: users.address,
        password: users.user_password,
        pincode: users.user_pincode,
        dob: users.user_dob,
        position: users.user_position,
      });
      console.log(data);
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/updateStaff" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log(response);
            if (response.data.status == "Success") {
              this.modalEdit = false;
              alert(response.data.message);
              this.users.splice(0);
              this.getuser();
            } else {
              alert(response.data.message);
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async addUser() {
      this.modalPOS = true;
    },

    async insertUser() {
      var axios = require("axios");
      var data = JSON.stringify({
        fullname: this.fullname,
        phone: this.phone,
        email: this.email,
        address: this.address,
        password: this.password,
        pincode: this.pincode,
        dob: this.dob,
        position: this.user_position,
        category: this.user_category,
        staffid: localStorage.staff,
      });
      console.log(data);
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertOrganizationOwner",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status == "Success") {
              this.modalPOS = false;
              this.fullname = "";
              this.phone = "";
              this.email = "";
              this.address = "";
              this.password = "";
              this.pincode = "";
              this.dob = "";
              this.position = "";
              this.user_category = "";
              this.user_position = "";
              alert(response.data.message);
              /* alert("Successfully Insert New Organization's Owner"); */
              this.users.splice(0);
              this.getuser();
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
