<template>
    <rs-layout>
        <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-x-2">
                    <div class="welcome text-lg font-semibold text-white">
                        Summary Stock Order
                    </div>
                </div>

                <div class="flex gap-x-2 items-center">
                    <div class="text-white">{{ this.staffName }}</div>
                    <div class="bg-black h-10 w-10 p-1 rounded-full">
                        <img class="flex-1" src="@/assets/images/logo/cuppa.png" alt="" />
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
                                    <strong>Total of Stock Order </strong>
                                </div>
                                <hr />
                                <div class="text-center py-8">{{ this.totalData }} shifts</div>
                            </rs-card>
                        </div>
                        <div class="inline-block w-1/2 pr-10">
                            <rs-card>
                                <div class="text-center pt-10 pb-2">
                                    <strong>Total Price Stock Order ( RM )</strong>
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
                                <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Order Stock
                                </rs-button>
                            </div>
                        </div>
                        <div class="">
                            <rs-card style="margin-top: 40px">
                                <div>
                                    <div>
                                        <DataTable :value="searchOrderStock" :paginator="true" :rows="10"
                                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                            <Column field="outletName" header="Outlet Name"></Column>
                                            <Column field="stockOrderOutletNo" header="Order No."></Column>
                                            <Column field="stockOrderOutletDatetime" header="Order Datetime"></Column>
                                            <Column field="stockOrderOutletRemarks" header="Stock Name">
                                                <template #body="searchOrderStock">
                                                    <p v-if="searchOrderStock.data.stockOrderOutletStatusCode === '1'">
                                                        Pasta</p>

                                                    <p v-if="searchOrderStock.data.stockOrderOutletStatusCode === '2'">
                                                        Gula 1kg</p>
                                                </template>
                                            </Column>
                                            <Column field="stockOrderOutletRemarks" header="Quantity Requested">
                                                <template #body="searchOrderStock">
                                                    <p v-if="searchOrderStock.data.stockOrderOutletStatusCode">
                                                        20</p>
                                                </template>
                                            </Column>
                                            <Column field="stockOrderOutletRemarks" header="Quantity Available">
                                                <template #body="searchOrderStock">
                                                    <p v-if="searchOrderStock.data.stockOrderOutletStatusCode === '1'">
                                                        5</p>

                                                    <p v-if="searchOrderStock.data.stockOrderOutletStatusCode === '2'">
                                                        100</p>
                                                </template>
                                            </Column>
                                            <Column field="stockOrderOutletStatusCode" header="Status">
                                                <template #body="searchOrderStock">

                                                    <rs-badges variant="danger"
                                                        v-if="searchOrderStock.data.stockOrderOutletStatusCode === '1'">
                                                        Low Stock</rs-badges>

                                                    <rs-badges variant="success"
                                                        v-if="searchOrderStock.data.stockOrderOutletStatusCode === '2'">
                                                        In Stock</rs-badges>

                                                </template>

                                            </Column>

                                            <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                                <template #body="searchOrderStock">
                                                    <Button icon="pi pi-pencil"
                                                        class="p-button-rounded p-button-success mr-2"
                                                        @click="editUser(searchOrderStock)" />
                                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                        @click="deleteUser(searchOrderStock)" />
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
                            </rs-card>
                        </div>

                        <!-- UNTUK ATAS BAWAH -->
                    </div>
                </div>
                <!-- UNTUK SEBELAH2 -->
            </div>
        </div>

        <rs-modal title="Add Stock Order" v-model="modalRawMaterial" position="middle" size="md">
            <FormKit type="select" label="Outlet" :options="[
                'He & She University of Malaya',
                'He & She University of Malaya',
                'He & She University of Malaya',
            ]" />
            <table>
                <div v-for="(rm, l) in this.rawMaterial" :key="l">
                    <tbody>

                        <tr>
                            <td>
                                <FormKit type="text" hidden />
                            </td>
                            <td>
                                <FormKit type="select" label="Stock Name" :options="[
                                    'Fanta 1.5L',
                                    'Pasta 1kg',
                                    'Coca Cola 1.5L',
                                    'Milo 1kg',
                                ]" />
                            </td>
                            <td>
                                <FormKit type="number" label="Quantity" />
                            </td>
                            <td>
                                <FormKit type="select" label="Store" :options="[
                                    'Store Shah Alam',
                                    'Store Sg Besi',
                                    'Store Sg Buloh',
                                ]" />
                            </td>
                            <td>
                                <Button icon="pi pi-minus" class="p-button-rounded p-button-danger mx-2"
                                    @click="removeRawMaterial(l)" v-show="l || (!l && this.rawMaterial.length > 1)" />
                            </td>
                            <td>
                                <Button icon="pi pi-plus" class="p-button-rounded p-button-success mx-5"
                                    @click="addRawMaterial(l)" v-show="l == this.rawMaterial.length - 1" />
                            </td>
                        </tr>
                    </tbody>
                </div>
            </table>


            <!-- 
            <FormKit label="Name" type="text" v-model="name" />
            <FormKit label="SKU" type="text" v-model="sku" />
            <FormKit label="Min. Quantity" type="number" v-model="minquantity" />
            <FormKit label="Quantity" type="number" v-model="quantity" />
            <FormKit label="Price (RM)" type="number" v-model="price" />
            <FormKit type="select" label="Packaging Type" v-model="packaging_type" placeholder="Choose Packaging Type"
                :options="this.typePackaging" />
            <FormKit type="select" label="Unit Measurement" v-model="measurement" placeholder="Choose Unit Measurement"
                :options="this.unitMeasurement" /> -->

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
import RsBadges from '@/components/Badges.vue';


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
                    orderStock.stockOrderOutletNo.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    orderStock.stockOrderOutletNo
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
            rawMaterial: [{
                type: "",
            }],
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
            // var data = JSON.stringify({
            //     staffid: localStorage.staff,
            // });
            var config = {
                method: "get",
                url: process.env.VUE_APP_FNB_URL + "/outlet/getOrderStock",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log("data : ", response.data.data);
                        this.orderStock = response.data.data;
                        this.totalData = this.orderStock.length;

                        let price = 0;
                        for (let i = 0; i < response.data.data.length; i++) {
                            price += response.data.data[i].stockOrderOutletTotalPrice;

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

        addRawMaterial(index) {
            this.counter++;
            console.log("ADD", index);
            this.rawMaterial.push({
                type: "",
            });
        },
        removeRawMaterial(index) {
            this.counter--;
            console.log("REMOVE", index);
            this.rawMaterial.splice(index, 1);
        },
    },
};
</script>
  