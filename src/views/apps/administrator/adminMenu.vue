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
                          bg-gray-300
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
                        <span class="flex-1 ml-3 whitespace-nowrap"
                          >Membership</span
                        >
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
                        <span class="flex-1 ml-3 whitespace-nowrap">Staff</span>
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
                      </ul>
                    </div>
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
                        <span class="flex-1 ml-3 whitespace-nowrap"
                          >Outlet</span
                        >
                      </a>
                    </div>
                    <div v-if="this.outletDrop == true">
                      <ul>
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
                                >Counter Management</span
                              >
                            </a>
                          </router-link>
                        </li>
                      </ul>
                    </div>
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
                        <span class="flex-1 ml-3 whitespace-nowrap"
                          >Report</span
                        >
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
          <div class="w-full flex flex-row mb-1">
            <div class="inline-block w-1/2 pr-10 h-2/4">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Number of active Menu</strong>
                </div>
                <hr />
                <div class="text-center py-8">60 Active Menu</div>
              </rs-card>
            </div>
            <div class="inline-block w-1/2 pr-10 pb-2">
              <rs-card>
                <div class="text-center pt-10">
                  <strong>Number of Menu by Outlet</strong>
                </div>
                <hr />
                <div class="text-center py-8">43 Active Menu</div></rs-card
              >
            </div>
          </div>
          <div class="w-full" style="flex-direction: column">
            <!-- UNTUK ATAS BAWAH -->
            <div style="display: flex; flex-direction: row">
              <div class="w-11/12 h-10">
                <!-- <FormKit
                  v-model="search"
                  id="search-sticky"
                  placeholder="Search for Menu..."
                  type="search"
                  :classes="{
                    inner:
                      'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                    outer: 'flex-1 mb-0',
                    input: 'h-12',
                  }"
                /> -->
              </div>
              <div class="w-1/12" style="padding-top: 10px">
                <!-- <rs-button
                  @click="addMenu()"
                  class="bg-heandshe hover:bg-heandshe"
                  >Add Menu</rs-button
                > -->
              </div>
            </div>
            <div class="h-4/6">
              <div>
                <DataTable
                  :value="searchUsers"
                  :paginator="true"
                  :rows="10"
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  :rowsPerPageOptions="[10, 20, 50]"
                  responsiveLayout="scroll"
                  removableSort
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                >
                  <template #header>
                    <div class="flex justify-content-between">
                      <div class="w-11/12 h-10">
                        <FormKit
                          v-model="search"
                          id="search-sticky"
                          placeholder="Search for Menu..."
                          type="search"
                          :classes="{
                            inner:
                              'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                            outer: 'flex-1 mb-0',
                            input: 'h-12',
                          }"
                        />
                      </div>
                      <div class="w-1/12 h-12 mt-1">
                        <rs-button
                          @click="addMenu()"
                          class="bg-heandshe hover:bg-heandshe"
                          >Add Menu</rs-button
                        >
                      </div>
                    </div>
                  </template>
                  <Column field="name" header="Menu Name">
                    <template #body="searchUsers">
                      <div class="flex flex-row gap-y-px">
                        <div class="pr-10">
                          <img
                            :src="searchUsers.data.images[0].image1"
                            class="product-image"
                          />
                        </div>

                        <div class="mt-5">
                          {{ searchUsers.data.name }}
                        </div>
                      </div>
                    </template>
                  </Column>
                  <Column header="Category">
                    <template #body="searchUsers">
                      {{ searchUsers.data.category[0].category_name }}
                    </template>
                  </Column>
                  <Column field="price" header="Price ( RM )" :sortable="true">
                    <template #body="searchUsers">
                      {{ formatPrice(searchUsers.data.price) }}
                    </template>
                  </Column>
                  <Column
                    field="code"
                    header="Menu Code"
                    :sortable="true"
                  ></Column>
                  <Column :exportable="false" style="min-width: 8rem">
                    <template #body="searchUsers">
                      <Button
                        icon="pi pi-pencil"
                        class="p-button-rounded p-button-success mx-2"
                        @click="editMenu(searchUsers)"
                      />
                      <Button
                        icon="pi pi-folder-open"
                        class="p-button-rounded p-button-success mx-5"
                        @click="select(searchUsers)"
                      />
                      <!-- <Button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-warning mx-2"
                        @click="deleteUser(searchUsers)"
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

            <!-- UNTUK ATAS BAWAH -->
          </div>
        </div>
        <!-- UNTUK SEBELAH2 -->
      </div>
    </div>
    <rs-modal
      title="Add Menu"
      v-model="addMenuModal"
      position="middle"
      size="md"
    >
      <FormKit type="text" label="Menu Name" v-model="menu_name" />
      <FormKit
        type="file"
        label="Images"
        v-model="menu_images"
        accept=".jpg, .png, .jpeg"
      />
      <FormKit type="number" label="Menu Price ( RM )" v-model="menu_price" />
      <FormKit
        type="select"
        label="Menu Stations"
        v-model="menu_station"
        :options="[
          { label: 'Kitchen', value: 1 },
          { label: 'Beverages', value: 2 },
          { label: 'Bakery', value: 3 },
        ]"
      />
      <FormKit
        type="select"
        label="Category"
        name="categories"
        v-model="category"
        :options="this.categories"
      />
      <FormKit v-model="value" type="checkbox" label="Variants?" />
      <rs-button style="float: right" @click="nextPage()"> Save </rs-button>
    </rs-modal>

    <rs-modal
      title="Add Variant"
      v-model="addVariantModal"
      position="middle"
      size="md"
    >
      <div v-for="(input, k) in variants" :key="k">
        <table class="table-fixed border-2 mb-2">
          <tbody>
            <td>
              <FormKit type="text" label="Variants Type" v-model="input.type" />
            </td>
            <td>
              <Button
                icon="pi pi-minus"
                class="p-button-rounded p-button-danger mx-2"
                @click="remove(k)"
                v-show="k || (!k && variants.length > 1)"
              />
            </td>
            <td>
              <Button
                icon="pi pi-plus"
                class="p-button-rounded p-button-success mx-5"
                @click="add(k)"
                v-show="k == variants.length - 1"
              />
            </td>
          </tbody>
          <tr>
            <div v-for="(inputs, l) in input.data" :key="l">
              <tbody>
                <tr>
                  <td>
                    <FormKit type="text" v-model="inputs.id" hidden />
                  </td>
                  <td>
                    <FormKit
                      type="text"
                      label="Variant Name"
                      v-model="inputs.name"
                    />
                  </td>
                  <td>
                    <FormKit
                      type="number"
                      label="Price Added To Base Price"
                      v-model="inputs.price"
                    />
                  </td>
                  <td>
                    <Button
                      icon="pi pi-minus"
                      class="p-button-rounded p-button-danger mx-2"
                      @click="removeL(k)"
                      v-show="l || (!l && input.data.length > 1)"
                    />
                  </td>
                  <td>
                    <Button
                      icon="pi pi-plus"
                      class="p-button-rounded p-button-success mx-5"
                      @click="addL(k)"
                      v-show="l == input.data.length - 1"
                    />
                  </td>
                </tr>
              </tbody>
            </div>
          </tr>
        </table>
      </div>

      <rs-button style="float: right" @click="insert()"> Save </rs-button>
    </rs-modal>

    <rs-modal
      title="Edit Menu"
      v-model="editMenuModal"
      position="middle"
      size="full"
    >
      <FormKit type="text" label="Menu Name" v-model="menuedit.name" />
      <FormKit
        type="number"
        label="Menu Price ( RM )"
        v-model="menuedit.price"
      />
      <rs-button style="float: right" @click="edit(menuedit)"> Save </rs-button>
    </rs-modal>

    <rs-modal
      title="Menu"
      v-model="showMenuModal"
      position="middle"
      size="full"
    >
      <FormKit type="text" label="Menu Name" v-model="menuedit.name" readonly />
      <FormKit
        type="number"
        label="Menu Price ( RM )"
        v-model="menuedit.price"
        readonly
      />
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
    const categories = ref([]);

    const searchUsers = computed(() => {
      return users.value.filter((user) => {
        return (
          user.name.toLowerCase().indexOf(search.value.toLowerCase()) != -1 ||
          user.code.toLowerCase().indexOf(search.value.toLowerCase()) != -1
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
      categories,
      searchUsers,
      users,
      formatPrice,
    };
  },
  data() {
    return {
      staffPosition: [],
      menuedit: "",
      /* DATA V-MODEL */
      staffid: "",
      staffName: "",
      valueCategory: [],
      variansi: [],
      /* FORM V-MODAL */
      menu_name: "",
      menu_images: "",
      menu_price: "",
      menu_station: "",
      category: "",
      counter: 1,
      value: false,
      /* TEST VARIANT PUNYA */
      variants: [
        {
          type: "",
          data: [
            {
              id: 1,
              name: "",
              price: "",
            },
          ],
        },
      ],

      /* MODAL SHOW */
      showMenuModal: false,
      addMenuModal: false,
      addVariantModal: false,
      editMenuModal: false,
      users1: "",
      show: false,
      outletDrop: false,
      menuDrop: false,
    };
  },
  async created() {
    this.getdata();
    this.getMenu();
    this.getCategories();
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
    async select(event) {
      this.menuedit = event.data;
      if (this.showMenuModal == false) {
        this.showMenuModal = true;
      } else {
        this.showMenuModal = false;
      }
    },

    async setAltImg(event) {
      event.target.src =
        "https://s3.ap-southeast-1.amazonaws.com/cdn.toyyibfnb.com/images/food.png";
    },

    async getCategories() {
      var axios = require("axios");
      var config = {
        method: "get",
        url:
          process.env.VUE_APP_FNB_URL +
          "/tbl/getCategory" /*  http://localhost:3000tbl/getCategory*/,
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.valueCategory.push({
                category_id: response.data.data[i].category_id,
                category_name: response.data.data[i].category_name,
              });
              this.categories.push({
                label: response.data.data[i].category_name,
                value: this.valueCategory,
              });
              this.valueCategory = [];
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
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getMenu() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL + "/admin/getMenu" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              /* VARIATION */
              var variant = JSON.parse(response.data.data[i].menu_variant);
              if (variant == null) {
                this.variansi = "";
              } else {
                for (let j = 0; j < variant.length; j++) {
                  this.variansi.push({
                    label: variant[j].data,
                  });
                }
              }
              /* VARIATION */
              var images = response.data.data[i].menu_image;
              if (images == null) {
                images = [
                  {
                    image1:
                      "https://s3.ap-southeast-1.amazonaws.com/cdn.toyyibfnb.com/images/food.png",
                  },
                ];
              } else {
                images = [
                  {
                    image1: JSON.parse(response.data.data[i].menu_image),
                  },
                ];
              }
              this.users.push({
                menuid: response.data.data[i].menu_id,
                name: response.data.data[i].menu_name,
                price: response.data.data[i].menu_price,
                code: response.data.data[i].menu_code,
                category: JSON.parse(response.data.data[i].menu_category),
                variants: this.variansi,
                images: images[0].image1,
              });
              this.variansi = [];
            }
            console.log(this.users);
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    /* FOR FUNCTIONAL REASONS */
    async addMenu() {
      if (this.addMenuModal == false) {
        this.addMenuModal = true;
      } else {
        this.addMenuModal = false;
      }
    },
    add(index) {
      console.log(index);
      this.variants.push({
        type: "",
        data: [
          {
            id: "",
            name: "",
            price: "",
          },
        ],
      });
    },
    remove(index) {
      this.variants.splice(index, 1);
    },
    addL(index) {
      this.counter++;
      console.log("ADD", index);
      this.variants[index].data.push({
        id: this.counter,
        name: "",
        price: "",
      });
    },
    removeL(index) {
      this.counter--;
      console.log("REMOVE", index);
      this.variants[index].data.splice(index, 1);
    },
    async nextPage() {
      if (this.value == true) {
        if (this.addVariantModal == false) {
          this.addVariantModal = true;
          this.addMenuModal = false;
        } else {
          this.addVariantModal = false;
        }
      } else {
        this.insert();
      }
    },
    async editMenu(menu) {
      if (this.editMenuModal == false) {
        this.menuedit = menu.data;
        this.editMenuModal = true;
      } else {
        this.editMenuModal = false;
      }
    },
    async insert() {
      var axios = require("axios");
      var data = null;
      if (this.value == false) {
        data = JSON.stringify({
          menu_name: this.menu_name,
          menu_image: this.menu_images,
          menu_price: this.menu_price,
          menu_station: this.menu_station,
          menu_category: this.category,
          menu_variant: null,
        });
      } else {
        data = JSON.stringify({
          menu_name: this.menu_name,
          menu_image: this.menu_images,
          menu_price: this.menu_price,
          menu_station: this.menu_station,
          menu_category: this.category,
          menu_variant: this.variants,
        });
      }
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertMenu",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            alert(response.data.message);
            this.addVariantModal = false;
            this.addMenuModal = false;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    async edit(menuedit) {
      var axios = require("axios");
      var data = JSON.stringify({
        menu_name: menuedit.name,
        menu_price: menuedit.price,
        menu_id: menuedit.menuid,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/updateMenu" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            alert(response.message);
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-image {
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>    