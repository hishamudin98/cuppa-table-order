<template>
  <rs-layout>
    <div class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <p class="font-semibold text-white text-lg">Previous Order</p>
        </div>
      </div>
    </div>
    <div class="my-5">
      <p class="flex justify-center items-center font-semibold text-2xl">
        RM {{ this.orderamount }}
      </p>
    </div>
    <rs-card class="py-3 px-4">
      <div class="order-detail-wrapper">
        <div class="flex justify-between items-center my-3">
          <p class="font-semibold uppercase">Order No ( {{ this.orderID }})</p>
        </div>
         <div v-for="(product, index) in orders" :key="index">
          <div class="order-wrapper flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <div>{{ product.menu_name }}  x {{product.menu_quantity}} ( {{product.orderType}} )</div>
              <div class="font-semibold">RM {{ (product.menu_quantity*(product.menu_price)).toFixed(2) }}</div>
            </div>
          </div>
        </div>
        
      </div>
    </rs-card>
    <div class="flex flex-col items-center justify-center gap-3 mx-4">
      <!-- <rs-button class="w-full gap-x-2">
        Print Receipt
        <vue-feather type="bookmark"></vue-feather>
      </rs-button> -->
      <router-link class="w-full" :to="{ name: 'orderLogin' , params: { branchID: this.branch } }">
        <rs-button class="w-full gap-x-2 mb-6 bg-heandshe" >
          Back
        </rs-button>
      </router-link>
    </div>
  </rs-layout>
</template>

<script>
import RsButton from "@/components/Button.vue";
import { ref } from "vue";

export default {
  components: {
    RsButton,
  },
  setup() {
    const orders = ref([]);
    return {
      orders,
    };
  },
  data() {
    return {
      orderData: "",
      orderID: null,
      orderamount: null,
      order_type: "",
      branch: 0,
    };
  },
  async created() {
    this.orderID = this.$route.params.orderID;
    this.getPreviousOrder();
    this.branch = localStorage.branch;
  },
  methods: {
    async getPreviousOrder() {
      var axios = require("axios");
      var data = JSON.stringify({
        orderID: this.orderID,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL+"/tbl/getPreviousOrder" /* http://localhost:8000/getMenu */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.orderData = JSON.parse(response.data.data[0].order_detail);
            for (let i = 0; i < this.orderData.length; i++) {
                if(this.orderData[i].orderType == "2"){
                    this.order_type = "Take Away";
                }
                else{
                    this.order_type = "Dine In";
                }
              this.orders.push({
                sku: this.orderData[i].sku,
                menu_name: this.orderData[i].menu_name,
                menu_price: this.orderData[i].menu_price,
                menu_quantity: this.orderData[i].menu_quantity,
                menu_id: this.orderData[i].menu_id,
                tableNo: this.orderData[i].tableNo,
                orderType: this.order_type

                
              });
            }
            this.orderamount = response.data.data[0].order_total;
            
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
