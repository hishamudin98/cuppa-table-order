<template>
    <rs-layout>
        <rs-breadcrumb />
        <div style="display: flex; flex-direction: row">

            <div class="w-full h-1/4 flex flex-col">

                <div class="w-full" style="flex-direction: column">
                    <!-- UNTUK ATAS BAWAH -->
                    <div style="display: flex; flex-direction: row; padding-top: 10px">
                        <div class="w-full h-1">
                            <FormKit v-model="search" id="search-sticky" placeholder="Search" type="search" :classes="{
                                inner:
                                    'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                                outer: 'flex-1 mb-0',
                                input: 'h-10',
                            }" />
                        </div>

                        <div class="w-1/12" style="">
                            <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Stock
                            </rs-button>
                        </div>

                    </div>
                    <div class="">
                        <rs-card style="margin-top: 40px">
                            <div>
                                <div>
                                    <DataTable :value="searchRawMaterial" :paginator="true" :rows="10"
                                        v-model:expandedRows="expandedRows" @rowExpand="onRowExpand"
                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                        <Column :expander="true" headerStyle="width: 3rem" />
                                        <Column field="rm_Name" header="Name"></Column>
                                        <Column field="rm_Sku" header="SKU"></Column>
                                        <Column field="rm_Quantity" header="Quantity">
                                            <template #body="searchRawMaterial">
                                                <p v-if="searchRawMaterial.data.rm_Quantity <= 5"
                                                    style="color:red; font-weight: bold;">
                                                    {{ searchRawMaterial.data.rm_Quantity }}</p>
                                                <p v-else>{{ searchRawMaterial.data.rm_Quantity }}</p>
                                            </template>
                                        </Column>
                                        <Column field="rm_MinQuantity" header="Min. Quantity"></Column>
                                        <Column field="rm_MinQuantity" header="Quantity By Packaging Type">
                                        </Column>
                                        <Column field="rm_Packaging" header="Packaging Type">
                                            <template #body="searchRawMaterial">
                                                <p v-if="searchRawMaterial.data.rm_Packaging === '1'">Box</p>
                                                <p v-if="searchRawMaterial.data.rm_Packaging === '2'">Packet</p>
                                            </template>
                                        </Column>
                                        <Column field="rm_Unit" header="Measurement">
                                            <template #body="searchRawMaterial">
                                                <p v-if="searchRawMaterial.data.rm_Unit === '1'">gram</p>
                                                <p v-if="searchRawMaterial.data.rm_Unit === '2'">kilogram</p>
                                                <p v-if="searchRawMaterial.data.rm_Unit === '3'">centimetre</p>
                                                <p v-if="searchRawMaterial.data.rm_Unit === '4'">metre</p>
                                                <p v-if="searchRawMaterial.data.rm_Unit === '5'">pcs</p>
                                            </template>
                                        </Column>
                                        <Column field="rm_Price" header="Unit Price (RM)">
                                            <template #body="searchRawMaterial">
                                                {{ formatPrice(searchRawMaterial.data.rm_Price) }}
                                            </template>
                                        </Column>

                                        <Column field="rm_Price" header="Total Price (RM)">
                                            <template #body="searchRawMaterial">
                                                {{ formatPrice(searchRawMaterial.data.rm_TotalPrice) }}
                                            </template>
                                        </Column>

                                        <Column field="rm_Status" header="Status">
                                            <template #body="searchRawMaterial">
                                                <rs-badges variant="danger"
                                                    v-if="searchRawMaterial.data.rm_Quantity <= searchRawMaterial.data.rm_MinQuantity">
                                                    Low Stock</rs-badges>
                                                <rs-badges variant="success" v-else>
                                                    In Stock</rs-badges>

                                            </template>

                                        </Column>

                                        <Column field="rm_StoreName" header="Store">
                                            <template #body="searchRawMaterial">
                                                <p>{{ searchRawMaterial.data.rm_StoreName }}</p>
                                            </template>

                                        </Column>

                                        <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                            <template #body="searchRawMaterial">
                                                <Button icon="pi pi-pencil"
                                                    class="p-button-rounded p-button-success mr-2"
                                                    @click="editUser(searchRawMaterial)" /> {{ " " }}
                                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                    @click="deleteUser(searchRawMaterial)" />
                                            </template>
                                        </Column>

                                        <template #expansion="headerRawMaterial">
                                            <div v class="orders-subtable">
                                                <h5 style="margin-bottom:20px">Order No. for {{
                                                        headerRawMaterial.data.rm_Name
                                                }}</h5>

                                                <DataTable :value="resultFilter" :paginator="true" :rows="10"
                                                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                    :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                                    <Column field="po_No" header="Order No.">
                                                    </Column>

                                                    <Column field="po_Date" header="Order Datetime">

                                                    </Column>
                                                    <Column field="po_ItemQuantity" header="Quantity Requested">

                                                    </Column>
                                                    <Column field="rm_Quantity" header="Quantity Available">

                                                    </Column>
                                                    <Column field="po_ItemTotalPrice" header="Total Price (RM)">
                                                        <template #body="resultFilter">
                                                            {{
                                                                formatPrice(resultFilter.data.po_ItemTotalPrice)
                                                            }}
                                                        </template>

                                                    </Column>

                                                    <Column :exportable="false" style="min-width: 8rem"
                                                        header="Actions">
                                                        <template #body="resultFilter">
                                                            <Button icon="pi pi-pencil"
                                                                class="p-button-rounded p-button-success mr-2"
                                                                @click="editUser(resultFilter)" />{{ " " }}
                                                            <Button icon="pi pi-trash"
                                                                class="p-button-rounded p-button-danger"
                                                                @click="deleteUser(resultFilter)" />
                                                        </template>
                                                    </Column>

                                                    <template #paginatorstart>
                                                        <Button type="button" icon="pi pi-refresh"
                                                            class="p-button-text" />
                                                    </template>
                                                    <template #paginatorend>
                                                        <Button type="button" icon="pi pi-cloud"
                                                            class="p-button-text" />
                                                    </template>
                                                </DataTable>
                                            </div>


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

        <rs-modal title="Add Stock" v-model="modalRawMaterial" position="middle" size="md">
            <FormKit type="select" label="Stock" placeholder="Select Stock" v-model="selectRawMaterial"
                :options="this.rawMaterialHq" />
            <FormKit label="Min. Quantity" type="number" v-model="minquantity" />
            <FormKit label="Quantity" type="number" v-model="quantity" />
            <FormKit label="Price (RM)" type="number" v-model="price" />
            <FormKit type="select" v-model="selectStoreOutlet" label="Store" :options="this.listStoreOutlet"
                placeholder="Select Store" />

            <FormKit label="Level 1" type="text" v-model="level_1" />
            <FormKit label="Level 2" type="text" v-model="level_2" />
            <FormKit label="Level 3" type="text" v-model="level_3" />

            <rs-button style="float: right" @click="insertRawMaterial()" class="bg-heandshe hover:bg-heandshe">
                Save
            </rs-button>
        </rs-modal><!-- INSERT -->

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
import RsBadges from "@/components/Badges.vue";

