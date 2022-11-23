<template>
    <rs-layout>
        <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-x-2">
                    <div class="welcome text-lg font-semibold text-white">
                        Raw Material
                    </div>
                </div>

                <div class="flex gap-x-2 items-center">
                    <div class="text-white">{{ this.staffName }}</div>
                    <div class="bg-black h-10 w-10 p-1 rounded-full">
                        <img class="flex-1" src="@/assets/images/logo/heandshe.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex flex-col">
            <div style="display: flex; flex-direction: row">
                <!-- UNTUK SEBELAH2 -->
                <div>
                    <arbitrary />
                </div>
                <div class="w-full h-1/4 flex flex-col">
                    <div class="w-full flex flex-row mb-0">
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
                    </div>
                    <div class="w-full" style="flex-direction: column">
                        <!-- UNTUK ATAS BAWAH -->
                        <div style="display: flex; flex-direction: row; padding-top: 10px">
                            <div class="w-full h-1">
                                <FormKit v-model="search" id="search-sticky" placeholder="Search" type="search"
                                    :classes="{
                                        inner:
                                            'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                                        outer: 'flex-1 mb-0',
                                        input: 'h-10',
                                    }" />
                            </div>
                            <div class="w-1/12" style="padding-top: 10px">
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
                                                        v-if="searchRawMaterial.data.rm_Quantity <= 5">
                                                        Low Stock</rs-badges>
                                                    <rs-badges variant="success" v-else>
                                                        In Stock</rs-badges>

                                                </template>

                                            </Column>

                                            <Column field="rm_Status" header="Store">
                                                <template #body="searchRawMaterial">
                                                    <p v-if="searchRawMaterial.data.rm_Status === '1'">Shah Alam</p>
                                                    <p v-if="searchRawMaterial.data.rm_Status === '2'">Inactive</p>
                                                </template>

                                            </Column>

                                            <Column field="rm_Status" header="Level">
                                                <template #body="searchRawMaterial">
                                                    <p v-if="searchRawMaterial.data.rm_Status === '1'">
                                                        1</p>
                                                    <p v-if="searchRawMaterial.data.rm_Status === '2'">Inactive</p>

                                                </template>

                                            </Column>


                                            <Column :exportable="false" header="Supplier">
                                                <template #body="searchRawMaterial">
                                                    <p v-if="searchRawMaterial.data.rm_Status === '1'" hidden>Level 1
                                                    </p>
                                                    <router-link :to="{ name: 'admin-supplier' }">
                                                        <Button icon="pi pi-truck"
                                                            class="p-button-rounded p-button-info" />
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
        </div>

        <rs-modal title="Add Raw Material" v-model="modalRawMaterial" position="middle" size="md">
            <FormKit label="Name" type="text" v-model="name" />

            <FormKit type="select" label="Category" :options="[
                'Product',
                'Services',
            ]" />
            <FormKit label="SKU" type="text" v-model="sku" />
            <FormKit label="Min. Quantity" type="number" v-model="minquantity" />
            <FormKit label="Quantity" type="number" v-model="quantity" />
            <FormKit label="Price (RM)" type="number" v-model="price" />
            <FormKit class="" type="file" label="Images" accept=".jpg, .png, .jpeg" />
            <FormKit type="select" label="Packaging Type" v-model="packaging_type" placeholder="Choose Packaging Type"
                :options="this.typePackaging" />
            <FormKit type="select" label="Unit Measurement" v-model="measurement" placeholder="Choose Unit Measurement"
                :options="this.unitMeasurement" />

            <FormKit type="select" label="Type Store" :options="[
                'HQ',
                'Outlet',
            ]" />
            <FormKit type="select" label="Store" :options="[
                'Store Shah Alam',
                'Store Sg Besi',
                'Store Sg Buloh',
            ]" />

            <FormKit label="Level 1" type="text" v-model="price" />
            <FormKit label="Level 2" type="text" v-model="price" />
            <FormKit label="Level 3" type="text" v-model="price" />

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
import Menu from '@/views/apps/administrator/adminSidemenu.vue';
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
        'arbitrary': Menu,
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
            staffid: "",
            staffName: "",
            totalData: 0,
            show: false,
            outletDrop: false,
            sumPrice: 0,
            menuDrop: false,
            /* BARU */
            expandedRows: [],
            name: null,
            sku: null,
            quantity: null,
            minquantity: null,
            price: null,
            packaging_type: null,
            measurement: null,
            modalRawMaterial: false,
        };
    },
    async created() {
        this.getdata();
        this.getRawMaterial();
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
            // var data = JSON.stringify({
            //     staffid: localStorage.staff,
            // });
            var config = {
                method: "get",
                url: process.env.VUE_APP_FNB_URL + "/getRawMaterial",
                headers: {
                    "Content-Type": "application/json",
                },
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
                name: this.name,
                sku: this.sku,
                quantity: this.quantity,
                minquantity: this.minquantity,
                price: this.price,
                packaging_type: this.packaging_type,
                measurement: this.measurement,
            });
            console.log("Insert data :", data);
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
                            this.users.splice(0);
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
    },
};
</script>
  