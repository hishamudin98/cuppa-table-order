<template>
    <rs-layout>
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
                        <div class="w-1/12" style="padding-top: 10px">
                            <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Order Stock
                            </rs-button>
                        </div>
                    </div>
                    <div class="">
                        <rs-card style="margin-top: 40px">
                            <div>
                                <div>
                                    <DataTable :value="searchPO" :paginator="true" :rows="10"
                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                        <Column field="po_Outlet" header="Outlet Name"></Column>
                                        <Column field="po_No" header="Order No."></Column>
                                        <Column field="po_Date" header="Order Datetime"></Column>
                                        <Column field="po_Remarks" header="Remarks"></Column>
                                        <Column field="po_TotalPrice" header="Total Order (RM)">
                                            <template #body="searchPO">
                                                {{
                                                        parseFloat(searchPO.data.po_TotalPrice).toFixed(2)
                                                }}
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

                                                <p v-if="searchPO"></p>
                                                <router-link
                                                    :to="{ name: 'order-stock-outlet-hq', params: { id: searchPO.data.po_No } }">
                                                    <Button icon="pi pi-truck" class="p-button-rounded p-button-info" />
                                                </router-link>
                                            </template>


                                        </Column>

                                        <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                            <template #body="searchPO">
                                                <Button icon="pi pi-pencil"
                                                    class="p-button-rounded p-button-success mr-2"
                                                    @click="editUser(searchPO)" /> {{ " " }}
                                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                    @click="deleteUser(searchPO)" />
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


        <rs-modal title="Info Timeline" v-model="modalInfo" position="middle" size="md">

            <p v-for="(status, l) in this.listTimelineStatus" :key="l">{{ status.timeline_date }} : <b>{{
                    status.timeline_statusName
            }}</b> ({{ status.timeline_staffName }})</p>
        </rs-modal>

        <rs-modal title="Status" v-model="modalStatus" position="middle" size="md">
            <FormKit type="select" label="Status" :options="this.listStatus" v-model="selectStatus" placeholder="Select Status" />

            <rs-button style="float: right" @click="updateStatus()"
                class="bg-heandshe hover:bg-heandshe">
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
    },
    setup() {
        const purchaseOrder = ref([]);
        const typePackaging = ref([]);
        const unitMeasurement = ref([]);
        const search = ref("");

        const searchPO = computed(() => {
            return purchaseOrder.value.filter((purchaseOrder) => {
                return (
                    purchaseOrder.po_No.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    purchaseOrder.po_No
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
            purchaseOrder,
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
            modalInfo: false,
            modalStatus: false,

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
        async clickBtnStatus(value) {
            this.modalStatus = true;
            this.selectPOId = value;
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
                        this.getPOHq();
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getPOHq() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "POST",
                url: process.env.VUE_APP_FNB_URL + "/admin/getPOHqOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log('response', response.data.data);
                        this.purchaseOrder = response.data.data;
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
                url: process.env.VUE_APP_FNB_URL + "/getStatusPOHq",
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
                            this.getPOHq();
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
  