<template>
  <div class="order-customer">
    <div
      style="
        height: 56vh;
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
      "
      class="bg-heandshe after:content-['']"
    >
      <div class="flex justify-between items-center p-2">
        <div class="bg-heandshe h-10 w-10 p-1 rounded-full">
          <img class="flex-1" src="@/assets/images/logo/cuppa.png" alt="" />
        </div>
        <div class="text-white">{{ this.branch_Name }}</div>
      </div>
      <div
        style="height: 40vh"
        class="flex flex-col justify-center items-center"
      >
        <div class="w-70">
          <!-- @/assets/images/illustration/eating.svg -->
          <img
            class="object-scale-down"
            src="@/assets/images/logo/cuppa.png"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="m-8">
      <div v-if="LoginType == false">
        <!-- PILIH LOGIN TYPE -->
        <div class="h-full p-4">
          <rs-button
            class="w-full bg-heandshe hover:bg-heandshe"
            @click="CustomerDetails()"
          >
            Guest
          </rs-button>
          <hr class="my-1" />
          <rs-button
            @click="checkPreviousOrder()"
            class="w-full"
            variant="primary-outline"
            v-if="this.orderid != null"
            >Check Previous Order
          </rs-button>
          <hr v-if="this.orderid != null" class="my-1" />
          <rs-button
            @click="memberLogin()"
            class="w-full"
            variant="primary-outline"
            >Member Login
          </rs-button>
          <hr class="my-1" />
          <p class="text-center">
            Don't have an account?<router-link
              :to="{
                name: 'orderMembership',
                params: { branchID: this.branch },
              }"
            >
              <a
                href="#"
                class="
                  underline
                  text-blue-600
                  hover:text-blue-800
                  visited:text-purple-600
                "
              >
                Sign Up</a
              ></router-link
            >
          </p>
          <hr class="my-1" />
        </div>
      </div>
      <div v-if="custLogin == true">
        <!-- LOGIN CUSTOMER -->
        <form-kit
          type="text"
          placeholder="Enter your name"
          validation="required"
          :validation-messages="{
            required: 'Please enter a name',
          }"
          v-model="name"
        />
        <FormKit
          type="tel"
          label="Phone number"
          placeholder="01xxxxxxxx"
          validation="matches:/^[0-9]{10}$/"
          :validation-messages="{
            matches: 'Phone number must be in the format 01xxxxxxxx',
          }"
          @keypress="onlyNumber"
          validation-visibility="dirty"
          v-model="phone"
        />
        <rs-button
          :disabled="isDisabled"
          class="w-full bg-heandshe hover:bg-heandshe"
          @click="orderType()"
          >Proceed</rs-button
        >
        <hr class="my-3" />
        <rs-button
          class="w-full"
          variant="primary-outline"
          @click="custCloseLogin()"
        >
          Back
        </rs-button>
      </div>
      <div v-if="mmberLogin == true">
        <form-kit
          type="text"
          placeholder="Enter your Email"
          validation="required"
          :validation-messages="{
            required: 'Please enter a Email',
          }"
          v-model="username"
        />
        <form-kit
          type="password"
          placeholder="Enter your password"
          :validation-messages="{
            required: 'Please enter a password',
          }"
          validation-visibility="live"
          v-model="password"
        />
        <rs-button
          :disabled="isDisabled2"
          class="w-full bg-heandshe hover:bg-heandshe"
          @click="checkMember()"
          >Proceed</rs-button
        >
        <hr class="my-3" />
        <rs-button
          class="w-full"
          variant="primary-outline"
          @click="mmberLoginClose()"
        >
          Back
        </rs-button>
      </div>
      <div v-if="pickOrdertype == true">
        <rs-button
          class="w-full bg-heandshe hover:bg-heandshe"
          @click="pickTable()"
          >Dine In</rs-button
        >
        <hr class="my-2" />
        <rs-button class="w-full" variant="primary-outline" @click="pickTime()">
          Take Away
        </rs-button>
        <hr class="my-2" />
        <rs-button
          class="w-full"
          variant="primary-outline"
          @click="pickComeTime()"
        >
          Book a Table
        </rs-button>
        <hr class="my-2" />
        <rs-button
          class="w-full"
          variant="primary-outline"
          @click="pickDelivery()"
        >
          Delivery
        </rs-button>
      </div>
      <div v-if="picktable == true">
        <div
          class="
            order-table-number
            flex
            items-center
            justify-center
            font-semibold
            text-2xl
            md:text-3xl
            mb-4
            gap-x-2
          "
        >
          <!-- <span v-if="changetable == false"
              >Table #{{ this.table ? this.table : "0" }}</span
            >
            <div v-else class="flex justify-center items-center">
              Table #
              <form-kit
                type="number"
                :classes="{
                  input: 'w-12 !h-8 !text-2xl !text-center !font-semibold !p-0',
                  outer: 'mb-0',
                }"
                v-model.number="this.table"
                @keypress="onlyNumber"
              />
            </div>
            <button
              class="
                p-1
                px-2
                bg-heandshe
                text-white
                rounded-xl
                text-sm
                hover:bg-heandshe
              "
              @click="
                changetable ? (changetable = false) : (changetable = true)
              "
            >
              Change table
            </button> -->
          <FormKit
            type="select"
            label="Table Number"
            name="table number"
            v-model="this.table"
            :options="tableOutlet"
          />
        </div>
        <rs-button
          class="w-full bg-heandshe hover:bg-heandshe"
          @click="pickOrder(this.table)"
          >Proceed</rs-button
        >
        <hr class="my-3" />
        <rs-button
          class="w-full"
          variant="primary-outline"
          @click="closetable()"
        >
          Back
        </rs-button>
      </div>
      <div v-if="picktimer == true">
        <FormKit
          type="time"
          label="Expected Pickup time"
          v-model="timer"
          value="23:15"
        />
        <rs-button class="w-full bg-heandshe" @click="addTime()"
          >Proceed</rs-button
        >
        <hr class="my-3" />
        <rs-button
          class="w-full"
          variant="primary-outline"
          @click="backOrdertype()"
        >
          Back
        </rs-button>
      </div>
      <div v-if="preordertime == true">
        <div
          class="
            order-table-number
            flex
            items-center
            justify-center
            font-semibold
            text-2xl
            md:text-3xl
            mb-4
            gap-x-2
          "
        >
          <FormKit
            type="select"
            label="Table Number"
            name="table number"
            v-model="this.table"
            :options="tableOutlet"
          />
        </div>
        <FormKit
          type="time"
          label="Expected arrival time"
          v-model="timer2"
          value="23:15"
        />
        <rs-button class="w-full bg-heandshe" @click="preorderCheck(this.table)"
          >Proceed</rs-button
        >
        <hr class="my-3" />
        <rs-button
          class="w-full"
          variant="primary-outline"
          @click="backOrdertype2()"
        >
          Back
        </rs-button>
      </div>

      <div v-if="deliveryTime == true">
        <FormKit
          type="time"
          label="Delivery time"
          v-model="timer3"
          value="23:15"
        />
        <FormKit
          type="date"
          label="Delivery Date"
          validation="required"
          v-model="datepicker"
        />
        <FormKit
          type="select"
          label="Location"
          v-model="location"
          :options="['Kampus ', 'Lotus Bandar Puteri Bangi', 'PR1MA Bandar Bukit Mahkota', 'Apartment Putra', 'Apartment Seri Melati']"
        />

        <rs-button class="w-full bg-heandshe" @click="addDelivery()"
          >Proceed</rs-button
        >
        <hr class="my-3" />
        <rs-button
          class="w-full"
          variant="primary-outline"
          @click="backOrdertype()"
        >
          Back
        </rs-button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import RsModal from "@/components/Modal.vue";
