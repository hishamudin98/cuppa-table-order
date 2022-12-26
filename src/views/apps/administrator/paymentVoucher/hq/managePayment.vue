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
                                <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Payment
                                    Voucher
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
                                                    <rs-badges variant="warning" v-if="searchPV.data.pv_Status == '1'"
                                                        @click="clickBtnStatus()">
                                                        Approved</rs-badges>
                                                    {{ "" }}
                                                    <Button icon="pi pi-info" class="p-button-rounded p-button-info"
                                                        style="width: 25px;height:25px" @click="clickBtnInfo()" />
                                                    <p v-if="searchPV.data.pv_Status === '2'">Inactive</p>
                                                </template>

                                            </Column>

                                            <Column :exportable="false" header="Details">
                                                <template #body="searchPV">
                                                    <p v-if="searchPV.data.rm_Status === '1'" hidden>
                                                        Level 1
                                                    </p>
                                                    <!-- <router-link
                                                        :to="{ name: 'hq-invoice-details', params: { id: searchPV.data.invoice_Id } }"> -->
                                                    <Button icon="pi pi-truck" class="p-button-rounded p-button-info" />
                                                    <!-- </router-link> -->
                                                </template>
                                            </Column>

                                            <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                                <template #body="searchPV">

                                                    <Button icon="pi pi-dollar"
                                                        class="p-button-rounded p-button-warning mr-2"
                                                        @click="redirectPayment()" />{{ "" }}

                                                    <Button icon="pi pi-print"
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

        <rs-modal title="Add Payment Voucher" v-model="modalPV" position="middle" size="lg">
            <FormKit label="PIC Name" type="text" v-model="pic_name" />
            <FormKit label="PIC Phone No." type="text" v-model="pic_phone" />
            <FormKit label="PIC Email" type="email" v-model="pic_email" />
            <FormKit type="select" label="Outlet" v-model="selectOutlet" placeholder="Select Outlet"
                :options="this.listOutlet" @change="getInvoiceNo()" />

            <label>Invoice</label>
            <Multiselect v-model="selectInvoice" mode="tags" :close-on-select="false" :searchable="true"
                :create-option="true" :options="this.listInvoice" @select="papar(selectInvoice)"
                @deselect="padamInvoice(selectInvoice)" @clear="padam()" />
            <br />

            <div v-for="(rm, l) in this.selectInvoice" :key="l">
                <table class="border-2">
                    <tr>
                        <th class="float-left ml-3 mb-3 text-lg">{{ this.selectInvoiceNo[l] }}</th>
                    </tr>
                    <tr>
                        <div class="flex flex-row" v-for="(item, index) in this.listSelectInvoice" :key="index">
                            <div>
                                <FormKit type="text" label="Stock Name" v-model="this.item[l][index].rm_Name"
                                    :value=this.item[l][index].rm_Name readonly />
                            </div>
                            <div>
                                <FormKit type="number" label="Quantity To Pay"
                                    v-model="this.item[l][index].rm_QuantityRequested"
                                    :value=this.item[l][index].rm_QuantityRequested />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity in Invoice"
                                    v-model="this.item[l][index].rm_Quantity" :value=this.item[l][index].rm_QuantityDO
                                    readonly />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity Available"
                                    v-model="this.item[l][index].rm_QuantityHq" :value=this.item[l][index].rm_QuantityHq
                                    readonly />
                            </div>
                            <div>
                                <FormKit type="text" label="Min. Quantity"
                                    v-model="this.item[l][index].rm_MinQuantityHq"
                                    :value=this.item[l][index].rm_MinQuantityHq readonly />
                            </div>
                        </div>
                    </tr>
                </table>
            </div>
            <rs-button style="float: right" @click="insertPV()" class="bg-heandshe hover:bg-heandshe">
                Save
            </rs-button>
        </rs-modal><!-- INSERT -->

        <rs-modal title="DO No." v-model="modalDO" position="middle" size="md">

            <p>2022-11-18 12:00 : <b>#ASDqwe</b> (Open)</p>
            <p>2022-11-18 12:00 : <b>#ASDqwe</b> (Approved)</p>
            <p>2022-11-18 13:00 : <b>#ASDqwe</b> (Received)</p>
        </rs-modal>

        <rs-modal title="Info Timeline" v-model="modalInfo" position="middle" size="md">

            <p>2022-11-18 12:00 : <b>Open</b> (Staff A)</p>
            <p>2022-11-18 12:00 : <b>Approved</b> (Staff A)</p>
            <p>2022-11-18 13:00 : <b>Accepted</b> (Staff A)</p>
            <p>2022-11-18 14:00 : <b>Delivery</b> (Staff A)</p>
            <p>2022-11-18 15:00 : <b>Received</b> (Staff A)</p>
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
import Multiselect from "@vueform/multiselect";

