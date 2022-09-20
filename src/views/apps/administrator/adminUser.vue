<template>
  <rs-layout>
    <div style="height: 10vh" class="bg-primary-400 after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <div class="welcome text-lg font-semibold text-white"></div>
        </div>

        <div class="flex gap-x-2 items-center">
          <div class="text-white">{{ this.staffName }}</div>
          <div class="bg-black h-10 w-10 p-1 rounded-full">
            <img
              class="flex-1"
              src="@/assets/images/logo/logo-white.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
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
                        hover:bg-primary-200
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
                        hover:bg-primary-200
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
                      hover:bg-primary-200
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
                      hover:bg-primary-200
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
                      hover:bg-primary-200
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
                      hover:bg-primary-200
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
                      hover:bg-primary-200
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
                        hover:bg-primary-200
                        dark:hover:bg-gray-700
                      "
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap">Log Out</span>
                    </a>
                  </router-link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <div class="w-full" style="flex-direction: column">
        <!-- UNTUK ATAS BAWAH -->
        <div style="display: flex; flex-direction: row">
          <div class="w-11/12 h-10">
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
          <div class="w-1/12" style="padding-top:10px">
            <rs-button @click="addUser()">Add User</rs-button>
          </div>
        </div>
        <div class="h-4/6">
          <rs-card style="padding-top: 10px">
            <div class="overflow-y-auto h-96">
              <div v-for="(user, index) in searchUsers" :key="index">
                <rs-card class="mb-5">
                  <div
                    class="
                      product-content-wrapper
                      flex-1 flex flex-col
                      px-4
                      mb-4
                    "
                  >
                    <div class="product-title mt-4">
                      <span class="block text-base font-semibold line-clamp-2"
                        >{{ user.user_name }}
                      </span>
                    </div>
                    <div class="product-content flex flex-col">
                      <div
                        class="product-price flex justify-between items-center"
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
                          <rs-button variant="primary" class="w-full">
                            Edit
                          </rs-button>
                          <rs-button
                            variant="primary-outline"
                            class="w-full h-10"
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
      <!-- UNTUK SEBELAH2 -->
    </div>

    <rs-modal
      title="Add User"
      v-model="modalPOS"
      position="middle"
      size="full"
    >
       <FormKit
    label="Fullname"
    type="text"
    v-model="fullname"
  />
  <FormKit
    label="Phone No."
    type="number"
    v-model="phone"
  />
  <FormKit
    label="Email"
    type="email"
    v-model="email"
  />
  <FormKit
    label="Address"
    type="textarea"
    v-model="address"
  />
  <rs-button style="float:right;" @click="insertUser()"> Save </rs-button>
    </rs-modal>
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
      staffid: "",
      staffName: "",
      modalPOS: false,
      fullname:"",
      phone:null,
      email:"",
      address:"",
    };
  },
  async created() {
    this.getdata();
    this.getuser();
  },
  methods: {
    async getdata() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/admin/dashboard" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log(response.data.data);
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
        url: "http://localhost:3000/admin/getUser" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.users.push({
                user_name: response.data.data[i].user_name,
                user_phone: response.data.data[i].user_phone,
                user_email: response.data.data[i].user_email,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async addUser()
    {
      this.modalPOS = true;
    },

    async insertUser(){
      var axios = require("axios");
      var data = JSON.stringify({
        fullname:this.fullname,
        phone:this.phone,
        email:this.email,
        address:this.address,
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/admin/insertUser",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if(response.data.status == "Success")
            {
              this.modalPOS = false;
              alert(response.data.message)
              this.users.splice(0);
              this.getuser();
            }
            else
            {
              alert(response.data.message)
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};
</script>
