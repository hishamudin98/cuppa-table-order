<template>
    <rs-layout>
        <rs-breadcrumb />
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
                            <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add Store
                            </rs-button>
                        </div>

                    </div>
                    <div class="">
                        <rs-card style="margin-top: 40px">
                            <div>
                                <div>
                                    <DataTable :value="searchStore" :paginator="true" :rows="10"
                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                                        <Column field="sto_Name" header="Name"></Column>
                                        <Column field="sto_Email" header="Email"></Column>
                                        <Column field="sto_PhoneNo" header="PhoneNo"></Column>
                                        <Column field="sto_Type" header="Type">
                                            <template #body="searchStore">
                                                <p v-if="searchStore.data.sto_Type === '1'">HQ</p>
                                                <p v-if="searchStore.data.sto_Type === '2'">Outlet</p>
                                            </template>
                                        </Column>

                                        <Column field="sto_outletName" header="Owned By">
                                            <template #body="searchStore">
                                                <p v-if="(searchStore.data.sto_outletName === null)">HQ</p>
                                                <p v-if="searchStore.data.sto_outletName !== ''">
                                                    {{ searchStore.data.sto_outletName }}</p>
                                            </template>
                                        </Column>

                                        <Column field="sto_Status" header="Status">
                                            <template #body="searchStore">
                                                <p v-if="searchStore.data.sto_Status === '1'">Active</p>
                                                <p v-if="searchStore.data.sto_Status === '0'">Inactive</p>
                                            </template>

                                        </Column>


                                        <Column :exportable="false" header="Details Stock">
                                            <template #body="searchStore">
                                                <p v-if="searchStore.data.sto_Status === '1'" hidden>Active</p>
                                                <router-link :to="{ name: 'hq-manage-stock' }">
                                                    <Button icon="pi pi-truck" class="p-button-rounded p-button-info" />
                                                </router-link>
                                            </template>
                                        </Column>

                                        <Column :exportable="false" style="min-width: 8rem" header="Actions">
                                            <template #body="searchStore">
                                                <Button icon="pi pi-pencil"
                                                    class="p-button-rounded p-button-success mr-2"
                                                    @click="editUser(searchStore)" />
                                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                                    @click="deleteUser(searchStore)" />


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

        <rs-modal title="Add Store" v-model="modalAddStore" position="middle" size="md">
            <FormKit label="Name" type="text" v-model="name" />
            <FormKit label="Phone No." type="text" v-model="phoneNo" />
            <FormKit label="Email" type="text" v-model="email" />
            <FormKit label="Postcode" type="text" v-model="postcode" />
            <FormKit label="Address" type="textarea" v-model="address" />
            <FormKit label="PIC Name" type="text" v-model="pic" />
            <FormKit v-model="storeType" type="radio" label="Store Type" :options="[
                { label: 'HQ', value: 1 },
                { label: 'Outlet', value: 2 },
            ]" />

            <div v-if="(storeType == 2)">
                <FormKit type="select" label="Outlet" v-model="selectOutlet" placeholder="Select Outlet"
                    :options="this.listOutlet" />
            </div>

            <rs-button style="float: right" @click="insertStore()" class="bg-heandshe hover:bg-heandshe">
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

export default {
    components: {
        RsButton,
        DataTable,
        RsModal,
        Column,
        Button,
    },
    setup() {
        const store = ref([]);
        const typePackaging = ref([]);
        const unitMeasurement = ref([]);
        const search = ref("");

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
            searchStore,
            store,
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
            storeType: '',
            selectOutlet: '',
            name: null,
            phoneNo: null,
            email: null,
            postcode: null,
            address: null,
            pic: null,
            packaging_type: null,
            measurement: null,
            modalAddStore: false,

            listOutlet: []
        };
    },
    async created() {
        this.getdata();

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
                        this.staffId = response.data.data[0].staff_id;

                        this.getStore();
                        this.getOutlet();
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getStore() {
            var axios = require("axios");
            var data = JSON.stringify({
                outletId: 0,
                staffId: this.staffId,
            });
            var config = {
                method: "post",

                url: process.env.VUE_APP_FNB_URL + "/admin/getStore",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        console.log("resp", response.data.data);
                        this.store = response.data.data;
                        this.totalData = this.store.length;

                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getOutlet() {
            var axios = require("axios");
            var config = {
                method: "get",
                url: process.env.VUE_APP_FNB_URL + "/admin/getOutlet",
                headers: {
                    "Content-Type": "application/json",
                },
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
            this.modalAddStore = true;
        },

        async insertStore() {
            var axios = require("axios");
            var data = JSON.stringify({
                name: this.name,
                phone: this.phoneNo,
                email: this.email,
                postcode: this.postcode,
                address: this.address,
                pic: this.pic,
                storeType: this.storeType,
                selectOutlet: this.selectOutlet,
                staffId: this.staffId,
            });
            console.log("Insert data :", data);
            var config = {
                method: "post",
                url: process.env.VUE_APP_FNB_URL + "/admin/insertStore",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            await axios(config)
                .then(
                    function (response) {
                        if (response.data.status == 200) {
                            this.modalAddStore = false;
                            alert(response.data.message);
                            this.getStore();
                        } else {
                            alert(response.data.message);
                        }
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
};
</script>
  