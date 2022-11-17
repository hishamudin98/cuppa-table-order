<template>
    <rs-layout>
        <div style="height: 10vh" class="bg-heandshe after:content-[''] p-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-x-2">
                    <div class="welcome text-lg font-semibold text-white">
                        Delivery Order
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
                                <rs-button @click="clickBtnAdd()" class="bg-heandshe hover:bg-heandshe">Add DO
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
                                            <Column field="sto_Name" header="DO No.">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Type">D0-00001</p>
                                                    <p v-if="searchStore.data.sto_Type === '2'">Outlet</p>
                                                </template>
                                            </Column>
                                            <Column field="sto_Email" header="Date">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Type">14/07/2022</p>
                                                    <p v-if="searchStore.data.sto_Type === '2'">Outlet</p>
                                                </template>
                                            </Column>

                                            <Column field="sto_PhoneNo" header="Order No.">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Type">#QwDer</p>
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
                                            <Column field="sto_Level" header="Destination">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Type === '1'">He & She University of
                                                        Malaya</p>
                                                    <p v-if="searchStore.data.sto_Type === '2'">Outlet</p>
                                                </template>
                                            </Column>

                                            <Column field="sto_Status" header="PIC Name">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Status === '1'">Customer Name</p>
                                                    <p v-if="searchStore.data.sto_Status === '2'">Inactive</p>
                                                </template>

                                            </Column>

                                            <Column field="sto_Status" header="PIC Phone No.">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.sto_Status === '1'">0123123123</p>
                                                    <p v-if="searchStore.data.sto_Status === '2'">Inactive</p>
                                                </template>

                                            </Column>

                                            <Column field="sto_Status" header="Status">
                                                <template #body="searchStore">
                                                    <rs-badges variant="success" v-if="searchStore.data.sto_Status">
                                                        Approved</rs-badges>

                                                    <p v-if="searchStore.data.sto_Status === '2'">Inactive</p>
                                                </template>

                                            </Column>


                                            <Column :exportable="false" header="Details">
                                                <template #body="searchStore">
                                                    <p v-if="searchStore.data.rm_Status === '1'" hidden>Level 1</p>
                                                    <router-link :to="{ name: 'manage-stock' }">
                                                        <Button icon="pi pi-truck"
                                                            class="p-button-rounded p-button-info" />
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
        </div>

        <rs-modal title="Add DO" v-model="modalRawMaterial" position="middle" size="md">
            <FormKit label="PIC Name" type="text" v-model="name" />
            <FormKit label="PIC Phone No." type="text" v-model="sku" />
            <FormKit label="Destination" type="select" v-model="minquantity" :options="[
                'He & She University of Malaya',
                'He & She University of Malaya',
                'He & She University of Malaya',
            ]" />

            <FormKit label="Order No." type="select" v-model="minquantity" :options="[
                '#QwDer',
                '#ASDqwe',
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
                                <FormKit type="text" label="Remarks" />
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

            <rs-button style="float: right" @click="insertRawMaterial()" class="bg-heandshe hover:bg-heandshe">
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
import Menu from '@/views/apps/administrator/adminSidemenu.vue';
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
        'arbitrary': Menu,
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
            staffid: "",
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
        };
    },
    async created() {
        this.getdata();
        this.getStore();
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
  