<template>
  <rs-layout>
    <div class="bg-heandshe after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <p class="font-semibold text-white text-lg">Receipt</p>
        </div>
        <div class="bg-white px-3 py-1 rounded-full text-heandshe">
          Table {{this.tableno}}
        </div>
      </div>
    </div>
    <div class="my-5" >
      <div class="flex justify-center items-center mb-2" v-if="this.status == 1">
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
        v-if="this.status == 1"
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
        v-else-if="this.status == 3"
      >
        Order failed
      </p>
      <p class="flex justify-center items-center font-semibold text-2xl">
        RM {{ this.orderAmount }}
      </p>
    </div>
    <rs-card class="py-3 px-4">
      <div class="order-detail-wrapper">
        <div class="flex justify-between items-center my-3">
          <p class="font-semibold uppercase">Order No ( {{ this.orderNo }} )</p>
        </div>
        <div v-for="(product, index) in orders" :key="index">
          <div class="order-wrapper flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <div>{{ product.menu_name }}  x {{product.menu_quantity}}</div>
              <div class="font-semibold">RM {{ (product.menu_quantity*(product.menu_price)).toFixed(2) }}</div>
            </div>
          </div>
        </div>
        <hr />
        <br />
        <div class="order-wrapper flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <div class="font-semibold">SST (6%)</div>
            <div class="font-semibold">RM {{(this.tax).toFixed(2)}}</div>
          </div>
          <!-- <div class="flex justify-between items-center">
            <div class="font-semibold">Service Charges (10%)</div>
            <div class="font-semibold">RM {{(this.service).toFixed(2)}}</div>
          </div> -->
          <!-- <div class="flex justify-between items-center">
            <div class="font-semibold">Discount Applied</div>
            <div class="font-semibold">RM {{(this.discount).toFixed(2)}}</div>
          </div> -->
          <!-- <div class="flex justify-between items-center">
            <div class="font-semibold">Infaq</div>
            <div class="font-semibold">RM10.00</div>
          </div> -->
          <hr class="my-2 mb-1" />
          <div class="flex justify-between items-center text-xl">
            <div class="font-semibold">Total</div>
            <div class="font-semibold">RM {{ this.orderAmount }}</div>
          </div>
        </div>
      </div>
    </rs-card>
    <rs-card class="py-3 px-4">
      <div class="payment-detail-wrapper">
        <div class="flex justify-between items-center my-3">
          <p class="font-semibold uppercase">Payment Details</p>
        </div>
        <div class="order-wrapper flex flex-col gap-2 mb-5">
          <div class="flex justify-between items-center">
            <div>Status Payment</div>
            <div class="font-semibold text-green-400"  v-if="this.status == 1">Success</div>
            <div class="font-semibold text-red-500"  v-else-if="this.status == 3">Failed</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Transaction ID</div>
            <div class="font-semibold">{{this.transacno}}</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Bill Code</div>
            <div class="font-semibold">{{this.billCode}}</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Date Order</div>
            <div class="font-semibold">{{this.date}}</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Order Time</div>
            <div class="font-semibold">{{this.time}}</div>
          </div>
          <!-- <div class="flex justify-between items-center">
            <div>Payment Type</div>
            <div class="font-semibold">FPX</div>
          </div> -->
        </div>
      </div>
    </rs-card>
    <div class="flex flex-col items-center justify-center gap-3 mx-4">
      <!-- <rs-button class="w-full gap-x-2">
        Print Receipt
        <vue-feather type="bookmark"></vue-feather>
      </rs-button> -->
      <router-link class="w-full" :to="{ name: 'orderLogin' }">
        <rs-button class="w-full gap-x-2 mb-6 bg-heandshe hover:bg-heandshe" >
          Order Again
        </rs-button>
      </router-link>
    </div>
  </rs-layout>
</template>

<script>
import RsButton from "@/components/Button.vue";
import { ref } from "vue";
import moment from 'moment';


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
      billCode: "",
      transactionId: "",
      orderNo: "",
      orderAmount: 0.0,
      tax : 0.00,
      service: 0.00,
      discount: 0.00,
      tableno: 0,
      transacno: "",
      date: null,
      time: null,
      status:0,
    };
  },
  async created() {
    this.billCode = this.$route.query.billcode;
    this.transactionId = this.$route.query.transaction_id;
    this.status = this.$route.query.status_id;
    this.getOrderConfirm();
  },
  methods: {
    async getOrderConfirm() {
      var axios = require("axios");
      var data = JSON.stringify({
        billCode: this.billCode,
        transactionId: this.transactionId,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL_LOCAL+"/tbl/getOrderConfirm",  /* http://localhost:3000tbl/getOrderConfirm */
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
              this.orders.push({
                sku: this.orderData[i].sku,
                menu_name: this.orderData[i].menu_name,
                menu_price: this.orderData[i].menu_price,
                menu_quantity: this.orderData[i].menu_quantity,
                menu_id: this.orderData[i].menu_id,
                tableNo: this.orderData[i].tableNo,
              });
            }
            this.orderNo = response.data.data[0].order_no;
            this.orderAmount = response.data.data[0].ordertotal_amount;
            this.orderAmount = this.orderAmount.toFixed(2);
            this.tableno = response.data.data[0].table_no;
            this.tax = response.data.data[0].tax;
            this.discount = response.data.data[0].discount;
            this.transacno = response.data.data[0].transac_no;
            this.date = moment(response.data.data[0].order_date).format("DD-MM-YYYY")
            this.time = moment(response.data.data[0].order_date).format("HH:mm:ss")
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

