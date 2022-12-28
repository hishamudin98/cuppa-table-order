<template>
    <rs-layout>
        <div style="display: flex; flex-direction: row">

            <div class="w-full h-1/4 flex flex-col">
                <div class="w-full flex flex-row mb-0">
                    <!-- <div class="inline-block w-1/2 pr-10">
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
                        </div> -->
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
                        <div class="w-1/12" style="padding-top: 10px">
                            <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Stock
                            </rs-button>
                        </div>
                    </div>
                    <div class="">
                        <rs-card style="margin-top: 40px">
                            <div>
                                <div>
                                    <DataTable :value="searchStock" :paginator="true" :rows="10"
                                        v-model:expandedRows="expandedRows" @rowExpand="onRowExpand"
                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                        <Column :expander="true" headerStyle="width: 3rem" />
                                        <Column field="rm_Name" header="Name"></Column>
                                        <Column field="rm_Sku" header="SKU"></Column>
                                        <Column field="rm_QuantityRequested" header="Quantity"></Column>
                                        <Column field="rm_QuantityDelivered" header="Quantity Delivered">
                                            <template #body="searchStock">
                                                <p>{{ searchStock.data.rm_QuantityDelivered }} / {{
        searchStock.data.rm_QuantityRequested
}}</p>
                                            </template>

                                        </Column>
                                        <Column field="rm_Packaging" header="Packaging Type">
                                            <template #body="searchStock">
                                                <p v-if="searchStock.data.rm_Packaging === '1'">Box</p>
                                                <p v-if="searchStock.data.rm_Packaging === '2'">Packet</p>
                                                <p v-if="searchStock.data.rm_Packaging === '3'">Carton</p>
                                            </template>
                                        </Column>
                                        <Column field="rm_Unit" header="Measurement">
                                            <template #body="searchStock">
                                                <p v-if="searchStock.data.rm_Unit === '1'">gram</p>
                                                <p v-if="searchStock.data.rm_Unit === '2'">kilogram</p>
                                                <p v-if="searchStock.data.rm_Unit === '3'">centimetre</p>
                                                <p v-if="searchStock.data.rm_Unit === '4'">metre</p>
                                                <p v-if="searchStock.data.rm_Unit === '5'">pcs</p>
                                            </template>
                                        </Column>
                                        <Column field="rm_Price" header="Unit Price (RM)">
                                            <template #body="searchStock">
                                                {{ formatPrice(searchStock.data.rm_Price) }}
                                            </template>
                                        </Column>

                                        <Column field="rm_Price" header="Total Price (RM)">
                                            <template #body="searchStock">
                                                {{ formatPrice(searchStock.data.rm_TotalPrice) }}
                                            </template>
                                        </Column>

                                        <Column field="store_Name" header="Store">

                                        </Column>

                                        <Column :exportable="false" style="min-width: 8rem">
                                            <template #body="searchStock">
                                                <Button icon="pi pi-pencil"
                                                    class="p-button-rounded p-button-success mr-2"
                                                    @click="editUser(searchStock)" /> {{ "" }}
                                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                    @click="deleteUser(searchStock)" />
                                            </template>
                                        </Column>

                                        <template #expansion="headerStock">
                                            <div class="orders-subtable">
                                                <h5 style="margin-bottom:20px">Delivery Order Record for {{
        headerStock.data.rm_Name
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

                                                    <Column field="rm_Quantity" header="Quantity"></Column>

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

        <rs-modal title="Info Timeline" v-model="modalInfo" position="middle" size="md">

            <p>2022-11-18 12:00 : <b>Open</b> (Staff A)</p>
            <p>2022-11-18 12:00 : <b>Approved</b> (Staff A)</p>
            <p>2022-11-18 13:00 : <b>Accepted</b> (Staff A)</p>
            <p>2022-11-18 14:00 : <b>Delivery</b> (Staff A)</p>
            <p>2022-11-18 15:00 : <b>Received</b> (Staff A)</p>
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
        RsBadges,
        RsButton,
        DataTable,
        RsModal,
        Column,
        Button,
    },
    setup() {
        const listItemPO = ref([]);
        const typePackaging = ref([]);
        const unitMeasurement = ref([]);
        const search = ref("");

        const searchStock = computed(() => {
            return listItemPO.value.filter((listItemPO) => {
                return (
                    listItemPO.rm_Name.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    listItemPO.rm_Name
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
            searchStock,
            listItemPO,
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
            modalInfo: false,
            name: null,
            sku: null,
            quantity: null,
            minquantity: null,
            price: null,
            packaging_type: null,
            measurement: null,
            modalRawMaterial: false,

            headerStock: [],
            resultFilter: [],
            listStock: [],
            listTimelineStatus: [],

        };
    },
    async created() {
        this.getdata();
        this.getTypePackaging();
        this.getUnitMeasurement();
    },

    methods: {
        async clickBtnInfo() {
            // this.users1 = user.data;
            this.modalInfo = true;
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
                        this.getDetailsPO();
                        this.getDOByStock();

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

        async getDetailsPO() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
                orderId: this.$route.params.id
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getDetailsPO",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        this.listItemPO = response.data.data;
                        this.totalData = this.listItemPO.length;
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
                            this.getDetailsPO();
                        } else {
                            alert(response.data.message);
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getDOByStock() {
            var axios = require("axios");
            var data = JSON.stringify({
                staffId: this.staffId,
            });
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/getDOItem",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        this.listStock = response.data.data;
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        onRowExpand(event) {
            console.log("listStock", this.listStock);
            this.resultFilter = this.listStock.filter((item) => {
                // console.log("item", item);
                if (item.rm_Id == event.data.rm_Id && item.po_No == event.data.po_No) {
                    return item;
                }
            });
            this.headerStock = this.resultFilter;
        },
    },
};
</script>
  