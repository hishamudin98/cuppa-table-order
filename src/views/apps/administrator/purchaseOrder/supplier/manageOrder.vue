<template>
    <rs-layout>
        <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-x-2">
                    <div class="welcome text-lg font-semibold text-white">
                        Purchase Order
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
                    <!-- <div class="w-full flex flex-row mb-0">
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
                    </div> -->
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
                                <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add New
                                </rs-button>
                            </div>
                        </div>
                        <div class="">
                            <rs-card style="margin-top: 40px">
                                <div>
                                    <div>
                                        <DataTable :value="searchOrderStock" :paginator="true" :rows="10"
                                            v-model:expandedRows="expandedRows"
                                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                            <Column :expander="true" headerStyle="width: 3rem" />
                                            <Column field="suppOrderNo" header="Order No."></Column>
                                            <Column field="supplierName" header="Organization Name">
                                                <template #body="searchOrderStock">
                                                    <p v-if="searchOrderStock.data.supplierName">
                                                        HQ He And She</p>
                                                </template>
                                            </Column>
                                            <Column field="suppOrderDatetime" header="Order Datetime">
                                                <template #body="searchOrderStock">
                                                    <p v-if="searchOrderStock.data.suppOrderDatetime">
                                                        14/07/2022 17:55</p>
                                                </template>
                                            </Column>
                                            <Column field="suppOrderRemarks" header="Remarks"></Column>
                                            <Column field="suppOrderTotalPrice" header="Total Order (RM)">
                                                <template #body="searchOrderStock">
                                                    {{
                                                            formatPrice(searchOrderStock.data.suppOrderTotalPrice)
                                                    }}
                                                </template>
                                            </Column>

                                            <Column field="suppOrderStatusCode" header="Status">
                                                <template #body="searchOrderStock">
                                                    <rs-badges variant="success"
                                                        v-if="searchOrderStock.data.suppOrderStatusCode === '1'"
                                                        @click="clickBtnStatus()">
                                                        Partial Delivered</rs-badges>
                                                    {{ "" }}
                                                    <Button icon="pi pi-info" class="p-button-rounded p-button-info"
                                                        style="width: 25px;height:25px" @click="clickBtnInfo()" />

                                                    <p v-if="searchOrderStock.data.suppOrderStatusCode === '2'">
                                                        Approved</p>
                                                    <p v-if="searchOrderStock.data.suppOrderStatusCode === '3'">
                                                        Accepted</p>
                                                    <p v-if="searchOrderStock.data.suppOrderStatusCode === '4'">
                                                        Delivery</p>
                                                    <p v-if="searchOrderStock.data.suppOrderStatusCode === '5'">
                                                        Received</p>
                                                </template>

                                            </Column>

                                            <Column :exportable="false" header="Details">

                                                <template #body="searchOrderStock">

                                                    <router-link
                                                        :to="{ name: 'order-stock-supplier', params: { id: searchOrderStock.data.suppOrderId } }">
                                                        <Button icon="pi pi-truck"
                                                            class="p-button-rounded p-button-info" />
                                                    </router-link>
                                                </template>


                                            </Column>

                                            <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                                <template #body="searchOrderStock">

                                                    <Button icon="pi pi-send"
                                                        class="p-button-rounded p-button-warning mr-2"
                                                        @click="editUser(searchOrderStock)" /> {{ "" }}
                                                    <Button icon="pi pi-print"
                                                        class="p-button-rounded p-button-warning mr-2"
                                                        @click="editUser(searchOrderStock)" /> {{ "" }}
                                                    <Button icon="pi pi-pencil"
                                                        class="p-button-rounded p-button-success mr-2"
                                                        @click="editUser(searchOrderStock)" /> {{ "" }}
                                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                        @click="deleteUser(searchOrderStock)" /> {{ "" }}
                                                </template>
                                            </Column>

                                            <template #expansion="searchOrderStock12">
                                                <div class="orders-subtable">
                                                    <h5 style="margin-bottom:20px">DO No. Record for {{
                                                            searchOrderStock12.data.suppOrderNo
                                                    }}</h5>

                                                    <DataTable :value="searchOrderStock" :paginator="true" :rows="10"
                                                        v-model:expandedRows="expandedRows"
                                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">

                                                        <Column field="sto_Status" header="DO No.">
                                                            <template #body="searchOrderStock">

                                                                <p
                                                                    v-if="searchOrderStock.data.suppOrderNo === '#OpGwe2'">
                                                                    D0-00001</p>

                                                                <p
                                                                    v-if="searchOrderStock.data.suppOrderNo === '#hasASd'">
                                                                    D0-00002</p>
                                                            </template>
                                                        </Column>

                                                        <Column field="sto_Status" header="DO Datetime">
                                                            <template #body="searchOrderStock">
                                                                <p v-if="searchOrderStock.data.suppOrderNo">
                                                                    14/07/2022 18:32</p>
                                                            </template>
                                                        </Column>

                                                        <Column field="sto_Status" header="Total Price (RM)">
                                                            <template #body="searchOrderStock">
                                                                <p v-if="searchOrderStock.data.suppOrderNo">
                                                                    300.00</p>
                                                            </template>
                                                        </Column>

                                                        <Column field="sto_Status" header="Status">
                                                            <template #body="searchOrderStock">
                                                                <rs-badges variant="success"
                                                                    v-if="searchOrderStock.data.suppOrderStatusCode">
                                                                    Received</rs-badges>
                                                                {{ "" }}
                                                                <Button icon="pi pi-info"
                                                                    class="p-button-rounded p-button-info"
                                                                    style="width: 25px;height:25px"
                                                                    @click="clickBtnInfo()" />

                                                            </template>
                                                        </Column>
                                                        <Column :exportable="false" style="min-width: 8rem"
                                                            header="Actions">
                                                            <template #body="searchStore">
                                                                <!-- <Button icon="pi pi-pencil"
                                                                    class="p-button-rounded p-button-success mr-2"
                                                                    @click="clickBtnDO()">
                                                                    <vue-feather type="file-text"
                                                                        style="width: 17px;height:17px">
                                                                    </vue-feather>
                                                                </Button> {{ "" }} -->
                                                                <Button icon="pi pi-trash"
                                                                    class="p-button-rounded p-button-danger"
                                                                    @click="deleteUser(searchStore)" />


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

        <rs-modal title="Add Stock Order" v-model="modalRawMaterial" position="middle" size="lg">

            <rs-tab>
                <rs-tab-item title="Supplier">

                    <FormKit type="select" label="Supplier" :options="[
                        'Supplier A',
                        'Supplier B',
                        'Supplier C',
                    ]" />

                    <FormKit type="select" label="Type Store" :options="[
                        'HQ',
                        'Outlet',
                    ]" />

                    <FormKit type="select" label="Store" :options="[
                        'Store Shah Alam',
                        'Store Sg Besi',
                        'Store Sg Buloh',
                    ]" />

                    <FormKit type="textarea" label="Remarks" />

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
                                        <FormKit type="number" label="Quantity Order" />
                                    </td>
                                    <td>
                                        <FormKit type="text" label="Quantity Available" value="35" readonly />
                                    </td>
                                    <td>
                                        <FormKit type="text" label="Min. Quantity" value="5" readonly />
                                    </td>
                                    <td>
                                        <Button icon="pi pi-minus" class="p-button-rounded p-button-danger mx-2"
                                            @click="removeRawMaterial(l)"
                                            v-show="l || (!l && this.rawMaterial.length > 1)" />
                                    </td>
                                    <td>
                                        <Button icon="pi pi-plus" class="p-button-rounded p-button-success mx-5"
                                            @click="addRawMaterial(l)" v-show="l == this.rawMaterial.length - 1" />
                                    </td>
                                </tr>
                            </tbody>
                        </div>
                    </table>



                </rs-tab-item>
                <rs-tab-item title="Stock">
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
                                        <FormKit type="number" label="Quantity Order" />
                                    </td>
                                    <td>
                                        <FormKit type="text" label="Quantity Available" value="5" readonly />
                                    </td>
                                    <td>
                                        <Button icon="pi pi-minus" class="p-button-rounded p-button-danger mx-2"
                                            @click="removeRawMaterial(l)"
                                            v-show="l || (!l && this.rawMaterial.length > 1)" />
                                    </td>
                                    <td>
                                        <Button icon="pi pi-plus" class="p-button-rounded p-button-success mx-5"
                                            @click="addRawMaterial(l)" v-show="l == this.rawMaterial.length - 1" />
                                    </td>
                                </tr>
                            </tbody>
                        </div>
                    </table>

                    <FormKit type="select" label="Supplier" :options="[
                        'Supplier A',
                        'Supplier B',
                        'Supplier C',
                    ]" />

                    <FormKit type="select" label="Type Store" :options="[
                        'HQ',
                        'Outlet',
                    ]" />

                    <FormKit type="select" label="Store" :options="[
                        'Store Shah Alam',
                        'Store Sg Besi',
                        'Store Sg Buloh',
                    ]" />

                    <FormKit type="textarea" label="Remarks" />

                </rs-tab-item>
            </rs-tab>




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


        <rs-modal title="Status" v-model="modalStatus" position="middle" size="md">
            <FormKit type="select" label="Status" :options="[
                'Open',
                'Approved',
                'Accepted',
                'Delivery',
                'Received',
            ]" />

            <rs-button style="float: right" @click="insertRawMaterial()" class="bg-heandshe hover:bg-heandshe">
                Save
            </rs-button>
        </rs-modal>

        <rs-modal title="Info Timeline" v-model="modalInfo" position="middle" size="md">

            <p>2022-11-18 12:00 : <b>Open</b> (Staff A)</p>
            <p>2022-11-18 12:00 : <b>Approved</b> (Staff A)</p>
            <p>2022-11-18 13:00 : <b>Accepted</b> (Staff A)</p>
            <p>2022-11-18 14:00 : <b>Delivery</b> (Staff A)</p>
            <p>2022-11-18 15:00 : <b>Received</b> (Staff A)</p>
        </rs-modal>

        <rs-modal title="Confirm Delivery" v-model="modalDO" position="middle" size="md">

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
                                <FormKit type="number" label="Quantity Delivered" />
                            </td>
                            <td>
                                <FormKit type="text" label="Quantity DO" value="50" readonly />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <FormKit type="text" hidden />
                            </td>
                            <td>
                                <FormKit type="select" :options="[
                                    'Fanta 1.5L',
                                    'Pasta 1kg',
                                    'Coca Cola 1.5L',
                                    'Milo 1kg',
                                ]" />
                            </td>
                            <td>
                                <FormKit type="number" />
                            </td>
                            <td>
                                <FormKit type="text" value="50" readonly />
                            </td>
                        </tr>
                    </tbody>


                    <rs-button style="float: right" @click="insertRawMaterial()" class="bg-heandshe hover:bg-heandshe">
                        Save
                    </rs-button>

                </div>
            </table>
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
import Menu from '@/views/apps/administrator/adminSidemenu.vue';
import RsBadges from "@/components/Badges.vue";
import RsTab from "@/components/Tab.vue";
import RsTabItem from "@/components/TabItem.vue";

export default {
    name: "RawMaterial",
    components: {
        RsButton,
        DataTable,
        RsBadges,
        RsTab,
        RsTabItem,
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
                    orderStock.suppOrderNo.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    orderStock.suppOrderNo
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
            expandedRows: [],
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
            modalStatus: false,
            modalInfo: false,
            modalDO: false,

        };
    },
    async created() {
        this.getdata();
        this.getSupplierOrderByHq();
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

        async getSupplierOrderByHq() {
            var axios = require("axios");
            // var data = JSON.stringify({
            //     staffid: localStorage.staff,
            // });
            var config = {
                method: "get",
                url: process.env.VUE_APP_FNB_URL + "/getSupplierOrderByHq",
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
                            price += response.data.data[i].suppOrderTotalPrice;

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

        async clickBtnStatus() {
            // this.users1 = user.data;
            this.modalStatus = true;
        },

        async clickBtnInfo() {
            // this.users1 = user.data;
            this.modalInfo = true;
        },

        async clickBtnDO() {
            // this.users1 = user.data;
            this.modalDO = true;
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
                            this.getSupplierOrderByHq();
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
  