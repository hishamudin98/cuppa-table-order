<template>
  <rs-layout>
    
    <div class="w-full flex flex-col">
      <div style="display: flex; flex-direction: row">
        <!-- UNTUK SEBELAH2 -->
        
        <div class="w-full flex flex-col">
          
          <div class="w-full" style="flex-direction: column">
            <!-- UNTUK ATAS BAWAH -->
            <div style="display: flex; flex-direction: row">
             
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
                      <div
                        v-if="this.staff_role != 3 || this.staff_category != 3"
                        class="w-1/12 h-12 mt-1"
                      >
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
                  <Column field="code" header="Raw Materials">
                    <template #body="searchUsers">
                      <router-link
                        :to="{
                          name: 'admin-menu-rawmaterial',
                          params: { menuid: searchUsers.data.menuid },
                        }"
                      >
                        <Button
                          icon="pi pi-box"
                          class="p-button-rounded p-button-info mx-5"
                        />
                      </router-link>
                    </template>
                  </Column>
                  <Column
                    :exportable="false"
                    style="min-width: 8rem"
                    header="Actions"
                  >
                    <template #body="searchUsers">
                      <Button
                        icon="pi pi-pencil"
                        class="p-button-rounded p-button-success mx-2"
                        @click="editMenu(searchUsers)"
                      />
                      <router-link
                        :to="{
                          name: 'admin-menu-outlet',
                          params: { menuid: searchUsers.data.menuid },
                        }"
                      >
                        <Button
                          icon="pi pi-building"
                          class="p-button-rounded p-button-success mx-5"
                        />
                      </router-link>

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
      <!-- <FormKit
        type="select"
        label="Category"
        name="categories"
        v-model="category"
        :options="this.categories"
      /> -->
      <label><strong>Menu Category</strong></label>
      <!-- <vue-taggable-select v-model="category1" :options="this.categories" placeholder="Select Category">
      </vue-taggable-select> -->
      <Multiselect
        v-model="fruit"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="true"
        :options="this.categories"
      />

      

      <br />
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
      size="md"
    >
      <FormKit type="text" label="Menu Name" v-model="menuedit.name" />
      <FormKit
        type="number"
        label="Menu Price ( RM )"
        v-model="menuedit.price"
      />
      <rs-button style="float: right" @click="edit(menuedit)"> Save </rs-button>
    </rs-modal>

    <rs-modal title="Menu" v-model="showMenuModal" position="middle" size="md">
      <label><strong>Menu Name</strong></label>
      <p>{{ menuedit.name }}</p>
      <br />
      <label><strong>Menu Base Price (RM)</strong></label>
      <p>{{ formatPrice(menuedit.price) }}</p>
      <br />
      <label><strong>Outlet Available</strong></label>
      <vue-taggable-select
        v-model="outlet"
        :options="this.outlets"
      ></vue-taggable-select>
      <br />
      <FormKit
        type="number"
        label="Menu Price By Outlet ( RM )"
        v-model="menu_price"
      />
      <rs-button style="float: right" @click="showMenuModal = false">
        Save
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
import VueTaggableSelect from "vue-taggable-select";
import Multiselect from "@vueform/multiselect";

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    RsModal,
    DataTable,
    Column,
    Button,
    VueTaggableSelect,
    Multiselect,
  },
  setup() {
    const users = ref([]);
    const search = ref("");
    const categories = ref([]);
    const outlets = ref([]);

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
      outlets,
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
      staff_category: 0,
      staff_role: 0,
      valueCategory: [],
      valueOutlet: [],
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
      file: "",
      fruit: null,
    };
  },
  async created() {
    this.getdata();
    this.getMenu();
    this.getCategories();
    this.getOutlet();
  },
  methods: {
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

    async getOutlet() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/getOutlet",
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.valueOutlet.push({
                outlet_id: response.data.data[i].outlet_id,
                outlet_name: response.data.data[i].outlet_name,
              });
              this.outlets.push(
                /* {
                label:  */ response.data.data[i].outlet_name
                /* value: this.valueOutlet, */
                /* } */
              );
              this.valueOutlet = [];
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
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
              this.categories.push(
                /* label:  */ response.data.data[i].category_name
                /*  value: this.valueCategory, */
              );
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
            this.staff_category = response.data.data[0].category;
            this.staff_role = response.data.data[0].role;
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

      if (this.menu_images != "") {
        this.file = this.menu_images[0].file;
      } else {
        this.file = null;
      }
      if (this.value == false) {
        data = JSON.stringify({
          menu_name: this.menu_name,
          menu_image: this.file,
          menu_price: this.menu_price,
          menu_station: this.menu_station,
          /* menu_category: this.category, */
          menu_variant: null,
        });
      } else {
        data = JSON.stringify({
          menu_name: this.menu_name,
          menu_image: this.file,
          menu_price: this.menu_price,
          menu_station: this.menu_station,
          /* menu_category: this.category, */
          menu_variant: this.variants,
        });
      }

      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL + "/admin/insertMenu",
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
            alert(response.data.message);
            this.editMenuModal = false;
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
<style src="@vueform/multiselect/themes/default.css"></style>