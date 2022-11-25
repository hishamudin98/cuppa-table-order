<template>
    <rs-layout>
        <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-x-2">
                    <div class="welcome text-lg font-semibold text-white">
                        Payment Voucher
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
                                <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Payment
                                    Voucher
                                </rs-button>
                            </div>

                        </div>
                        <div class="">
                            <rs-card style="margin-top: 40px">
                                <div>
                                    <div>
                                        <DataTable :value="searchStore" :paginator="true" :rows="10"
                                            v-model:expandedRows="expandedRows"
                                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                            <Column :expander="true" headerStyle="width: 3rem" />
                                            <Column field="sto_Name" header="Payment Voucher No.">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Name === 'Store A'">
                                                        #PV-00001</p>
                                                    <p v-if="searchStore.data.sto_Name === 'Store B'">
                                                        #PV-00002</p>
                                                </template>

                                            </Column>
                                            <Column field="sto_Email" header="Date">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Type">14/07/2022</p>
                                                    <p v-if="searchStore.data.sto_Type === '2'">Outlet</p>
                                                </template>
                                            </Column>

                                            <Column field="sto_PhoneNo" header="Staff">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Type">Staff HQ</p>
                                                    <p v-if="searchStore.data.sto_Type === '2'">Outlet</p>
                                                </template>
                                            </Column>
                                            <Column field="sto_Type" header="Total Price">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Type === '1'">123.00</p>
                                                    <p v-if="searchStore.data.sto_Type === '2'">Outlet</p>
                                                </template>
                                            </Column>


                                            <Column field="sto_Status" header="Status">
                                                <template #body="searchStore">
                                                    <rs-badges variant="warning" v-if="searchStore.data.sto_Status"
                                                        @click="clickBtnStatus()">
                                                        Approved</rs-badges>
                                                    {{ "" }}
                                                    <Button icon="pi pi-info" class="p-button-rounded p-button-info"
                                                        style="width: 25px;height:25px" @click="clickBtnInfo()" />
                                                    <p v-if="searchStore.data.sto_Status === '2'">Inactive</p>
                                                </template>

                                            </Column>

                                            <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                                <template #body="searchStore">

                                                    <Button icon="pi pi-dollar"
                                                        class="p-button-rounded p-button-warning mr-2"
                                                        @click="redirectPayment()" />{{ "" }}

                                                    <Button icon="pi pi-print"
                                                        class="p-button-rounded p-button-warning mr-2"
                                                        @click="editUser(searchOrderStock)" /> {{ "" }}


                                                    <Button icon="pi pi-pencil"
                                                        class="p-button-rounded p-button-success mr-2"
                                                        @click="editUser(searchStore)" />{{ "" }}
                                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                        @click="deleteUser(searchStore)" />


                                                </template>
                                            </Column>


                                            <template #expansion="searchStore12">
                                                <div class="orders-subtable">
                                                    <h5 style="margin-bottom:20px">Invoice No. Record for PV-00001 {{
                                                            searchStore12.data.sto_Status2
                                                    }}</h5>

                                                    <DataTable :value="searchStore" :paginator="true" :rows="10"
                                                        v-model:expandedRows="expandedRows"
                                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">

                                                        <Column field="sto_Status" header="Invoice No.">
                                                            <template #body="searchStore">
                                                                <p v-if="searchStore.data.sto_Name === 'Store A'">
                                                                    #Inv-0001</p>
                                                                <p v-if="searchStore.data.sto_Name === 'Store B'">
                                                                    #Inv-0002</p>
                                                            </template>
                                                        </Column>

                                                        <Column field="sto_Status" header="Invoice Datetime">
                                                            <template #body="searchStore">
                                                                <p v-if="searchStore.data.sto_Status == '1'">
                                                                    14/07/2022</p>
                                                            </template>
                                                        </Column>

                                                        <Column field="sto_Status" header="Remarks">
                                                            <template #body="searchStore">
                                                                <p v-if="searchStore.data.sto_Status == '1'">
                                                                    Wrap </p>
                                                            </template>
                                                        </Column>

                                                        <Column field="sto_Status" header="Status">
                                                            <template #body="searchStore">
                                                                <rs-badges variant="warning"
                                                                    v-if="searchStore.data.sto_Status">
                                                                    Payment Ready</rs-badges> {{ "" }}
                                                                <Button icon="pi pi-info"
                                                                    class="p-button-rounded p-button-info"
                                                                    style="width: 25px;height:25px"
                                                                    @click="clickBtnInfo()" />
                                                                <p v-if="searchStore.data.sto_Status === '2'">Inactive
                                                                </p>
                                                            </template>

                                                        </Column>

                                                        <Column :exportable="false" style="min-width: 8rem"
                                                            header="Details">
                                                            <template #body="searchStore">
                                                                <p v-if="searchStore.data.rm_Status === '1'" hidden>
                                                                    Level 1
                                                                </p>
                                                                <router-link :to="{ name: 'manage-stock' }">
                                                                    <Button icon="pi pi-truck"
                                                                        class="p-button-rounded p-button-info" />
                                                                </router-link>
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

        <rs-modal title="Add Payment Voucher" v-model="modalRawMaterial" position="middle" size="md">
            <FormKit label="PIC Name" type="text" v-model="name" />
            <FormKit label="PIC Phone No." type="text" v-model="sku" />
            <FormKit label="PIC Email" type="text" v-model="sku" />

            <label for="sto_Type">Invoice</label>
            <Multiselect v-model="fruit" mode="tags" :close-on-select="false" :searchable="true" :create-option="true"
                :options="[
                    '#Inv-0001',
                    '#Inv-0002',
                ]" @select="papar()" @deselect="padam()" @clear="padam()" />
            <br />

            <div v-if="this.order1 == true">
                <table class="border-2">
                    <tr>
                        <th class="float-left ml-3 mb-3 text-lg">{{ fruit[0] }}</th>
                    </tr>
                    <tr>
                        <div class="flex flex-row">
                            <div>
                                <FormKit type="text" label="Stock Name" value="Fanta 1.5L" readonly />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity To Pay" value="5" />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity in Invoice" value="5" readonly />
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <div>
                                <FormKit type="text" label="Stock Name" value="Pasta" readonly />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity To Pay" value="20" />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity in Invoice" value="20" readonly />
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <div>
                                <FormKit type="text" label="Stock Name" value="Coca-cola" readonly />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity To Pay" value="10" />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity in Invoice" value="10" readonly />
                            </div>
                        </div>
                    </tr>
                </table>
            </div>
            <div v-if="this.order2 == true">
                <table class="border-2">
                    <tr>
                        <th class="float-left ml-3 mb-3 text-lg">{{ fruit[1] }}</th>
                    </tr>
                    <tr>
                        <div class="flex flex-row">
                            <div>
                                <FormKit type="text" label="Stock Name" value="Mushroom" readonly />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity To Pay" value="15" />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity in Invoice" value="15" readonly />
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <div>
                                <FormKit type="text" label="Stock Name" value="Tea" readonly />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity To Pay" value="20" />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity in Invoice" value="20" readonly />
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <div>
                                <FormKit type="text" label="Stock Name" value="Coffee" readonly />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity To Pay" value="10" />
                            </div>
                            <div>
                                <FormKit type="text" label="Quantity in Invoice" value="10" readonly />
                            </div>
                        </div>
                    </tr>
                </table>
            </div>
            <br />

            <rs-button style="float: right" @click="insertRawMaterial()" class="bg-heandshe hover:bg-heandshe">
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
import Menu from '@/views/apps/administrator/adminSidemenu.vue';
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
        'arbitrary': Menu,
        Multiselect,

    },
    setup() {
        const store = ref([]);
        const typePackaging = ref([]);
        const unitMeasurement = ref([]);
        const search = ref("");
        const invoices = ref([]);


        const searchStore = computed(() => {
            return store.value.filter((store) => {
                return (
                    store.sto_Name.toLowerCase().indexOf(search.value.toLowerCase()) !=
                    -1 ||
                    store.sto_Name
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
            invoices,
            searchStore,
            store,
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
            modalDO: false,
            modalStatus: false,
            modalInfo: false,
            fruit: null,
            order1: false,
            order2: false,

        };
    },
    async created() {
        this.getdata();
        this.getStore();
        this.getInvoiceNo();
    },

    methods: {

        async clickBtnStatus() {
            // this.users1 = user.data;
            this.modalStatus = true;
        },

        async papar() {
            for (var i = 0; i < this.fruit.length; i++) {
                console.log("data", this.fruit.length);
                console.log("data22", this.fruit);
                if (this.fruit[i] == "#Inv-0001") {
                    this.order1 = true;
                }
                if (this.fruit[i] == "#Inv-0002") {
                    this.order2 = true;
                }
            }
        },

        async padam() {
            this.order1 = false;
            this.order2 = false;
        },

        async clickBtnInfo() {
            // this.users1 = user.data;
            this.modalInfo = true;
        },

        async redirectPayment() {
            window.location.href = "https://dev1.toyyibpay.com/dev1-iserve-ewallet";
        },

        async getInvoiceNo() {
            const response = ['#Inv-0001', '#Inv-0002'
            ];
            this.invoices = response;
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

        async getStore() {
            var axios = require("axios");
            // var data = JSON.stringify({
            //     staffid: localStorage.staff,
            // });
            var config = {
                method: "get",
                url: process.env.VUE_APP_FNB_URL + "/admin/getStore",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log("resp", response.data.data);
                        this.store = response.data.data;
                        this.totalData = this.store.length;

                        let price = 0;
                        for (let i = 0; i < response.data.data.length; i++) {
                            price += response.data.data[i].rm_Price;

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