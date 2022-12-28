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
                            <rs-button class="bg-heandshe hover:bg-heandshe">Filter
                            </rs-button>
                        </div>

                    </div>
                    <div class="">
                        <rs-card style="margin-top: 40px">
                            <div>
                                <div>
                                    <DataTable :value="searchDO" :paginator="true" :rows="10"
                                        v-model:expandedRows="expandedRows" @rowExpand="onRowExpand"
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

                                        <Column field="do_Status" header="Status">
                                            <template #body="searchDO">
                                                <rs-badges variant="warning" v-if="searchDO.data.do_Status === '1'"
                                                    @click="clickBtnStatus(searchDO.data.do_Id)">
                                                    Open</rs-badges>

                                                <rs-badges variant="warning" v-if="searchDO.data.do_Status === '2'"
                                                    @click="clickBtnStatus(searchDO.data.do_Id)">
                                                    Approved</rs-badges>

                                                <rs-badges variant="info" v-if="searchDO.data.do_Status === '3'"
                                                    @click="clickBtnStatus(searchDO.data.do_Id)">
                                                    Delivery</rs-badges>

                                                <rs-badges variant="info" v-if="searchDO.data.do_Status === '4'"
                                                    @click="clickBtnStatus(searchDO.data.do_Id)">
                                                    Delivered</rs-badges>

                                                <rs-badges variant="success" v-if="searchDO.data.do_Status === '5'"
                                                    @click="clickBtnStatus(searchDO.data.do_Id)">
                                                    Cancelled</rs-badges>

                                                <rs-badges variant="success" v-if="searchDO.data.do_Status === '6'"
                                                    @click="clickBtnStatus(searchDO.data.do_Id)">
                                                    Cancelled</rs-badges>

                                                {{ "" }}
                                                <Button icon="pi pi-info" class="p-button-rounded p-button-info"
                                                    style="width: 25px;height:25px"
                                                    @click="clickBtnInfo(searchDO.data.do_Id)" />
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


                                        <template #expansion="headerDO">
                                            <div class="orders-subtable">
                                                <h5 style="margin-bottom:20px">Order No. Record for {{
        headerDO.data.do_No
}}</h5>

                                                <DataTable :value="resultFilter" :paginator="true" :rows="10"
                                                    v-model:expandedRows="expandedRows"
                                                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                    :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">

                                                    <Column field="po_No" header="Order No.">


                                                    </Column>

                                                    <Column field="po_CreatedDate" header="Order Datetime">
                                                    </Column>

                                                    <Column field="po_TotalPrice" header="Total Price (RM)">
                                                        <template #body="resultFilter">
                                                            {{
        formatPrice(resultFilter.data.po_TotalPrice)
}}
                                                        </template>
                                                    </Column>

                                                    <Column field="po_Status" header="Status">
                                                        <template #body="searchPO">
                                                            <rs-badges variant="warning"
                                                                v-if="searchPO.data.po_Status === '1'">
                                                                Open</rs-badges>

                                                            <rs-badges variant="warning"
                                                                v-if="searchPO.data.po_Status === '2'">
                                                                Approved</rs-badges>

                                                            <rs-badges variant="warning"
                                                                v-if="searchPO.data.po_Status === '3'">
                                                                Accepted</rs-badges>

                                                            <rs-badges variant="info"
                                                                v-if="searchPO.data.po_Status === '4'">
                                                                Delivery</rs-badges>

                                                            <rs-badges variant="success"
                                                                v-if="searchPO.data.po_Status === '5'">
                                                                Partial Delivered</rs-badges>

                                                            <rs-badges variant="success"
                                                                v-if="searchPO.data.po_Status === '6'">
                                                                Completed</rs-badges>

                                                            <rs-badges variant="success"
                                                                v-if="searchPO.data.po_Status === '7'">
                                                                Cancelled</rs-badges>

                                                            {{ "" }}
                                                            <Button icon="pi pi-info"
                                                                class="p-button-rounded p-button-info"
                                                                style="width: 25px;height:25px"
                                                                @click="clickBtnInfo(searchPO.data.po_Id)" />
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

        <rs-modal title="DO No." v-model="modalStatusDO" position="middle" size="md">

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
            <FormKit type="select" label="Status" :options="this.listStatus" v-model="selectStatus"
                placeholder="Select Status" />

            <rs-button style="float: right" @click="updateStatus()" class="bg-heandshe hover:bg-heandshe">
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

            headerDO: [],
            listDO: [],

            listTimelineStatus: [],
            listStatus: [],
            selectDOId: null,
            selectStatus: null,
        };
    },
    async created() {
        this.getdata();
        this.getStatusDO();
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

                        this.getDO();
                        this.getDOByOrderHqOutlet();
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

        async clickBtnInfo(value) {
            // this.users1 = user.data;
            this.modalInfo = true;
            this.listTimelineStatus = [];

            var axios = require("axios");
            var data = JSON.stringify({
                doId: value
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getTimelineStatusDO",
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
            // this.users1 = user.data;
            this.modalStatus = true;
            this.selectDOId = value;
        },

        async updateStatus() {

            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                doId: this.selectDOId,
                status: this.selectStatus,
            });

            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/updateStatusDO",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log('response status', response.data.data);
                        if (response.data.status == 200) {
                            this.modalStatus = false;
                            alert(response.data.message);
                            this.getDO();
                            this.getDOByOrderHqOutlet();
                        } else {
                            alert(response.data.message);
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
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

        async getDO() {
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
                        console.log("response", response.data.data);
                        this.deliveryOrder = response.data.data;
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
                        console.log("response do", response.data.data);
                        this.listDO = response.data.data;
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getStatusDO() {
            var axios = require("axios");
            var config = {
                method: "get",
                url: process.env.VUE_APP_FNB_URL + "/getStatusDOOutlet",
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

        onRowExpand(event) {

            this.resultFilter = this.listDO.filter((item) => {
                // console.log("item", item);
                if (item.do_Id == event.data.do_Id) {
                    return item;
                }
            });

            this.headerPO = this.resultFilter;
        }
    },
};
</script>
<style src="@vueform/multiselect/themes/default.css">

</style>
  