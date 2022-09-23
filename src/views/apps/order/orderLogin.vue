<template>
  <rs-layout>
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
            <img
              class="flex-1"
              src="@/assets/images/logo/heandshe.jpg"
              alt=""
            />
          </div>
          <div class="text-white">He & She UM</div>
        </div>
        <div
          style="height: 40vh"
          class="flex flex-col justify-center items-center"
        >
          <div class="w-70">
            <!-- @/assets/images/illustration/eating.svg -->
            <img
              class="object-scale-down"
              src="@/assets/images/logo/heandshe.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="m-8">
        <div v-if="pickedOrderType == false">
          <div v-if="guestMode == true">
            <div class="h-full p-4">
              <rs-button
                class="w-full bg-heandshe hover:bg-heandshe"
                @click="customerAdvanced((dataUser = 'Guest'))"
              >
                Enter Customer Details
              </rs-button>
              <hr class="my-1" />
              <rs-button
                @click="customerAdvancedOrder(table)"
                class="w-full"
                variant="primary-outline"
                >Guest
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
                @click="customerAdvanced((dataUser = 'Guest'))"
                class="w-full"
                variant="primary-outline"
                >Member Login
              </rs-button>
              <hr class="my-1" />
              <p class="text-center">
                Don't have an account?<router-link
                  :to="{ name: 'orderMembership' }"
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
              <!-- customerProceed = true -->
            </div>
          </div>
          <div v-else>
            <form-kit
              type="text"
              placeholder="Enter your name"
              validation="required"
              :validation-messages="{
                required: 'Please enter a name',
              }"
              v-model="name"
            />
            <form-kit
              type="number"
              placeholder="Enter your phone number"
              v-model="phone"
            />
            <rs-button
              :disabled="isDisabled"
              class="w-full bg-heandshe"
              @click="customerAdvancedOrder()"
              >Proceed</rs-button
            >
            <hr class="my-3" />
            <rs-button
              class="w-full"
              variant="primary-outline"
              @click="guestMode = true"
            >
              Back
            </rs-button>
          </div>
        </div>
        <div v-else>
          <!-- UBAH HARDCODE JE NI -->
          <div v-if="pickmode == true">
            <div v-if="timePicker == false">
              <rs-button class="w-full bg-heandshe hover:bg-heandshe" @click="passDine()"
                >Dine In</rs-button
              >
              <hr class="my-3" />
              <rs-button
                class="w-full"
                variant="primary-outline"
                @click="pickTime()"
              >
                Take Away
              </rs-button>
              <hr class="my-3" />
              <rs-button
                class="w-full"
                variant="primary-outline"
                @click="pickTime()"
              >
                Pre Order
              </rs-button>
              <hr class="my-3" />
              <rs-button
                class="w-full"
                variant="primary-outline"
                @click="BackMain()"
              >
                Back
              </rs-button>
            </div>
            <div v-else>
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
                @click="BackMain()"
              >
                Back
              </rs-button>
            </div>
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
              <span v-if="changetable == false"
                >Table #{{ table ? table : "0" }}</span
              >
              <div v-else class="flex justify-center items-center">
                Table #
                <form-kit
                  type="number"
                  :classes="{
                    input:
                      'w-12 !h-8 !text-2xl !text-center !font-semibold !p-0',
                    outer: 'mb-0',
                  }"
                  v-model.number="table"
                  @keydown="nameKeydown($event)"
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
              </button>
            </div>
            <rs-button class="w-full bg-heandshe hover:bg-heandshe" @click="addTable(table)"
              >Proceeds</rs-button
            >
            <hr class="my-3" />
            <rs-button
              class="w-full"
              variant="primary-outline"
              @click="BackMain()"
            >
              Back
            </rs-button>
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
  },
  setup(props) {
    const changetable = ref(false);

    const route = useRoute();
    const table = ref(0);
    table.value = route.query.table;
    const branch = ref(route.query.branch);

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

      modules: [Navigation, Autoplay, Scrollbar, A11y],
    };
  },

  //TEST FARIS//
  data() {
    return {
      name: "",
      phone: "",
      timer: "",
      table: 0,
      dataUser: "Guest",
      guestMode: true,
      customerProceed: false,
      orderid: null,
      pickmode: false,
      pickedOrderType: false,
      timePicker: false,
      picktable: false,
    };
  },

  mounted() {
    if (localStorage.orderid != "") {
      this.orderid = localStorage.orderid;
      localStorage.removeItem("name");
      localStorage.removeItem("phone");
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
  },
  computed: {
    isDisabled() {
      if (this.name !== "" && this.phone !== "") return false;
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
    async customerAdvanced(dataUser) {
      if (dataUser == "Guest") this.guestMode = false;
    },
    async pickTime() {
      this.timePicker = true;
    },
    async passDine() {
      this.picktable = true;
      this.pickmode = false;
    },
    async addTime() {
      localStorage.time = this.timer;
      this.customerProceed = true;
      this.$router.push({
        name: "order",
        params: { branchID: "", orderID: "", table: 0 },
      });
    },

    async addTable(table) {
      if (table != 0 && table > 0) {
        this.customerProceed = true;
        this.$router.push({
          name: "order",
          params: { branchID: "", orderID: "", table: table },
        });
      } else {
        alert("Please Enter a valid table number");
      }
    },
    async BackMain() {
      localStorage.clear();
      this.pickedOrderType = false;
      this.guestMode = true;
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
