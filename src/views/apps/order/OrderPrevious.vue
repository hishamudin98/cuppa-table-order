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
      <div
        class="flex justify-center items-center mb-2"
        v-if="this.status == 1 || this.status == 5"
      >
        <img
          class="w-9 h-9"
          src="https://www.pngall.com/wp-content/uploads/8/Green-Check-Mark-PNG-Image.png"
          alt="checked"
        />
      </div>

      <div class="flex justify-center items-center mb-2" v-else>
        <img
          class="w-9 h-9"
          src="https://www.pngall.com/wp-content/uploads/2016/04/Red-Cross-Mark-Download-PNG.png"
          alt="cross"
        />
      </div>
      <p
        class="
          flex
          justify-center
          items-center
          font-semibold
          text-lg text-green-500
        "
        v-if="this.status == 1 || this.status == 5"
      >
        Order has been made.
      </p>
      <p
        class="
          flex
          justify-center
          items-center
          font-semibold
          text-lg text-red-500
        "
        v-else
      >
        Order failed
      </p>
    </div>
    <div class="my-5">
      <p class="flex justify-center items-center font-semibold text-2xl">
        RM {{ formatPrice(this.orderamount) }}
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
              <div>
                {{ product.menu_name }} x {{ product.menu_quantity }} (
                {{ product.orderType }} )
              </div>
              <div class="font-semibold">
                RM {{ (product.menu_quantity * product.menu_price).toFixed(2) }}
              </div>
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
      <router-link
        class="w-full"
        :to="{
          name: 'orderLogin',
          params: { branchID: this.branch, table: this.tblNo },
        }"
        v-if="this.LocalStatus != 'FAIL'"
      >
        <rs-button class="w-full gap-x-2 mb-6 bg-heandshe"> Back </rs-button>
      </router-link>
      <router-link
        class="w-full"
        :to="{ name: 'paymentlink', params: { orderid: this.orderi } }"
        v-else
      >
        <rs-button class="w-full gap-x-2 mb-6 bg-heandshe"> Return </rs-button>
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

    const formatPrice = (price) => {
      return parseFloat(price)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return {
      orders,
      formatPrice,
    };
  },
  data() {
    return {
      orderData: "",
      orderID: null,
      orderamount: null,
      order_type: "",
      branch: 0,
      status: 0,
      LocalStatus: 0,
      orderi: 0,
    };
  },
  async created() {
    this.orderID = this.$route.params.orderID;
    this.orderi = localStorage.orderID;
    this.getPreviousOrder();
    this.branch = localStorage.branch;

    this.LocalStatus = localStorage.status;
  },
  methods: {
    async getPreviousOrder() {
      var axios = require("axios");
      var data = JSON.stringify({
        orderID: this.orderID,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/tbl/getPreviousOrder",
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
              if (this.orderData[i].orderType == "2") {
                this.order_type = "Take Away";
              } else {
                this.order_type = "Dine In";
              }
              this.orders.push({
                sku: this.orderData[i].sku,
                menu_name: this.orderData[i].menu_name,
                menu_price: this.orderData[i].menu_price,
                menu_quantity: this.orderData[i].menu_quantity,
                menu_id: this.orderData[i].menu_id,
                tableNo: this.orderData[i].tableNo,
                orderType: this.order_type,
              });
            }
            this.status = response.data.data[0].order_status;
            this.orderamount = response.data.data[0].ordertotal_amount;
            this.tblNo = response.data.data[0].table_no;
            if(this.status == 5)
            {
              this.LocalStatus = "DONE"
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

<style lang="scss" scoped>
</style>
