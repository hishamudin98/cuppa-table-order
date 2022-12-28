<template>
    <rs-layout>
        <div style="display: flex; flex-direction: row">

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
                            <FormKit v-model="search" id="search-sticky" placeholder="Search" type="search" :classes="{
                                inner:
                                    'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
                                outer: 'flex-1 mb-0',
                                input: 'h-10',
                            }" />
                        </div>
                        <div class="w-1/12" style="">
                            <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add PO
                            </rs-button>
                        </div>
                    </div>
                    <div class="">
                        <rs-card style="margin-top: 40px">
                            <div>
                                <div>
                                    <DataTable :value="searchPO" :paginator="true" :rows="10"
                                        v-model:expandedRows="expandedRows" @rowExpand="onRowExpand"
                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                        <Column :expander="true" headerStyle="width: 3rem" />
                                        <Column field="po_No" header="Order No."></Column>
                                        <Column field="supplier_Name" header="Order To">
                                            <template #body="searchPO">
                                                <p v-if="searchPO.data.po_Supplier == null">
                                                    HQ</p>
                                                <p v-else>
                                                    {{ searchPO.data.po_Supplier }}</p>
                                            </template>
                                        </Column>
                                        <Column field="po_Date" header="Order Datetime">
                                            <template #body="searchPO">
                                                <p>
                                                    {{ searchPO.data.po_Date }}</p>
                                            </template>
                                        </Column>
                                        <Column field="po_Remarks" header="Remarks"></Column>
                                        <Column field="po_TotalPrice" header="Total Order (RM)">
                                            <template #body="searchPO">
                                                {{
                                                        formatPrice(searchPO.data.po_TotalPrice)
                                                }}
                                            </template>
                                        </Column>

                                        <Column field="staff_Name" header="Staff">
                                            <template #body="searchPO">
                                                <p>
                                                    {{ searchPO.data.staff_Name }}</p>
                                            </template>

                                        </Column>

                                        <Column field="po_Status" header="Status">
                                            <template #body="searchPO">
                                                <rs-badges variant="warning" v-if="searchPO.data.po_Status === '1'"
                                                    @click="clickBtnStatus(searchPO.data.po_Id)">
                                                    Open</rs-badges>

                                                <rs-badges variant="warning" v-if="searchPO.data.po_Status === '2'"
                                                    @click="clickBtnStatus(searchPO.data.po_Id)">
                                                    Approved</rs-badges>

                                                <rs-badges variant="warning" v-if="searchPO.data.po_Status === '3'"
                                                    @click="clickBtnStatus(searchPO.data.po_Id)">
                                                    Accepted</rs-badges>

                                                <rs-badges variant="info" v-if="searchPO.data.po_Status === '4'"
                                                    @click="clickBtnStatus(searchPO.data.po_Id)">
                                                    Delivery</rs-badges>

                                                <rs-badges variant="success" v-if="searchPO.data.po_Status === '5'"
                                                    @click="clickBtnStatus(searchPO.data.po_Id)">
                                                    Partial Delivered</rs-badges>

                                                <rs-badges variant="success" v-if="searchPO.data.po_Status === '6'"
                                                    @click="clickBtnStatus(searchPO.data.po_Id)">
                                                    Completed</rs-badges>

                                                <rs-badges variant="success" v-if="searchPO.data.po_Status === '7'"
                                                    @click="clickBtnStatus(searchPO.data.po_Id)">
                                                    Cancelled</rs-badges>

                                                {{ "" }}
                                                <Button icon="pi pi-info" class="p-button-rounded p-button-info"
                                                    style="width: 25px;height:25px"
                                                    @click="clickBtnInfo(searchPO.data.po_Id)" />
                                            </template>

                                        </Column>

                                        <Column :exportable="false" header="Details">

                                            <template #body="searchPO">

                                                <router-link
                                                    :to="{ name: 'details-purchase-order-outlet', params: { id: searchPO.data.po_No } }">
                                                    <Button icon="pi pi-truck" class="p-button-rounded p-button-info" />
                                                </router-link>
                                            </template>


                                        </Column>

                                        <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                            <template #body="searchPO">

                                                <Button icon="pi pi-send" class="p-button-rounded p-button-warning mr-2"
                                                    @click="editUser(searchPO)" /> {{ "" }}
                                                <Button icon="pi pi-print"
                                                    class="p-button-rounded p-button-warning mr-2"
                                                    @click="editUser(searchPO)" /> {{ "" }}
                                                <Button icon="pi pi-pencil"
                                                    class="p-button-rounded p-button-success mr-2"
                                                    @click="editUser(searchPO)" /> {{ "" }}
                                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                    @click="deleteUser(searchPO)" /> {{ "" }}
                                            </template>
                                        </Column>

                                        <template #expansion="headerPO">
                                            <div class="orders-subtable">
                                                <h5 style="margin-bottom:20px">DO No. Record for {{
                                                        headerPO.data.po_No
                                                }}</h5>

                                                <DataTable :value="resultFilter" :paginator="true" :rows="10"
                                                    v-model:expandedRows="expandedRows"
                                                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                    :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">

                                                    <Column field="do_No" header="DO No.">
                                                    </Column>

                                                    <Column field="do_CreatedDate" header="DO Datetime">
                                                    </Column>

                                                    <Column field="do_TotalPrice" header="Total Price (RM)">
                                                        <template #body="resultFilter">
                                                            {{
                                                                    formatPrice(resultFilter.data.do_TotalPrice)
                                                            }}
                                                        </template>
                                                    </Column>

                                                    <Column field="do_Status" header="Status DO">
                                                        <template #body="searchDO">
                                                            <rs-badges variant="warning"
                                                                v-if="searchDO.data.do_Status === '1'"
                                                                @click="clickBtnStatus(searchDO.data.do_Id)">
                                                                Open</rs-badges>

                                                            <rs-badges variant="warning"
                                                                v-if="searchDO.data.do_Status === '2'"
                                                                @click="clickBtnStatus(searchDO.data.do_Id)">
                                                                Approved</rs-badges>

                                                            <rs-badges variant="info"
                                                                v-if="searchDO.data.do_Status === '3'"
                                                                @click="clickBtnStatus(searchDO.data.do_Id)">
                                                                Delivery</rs-badges>

                                                            <rs-badges variant="success"
                                                                v-if="searchDO.data.do_Status === '4'"
                                                                @click="clickBtnStatus(searchDO.data.do_Id)">
                                                                Completed</rs-badges>

                                                            <rs-badges variant="success"
                                                                v-if="searchDO.data.do_Status === '5'"
                                                                @click="clickBtnStatus(searchDO.data.do_Id)">
                                                                Cancelled</rs-badges>

                                                        </template>
                                                    </Column>
                                                    <Column :exportable="false" style="min-width: 8rem"
                                                        header="Actions">
                                                        <template #body="searchStore">
                                                            <Button icon="pi pi-pencil"
                                                                class="p-button-rounded p-button-success mr-2"
                                                                @click="clickBtnDO()">
                                                                <vue-feather type="file-text"
                                                                    style="width: 17px;height:17px">
                                                                </vue-feather>
                                                            </Button> {{ "" }}
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

        <rs-modal title="Add Purchase Order" v-model="modalPO" position="middle" size="lg">
            <FormKit v-model="selectType" type="radio" label="Order To" :options="[
                { label: 'HQ', value: 1 },
                { label: 'Supplier', value: 3 },
            ]" />

            <div v-if="this.selectType == 1">
                <FormKit type="select" label="Store" v-model="selectStoreHq" :options="this.listStoreOutlet"
                    placeholder="Select Store" />
                <FormKit type="textarea" label="Remarks" v-model="remarksHq" />

                <table>
                    <div v-for="(rm, l) in this.rawMaterial" :key="l">
                        <tbody>
                            <tr v-for="(purchase, index) in this.listPurchase" :key="index">
                                <td>
                                    <FormKit type="text" label="Stock Name" v-model="this.listPurchase[index].rm_Name"
                                        :value=this.listPurchase[index].rm_Name readonly />
                                </td>
                                <td>
                                    <FormKit type="number" label="Quantity Order"
                                        v-model="this.listPurchase[index].rm_QuantityRequested" />
                                </td>
                                <td>
                                    <FormKit type="text" label="Quantity Available"
                                        v-model="this.listPurchase[index].rm_Quantity"
                                        :value=this.listPurchase[index].rm_Quantity readonly />
                                </td>
                                <td>
                                    <FormKit type="text" label="Min. Quantity"
                                        v-model="this.listPurchase[index].rm_MinQuantity"
                                        :value=this.listPurchase[index].rm_MinQuantity readonly />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <FormKit type="select" label="Stock Name" placeholder="Select Stock"
                                        v-model="selectRawMaterial" :options="this.listRawMaterialHq" />
                                </td>
                                <td v-if="selectRawMaterial">
                                    <Button icon="pi pi-minus" class="p-button-rounded p-button-danger mx-2"
                                        @click="removeRawMaterial(l, selectRawMaterial)"
                                        v-show="l || (!l && this.rawMaterial.length > 1)" />
                                </td>
                                <td v-if="selectRawMaterial">
                                    <Button icon="pi pi-plus" class="p-button-rounded p-button-success mx-2"
                                        @click="addRawMaterial(l, selectRawMaterial)"
                                        v-show="l == this.rawMaterial.length - 1" />
                                </td>
                            </tr>
                        </tbody>
                    </div>
                </table>
            </div>

            <div v-if="this.selectType == 3">
                <FormKit type="select" label="Supplier" v-model="selectSupplier" :options="this.listSupplier"
                    placeholder="Select Supplier" @change="getRawMaterialBySupplierId()" />

                <FormKit type="select" label="Store" v-model="selectStoreOutlet" :options="this.listStoreOutlet"
                    placeholder="Select Store" />
                <FormKit type="textarea" label="Remarks" v-model="remarksOutlet" />

                <table>
                    <div v-for="(rm, l) in this.rawMaterial" :key="l">
                        <tbody>
                            <tr>
                                <td>
                                    <FormKit type="select" label="Stock Name" placeholder="Select Stock"
                                        v-model="selectRawMaterial" :options="this.listRawMaterialSupplier" />
                                </td>
                                <td>
                                    <FormKit type="number" label="Quantity" />
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
            </div>



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

            <rs-button style="float: right" @click="insertPO()" class="bg-heandshe hover:bg-heandshe">
                Save
            </rs-button>
        </rs-modal><!-- INSERT -->


        <rs-modal title="Status" v-model="modalStatus" position="middle" size="md">
            <FormKit type="select" label="Status" :options="this.listStatus" v-model="selectStatus"
                placeholder="Select Status" />

            <rs-button style="float: right" @click="updateStatus()" class="bg-heandshe hover:bg-heandshe">
                Save
            </rs-button>
        </rs-modal>

        <rs-modal title="Info Timeline" v-model="modalInfo" position="middle" size="md">

            <p v-for="(status, l) in this.listTimelineStatus" :key="l">{{ status.timeline_date }} : <b>{{
                    status.timeline_statusName
            }}</b> ({{ status.timeline_staffName }})</p>
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


                    <rs-button style="float: right" @click="insertPO()" class="bg-heandshe hover:bg-heandshe">
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
        const listPurchaseOrder = ref([]);
        const typePackaging = ref([]);
        const unitMeasurement = ref([]);
        const search = ref("");

        const searchPO = computed(() => {
            return listPurchaseOrder.value.filter((listPurchaseOrder) => {
                return (
                    listPurchaseOrder.po_No.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    listPurchaseOrder.po_No
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
            searchPO,
            listPurchaseOrder,
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
            rawMaterial: [{
                type: "",
            }],

            selectSupplier: null,
            selectStore: null,
            selectOutlet: null,
            selectType: null,
            selectStoreHq: null,
            selectStoreOutlet: null,
            selectRawMaterial: null,
            remarksHq: null,
            remarksOutlet: null,

            modalPO: false,
            modalStatus: false,
            modalInfo: false,
            modalDO: false,

            listSupplier: [],
            listStore: [],
            listStoreOutlet: [],
            listRawMaterialHq: [],
            listRawMaterialSupplier: [],
            listPurchase: [],
            listAllData: [],
            headerPO: [],
            resultFilter: [],
            listDO: [],
            listTimelineStatus: [],

            listStatus: [],
            selectPOId: null,
            selectStatus: null,
        };
    },
    async created() {
        this.getdata();
        this.getTypePackaging();
        this.getUnitMeasurement();
        this.getStatusPO();
    },

    methods: {
        async papar() {
            this.order1 = true;
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
                        this.staffId = response.data.data[0].staff_id;
                        this.getStoreOutlet();
                        this.getSupplier();
                        this.getPOOutlet();
                        this.getRawMaterialHq();
                        this.getDOByOrderHqOutlet();
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

        async getStatusPO() {
            var axios = require("axios");
            var config = {
                method: "get",
                url: process.env.VUE_APP_FNB_URL + "/getStatusPOOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios(config)
                .then(
                    function (response) {

                        for (let i = 0; i < response.data.data.length; i++) {
                            this.listStatus.push({
                                label: response.data.data[i].title,
                                value: response.data.data[i].id,
                            });
                        }
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

        async getPOOutlet() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "POST",
                url: process.env.VUE_APP_FNB_URL + "/admin/getPO",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log("resp", response.data.data);
                        this.listPurchaseOrder = response.data.data;
                        this.totalData = this.listPurchaseOrder.length;

                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async clickBtnAdd() {
            // this.users1 = user.data;
            this.modalPO = true;
        },

        async clickBtnStatus(value) {
            // this.users1 = user.data;
            this.modalStatus = true;
            this.selectPOId = value;

        },

        async updateStatus() {

            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                poId: this.selectPOId,
                status: this.selectStatus,
            });

            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/updateStatusPO",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        if (response.data.status == 200) {
                            this.modalStatus = false;
                            alert(response.data.message);
                            this.getPOOutlet();
                        } else {
                            alert(response.data.message);
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },


        async clickBtnInfo(value) {

            this.modalInfo = true;
            this.listTimelineStatus = [];

            var axios = require("axios");
            var data = JSON.stringify({
                poId: value
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getTimelineStatusPOOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log('response status', response.data.data);
                        this.listTimelineStatus = response.data.data;
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async clickBtnDO() {
            // this.users1 = user.data;
            this.modalDO = true;
        },

        async insertPO() {

            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                order: this.listPurchase,
                remarks: this.remarksHq ? this.remarksHq : this.remarksOutlet,
                supplier: this.selectSupplier ? this.selectSupplier : null,
                orderTo: this.selectType,
                store: this.selectStoreHq ? this.selectStoreHq : this.selectStoreOutlet,


            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/outlet/insertPO",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        if (response.data.status == 200) {
                            this.modalPO = false;
                            alert(response.data.message);
                            this.getPOOutlet();
                        } else {
                            alert(response.data.message);
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getSupplier() {
            var axios = require("axios");
            var data = JSON.stringify({
                rawMaterialId: null,
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getSupplier",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {

                        for (let i = 0; i < response.data.data.length; i++) {
                            this.listSupplier.push({
                                label: response.data.data[i].sup_Name,
                                value: response.data.data[i].sup_Id,
                            });
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getRawMaterialBySupplierId() {
            var axios = require("axios");
            var data = JSON.stringify({
                supplierId: this.selectSupplier
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getRawMaterialBySupplier",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log('response', response);
                        this.listRawMaterialSupplier = [];
                        for (let i = 0; i < response.data.data.length; i++) {
                            this.listRawMaterialSupplier.push({
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

        async getRawMaterialHq() {
            this.listRawMaterialHq = [];
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                supplierId: this.selectSupplier,
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
                        this.listAllData = response.data.data;

                        console.log("listAllData : ", this.listAllData);

                        for (let i = 0; i < response.data.data.length; i++) {
                            this.listRawMaterialHq.push({
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

        async getDOByOrderHqOutlet() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getDOByPOHqOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        this.listDO = response.data.data;
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        onRowExpand(event) {

            this.resultFilter = this.listDO.filter((item) => {
                // console.log("item", item);
                if (item.po_Id == event.data.po_Id) {
                    return item;
                }
            });

            this.headerPO = this.resultFilter;
        },

        addRawMaterial(index, rawMaterialId) {
            this.counter++;
            console.log("ADD", index, rawMaterialId);
            let rawMaterial = this.listAllData.find((item) => item.rm_Id == rawMaterialId);
            this.listPurchase.push({
                rm_Id: rawMaterial.rm_Id,
                rm_Name: rawMaterial.rm_Name,
                rm_Quantity: rawMaterial.rm_Quantity,
                rm_MinQuantity: rawMaterial.rm_MinQuantity,
                rm_Price: rawMaterial.rm_Price,
                rm_QuantityRequested: null,
            });
        },
        removeRawMaterial(index, rawMaterialId) {
            this.counter--;
            console.log("REMOVE", index, rawMaterialId);
            this.rawMaterial.splice(index, 1);
        },
    },


};
</script>
<style src="@vueform/multiselect/themes/default.css">

</style>
  