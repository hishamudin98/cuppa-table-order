<template>
  <rs-layout>

    <div class="w-full flex flex-col">
      <div style="display: flex; flex-direction: row">
        <!-- UNTUK SEBELAH2 -->

        <div class="w-full h-1/4 flex flex-col">
          <div class="w-full flex flex-row mb-1">
            <!-- <div class="inline-block w-full pr-10">
              <rs-card>
                <div class="text-center pt-10 pb-2">
                  <strong>Number of active tables</strong>
                </div>
                <hr />
                <div class="text-center py-8">4 Active tables</div>
              </rs-card>
            </div> -->
          </div>
          <div class="w-full" style="flex-direction: column">
            <!-- UNTUK ATAS BAWAH -->
            <div style="display: flex; flex-direction: row">
              <div class="w-11/12 h-10">
                <FormKit v-model="search" id="search-sticky" placeholder="Search for a table..." type="search" :classes="{
                  inner:
                    'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                  outer: 'flex-1 mb-0',
                  input: 'h-12',
                }" />
              </div>
              <div class="w-1/12" style="padding-top: 10px">
                <rs-button @click="addTable()" class="bg-heandshe hover:bg-heandshe">Add Table</rs-button>
              </div>
            </div>
            <div class="h-4/6">
              <div>
                <DataTable :value="searchTables" :paginator="true" :rows="10"
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                  <!-- <Column field="outletTID" header="No"></Column> -->
                  <Column field="outletTNAME" header=" Name"></Column>
                  <Column field="outletTSTATUS" header=" Status">
                    <template #body="searchTables">

                      <rs-badges variant="success" v-if="searchTables.data.outletTSTATUS === '1'"
                        @click="clickBtnStatus()">
                        Active</rs-badges>

                      <rs-badges variant="danger" v-if="searchTables.data.outletTSTATUS === '0'"
                        @click="clickBtnStatus()">
                        Inactive</rs-badges>
                    </template>
                  </Column>
                  <Column field="outletTTYPE" header=" Type"></Column>
                  <Column :exportable="false" style="min-width: 8rem" header="Actions">
                    <template #body="searchTables">
                      <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                        @click="editTable(searchTables)" /> {{ " " }}
                      <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                        @click="deleteTable(searchTables)" /> {{ " " }}
                      <Button icon="pi pi-qrcode" class="p-button-rounded p-button-success"
                        @click="print(searchTables)" />
                    </template>
                  </Column>
                  <template #paginatorstart>
                    <Button type="button" icon="pi pi-refresh" class="p-button-text" />
                  </template>
                  <template #paginatorend>
                    <Button type="button" icon="pi pi-cloud" class="p-button-text" />
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
    <!-- QR CODE -->
    <rs-modal title="QR CODE" v-model="qrcode" position="middle" size="md">
      <div class="mb-10">
        <center>
          <h1>{{ this.printName }}</h1>
          <br />
          <qrcode-vue :value="this.value" :size="size" level="L" />
        </center>
      </div>
      <div>
        <vue3-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
          :paginate-elements-by-height="1400" :filename=this.printName :pdf-quality="2" :manual-pagination="false"
          pdf-format="a4" pdf-orientation="portrait" pdf-content-width="800px"
          @hasStartedGeneration="hasStartedGeneration()" @hasGenerated="hasGenerated($event)" ref="html2Pdf">
          <template v-slot:pdf-content>
            <center>
              <h1>{{ this.printName }}</h1>
              <br />
              <qrcode-vue :value="this.value" :size="size" level="L" />
            </center>
          </template>
        </vue3-html2pdf>
      </div>
      <div>
        <rs-button class="bg-heandshe hover:bg-heandshe w-full" @click="generateReport()">Print PDF</rs-button>
      </div>
    </rs-modal>
    <!-- QR CODE -->
    <!-- ADD TABLES -->
    <rs-modal title="Add Table" v-model="tableADD" position="middle" size="md">
      <FormKit label="Table Name" type="text" v-model="tablename" />
      <FormKit v-model="tableRefNo" type="radio" label="Drive In or Dine In" :options="['Drive In', 'Dine In']" />
      <rs-button style="float: right" @click="insertTable()"> Save </rs-button>
    </rs-modal>
    <!-- ADD TABLES -->
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
import QrcodeVue from "qrcode.vue";
import Vue3Html2pdf from "vue3-html2pdf";
import RsBadges from "@/components/Badges.vue";

export default {
  name: "AdminDashboard",
  components: {
    RsButton,
    RsModal,
    DataTable,
    Column,
    Button,
    QrcodeVue,
    Vue3Html2pdf,
    RsBadges
  },
  setup() {
    const tables = ref([]);
    const search = ref("");

    const searchTables = computed(() => {
      return tables.value.filter((table) => {
        return (
          table.outletTNAME.toLowerCase().indexOf(search.value.toLowerCase()) !=
          -1 ||
          table.outletTNAME.toLowerCase().indexOf(search.value.toLowerCase()) !=
          -1
        );
      });
    });
    return {
      search,
      searchTables,
      tables,
    };
  },
  data() {
    return {
      staffPosition: [],
      /* DATA V-MODEL */
      staffid: "",
      staffName: "",
      value: "",
      size: 300,
      /* TABLE DATA V-MODAL */
      tablename: "",
      tableRefNo: "",
      printName: "",
      /* MODAL SHOW */
      show: false,
      status: null,
      tableADD: false,
      outletDrop: false,
      qrcode: false,
      menuDrop: false,
    };
  },

  async created() {
    this.staffid = localStorage.staff;
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("staff", this.staffid);
    });
    this.getdata();
    this.getTable();
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
    async print(data) {
      this.value =
        process.env.VUE_APP_MAIN_URL + 
        this.$route.params.outletid +
        "/" +
        data.data.outletTID;

      console.log(this.value);
      this.printName = data.data.outletTNAME;
      this.qrcode = true;
    },
    async generateReport() {
      this.$refs.html2Pdf.generatePdf();
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
            this.outletid = response.data.data[0].outlet_id;
            localStorage.branch = this.outletid;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async getTable() {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
        outletid: this.$route.params.outletid,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/getTable" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              if (response.data.data[i].outlet_tableStatus == 1) {
                this.status = "ACTIVE";
              } else {
                this.status = "INACTIVE";
              }
              this.tables.push({
                outletTID: response.data.data[i].outlet_tableID,
                outletTNAME: response.data.data[i].outlet_tableName,
                outletTTYPE: response.data.data[i].outlet_tableType,
                outletTSTATUS: response.data.data[i].outlet_tableStatus,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    /* ADD , UPDATE & DELETE FUNCTION */
    /* ADD */
    async addTable() {
      this.tableADD = true;
    },
    async insertTable() {
      var axios = require("axios");
      var data = JSON.stringify({
        tableName: this.tablename,
        tableRefNo: this.tableRefNo,
        staffid: localStorage.staff,
        outletid: this.$route.params.outletid,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/insertTable" /*   */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            console.log(response.data);
            alert(response.data.message);
            this.tableADD = false;
            this.tables.splice(0);
            this.getTable();
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    /* ADD */
  },
};
</script>
