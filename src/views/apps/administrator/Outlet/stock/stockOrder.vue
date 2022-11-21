<template>
    <rs-layout>
        <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-x-2">
                    <div class="welcome text-lg font-semibold text-white">
                        Order Stock - Outlet
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
                                <div class="text-center py-8">{{ this.totalData }} Order Stock</div>
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
                        </div>
                        <div class="">
                            <rs-card style="margin-top: 40px">
                                <div>
                                    <div>

                                        <p style="font-weight:bold">Order No. : {{ this.orderNo }}</p>

                                        <DataTable :value="searchOrderStock" :paginator="true" :rows="10"
                                            v-model:expandedRows="expandedRows"
                                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                            <Column :expander="true" headerStyle="width: 3rem" />
                                            <Column field="rawMaterialName" header="Name"></Column>
                                            <Column field="rawMaterialSku" header="SKU"></Column>
                                            <Column field="stockOrderOutletDetailsQuantity" header="Quantity"></Column>
                                            <Column field="stockOrderOutletDetailsQuantity" header="Quantity Delivered">
                                                <template #body="searchRawMaterial">
                                                    <p v-if="searchRawMaterial.data.stockOrderOutletDetailsQuantity">
                                                        20/{{ searchRawMaterial.data.stockOrderOutletDetailsQuantity }}
                                                    </p>
                                                    <p
                                                        v-if="searchRawMaterial.data.stockOrderOutletDetailsQuantity === '2'">
                                                        Packet</p>
                                                </template>
                                            </Column>
                                            <Column field="rawMaterialPackagingTypeRefCode" header="Packaging Type">
                                                <template #body="searchRawMaterial">
                                                    <p
                                                        v-if="searchRawMaterial.data.rawMaterialPackagingTypeRefCode === '1'">
                                                        Box</p>
                                                    <p
                                                        v-if="searchRawMaterial.data.rawMaterialPackagingTypeRefCode === '2'">
                                                        Packet</p>
                                                </template>
                                            </Column>
                                            <Column field="rawMaterialMeasurementTypeRefCode" header="Measurement">
                                                <template #body="searchRawMaterial">
                                                    <p
                                                        v-if="searchRawMaterial.data.rawMaterialMeasurementTypeRefCode === '1'">
                                                        gram</p>
                                                    <p
                                                        v-if="searchRawMaterial.data.rawMaterialMeasurementTypeRefCode === '2'">
                                                        kilogram</p>
                                                    <p
                                                        v-if="searchRawMaterial.data.rawMaterialMeasurementTypeRefCode === '3'">
                                                        centimetre</p>
                                                    <p
                                                        v-if="searchRawMaterial.data.rawMaterialMeasurementTypeRefCode === '4'">
                                                        metre</p>
                                                    <p
                                                        v-if="searchRawMaterial.data.rawMaterialMeasurementTypeRefCode === '5'">
                                                        pcs</p>
                                                </template>
                                            </Column>
                                            <Column field="stockOrderOutletDetailsPrice" header="Unit Price">
                                                <template #body="searchRawMaterial">
                                                    {{ formatPrice(searchRawMaterial.data.stockOrderOutletDetailsPrice)
                                                    }}
                                                </template>
                                            </Column>

                                            <Column field="stockOrderOutletDetailsTotalPrice" header="Total Price">
                                                <template #body="searchRawMaterial">
                                                    {{
                                                            formatPrice(searchRawMaterial.data.stockOrderOutletDetailsTotalPrice)
                                                    }}
                                                </template>
                                            </Column>

                                            <Column field="stockOrderOutletDetailsStatus" header="Status">
                                                <template #body="searchRawMaterial">
                                                    <p
                                                        v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                        Open</p>
                                                    <p
                                                        v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === '2'">
                                                        Partial</p>
                                                    <p
                                                        v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === '3'">
                                                        Completed</p>
                                                </template>

                                            </Column>

                                            <Column :exportable="false" style="min-width: 8rem">
                                                <template #body="searchOrderStock">
                                                    <Button icon="pi pi-pencil"
                                                        class="p-button-rounded p-button-success mr-2"
                                                        @click="editUser(searchOrderStock)" />
                                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                        @click="deleteUser(searchOrderStock)" />
                                                </template>
                                            </Column>

                                            <template #expansion="searchRawMaterial">
                                                <div class="orders-subtable">
                                                    <h5 style="margin-bottom:20px">Delivery Order Record for {{
                                                            searchRawMaterial.data.rawMaterialName
                                                    }}</h5>

                                                    <DataTable :value="searchOrderStock" :paginator="true" :rows="10"
                                                        v-model:expandedRows="expandedRows"
                                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                                        <Column field="sto_Name" header="DO No.">
                                                            <template #body="searchRawMaterial">
                                                                <p
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    D0-00001</p>
                                                            </template>
                                                        </Column>
                                                        <Column field="stockOrderOutletDetailsStatus" header="Date">
                                                            <template #body="searchRawMaterial">
                                                                <p
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    14/07/2022</p>
                                                            </template>
                                                        </Column>

                                                        <Column field="stockOrderOutletDetailsStatus"
                                                            header="Order No.">
                                                            <template #body="searchRawMaterial">
                                                                <p
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    #QwDer</p>
                                                            </template>
                                                        </Column>

                                                        <Column field="stockOrderOutletDetailsStatus" header="Staff">
                                                            <template #body="searchRawMaterial">
                                                                <p
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    Staff HQ</p>
                                                            </template>
                                                        </Column>
                                                        <Column field="stockOrderOutletDetailsStatus" header="Quantity">
                                                            <template #body="searchRawMaterial">
                                                                <p
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    5</p>
                                                            </template>
                                                        </Column>
                                                        <Column field="stockOrderOutletDetailsStatus"
                                                            header="Total Price">
                                                            <template #body="searchRawMaterial">
                                                                <p
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    123.00</p>
                                                            </template>
                                                        </Column>
                                                        <Column field="stockOrderOutletDetailsStatus"
                                                            header="Destination">
                                                            <template #body="searchRawMaterial">
                                                                <p
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    He & She
                                                                    University of
                                                                    Malaya</p>
                                                            </template>
                                                        </Column>

                                                        <Column field="stockOrderOutletDetailsStatus" header="PIC Name">
                                                            <template #body="searchRawMaterial">
                                                                <p
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    Customer
                                                                    Name</p>
                                                            </template>

                                                        </Column>

                                                        <Column field="stockOrderOutletDetailsStatus"
                                                            header="PIC Phone No.">
                                                            <template #body="searchRawMaterial">
                                                                <p
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    0123123123
                                                                </p>
                                                            </template>

                                                        </Column>

                                                        <Column field="stockOrderOutletDetailsStatus" header="Status">
                                                            <template #body="searchRawMaterial">
                                                                <rs-badges variant="success"
                                                                    v-if="searchRawMaterial.data.stockOrderOutletDetailsStatus === null">
                                                                    Approved</rs-badges>

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
            <FormKit label="SKU" type="text" v-model="sku" />
            <FormKit label="Min. Quantity" type="number" v-model="minquantity" />
            <FormKit label="Quantity" type="number" v-model="quantity" />
            <FormKit label="Price (RM)" type="number" v-model="price" />
            <FormKit type="select" label="Packaging Type" v-model="packaging_type" placeholder="Choose Packaging Type"
                :options="this.typePackaging" />
            <FormKit type="select" label="Unit Measurement" v-model="measurement" placeholder="Choose Unit Measurement"
                :options="this.unitMeasurement" />

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
        RsBadges,
        DataTable,
        RsModal,
        Column,
        Button,
        'arbitrary': Menu,
    },
    setup() {
        const orderStock = ref([]);
        const typePackaging = ref([]);
        const unitMeasurement = ref([]);
        const search = ref("");

        const searchOrderStock = computed(() => {
            return orderStock.value.filter((orderStock) => {
                return (
                    orderStock.rawMaterialName.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    orderStock.rawMaterialName
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
            searchOrderStock,
            orderStock,
            formatPrice,
            typePackaging,
            unitMeasurement,
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
            expandedRows: [],
            orderNo: "",
            /* BARU */

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
        this.getOrderStock();
        this.getTypePackaging();
        this.getUnitMeasurement();
    },

    methods: {

        expandAll() {
            this.expandedRows = this.orderStock.filter(p => p.stockOrderOutletDetailsId);
        },
        collapseAll() {
            this.expandedRows = null;
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

        async getOrderStock() {
            var axios = require("axios");
            var data = JSON.stringify({
                orderId: this.$route.params.id
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/outlet/getOrderStockByOrderId",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log("data : ", response.data.data);
                        this.orderStock = response.data.data;
                        this.totalData = this.orderStock.length;
                        this.orderNo = response.data.data[0].stockOrderOutletNo;
                        let price = 0;
                        for (let i = 0; i < response.data.data.length; i++) {
                            price += response.data.data[i].stockOrderOutletDetailsTotalPrice;

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
                            this.getOrderStock();
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
  