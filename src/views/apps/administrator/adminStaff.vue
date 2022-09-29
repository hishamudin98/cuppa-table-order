<template>
  <rs-layout>
    <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <div class="welcome text-lg font-semibold text-white"></div>
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
          <div class="w-64">
            <aside aria-label="Sidebar">
              <div class="h-full py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                <ul class="space-y-2">
                  <li>
                    <router-link :to="{ name: 'dashboard' }">
                      <a
                        href="#"
                        class="
                          flex
                          items-center
                          p-2
                          text-base
                          font-normal
                          text-gray-900
                          rounded-lg
                          dark:text-white
                          hover:bg-gray-300
                          dark:hover:bg-gray-700
                        "
                      >
                        <span class="ml-3">Dashboard</span>
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'admin-user' }">
                      <a
                        href="#"
                        class="
                          flex
                          items-center
                          p-2
                          text-base
                          font-normal
                          text-gray-900
                          rounded-lg
                          dark:text-white
                          hover:bg-gray-300
                          dark:hover:bg-gray-700
                        "
                      >
                        <span class="flex-1 ml-3 whitespace-nowrap">User</span>
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-2
                        text-base
                        font-normal
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap">Staff</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-2
                        text-base
                        font-normal
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap">Menu</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-2
                        text-base
                        font-normal
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap"
                        >Membership</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-2
                        text-base
                        font-normal
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap">Outlet</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-2
                        text-base
                        font-normal
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap">Counter</span>
                    </a>
                  </li>
                  <li>
                    <router-link :to="{ name: 'login' }">
                      <a
                        href="#"
                        class="
                          flex
                          items-center
                          p-2
                          text-base
                          font-normal
                          text-gray-900
                          rounded-lg
                          dark:text-white
                          hover:bg-gray-300
                          dark:hover:bg-gray-700
                        "
                      >
                        <span class="flex-1 ml-3 whitespace-nowrap"
                          >Log Out</span
                        >
                      </a>
                    </router-link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
        <div class="w-full flex flex-col">
          <div class="w-full flex flex-row mb-64">
            <div class="inline-block w-1/2 pr-10 h-2/4">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Number of active staff</strong>
                </div>
                <hr />
                <div class="text-center py-8">64 Active Users</div>
              </rs-card>
            </div>
            <div class="inline-block w-1/2 pr-10 pb-2">
              <rs-card>
                <div class="text-center pt-10">
                  <strong>Number of staff by Outlet</strong>
                </div>
                <hr />
                <div class="text-center py-8">10 Active Users</div></rs-card
              >
            </div>
          </div>
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
              <div class="w-1/12" style="padding-top: 10px">
                <rs-button
                  @click="addUser()"
                  class="bg-heandshe hover:bg-heandshe"
                  >Add Staff</rs-button
                >
              </div>
            </div>
            <div class="h-4/6">
              <rs-card style="padding-top: 10px">
                <div class="overflow-y-auto h-96">
                  <div v-for="(user, index) in searchUsers" :key="index">
                    <rs-card class="mb-5" @click="staffSelect(user)">
                      <div
                        class="
                          product-content-wrapper
                          flex-1 flex flex-col
                          px-4
                          mb-4
                        "
                      >
                        <div class="product-title mt-4">
                          <span
                            class="block text-base font-semibold line-clamp-2"
                            >{{ user.user_name }}
                          </span>
                        </div>
                        <div class="product-content flex flex-col">
                          <div
                            class="
                              product-price
                              flex
                              justify-between
                              items-center
                            "
                          >
                            <div class="truncate">
                              <div class="text-sm text-black-500">
                                {{ user.user_email }}
                              </div>
                              <div class="text-sm text-black-500">
                                {{ user.user_phone }}
                              </div>
                            </div>
                            <div style="padding-bottom: 2%">
                              <rs-button
                                class="
                                  w-full
                                  bg-heandshe
                                  hover:bg-heandshe
                                  mb-0.5
                                "
                                @click="editUser(user)"
                              >
                                Edit
                              </rs-button>
                              <rs-button
                                variant="primary-outline"
                                class="w-full h-10"
                                @click="deleteUser(user)"
                              >
                                Delete
                              </rs-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </rs-card>
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

    <rs-modal title="Staff" v-model="selectStaff" position="middle" size="full">
      <FormKit
        label="Fullname"
        type="text"
        :value="users1.user_name"
        readonly
      />
      <FormKit
        label="Phone No."
        type="number"
        :value="users1.user_phone"
        readonly
      />
      <FormKit label="Email" type="email" :value="users1.user_email" readonly />
      <FormKit
        label="Password No."
        type="text"
        :value="users1.user_password"
        readonly
      />
      <FormKit
        label="Pin Code"
        help="for POS system login"
        type="number"
        :value="users1.user_pincode"
        readonly
      />
      <FormKit
        label="Address"
        type="textarea"
        :value="users1.user_address"
        readonly
      />
      <FormKit
        label="Date of Birth."
        type="text"
        :value="users1.dob"
        readonly
      />
      <FormKit
        label="Position"
        type="text"
        :value="users1.user_position"
        readonly
      /> </rs-modal
    ><!-- SELECT -->

    <rs-modal
      title="Add Staff"
      v-model="modalPOS"
      position="middle"
      size="full"
    >
      <FormKit label="Fullname" type="text" v-model="fullname" />
      <FormKit label="Phone No." type="number" v-model="phone" />
      <FormKit label="Email" type="email" v-model="email" />
      <FormKit label="Password No." type="password" v-model="password" />
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
        :options="staffPosition"
        v-model="position"
      />
      <rs-button style="float: right" @click="insertUser()">
        Save
      </rs-button> </rs-modal
    ><!-- INSERT -->
    <rs-modal
      title="Edit Staff"
      v-model="modalEdit"
      position="middle"
      size="full"
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
      <FormKit label="Address" type="textarea" v-model="address" />
      <FormKit label="Date of Birth." type="date" v-model="users1.user_dob" />
      <FormKit
        type="select"
        label="Staff Position"
        :options="staffPosition"
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
      size="full"
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
      </rs-button> </rs-modal
    ><!-- DELETE -->
  </rs-layout>
