<template>
  <rs-layout>
    <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <div class="welcome text-lg font-semibold text-white">
            Membership Management
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
          <div class="w-full flex flex-row mb-1">
            <div class="inline-block w-1/2 pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Number of active users</strong>
                </div>
                <hr />
                <div class="text-center py-8">64 Active Users</div>
              </rs-card>
            </div>
            <div class="inline-block w-1/2 pr-10 pb-2">
              <rs-card>
                <div class="text-center pt-10">
                  <strong>Number of users by Outlet</strong>
                </div>
                <hr />
                <div class="text-center py-8">10 Active Users</div></rs-card
              >
            </div>
          </div>
          <div class="w-full" style="flex-direction: column">
            <!-- UNTUK ATAS BAWAH -->
            <div style="display: flex; flex-direction: row">
              <div class="w-11/12 h-1">
                <FormKit
                  v-model="search"
                  id="search-sticky"
                  placeholder="Search for a user..."
                  type="search"
                  :classes="{
                    inner:
                      'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                    outer: 'flex-1 mb-0',
                    input: 'h-12',
                  }"
                />
              </div>
              <div class="w-1/12" style="padding-top: 10px">
                <rs-button
                  @click="addUser()"
                  class="bg-heandshe hover:bg-heandshe"
                  >Add User</rs-button
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
                       <Column field="" header="Membership Points"></Column>
                      <Column :exportable="false" style="min-width: 8rem">
                        <template #body="searchUsers">
                          <Button
                            icon="pi pi-pencil"
                            class="p-button-rounded p-button-success mr-2"
                            @click="editUser(searchUsers)"
                          />
                          <Button
                            icon="pi pi-trash"
                            class="p-button-rounded p-button-warning"
                            @click="deleteUser(searchUsers)"
                          />
                          <router-link :to="{ name: 'admin-order' }">
                          <Button
                            icon="pi pi-folder-open"
                            class="p-button-rounded p-button-success"
                          />
                          </router-link>
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

    <rs-modal title="Add User" v-model="modalPOS" position="middle" size="md">
      <FormKit label="Fullname" type="text" v-model="fullname" />
      <FormKit label="Phone No." type="number" v-model="phone" />
      <FormKit label="Email" type="email" v-model="email" />
      <FormKit label="Address" type="textarea" v-model="address" />
      <rs-button style="float: right" @click="insertUser()"> Save </rs-button>
    </rs-modal>
    <rs-modal
      title="Edit User"
      v-model="modalEdit"
      position="middle"
      size="md"
    >
      <FormKit label="Fullname" type="text" v-model="users1.user_name" />
      <FormKit label="Phone No." type="number" v-model="users1.user_phone" />
      <FormKit label="Email" type="email" v-model="users1.user_email" />
      <FormKit label="Address" type="textarea" v-model="address" />
      <rs-button style="float: right" @click="updateUser(users1)">
        Save
      </rs-button>
    </rs-modal>
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
        @click="UserDelete(users1)"
      >
        Yes
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
import Menu from "@/views/apps/administrator/adminSidemenu.vue";

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    RsModal,
    DataTable,
    Column,
    Button,
     'arbitrary': Menu,
  },
  setup() {
    const users = ref([]);
    const search = ref("");

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
    return {
      search,
      searchUsers,
      users,
    };
  },
  data() {
    return {
      staffid: "",
      staffName: "",
      modalPOS: false,
      fullname: "",
      phone: null,
      email: "",
      address: "",
      modalEdit: false,
      users1: "",
      modalDelete: false,
      totalData: 0,
      show: false,
      outletDrop: false,
      menuDrop: false,
      /* BARU */
    };
  },
  async created() {
    this.staffid = localStorage.staff;
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("staff", this.staffid);
    });
    this.getdata();
    this.getuser();
  },

  methods: {
    async dropdownMenu() {
      if (this.menuDrop == false) {
        this.menuDrop = true;
      } else {
        this.menuDrop = false;
      }
    },
    async dropdownOutlet() {
      if (this.outletDrop == false) {
        this.outletDrop = true;
      } else {
        this.outletDrop = false;
      }
    },
    async triggerDropdown() {
      if (this.show == false) {
        this.show = true;
      } else {
        this.show = false;
      }
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
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getuser() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/admin/getUser" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(config);
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.users.push({
                user_id: response.data.data[i].user_id,
                user_name: response.data.data[i].user_name,
                user_phone: response.data.data[i].user_phone,
                user_email: response.data.data[i].user_email,
              });
            }

            this.totalData = this.users.length;
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
      this.users1 = user.data;
      this.modalDelete = true;
    },

    async UserDelete(users) {
      var axios = require("axios");
      var data = JSON.stringify({
        user_id: users.user_id,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/deleteUser" /*  */,
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
        address: this.address,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/updateUser" /*  */,
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
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertUser",
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