export default {
    name: "RawMaterial",
    components: {
        RsButton,
        RsBadges,
        DataTable,
        RsModal,
        Column,
        Button,
        Multiselect,

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
            selectOutlet: null,
            listOutlet: [],

            headerPV: [],
            resultFilter: [],
            listInv: [],
        };
    },
    async created() {
        this.getdata();
    },

    methods: {
        async papar(inv_id) {

            this.listSelectInvoice = [];
            this.item = [];
            this.selectInvoiceNo = [];

            let rawMaterial = null;

            console.log("listInvoiceItem", this.listInvoiceItem);
            console.log("inv_id", inv_id);

            for (var i = 0; i < inv_id.length; i++) {
                rawMaterial = this.listInvoiceItem.filter((item) => {
                    return item.invoice_Id == inv_id[i];
                });

                this.selectInvoiceNo.push(rawMaterial[0].invoice_No);
                this.listSelectInvoice = [];

                for (let i = 0; i < rawMaterial.length; i++) {

                    this.listSelectInvoice.push({
                        rm_Id: rawMaterial[i].rm_Id,
                        rm_Name: rawMaterial[i].rm_Name,
                        rm_Quantity: rawMaterial[i].rm_QuantityInvoice,
                        rm_Price: rawMaterial[i].rm_PriceInvoice,
                        rm_QuantityRequested: rawMaterial[i].rm_QuantityInvoice,
                        rm_QuantityHq: rawMaterial[i].rm_QuantityHq,
                        rm_MinQuantityHq: rawMaterial[i].rm_MinQuantityHq,
                        invoice_Id: rawMaterial[i].invoice_Id,
                        invoice_No: rawMaterial[i].invoice_No,
                        item_InvoiceHqOutletId: rawMaterial[i].item_InvoiceHqOutletId,

                    });

                }
                this.item.push(this.listSelectInvoice);
            }
        },

        async padam() {
            this.order1 = false;
            this.order2 = false;
        },

        async clickBtnStatus() {
            // this.users1 = user.data;
            this.modalStatus = true;
        },

        async clickBtnInfo() {
            // this.users1 = user.data;
            this.modalInfo = true;
        },

        async redirectPayment() {
            window.location.href = "https://dev1.toyyibpay.com/dev1-iserve-ewallet";
        },

        async getInvoiceNo() {
            this.listInvoice = [];
            this.listSelectInvoice = [];
            this.item = [];
            this.selectInvoiceNo = [];
            this.padam();

            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                outletId: this.selectOutlet,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getInvoiceByOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        for (let i = 0; i < response.data.data.length; i++) {
                            this.listInvoice.push({
                                label: response.data.data[i].invoice_No,
                                value: response.data.data[i].invoice_Id,
                            });
                        }
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

        async getInvoiceItem() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getInvoiceItem",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log("listInvoiceItem", response.data.data);
                        this.listInvoiceItem = response.data.data;
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
                        this.getInvoiceItem();
                        this.getPV();
                        this.getOutlet();
                        this.getInvoiceByPV();
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

        async clickBtnAdd() {
            // this.users1 = user.data;
            this.modalPV = true;
        },

        async clickBtnDO() {
            // this.users1 = user.data;
            this.modalDO = true;
        },

        async insertPV() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                picname: this.pic_name,
                picphone: this.pic_phone,
                picemail: this.pic_email,
                outletId: this.selectOutlet,
                order: this.item,
            });
            console.log("Insert data :", data);
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/insertPVOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        if (response.data.status == 200) {
                            this.modalPV = false;
                            alert(response.data.message);
                            this.getPV();

                        } else {
                            alert(response.data.message);
                        }
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
                        console.log("listInv", response.data.data);
                        this.listInv = response.data.data;
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        onRowExpand(event) {
            console.log("this.listInv", this.listInv);
            this.resultFilter = this.listInv.filter((item) => {
                // console.log("item", item);
                if (item.pv_Id == event.data.pv_Id) {
                    return item;
                }
            });

            this.headerPV = this.resultFilter;
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
<style src="@vueform/multiselect/themes/default.css">

</style>