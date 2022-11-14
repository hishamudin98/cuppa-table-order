<template>
  <div class="w-64">
    <aside aria-label="Sidebar">
      <div class="h-full py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul class="space-y-2">
          <!-- DASHBOARD -->
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
                  focus:bg-gray-300
                  text-gray-900
                  rounded-lg
                  dark:text-white
                  hover:bg-gray-300
                "
              >
                <span class="ml-3">Dashboard</span>
              </a>
            </router-link>
          </li>
          <!-- OUTLET -->
          <li v-if="this.staff_role != 3 || this.staff_category != 3">
            <div>
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
                @click="dropdownOutlet()"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Outlet</span>
              </a>
            </div>
            <div v-if="this.outletDrop == true">
              <ul>
                <li>
                  <router-link :to="{ name: 'admin-outlet' }">
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Outlet Management</span
                      >
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'admin-table' }">
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Table Management</span
                      >
                    </a>
                  </router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'admin-table' }">
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Station Management</span
                      >
                    </a>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- ORDER -->
          <li>
            <router-link :to="{ name: 'admin-order' }">
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
                <span class="ml-3">Order</span>
              </a>
            </router-link>
          </li>
          <!-- MENU -->
          <li>
            <div>
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
                @click="dropdownMenu()"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Menu</span>
              </a>
            </div>
            <div v-if="this.menuDrop == true">
              <ul>
                <li>
                  <router-link :to="{ name: 'admin-menu' }">
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Menu Management</span
                      >
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'admin-menu' }">
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Category Management</span
                      >
                    </a>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- USER -->
          <li>
            <router-link :to="{ name: 'admin-staff' }">
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
          <!-- MEMBERSHIP -->
          <li v-if="this.staff_role != 3 || this.staff_category != 3" >
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
                <span class="flex-1 ml-3 whitespace-nowrap">Membership</span>
              </a>
            </router-link>
          </li>
          <!-- RAW MATERIAL -->
          <li v-if="this.staff_category == 2">
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
                <span class="ml-3">Raw Material</span>
              </a>
            </router-link>
          </li>
          <!-- SUPPLIER -->
          <li v-if="this.staff_category == 2">
            <router-link :to="{ name: 'admin-staff' }">
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
                <span class="flex-1 ml-3 whitespace-nowrap">Supplier</span>
              </a>
            </router-link>
          </li>
          <!-- REPORTS -->
          <li>
            <div>
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
                @click="triggerDropdown()"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Report</span>
              </a>
            </div>
            <div v-if="this.show == true">
              <ul>
                <li>
                  <router-link :to="{ name: 'admin-report-t' }">
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Report Transaction</span
                      >
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'admin-report-s' }">
                    <a
                      href="#"
                      class="
                        flex
                        items-center
                        p-3
                        ml-2
                        text-sm
                        font-sm
                        text-gray-900
                        rounded-lg
                        dark:text-white
                        hover:bg-gray-300
                        dark:hover:bg-gray-700
                      "
                      ><span class="flex-1 ml-3 whitespace-nowrap"
                        >Report Shift</span
                      >
                    </a>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- LOGOUT -->
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
                <span class="flex-1 ml-3 whitespace-nowrap">Log Out</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      outletDrop: false,
      menuDrop: false,
      staff_category:0,
      staff_role:0,
    };
  },
  async created() {
    this.getdata();
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
            this.staff_category = response.data.data[0].category;
            this.staff_role = response.data.data[0].role
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>