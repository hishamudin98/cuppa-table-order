<template>
  <rs-layout>
    <rs-breadcrumb />
    <div class="w-full flex flex-col">
      <div style="display: flex; flex-direction: row">
        <!-- UNTUK SEBELAH2 -->
        
        <div class="w-full flex flex-col">
          
          <div class="w-full" style="flex-direction: column">
            <!-- UNTUK ATAS BAWAH -->
            <div style="display: flex; flex-direction: row">
              <div class="w-10/12 h-10">
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
                class="w-1/12"
                style="padding-top: 10px"
              >
                <rs-button
                  @click="addUser()"
                  class="bg-heandshe hover:bg-heandshe"
                  >Add Staff</rs-button
                >
              </div>
              <div class="w-1/12" style="padding-top: 10px">
                <rs-button
                  @click="filter()"
                  class="bg-heandshe hover:bg-heandshe"
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
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      :rowsPerPageOptions="[10, 20, 50]"
                      responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    >
                      <Column field="user_name" header="Name"></Column>
                      <Column field="user_phone" header="Phone no."></Column>
                      <Column field="user_email" header="Email"></Column>
                      <Column field="user_position" header="Role">
                        <template #body="searchUsers">
                          <p v-if="searchUsers.data.user_position === 2">HQ</p>
                          <p v-if="searchUsers.data.user_position === 3">
                            Outlet
                          </p>
                          <p v-if="searchUsers.data.user_position === 4">
                            Supplier
                          </p>
                        </template>
                      </Column>
                      <Column :exportable="false" style="min-width: 8rem">
                        <template #body="searchUsers">
                          <Button
                            icon="pi pi-pencil"
                            class="p-button-rounded p-button-success mr-2"
                            @click="editUser(searchUsers)"
                          />
                          <Button
                            icon="pi pi-folder-open"
                            class="p-button-rounded p-button-success"
                            @click="staffSelect(searchUsers)"
                          />
                          <Button
                            icon="pi pi-trash"
                            class="p-button-rounded p-button-danger"
                            @click="deleteUser(searchUsers)"
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
      <FormKit
        v-model="role"
        type="radio"
        label="Role Status"
        :options="['Admin', 'User']"
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

    <rs-modal title="Add Staff" v-model="modalPOS" position="middle" size="md">
      <FormKit label="Fullname" type="text" v-model="fullname" />
      <FormKit label="Phone No." type="number" v-model="phone" />
      <FormKit label="Email" type="email" v-model="email" />
      <FormKit label="Password " type="password" v-model="password" />
      <FormKit
        label="Pin Code"
        help="for POS system login"
        type="number"
        v-model="pincode"
      />
      <FormKit label="Address" type="textarea" v-model="address" />
      <FormKit label="Date of Birth." type="date" v-model="dob" />
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
      <FormKit label="Outlet" type="text" v-model="this.searchUsers[0].outlet_name" readonly/>

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
        :options="this.staffPosition"
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
import Button from "primevue/button";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    RsModal,
    DataTable,
    Column,
    Button,
  },
  setup() {
    const users = ref([]);
    const search = ref("");
    const filterModal = ref(false);
    const role = ref("");
    const category = ref("");

    const searchUsers = computed(() => {
      return users.value.filter((user) => {
        return (
          user.user_name.toLowerCase().indexOf(search.value.toLowerCase()) !=
            -1 ||
          user.user_email.toLowerCase().indexOf(search.value.toLowerCase()) !=
            -1
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
    };

    return {
      search,
      searchUsers,
      users,
      filter,
      filters,
      filterModal,
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

      /* MODAL SHOW */
      modalDelete: false,
      modalPOS: false,
      modalEdit: false,
      selectStaff: false,
      users1: "",
      show: false,
      outletDrop: false,
      menuDrop: false,
      totalStaff: 0,
      outlet: 0,
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
        outletid: this.outlet,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/getStaff" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.staff_det.length; i++) {
              this.users.push({
                user_id: response.data.data.staff_det[i].user_id,
                user_name: response.data.data.staff_det[i].user_name,
                user_phone: response.data.data.staff_det[i].user_phone,
                user_email: response.data.data.staff_det[i].user_email,
                user_password: response.data.data.staff_det[i].user_password,
                user_no: response.data.data.staff_det[i].user_no,
                user_pincode: response.data.data.staff_det[i].user_pincode,
                user_address: response.data.data.staff_det[i].user_address,
                user_dob: response.data.data.staff_det[i].user_dob,
                user_position: response.data.data.staff_det[i].user_position,
                outlet_name: response.data.data.staff_det[i].outlet_name
              });
            }
            this.totalStaff = response.data.data.staff_sum[0].sums;
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
        position: this.position,
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertStaff",
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
  },
};
</script>
