<template>
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
                @click="dropdownOutlet()"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Outlet</span>
              </a>
            </div>
            <div v-if="this.outletDrop == true">
              <ul>
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
          <li>
            <router-link :to="{ name: 'order' }">
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
                <span class="flex-1 ml-3 whitespace-nowrap">Membership</span>
              </a>
            </router-link>
          </li>
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
                <span class="ml-3">Raw Material</span>
              </a>
            </router-link>
          </li>

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
                <span class="flex-1 ml-3 whitespace-nowrap">Supplier</span>
              </a>
            </router-link>
          </li>

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
    };
  },
  async created() {},

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
  },
};
</script>