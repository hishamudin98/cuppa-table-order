<template>
    <rs-layout>
        <div class="w-full flex flex-col">
            <div style="display: flex; flex-direction: row">

                <div class="w-full h-1/4 flex flex-col">
                    <div class="w-full flex flex-row mb-0">

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

                            <div class="w-1/12" style="">
                                <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Filter
                                </rs-button>
                            </div>

                        </div>
                        <div class="">
                            <rs-card style="margin-top: 40px">
                                <div>
                                    <div>
                                        <DataTable :value="searchPV" :paginator="true" :rows="10"
                                            v-model:expandedRows="expandedRows" @rowExpand="onRowExpand"
                                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                            <Column :expander="true" headerStyle="width: 3rem" />
                                            <Column field="pv_No" header="Payment Voucher No.">

                                            </Column>
                                            <Column field="pv_CreatedDate" header="Date">
                                            </Column>

                                            <Column field="staff_Name" header="Staff">
                                            </Column>
                                            <Column field="pv_TotalPrice" header="Total Price">
                                                <template #body="searchPV">
                                                    {{ parseFloat(searchPV.data.pv_TotalPrice).toFixed(2) }}
                                                </template>
                                            </Column>


                                            <Column field="invoice_Status" header="Status">
                                                <template #body="searchPV">
                                                    <rs-badges variant="warning" v-if="searchPV.data.pv_Status === '1'"
                                                        @click="clickBtnStatus(searchPV.data.pv_Id)">
                                                        Open</rs-badges>

                                                    <rs-badges variant="warning" v-if="searchPV.data.pv_Status === '2'"
                                                        @click="clickBtnStatus(searchPV.data.pv_Id)">
                                                        Approved</rs-badges>

                                                    <rs-badges variant="info" v-if="searchPV.data.pv_Status === '3'"
                                                        @click="clickBtnStatus(searchPV.data.pv_Id)">
                                                        Payment Ready</rs-badges>

                                                    <rs-badges variant="info" v-if="searchPV.data.pv_Status === '4'"
                                                        @click="clickBtnStatus(searchPV.data.pv_Id)">
                                                        Paid</rs-badges>

                                                    <rs-badges variant="danger" v-if="searchPV.data.pv_Status === '5'"
                                                        @click="clickBtnStatus(searchPV.data.pv_Id)">
                                                        Cancelled</rs-badges>

                                                    {{ "" }}
                                                    <Button icon="pi pi-info" class="p-button-rounded p-button-info"
                                                        style="width: 25px;height:25px"
                                                        @click="clickBtnInfo(searchPV.data.pv_Id)" />

                                                </template>

                                            </Column>

                                            <Column :exportable="false" header="Details">
                                                <template #body="searchPV">
                                                    <!-- <router-link
                                                        :to="{ name: 'hq-invoice-details', params: { id: searchPV.data.invoice_Id } }"> -->
                                                    <Button icon="pi pi-truck" class="p-button-rounded p-button-info"
                                                        @click="redirectPayment(searchPV.data.pv_Id)" />
                                                    <!-- </router-link> -->
                                                </template>
                                            </Column>

                                            <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                                <template #body="searchPV">

                                                    <Button icon="pi pi-dollar"
                                                        class="p-button-rounded p-button-warning mr-2"
                                                        @click="redirectPayment(searchPV.data.pv_Id)"
                                                        v-if="searchPV.data.pv_Status === '3'" /> {{ "" }}

                                                    <Button icon=" pi pi-print"
                                                        class="p-button-rounded p-button-warning mr-2"
                                                        @click="editUser(searchOrderStock)" /> {{ "" }}


                                                    <Button icon="pi pi-pencil"
                                                        class="p-button-rounded p-button-success mr-2"
                                                        @click="editUser(searchPV)" />{{ "" }}
                                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                        @click="deleteUser(searchPV)" />


                                                </template>
                                            </Column>


                                            <template #expansion="headerPV">
                                                <div class="orders-subtable">
                                                    <h5 style="margin-bottom:20px">Invoice No. Record for {{
        headerPV.data.pv_No
}}</h5>

                                                    <DataTable :value="resultFilter" :paginator="true" :rows="10"
                                                        v-model:expandedRows="expandedRows"
                                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">

                                                        <Column field="invoice_No" header="Invoice No.">
                                                        </Column>

                                                        <Column field="invoice_CreatedDate" header="Invoice Datetime">
                                                        </Column>

                                                        <Column field="invoice_TotalPrice" header="Total Price (RM)">
                                                            <template #body="resultFilter">
                                                                {{
        formatPrice(resultFilter.data.invoice_TotalPrice)
}}
                                                            </template>
                                                        </Column>

                                                        <Column field="invoice_Status" header="Status">
                                                            <template #body="resultFilter">
                                                                <rs-badges variant="warning"
                                                                    v-if="resultFilter.data.invoice_Status === '1'">
                                                                    Open</rs-badges>

                                                                <rs-badges variant="warning"
                                                                    v-if="resultFilter.data.invoice_Status === '2'">
                                                                    Approved</rs-badges>

                                                                <rs-badges variant="info"
                                                                    v-if="resultFilter.data.invoice_Status === '3'">
                                                                    Payment Ready</rs-badges>

                                                                <rs-badges variant="info"
                                                                    v-if="resultFilter.data.invoice_Status === '4'">
                                                                    Paid</rs-badges>

                                                                <rs-badges variant="danger"
                                                                    v-if="resultFilter.data.invoice_Status === '5'">
                                                                    Cancelled</rs-badges>

                                                                {{ "" }}
                                                                <Button icon="pi pi-info"
                                                                    class="p-button-rounded p-button-info"
                                                                    style="width: 25px;height:25px"
                                                                    @click="clickBtnInfo(resultFilter.data.invoice_Id)" />

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



        <rs-modal title="DO No." v-model="modalDO" position="middle" size="md">

            <p>2022-11-18 12:00 : <b>#ASDqwe</b> (Open)</p>
            <p>2022-11-18 12:00 : <b>#ASDqwe</b> (Approved)</p>
            <p>2022-11-18 13:00 : <b>#ASDqwe</b> (Received)</p>
        </rs-modal>

        <rs-modal title="Info Timeline" v-model="modalInfo" position="middle" size="md">

            <p v-for="(status, l) in this.listTimelineStatus" :key="l">{{ status.timeline_date }} : <b>{{
        status.timeline_statusName
}}</b> ({{ status.timeline_staffName }})</p>
        </rs-modal>

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
        const paymentVoucher = ref([]);
        const typePackaging = ref([]);
        const unitMeasurement = ref([]);
        const search = ref("");


        const searchPV = computed(() => {
            return paymentVoucher.value.filter((paymentVoucher) => {
                return (
                    paymentVoucher.pv_No.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    paymentVoucher.pv_No
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
            searchPV,
            paymentVoucher,
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
            name: null,
            sku: null,
            quantity: null,
            minquantity: null,
            price: null,
            packaging_type: null,
            measurement: null,
            modalPV: false,
            modalDO: false,
            modalStatus: false,
            modalInfo: false,

            selectInvoice: null,
            listSelectInvoice: [],
            listInvoice: [],
            listInvoiceItem: [],
            item: [],
            selectInvoiceNo: [],
            pic_name: null,
            pic_phone: null,
            pic_email: null,

            headerPV: [],
            resultFilter: [],
            listInv: [],

            listTimelineStatus: [],
            listStatus: [],
            selectPVId: null,
            selectStatus: null,

        };
    },
    async created() {
        this.getdata();
    },

    methods: {


        async clickBtnStatus() {
            // this.users1 = user.data;
            // this.modalStatus = true;
        },

        async clickBtnInfo(value) {
            // this.users1 = user.data;
            this.modalInfo = true;
            this.listTimelineStatus = [];

            var axios = require("axios");
            var data = JSON.stringify({
                pvId: value
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getTimelineStatusPaymentVoucher",
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

        async redirectPayment(value) {

            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                pvId: value,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/completePaymentVoucher",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        // console.log("paymentVoucher", response.data.data);
                        // this.paymentVoucher = response.data.data;
                        window.location.assign(response.data.data);
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },


        async getPV() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getPaymentVoucher",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log("paymentVoucher", response.data.data);
                        this.paymentVoucher = response.data.data;
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
                        this.staffId = response.data.data[0].staff_id;
                        this.getPV();
                        this.getInvoiceByPV();
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getInvoiceByPV() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getInvoiceByPV",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        this.listInv = response.data.data;
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        onRowExpand(event) {
            this.resultFilter = this.listInv.filter((item) => {
                // console.log("item", item);
                if (item.pv_Id == event.data.pv_Id) {
                    return item;
                }
            });

            this.headerPV = this.resultFilter;
        },


        async clickBtnAdd() {
            // this.users1 = user.data;
            this.modalPV = true;
        },

        async clickBtnDO() {
            // this.users1 = user.data;
            this.modalDO = true;
        },

    },
};
</script>
<style src="@vueform/multiselect/themes/default.css">

</style>