import RsButton from "@/components/Button.vue";

import { Navigation, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import moment from "moment";
import QrcodeVue from "qrcode.vue";

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
    const table = ref(route.params.table);
    table.value = route.query.table;
    const branch = ref(route.params.branchID);

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
      table,
      changetable,
      customerData,
      customerProceed,
      branch,
      modules: [Navigation, Autoplay, Scrollbar, A11y],
    };
  },

  //TEST FARIS//
  data() {
    return {
      LoginType: false,
      custLogin: false,
      pickOrdertype: false,
      picktable: false,
      mmberLogin: false,
      picktimer: false,
      customerProceed: false,
      preordertime: false,
      deliveryTime: false,

      /* DATA NULL */
      name: "",
      phone: "",
      username: "",
      password: "",
      timestamp: "",
      timer: "",
      datepicker: "",
      location: "",
      timer3: "",
      timer2: "",
      table2: "",
      table: 0,
      orderid: null,
      branch: 0,
      branch_Name: "",
      value: "https://example.com",
      size: 300,
      tableOutlet: [],

      /* LAMA DATA RETURN */

      dataUser: "Guest",
      guestMode: true,
      pickmode: false,
      pickedOrderType: false,
      timePicker: false,
    };
  },

  mounted() {
    if (localStorage.orderid != "") {
      this.orderid = localStorage.orderid;
      localStorage.removeItem("time");
      localStorage.removeItem("mmberno");
      localStorage.removeItem("order");
      localStorage.removeItem("orderID");
    }

    if (this.$route.params.table != "") {
      this.table = this.$route.params.table;
    } else {
      this.table = 0;
    }

    window.onbeforeunload = function () {
      localStorage.clear();
    };

    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.phone) {
      this.phone = localStorage.phone;
    }
    this.branch = this.$route.params.branchID;
    if (this.branch != 0 && this.branch != undefined) {
      this.getOutlet(this.branch);
      this.getTableNumber(this.branch);
    } else {
      this.branch = localStorage.branch;
      this.getOutlet(localStorage.branch);
      this.getTableNumber(localStorage.branch);
    }

    this.getNow();
  },
  computed: {
    isDisabled() {
      if (this.name !== "" && this.phone.length > 9 && this.phone.length != 0) {
        return false;
      } else {
        return true;
      }
    },
    isDisabled2() {
      if (this.username !== "" && this.password !== "") return false;
      else return true;
    },
  },
  watch: {
    customerProceed() {
      localStorage.name = this.name;
      localStorage.phone = this.phone;
    },
  },
  methods: {
    async CustomerDetails() {
      this.LoginType = true; /* TUTUP PILIH LOGIN */
      this.custLogin = true;
    },

    async custCloseLogin() {
      this.LoginType = false;
      this.custLogin = false;
    },

    async memberLogin() {
      this.LoginType = true;
      this.mmberLogin = true;
    },

    async mmberLoginClose() {
      this.LoginType = false;
      this.mmberLogin = false;
    },

    async orderType() {
      this.custLogin = false;
      this.mmberLogin = false;
      this.pickOrdertype = true;
      if (this.name != null && localStorage.name == null) {
        localStorage.name = this.name;
        localStorage.phone = this.phone;
        localStorage.branch = this.branch;
      }
    },

    async checkMember() {
      var axios = require("axios");
      var data = JSON.stringify({
        username: this.username,
        password: this.password,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/tbl/getMemberLogin",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status == 200) {
              localStorage.mmberno = response.data.data[0].member_no;
              localStorage.name = response.data.data[0].full_name;
              localStorage.phone = response.data.data[0].phone_no;

              this.orderType();
            } else {
              alert(response.data.message);
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async pickTable() {
      this.pickOrdertype = false;
      this.picktable = true;
    },

    async closetable() {
      this.pickOrdertype = true;
      this.picktable = false;
    },

    async pickTime() {
      this.pickOrdertype = false;
      this.picktimer = true;
    },

    async pickComeTime() {
      this.pickOrdertype = false;
      this.preordertime = true;
    },

    async pickDelivery() {
      this.pickOrdertype = false;
      this.deliveryTime = true;
    },

    async backOrdertype() {
      this.pickOrdertype = true;
      this.picktimer = false;
    },

    async backOrdertype2() {
      this.pickOrdertype = true;
      this.preordertime = false;
    },

    /* NI UNTUK MASUK SEBELUM ORDER */
    getNow: function () {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes();
      const dateTime = time;
      this.timestamp = dateTime;
    },

    async preorderCheck(table2) {
      const today = moment();
      if (this.timer2 <= today.format("HH:mm")) {
        alert("Please pick above current time");
      } else {
        if (this.timer2 < "10:30" || this.timer2 > "20:00") {
          alert("Outside Working Hours");
        } else {
          if (table2 != 0 && table2 > 0) {
            localStorage.time = this.timer2;
            this.customerProceed = true;
            this.$router.push({
              name: "order",
              params: { branchID: this.branch, orderID: "", table: table2 },
            });
          } else {
            alert("Please Enter a valid table number");
          }
        }
      }
    },
    async addTime() {
      const today = moment();
      /* if (this.timer <= today.format("HH:mm")) {
        alert("Please pick above current time");
      } else { */
      /*  if (this.timer < "10:30" || this.timer > "20:00") { */
      /* alert("Outside Working Hours"); */
      /*  } else { */
      localStorage.time = this.timer;
      localStorage.branch = this.branch;
      this.customerProceed = true;
      this.$router.push({
        name: "takeaway",
        params: { branchID: this.branch, orderID: "", table: 0 },
      });
      /* } */
      /* } */
    },

    async addDelivery() {
      const today = moment();

      /* if (this.timer <= today.format("HH:mm")) {
        alert("Please pick above current time");
      } else { */
      /*  if (this.timer < "10:30" || this.timer > "20:00") { */
      /* alert("Outside Working Hours"); */
      /*  } else { */
      localStorage.time = this.timer3;
      localStorage.date = this.datepicker;
      localStorage.branch = this.branch;
      localStorage.location = this.location;
      this.customerProceed = true;
      this.$router.push({
        name: "delivery",
        params: { branchID: this.branch, orderID: "", table: 0 },
      });
      /* } */
      /* } */
    },

    async pickOrder(table) {
      if (table != 0 && table > 0) {
        this.customerProceed = true;
        localStorage.branch = this.branch;
        this.$router.push({
          name: "order",
          params: { branchID: this.branch, table: table, orderID: "" },
        });
      } else {
        alert("Please Enter a valid table number");
      }
    },

    /* METHOD LAMA */
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
    async passDine() {
      this.picktable = true;
      this.pickmode = false;
    },
    /* async addTime() {
      localStorage.time = this.timer;
      this.customerProceed = true;
      this.$router.push({
        name: "order",
        params: { branchID: this.branch, orderID: "", table: 0 },
      });
    }, */

    async getTableNumber(branch) {
      var axios = require("axios");
      var data = JSON.stringify({
        branch_ID: branch,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/tbl/getTableNumber",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.tableOutlet.push({
                label: response.data.data[i].outlet_table_Name,
                value: response.data.data[i].outlet_table_id,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async addTable(table) {
      if (table != 0 && table > 0) {
        this.customerProceed = true;
        localStorage.branch = this.branch;
        this.$router.push({
          name: "order",
          params: { branchID: this.branch, orderID: "", table: table },
        });
      } else {
        alert("Please Enter a valid table number");
      }
    },
    async BackMain() {
      localStorage.clear();
      this.pickedOrderType = false;
      this.guestMode = true;
      this.picktable = false;
    },
    async customerAdvancedOrder() {
      this.pickmode = true;
      localStorage.name = this.name;
      localStorage.phone = this.phone;
      this.pickedOrderType = true;
      this.timePicker = false;
      /* if (table != 0 && table > 0) {
        this.customerProceed = true;
        this.$router.push({
          name: "order",
          params: { branchID: "", orderID: "", table: table },
        });
      } else {
        alert("Please Enter a valid table number");
      } */
    },
    async checkPreviousOrder() {
      this.$router.push({
        name: "order-previous",
        params: { orderID: this.orderid },
      });
    },

    async nameKeydown(e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault();
      }
    },

    async onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
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
