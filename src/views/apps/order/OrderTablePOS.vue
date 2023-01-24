<template>
  <div class="order-customer">
    <div style="
        height: 56vh;
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
      " class="bg-heandshe after:content-['']">
      <div class="flex justify-between items-center p-2">
        <div class="bg-black h-10 w-10 p-1 rounded-full">
          <img class="flex-1" src="@/assets/images/logo/cuppa.png" alt="" />
        </div>
        <div class="text-white">{{ this.branch_Name }}</div>
      </div>
      <div style="height: 40vh" class="flex flex-col justify-center items-center">
        <div class="w-70 items-center">
          <!-- <img
              class="object-scale-down"
              src="@/assets/images/logo/cuppa.png"
              alt=""
            /> -->
          <center>
            <qrcode-vue :value="this.value" :size="size" level="L" />
          </center>
        </div>
      </div>
    </div>

    <div class="m-8">
      <div class="flex items-center justify-center">
        <h4 style="font-weight: normal">Please pay at counter</h4>
      </div>
      <hr />
      <br />
      <div class="flex items-center justify-center">
        <h4 style="font-weight: normal">Order No.</h4>
      </div>
      <div class="flex items-center justify-center">
        <h4>{{ OrderID }}</h4>
      </div>
      <div class="flex items-center justify-center">
        <h4>{{ this.tblNo }}</h4>
      </div>
      <br />
      <div class="flex items-center justify-center">
        <h4 style="font-weight: normal">Thank you !</h4>
      </div>
      <br />
      <router-link :to="{
        name: 'main-order',
        params: { branchID: this.branch, table: this.table },
      }">
        <rs-button class="w-full bg-heandshe"> Order Again? </rs-button>
      </router-link>
    </div>
  </div>
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
    /* console.log(route.query);
    console.log(route.params); */
    /* const table = ref(0); */
    /* table.value = route.params.table; */
    const branch = ref(route.query.branch);
    const OrderID = ref(0);
    OrderID.value = route.params.orderID;

    const customerData = ref({
      name: "",
      phone: "",
    });
    const customerProceed = ref(false);

    /* const customerAdvanced = (dataUser) => {
      if (dataUser != "") {
        if (dataUser === "Guest") {
          guestMode.value = false;
        }
      }
    }; */

    /* const customerAdvancedOrder = (table) => {
      if (table != 0) {
        customerProceed.value = true;
        alert()
      } else {
        alert("Please Enter a valid table number");
      }
    }; */

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
      customerProceed: false,
      ORDERID: null,
      value: "",
      size: 200,
      branch: 0,
      branch_Name: "",
      table: "",
      tblNo: "",
    };
  },
  async created() {
    this.ORDERID = this.$route.params.orderID;
    localStorage.orderid = this.ORDERID;
    this.value = this.ORDERID;
    this.branch = localStorage.branch;
    this.table = this.$route.params.table;
    if (this.branch != "") {
      this.getOutlet(this.branch);
    }
    this.getTable();
  },

  methods: {
    async getTable() {
      var axios = require("axios");
      var data = JSON.stringify({
        table_id: this.table,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/tbl/getTblNo",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.tblNo = response.data.data[0].outlet_table_name;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    async getOutlet(branch) {
      var axios = require("axios");
      var data = JSON.stringify({
        branch_ID: branch,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/tbl/getBranch",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.branch_Name = response.data.data[0].outlet_name;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    async customerAdvanced(dataUser) {
      if (dataUser == "Guest") this.guestMode = false;
    },
    async customerAdvancedOrder(table) {
      if (table != 0) {
        this.customerProceed = true;
        this.$router.push({
          name: "order",
          params: { branchID: "", orderID: "", table: table },
        });
      } else {
        alert("Please Enter a valid table number");
      }
    },

    async nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
      }
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
