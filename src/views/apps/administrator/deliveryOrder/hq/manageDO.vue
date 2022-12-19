<template>
    <rs-layout>

        <div style="display: flex; flex-direction: row">

            <div class="w-full h-1/4 flex flex-col">
                <div class="w-full flex flex-row mb-0">

                </div>
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
                            <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add DO
                            </rs-button>
                        </div>

                    </div>
                    <div class="">
                        <rs-card style="margin-top: 40px">
                            <div>
                                <div>
                                    <DataTable :value="searchDO" :paginator="true" :rows="10"
                                        v-model:expandedRows="expandedRows"
                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                        <Column :expander="true" headerStyle="width: 3rem" />
                                        <Column field="do_No" header="DO No.">
                                        </Column>
                                        <Column field="do_CreatedDate" header="Date">
                                        </Column>

                                        <Column field="staff_Name" header="Staff">
                                        </Column>

                                        <Column field="do_TotalPrice" header="Total Price">
                                            <template #body="searchDO">
                                                {{ formatPrice(searchDO.data.do_TotalPrice) }}
                                            </template>
                                        </Column>




                                        <Column field="sto_Status" header="Status">
                                            <template #body="searchDO">
                                                <rs-badges variant="warning" v-if="searchDO.data.do_Status"
                                                    @click="clickBtnStatus()">
                                                    Approved</rs-badges>
                                                {{ "" }}
                                                <Button icon="pi pi-info" class="p-button-rounded p-button-info"
                                                    style="width: 25px;height:25px" @click="clickBtnInfo()" />
                                                <p v-if="searchDO.data.sto_Status === '2'">Inactive</p>
                                            </template>

                                        </Column>

                                        <Column field="do_PIC" header="PIC Name">
                                        </Column>

                                        <Column field="do_PICPhoneNo" header="PIC Phone No.">
                                        </Column>

                                        <Column :exportable="false" header="Details">
                                            <template #body="searchDO">
                                                <p v-if="searchDO.data.do_Status === '1'" hidden>Level 1</p>
                                                <router-link
                                                    :to="{ name: 'manage-delivery-order-details', params: { id: searchDO.data.do_Id } }">
                                                    <Button icon="pi pi-truck" class="p-button-rounded p-button-info" />
                                                </router-link>
                                            </template>
                                        </Column>

                                        <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                            <template #body="searchDO">
                                                <Button icon="pi pi-print"
                                                    class="p-button-rounded p-button-warning mr-2"
                                                    @click="editUser(searchOrderStock)" /> {{ "" }}
                                                <Button icon="pi pi-pencil"
                                                    class="p-button-rounded p-button-success mr-2"
                                                    @click="editUser(searchDO)" /> {{ "" }}
                                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                    @click="deleteUser(searchDO)" />


                                            </template>
                                        </Column>


                                        <template #expansion="searchDO12">
                                            <div class="orders-subtable">
                                                <h5 style="margin-bottom:20px">Order No. Record for D0-00001 {{
                                                        searchDO12.data.sto_Status2
                                                }}</h5>

                                                <DataTable :value="searchDO" :paginator="true" :rows="10"
                                                    v-model:expandedRows="expandedRows"
                                                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                    :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">

                                                    <Column field="sto_Status" header="Order No.">

                                                        <template #body="searchDO">
                                                            <p v-if="searchDO.data.sto_Name === 'Store A'">
                                                                #QwDer</p>
                                                            <p v-if="searchDO.data.sto_Name === 'Store B'">
                                                                #ASDqwe</p>
                                                        </template>

                                                    </Column>

                                                    <Column field="sto_Status" header="Order Datetime">
                                                        <template #body="searchDO">
                                                            <p v-if="searchDO.data.sto_Name === 'Store A'">
                                                                14/07/2022 12:00</p>
                                                            <p v-if="searchDO.data.sto_Name === 'Store B'">
                                                                15/07/2022 12:00</p>
                                                        </template>
                                                    </Column>

                                                    <Column field="sto_Status" header="Remarks">
                                                        <template #body="searchDO">
                                                            <p v-if="searchDO.data.sto_Status == '1'">
                                                                Wrap </p>
                                                        </template>
                                                    </Column>

                                                    <Column field="sto_Status" header="Status Delivery">
                                                        <template #body="searchDO">
                                                            <rs-badges variant="warning"
                                                                v-if="searchDO.data.sto_Status">
                                                                Prepairing</rs-badges>
                                                            {{ "" }}
                                                            <Button icon="pi pi-info"
                                                                class="p-button-rounded p-button-info"
                                                                style="width: 25px;height:25px"
                                                                @click="clickBtnInfo()" />
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

        <rs-modal title="Add DO" v-model="modalDO" position="middle" size="lg">
            <FormKit label="PIC Name" type="text" v-model="pic_name" />
            <FormKit label="PIC Phone No." type="text" v-model="pic_phone" />
            <FormKit type="select" label="Outlet Name" placeholder="Select Outlet" v-model="selectOutlet"
                :options="this.listOutlet" @change="getPOOutlet()" />

            <label>Order No.</label>
            <Multiselect v-model="selectPO" mode="tags" :close-on-select="false" :searchable="true"
                :create-option="true" :options="this.listPO" @select="papar(selectPO)"
                @deselect="padamOrderNo(selectPO)" @clear="padam()" />


            <div v-for="(rm, l) in this.selectPO" :key="l">
                <table class="border-2">
                    <tr>
                        <th class="float-left ml-3 mb-3 text-lg">{{ this.selectOrderNo[l] }}</th>
                    </tr>
                    <tr>
                        <div class="flex flex-row" v-for="(item, index) in this.listSelectPO" :key="index">
                            <div>
                                <FormKit type="text" label="Stock Name" v-model="this.item[l][index].rm_Name"
                                    :value=this.item[l][index].rm_Name readonly />
                            </div>
                            <div>
                                <FormKit type="number" label="Quantity DO"
                                    v-model="this.item[l][index].rm_QuantityRequested"
                                    :value=this.item[l][index].rm_QuantityRequested />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity PO" v-model="this.item[l][index].rm_Quantity"
                                    :value=this.item[l][index].rm_Quantity readonly />
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

            <br />

            <rs-button style="float: right" @click="insertDO()" class="bg-heandshe hover:bg-heandshe">
                Save
            </rs-button>
        </rs-modal><!-- INSERT -->

        <rs-modal title="DO No." v-model="modalStatusDO" position="middle" size="md">

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
        const deliveryOrder = ref([]);
        const typePackaging = ref([]);
        const unitMeasurement = ref([]);
        const search = ref("");

        const searchDO = computed(() => {
            return deliveryOrder.value.filter((deliveryOrder) => {
                return (
                    deliveryOrder.do_No.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    deliveryOrder.do_No
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
            searchDO,
            deliveryOrder,
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
            modalDO: false,
            modalStatusDO: false,
            modalInfo: false,
            modalStatus: false,

            order1: false,
            order2: false,

            selectPO: null,
            listSelectPO: [],
            listPO: [],
            listPOItem: [],
            item: [],
            selectOrderNo: [],
            listOutlet: [],
            selectOutlet: null,
            pic_name: null,
            pic_phone: null,
        };
    },
    async created() {
        this.getdata();
    },

    methods: {
        async papar(PO_id) {

            this.listSelectPO = [];
            this.item = [];
            this.selectOrderNo = [];

            let rawMaterial = null;

            for (var i = 0; i < PO_id.length; i++) {
                rawMaterial = this.listPOItem.filter((item) => {
                    return item.po_id == PO_id[i];
                });

                this.selectOrderNo.push(rawMaterial[0].po_No);
                this.listSelectPO = [];

                for (let i = 0; i < rawMaterial.length; i++) {

                    this.listSelectPO.push({
                        rm_Id: rawMaterial[i].rm_Id,
                        rm_Name: rawMaterial[i].rm_Name,
                        rm_Quantity: rawMaterial[i].rm_QuantityRequested,
                        rm_Price: rawMaterial[i].rm_Price,
                        rm_QuantityRequested: rawMaterial[i].rm_QuantityRequested,
                        rm_QuantityHq: rawMaterial[i].rm_QuantityHq,
                        rm_MinQuantityHq: rawMaterial[i].rm_MinQuantityHq,
                        po_Id: rawMaterial[i].po_Id,
                        po_No: rawMaterial[i].po_No,
                        po_outlet_details_id: rawMaterial[i].po_outlet_details_id,

                    });

                }
                this.item.push(this.listSelectPO);
            }
        },

        async padamOrderNo(PO_id) {
            this.listSelectPO = [];
            this.item = [];
            this.selectOrderNo = [];

            let rawMaterial = null;

            for (var i = 0; i < PO_id.length; i++) {
                rawMaterial = this.listPOItem.filter((item) => {
                    return item.po_id == PO_id[i];
                });

                this.selectOrderNo.push(rawMaterial[0].po_No);
                this.listSelectPO = [];

                for (let i = 0; i < rawMaterial.length; i++) {

                    this.listSelectPO.push({
                        rm_Id: rawMaterial[i].rm_Id,
                        rm_Name: rawMaterial[i].rm_Name,
                        rm_Quantity: rawMaterial[i].rm_QuantityRequested,
                        rm_Price: rawMaterial[i].rm_Price,
                        rm_QuantityRequested: rawMaterial[i].rm_QuantityRequested,
                        rm_QuantityHq: rawMaterial[i].rm_QuantityHq,
                        rm_MinQuantityHq: rawMaterial[i].rm_MinQuantityHq,
                        po_Id: rawMaterial[i].po_Id,
                        po_No: rawMaterial[i].po_No,
                        po_outlet_details_id: rawMaterial[i].po_outlet_details_id,

                    });

                }
                this.item.push(this.listSelectPO);
            }
        },

        async padam() {
            this.order1 = false;
            this.order2 = false;
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
                        // this.getPOOutlet();
                        this.getPOItem();
                        this.getOutlet();
                        this.getDOHq();
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },


        async getPOOutlet() {
            this.listPO = [];
            this.listSelectPO = [];
            this.item = [];
            this.selectOrderNo = [];
            this.padam();


            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                outletId: this.selectOutlet,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getPOOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        for (let i = 0; i < response.data.data.length; i++) {
                            this.listPO.push({
                                label: response.data.data[i].po_No,
                                value: response.data.data[i].po_Id,
                            });
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getPOItem() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getPOItem",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        this.listPOItem = response.data.data;
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
            this.modalDO = true;
        },

        async clickBtnDO() {
            // this.users1 = user.data;
            this.modalStatusDO = true;
        },

        async clickBtnInfo() {
            // this.users1 = user.data;
            this.modalInfo = true;
        },

        async clickBtnStatus() {
            // this.users1 = user.data;
            this.modalStatus = true;
        },

        async insertDO() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                picName: this.pic_name,
                picPhone: this.pic_phone,
                order: this.item,
                remarks: this.remarks,
                outlet: this.selectOutlet,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/insertDOHq",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        if (response.data.status == 200) {
                            this.modalDO = false;
                            alert(response.data.message);
                            this.getDOHq();
                        } else {
                            alert(response.data.message);
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getDOHq() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getDO",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        this.deliveryOrder = response.data.data;
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
<style src="@vueform/multiselect/themes/default.css">

</style>
  