export default {
    name: "RawMaterial",
    components: {
        RsButton,
        DataTable,
        RsModal,
        Column,
        Button,
        RsBadges
    },
    setup() {
        const rawMaterial = ref([]);
        const typePackaging = ref([]);
        const unitMeasurement = ref([]);
        const search = ref("");

        const searchRawMaterial = computed(() => {
            return rawMaterial.value.filter((rawMaterial) => {
                return (
                    rawMaterial.rm_Name.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    rawMaterial.rm_Name
                        .toLowerCase()
                        .indexOf(search.value.toLowerCase()) != -1
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
            searchRawMaterial,
            rawMaterial,
            formatPrice,
            typePackaging,
            unitMeasurement
        };
    },
    data() {
        return {
            staffId: "",
            staffName: "",
            totalData: 0,
            show: false,
            outletDrop: false,
            sumPrice: 0,
            menuDrop: false,
            /* BARU */
            expandedRows: [],

            name: null,
            quantity: null,
            minquantity: null,
            price: null,
            modalRawMaterial: false,
            selectRawMaterial: null,
            selectStoreOutlet: null,
            level_1: null,
            level_2: null,
            level_3: null,

            rawMaterialHq: [],
            listStoreOutlet: [],
            listRawMaterialOrder: [],
            headerRawMaterial: [],
            resultFilter: [],
        };
    },
    async created() {
        this.getdata();
        this.getTypePackaging();
        this.getUnitMeasurement();
    },

    methods: {

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
                        this.staffId = response.data.data[0].staff_id;
                        this.getRawMaterial();
                        this.getRawMaterialHq();
                        this.getStoreOutlet();
                        this.getRawMaterialByOrder();
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getTypePackaging() {
            var axios = require("axios");
            var config = {
                method: "get",
                url: process.env.VUE_APP_FNB_URL + "/getTypePackaging",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios(config)
                .then(
                    function (response) {

                        for (let i = 0; i < response.data.data.length; i++) {
                            this.typePackaging.push({
                                label: response.data.data[i].packaging_Name,
                                value: response.data.data[i].packaging_Value,
                            });
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getUnitMeasurement() {
            var axios = require("axios");
            var config = {
                method: "get",
                url: process.env.VUE_APP_FNB_URL + "/getUnitMeasurement",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios(config)
                .then(
                    function (response) {

                        for (let i = 0; i < response.data.data.length; i++) {
                            this.unitMeasurement.push({
                                label: response.data.data[i].packaging_Name,
                                value: response.data.data[i].packaging_Value,
                            });
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getRawMaterial() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getRawMaterial",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        // console.log("price", response.data.data.rm_Price[0]);
                        this.rawMaterial = response.data.data;
                        this.totalData = this.rawMaterial.length;
                        console.log("respons 123e", response);
                        let price = 0;
                        for (let i = 0; i < response.data.data.length; i++) {
                            price += response.data.data[i].rm_Price;

                        }
                        this.sumPrice = price;
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getRawMaterialHq() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getRawMaterialHq",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        // console.log("price", response.data.data.rm_Price[0]);
                        for (let i = 0; i < response.data.data.length; i++) {
                            this.rawMaterialHq.push({
                                label: response.data.data[i].rm_Name,
                                value: response.data.data[i].rm_Id,
                            });
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async clickBtnAdd() {
            // this.users1 = user.data;
            this.modalRawMaterial = true;
        },

        async insertRawMaterial() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                rawMaterialId: this.selectRawMaterial,
                quantity: this.quantity,
                minquantity: this.minquantity,
                price: this.price,
                store: this.selectStoreOutlet,
                level_1: this.level_1,
                level_2: this.level_2,
                level_3: this.level_3,

            });
            console.log("Insert data :", data);
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/insertRawMaterialOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        if (response.data.status == 200) {
                            this.modalRawMaterial = false;
                            alert(response.data.message);
                            this.getRawMaterial();
                        } else {
                            alert(response.data.message);
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getStoreOutlet() {
            this.listStoreOutlet = [];
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getStoreOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log('response', response.data.data);
                        for (let i = 0; i < response.data.data.length; i++) {
                            this.listStoreOutlet.push({
                                label: response.data.data[i].sto_Name,
                                value: response.data.data[i].sto_Id,
                            });
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getRawMaterialByOrder() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getRawMaterialByOrder",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log("respons all order", response.data.data);
                        this.listRawMaterialOrder = response.data.data;
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        onRowExpand(event) {
            this.resultFilter = this.listRawMaterialOrder.filter((item) => {
                // console.log("item", item);
                if (item.rm_Id == event.data.rm_Id && item.store_Id == event.data.rm_StoreId) {
                    return item;
                }
            });

            this.headerRawMaterial = this.resultFilter;

            // console.log("tt", tt);
            // console.log("result", result);
            // console.log("this.resultFilter", this.resultFilter);
            // // this.resultFilter.push(result);

            // console.log("search material", this.searchRawMaterial);
            // console.log("filter", this.resultFilter);
            // this.$toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
        }
    },
};
</script>
  