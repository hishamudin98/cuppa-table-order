<template>
  <rs-layout>
    <div class="order-customer">
      <div style="height: 100vh" class="bg-heandshe after:content-['']">
        <div class="flex flex-col">
          <div class="pt-20 flex justify-center text-white">
            <h3>Share the payment link</h3>
          </div>
          <div class="flex justify-center text-white">
            <h6 class="text-center font-light">
              Scan the QR code or share link to family and friends to allow them
              to pay for this order.
            </h6>
          </div>
          <div class="flex justify-center mt-10">
            <!-- ORDER NO -->
            <div
              class="w-5/6 h-14 bg-white rounded-md flex justify-center pt-3"
            >
              <h4 class="text-center">
                <strong>#{{ this.orderno }}</strong>
              </h4>
            </div>
          </div>
          <!-- SHARE -->
          <div class="flex justify-center mt-10">
            <div class="w-5/6 h-2/3 bg-white rounded-md flex flex-col">
              <div class="flex justify-center mb-5">
                <h4 class="pl-3 pt-1"><strong>Scan here</strong></h4>
              </div>

              <div class="flex justify-center mb-5">
                <qrcode-vue :value="this.link" :size="size" level="L" />
              </div>
              <div class="flex flex-row mt-3">
                <div class="w-2/3 pl-3">
                  <FormKit type="text" v-model="this.link" />
                </div>
                <div>
                  <input type="hidden" id="testing-code" :value="this.link" />
                  <rs-button
                    class="w-full"
                    @click.stop.prevent="copyTestingCode"
                  >
                    Copy
                  </rs-button>
                </div>
              </div>
            </div>
          </div>
          <!-- BUTTON -->
          <div class="flex justify-center mt-10">
            <div class="pt-10 w-5/6">
            <router-link class="w-full" :to="{ name: 'order-payment', params: {id: this.OrderID} }">
              <rs-button class="w-full">
                Try another method?
              </rs-button>
            </router-link>
            </div>
          </div>
          <div class="flex justify-center mt-5">
            <div class="w-5/6">
            <router-link class="w-full" :to="{ name: 'order-previous', params: {orderID: this.orderno} }">
              <rs-button
                class="w-full"
                variant="primary-outline"
              >
                Check order status
              </rs-button>
            </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </rs-layout>
</template>
<script>
/* eslint-disable */
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import QrcodeVue from "qrcode.vue";

import RsModal from "@/components/Modal.vue";
import RsButton from "@/components/Button.vue";

import { Navigation, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  name: "TableOrder",
  components: {
    RsModal,
    RsButton,
    Swiper,
    axios,
    SwiperSlide,
    QrcodeVue,
  },
  setup(props) {
    const changetable = ref(false);

    const route = useRoute();
    const branch = ref(route.query.branch);
    const OrderID = ref(0);
    OrderID.value = route.params.orderid;

    const customerData = ref({
      name: "",
      phone: "",
    });
    const customerProceed = ref(false);

    return {
      changetable,
      customerData,
      customerProceed,
      OrderID,
      modules: [Navigation, Autoplay, Scrollbar, A11y],
    };
  },

  //TEST FARIS//
  data() {
    return {
      orderno: null,
      tableNo: 0,
      totalPay: 0,
      total: 0,
      service: 0,
      discountedP: 0,
      outletDisc: 0,
      sst: 0,
      link: "",
      value: null,
      size: 200,
    };
  },
  async created() {
    localStorage.status = "FAIL";
    this.getOrder();
    this.sentPaymentLink();
    
  },

  methods: {
    async getOrder() {
      var axios = require("axios");
      var data = JSON.stringify({
        iOrder: this.OrderID,
      });
      var config = {
        method: "post",
        url:
          process.env.VUE_APP_FNB_URL +
          "/tbl/getOrder" /*  http://localhost:3000tbl/getOrder*/,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.orderData = JSON.parse(response.data.data.d3t4ilOrd3r);
            this.tableNo = this.orderData[0].tableNo;
            this.totalAmount = response.data.data.am0untOrd3r;
            this.sst = this.totalAmount * 0.06;
            /* this.service = this.totalAmount * 0.1; */
            this.totalPay = this.totalAmount + this.sst;
            if (this.totalAmount >= 70) {
              this.outletDisc = this.totalAmount * 0.1;
              this.totalPay = this.totalPay - this.outletDisc;
            } else {
              this.outletDisc = 0;
              this.totalPay = this.totalPay - this.outletDisc;
            }
            this.discount = this.orderData[0].discount;
            if (this.discount == true) {
              this.discountedP = this.totalAmount * 0.07;
              this.totalPay = this.totalPay - this.discountedP;
            }
            this.orderno = response.data.data.order_no;
            this.tablNo = response.data.data.order_table;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async sentPaymentLink() {
      this.total = this.totalPay.toFixed(2);
      this.roundNumber =
        this.total.toString().split(".")[0] +
        this.total.toString().split(".")[1];

      var axios = require("axios");
      if (localStorage.name == null) {
        this.name = "Guest " + this.tableNo;
      } else {
        this.name = localStorage.name;
      }
      this.service = 0.0;
      var data = JSON.stringify({
        serviceCharge: this.service,
        discount: this.discountedP + this.outletDisc,
        tax: this.sst,
        billName: "Order For Table " + this.tableNo,
        billDesc: "Order For Table " + this.tableNo,
        billAmount: parseInt(this.roundNumber),
        billExternalReferenceNo: "Order For Table " + this.tableNo,
        billTo: this.name,
        billPhone: "0174842981",
        orderNo: this.orderno,
        branch: localStorage.branch,
      });
      var config = {
        method: "POST",
        url: process.env.VUE_APP_FNB_URL + "/tbl/tblorderPayment",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.link = response.data.data2;
            this.value = this.link;
          }.bind(this)
        )
        .catch(function (error) {
          this.loading = false;
          console.log(error);
        });
    },
    async copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("Copied " + msg);
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
};
</script>

<style lang="scss">
.swiper {
  border-radius: 0.5rem;
  box-shadow: 0 4px 24px 0 rgb(253 186 116 / 50%);
}
.triangle {
  width: 0;
  height: 0;
  border: 3px solid transparent;
  border-left: 0;
  border-right: 10px solid white;
}
</style>