</template>
<script>
import { ref, computed } from "vue";
import RsButton from "@/components/Button.vue";
import RsModal from "@/components/Modal.vue";
export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    RsModal,
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
      staffPosition: [],
      /* DATA V-MODEL */
      staffid: "",
      staffName: "",

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
    };
  },
  async created() {
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
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/getPosition" /*  */,
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
            console.log(this.staffPosition);
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
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/dashboard" /*  */,
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
      var data = JSON.stringify({
        staffid: localStorage.staff,
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
            for (let i = 0; i < response.data.data.length; i++) {
              this.users.push({
                user_id: response.data.data[i].user_id,
                user_name: response.data.data[i].user_name,
                user_phone: response.data.data[i].user_phone,
                user_email: response.data.data[i].user_email,
                user_password: response.data.data[i].user_password,
                user_no: response.data.data[i].user_no,
                user_pincode: response.data.data[i].user_pincode,
                user_address: response.data.data[i].user_address,
                user_dob: response.data.data[i].user_dob,
                user_position: response.data.data[i].user_position,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async editUser(user) {
      this.users1 = user;
      this.modalEdit = true;
    },

    async deleteUser(user) {
      this.users1 = user;
      this.modalDelete = true;
    },

    async UserDelete(users) {
      var axios = require("axios");
      var data = JSON.stringify({
        user_id: users.user_id,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/deleteStaff" /*  */,
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
        password: this.password,
        pincode: this.pincode,
        dob: this.dob,
        position: this.position,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/updateStaff" /*  */,
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
        password: this.password,
        pincode: this.pincode,
        dob: this.dob,
        position: this.position,
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/insertStaff",
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
