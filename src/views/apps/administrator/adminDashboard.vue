<template>
  <rs-layout>
    <div style="height: 10vh" class="bg-primary-400 after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <div class="welcome text-lg font-semibold text-white"></div>
        </div>

        <div class="flex gap-x-2 items-center">
          <div class="text-white">{{this.staffName}}</div>
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
    <div style="float: left">
      <aside class="w-64" aria-label="Sidebar">
        <div
          class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800"
        >
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
                <span class="flex-1 ml-3 whitespace-nowrap">Membership</span>
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
    <div>
      <rs-card
        class="
          p-4
          rounded-none
          md:rounded-lg
          max-h-screen
          md:max-h-fit
          overflow-auto
          h-screen
          md:h-auto
        "
      >
        Test Graph kot
      </rs-card>
    </div>
  </rs-layout>
</template>
<script>
export default {
  name: "AdminDashboard",
  components: {},
  setup() {},
  data() {
    return {
      staffid: "",
      staffName: "",
    };
  },
  async created() {
    if(this.$route.params.staffid != null)
    {
    this.staffid = this.$route.params.staffid;
    localStorage.staff = this.staffid;
    }
    this.getdata();
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
            this.staffName = response.data.data[0].staff_name
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
