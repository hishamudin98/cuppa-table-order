<template>
    <rs-layout>
        <rs-breadcrumb />
        <div style="display: flex; flex-direction: row">
            <div class="w-full h-1/4 flex flex-col">
                <!-- <div class="w-full flex flex-row mb-0">
                        <div class="inline-block w-1/2 pr-10">
                            <rs-card>
                                <div class="text-center pt-10 pb-2">
                                    <strong>Total of Raw Material </strong>
                                </div>
                                <hr />
                                <div class="text-center py-8">{{ this.totalData }} Raw Material</div>
                            </rs-card>
                        </div>
                        <div class="inline-block w-1/2 pr-10">
                            <rs-card>
                                <div class="text-center pt-10 pb-2">
                                    <strong>Total Price Raw Material ( RM )</strong>
                                </div>
                                <hr />
                                <div class="text-center py-8">
                                    {{ formatPrice(this.sumPrice) }}
                                </div>
                            </rs-card>
                        </div>
                    </div> -->
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
                            <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Raw Material
                            </rs-button>
                        </div>
                    </div>
                    <div class="">
                        <rs-card style="margin-top: 40px">
                            <div>
                                <div>
                                    <DataTable :value="searchRawMaterial" :paginator="true" :rows="10"
                                        v-model:expandedRows="expandedRows"
                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                        <Column :expander="true" headerStyle="width: 3rem" />
                                        <Column field="rm_Name" header="Name"></Column>
                                        <Column field="rm_Sku" header="SKU"></Column>
                                        <Column field="rm_Quantity" header="Quantity">
                                            <template #body="searchRawMaterial">
                                                <p v-if="(searchRawMaterial.data.rm_Quantity <= searchRawMaterial.data.rm_MinQuantity)"
                                                    style="color:red; font-weight: bold;">
                                                    {{ searchRawMaterial.data.rm_Quantity }}</p>
                                                <p v-else>{{ searchRawMaterial.data.rm_Quantity }}</p>
                                            </template>
                                        </Column>
                                        <Column field="rm_MinQuantity" header="Min. Quantity"></Column>
                                        <Column field="rm_quanityByPackagingType" header="Quantity By Packaging Type">
                                        </Column>
                                        <Column field="rm_Packaging" header="Packaging Type">
                                            <template #body="searchRawMaterial">
                                                <p v-if="searchRawMaterial.data.rm_Packaging === '1'">Box</p>
                                                <p v-if="searchRawMaterial.data.rm_Packaging === '2'">Packet</p>
                                                <p v-if="searchRawMaterial.data.rm_Packaging === '3'">Carton</p>
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
                                                    v-if="(searchRawMaterial.data.rm_Quantity <= searchRawMaterial.data.rm_MinQuantity)">
                                                    Low Stock</rs-badges>
                                                <rs-badges variant="success" v-else>
                                                    In Stock</rs-badges>

                                            </template>

                                        </Column>

                                        <Column :exportable="false" header="Supplier">
                                            <template #body="searchRawMaterial">
                                                <p v-if="searchRawMaterial.data.rm_Status === '1'" hidden>Level 1
                                                </p>
                                                <router-link
                                                    :to="{ name: 'hq-stock-supplier', params: { id: searchRawMaterial.data.rm_Id } }">
                                                    <Button icon="pi pi-truck" class="p-button-rounded p-button-info" />
                                                </router-link>
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

                                        <template #expansion="searchRawMaterial1">
                                            <div class="orders-subtable">
                                                <h5 style="margin-bottom:20px">Order for {{
                                                        searchRawMaterial1.data.rm_Name
                                                }}</h5>

                                                <DataTable :value="searchRawMaterial" :paginator="true" :rows="10"
                                                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                    :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                                    <Column field="rm_Name" header="Order No.">
                                                        <template #body="searchRawMaterial">
                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#F123'">
                                                                #QwDer</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#C123'">
                                                                #ASDqwe</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#P442'">
                                                                #VsrSf</p>
                                                        </template>
                                                    </Column>
                                                    <Column field="rm_Name" header="Outlet Name">
                                                        <template #body="searchRawMaterial">
                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#F123'">
                                                                He & She University of Malaya</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#C123'">
                                                                He & She University of Malaya</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#P442'">
                                                                He & She SME Bank</p>
                                                        </template>
                                                    </Column>

                                                    <Column field="rm_Status" header="Order Datetime">

                                                        <template #body="searchRawMaterial">
                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#F123'">
                                                                14/07/2022 17:55</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#C123'">
                                                                15/07/2022 10:50</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#P442'">
                                                                16/07/2022 15:55</p>
                                                        </template>
                                                    </Column>
                                                    <Column field="rm_Status" header="Quantity Requested">
                                                        <template #body="searchRawMaterial">
                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#F123'">
                                                                30</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#C123'">
                                                                50</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#P442'">
                                                                30</p>
                                                        </template>
                                                    </Column>
                                                    <Column field="rm_Status" header="Quantity Available">
                                                        <template #body="searchRawMaterial">
                                                            <p v-if="searchRawMaterial.data.rm_Status === '1'">
                                                                5</p>

                                                            <p v-if="searchRawMaterial.data.rm_Status === '2'">
                                                                100</p>
                                                        </template>
                                                    </Column>
                                                    <Column field="rm_Status" header="Total Price (RM)">
                                                        <template #body="searchRawMaterial">
                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#F123'">
                                                                {{ formatPrice(30 * 1.50) }}</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#C123'">
                                                                {{ formatPrice(50 * 1.50) }}</p>

                                                            <p v-if="searchRawMaterial.data.rm_Sku === '#P442'">
                                                                {{ formatPrice(30 * 1.50) }}</p>
                                                        </template>

                                                    </Column>

                                                    <Column :exportable="false" style="min-width: 8rem"
                                                        header="Actions">
                                                        <template #body="searchRawMaterial">
                                                            <Button icon="pi pi-pencil"
                                                                class="p-button-rounded p-button-success mr-2"
                                                                @click="editUser(searchRawMaterial)" />{{ " " }}
                                                            <Button icon="pi pi-trash"
                                                                class="p-button-rounded p-button-danger"
                                                                @click="deleteUser(searchRawMaterial)" />
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

        <rs-modal title="Add Raw Material" v-model="modalRawMaterial" position="middle" size="md">
            <FormKit label="Name" type="text" v-model="name" />

            <FormKit type="select" label="Category" placeholder="Select Category" v-model="selectCategory" :options="[
                { label: 'Product', value: 1 },
                { label: 'Services', value: 2 },
            ]" />
            <FormKit label="SKU" type="text" v-model="sku" />
            <FormKit label="Min. Quantity" type="number" v-model="minquantity" />
            <FormKit label="Quantity" type="number" v-model="quantity" />

            <FormKit label="Price (RM)" type="number" v-model="price" />
            <FormKit class="" type="file" label="Images" accept=".jpg, .png, .jpeg" v-model="image" />
            <FormKit type="select" label="Packaging Type" v-model="packaging_type" placeholder="Choose Packaging Type"
                :options="this.typePackaging" />
            <FormKit label="Quantity By Packaging Type" type="number" v-model="quantity_packaging_type" />
            <FormKit type="select" label="Unit Measurement" v-model="measurement" placeholder="Choose Unit Measurement"
                :options="this.unitMeasurement" />

            <FormKit type="select" label="Type Store" v-model="selectType" placeholder="Select Store Type" :options="[
                { label: 'HQ', value: 1 },
                { label: 'Outlet', value: 2 },
            ]" @change="clearValue(selectType)" />


            <div v-if="(selectType == 1)">
                <FormKit type="select" v-model="selectStoreHq" label="Store" :options="this.listStoreHQ"
                    placeholder="Select Store" />
            </div>

            <div v-if="(selectType == 2)">
                <FormKit type="select" label="Outlet" v-model="selectOutlet" placeholder="Select Outlet"
                    :options="this.listOutlet" @change="getStoreOutlet()" />

                <div v-if="(selectOutlet && listStoreOutlet.length != 0)">
                    <FormKit type="select" v-model="selectStoreOutlet" label="Store" :options="this.listStoreOutlet"
                        placeholder="Select Store" />
                </div>

                <div v-if="(selectOutlet && listStoreOutlet.length == 0)">
                    <FormKit type="select" placeholder="Select Store" label="Store"
                        :options="[{ label: 'No Store', value: '0', attrs: { disabled: true } },]" />
                </div>
            </div>

            <!-- {{ this.listStore }} -->

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
        RsBadges,
        RsModal,
        Column,
        Button,
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
            staffName: "",
            staffId: "",
            totalData: 0,
            show: false,
            outletDrop: false,
            sumPrice: 0,
            menuDrop: false,
            /* BARU */
            expandedRows: [],

            name: null,
            selectCategory: null,
            sku: null,
            quantity: null,
            minquantity: null,
            price: null,
            image: null,
            packaging_type: null,
            measurement: null,
            selectType: '',
            selectStoreHq: '',
            selectStoreOutlet: '',
            selectOutlet: '',
            modalRawMaterial: false,
            level_1: null,
            level_2: null,
            level_3: null,
            quantity_packaging_type: null,

            listStore: [],
            listStoreHQ: [],
            listStoreOutlet: [],
            listOutlet: [],
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
                        this.getStore();
                        this.getStoreHQ();
                        this.getStoreOutlet();
                        this.getOutlet();
                        this.getRawMaterial();

                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async clearValue(value) {
            // HQ is 1, Outlet is 2
            if (value == 1) {
                this.selectOutlet = '';
                this.selectStoreOutlet = '';

            } else {
                this.selectStoreHq = '';
            }
        },

        async getStore(value) {
            this.listStore = [];
            // let value = this.selectStore;
            console.log('value', value);

            var axios = require("axios");
            var data = JSON.stringify({
                type: value
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getStore",
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
                            this.listStore.push({
                                label: response.data.data[i].sto_Name,
                                value: response.data.data[i].sto_Id,
                            });
                        }
                        console.log('listStore', this.listStore);
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getStoreHQ() {
            console.log('getStoreHQ');
            this.listStoreHQ = [];

            var axios = require("axios");
            var data = JSON.stringify({
                outletId: 0,
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getStore",
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
                            this.listStoreHQ.push({
                                label: response.data.data[i].sto_Name,
                                value: response.data.data[i].sto_Id,
                            });
                        }
                        console.log('listStoreHQ', this.listStoreHQ);
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
                outletId: this.selectOutlet,
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getStore",
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
                        console.log('listStoreOutlet', this.listStoreOutlet);
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

        async clickBtnAdd() {
            // this.users1 = user.data;
            this.modalRawMaterial = true;
        },

        async insertRawMaterial() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                name: this.name,
                selectCategory: this.selectCategory,
                sku: this.sku,
                quantity: this.quantity,
                minquantity: this.minquantity,
                price: this.price,
                packaging_type: this.packaging_type,
                quantity_packaging_type: this.quantity_packaging_type,
                measurement: this.measurement,
                outlet: this.selectOutlet,
                store: this.selectStoreHq == "" ? this.selectStoreOutlet : this.selectStoreHq,
                level_1: this.level_1,
                level_2: this.level_2,
                level_3: this.level_3,
            });

            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/insertRawMaterial",
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

        async getOutlet() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {

                        for (let i = 0; i < response.data.data.length; i++) {
                            this.listOutlet.push({
                                label: response.data.data[i].outlet_name,
                                value: response.data.data[i].outlet_id,
                            });
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
  