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
            src="@/assets/images/logo/cuppa.png"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="m-8">
      <div
        class="order-table-number flex items-center justify-center font-semibold text-2xl md:text-3xl mb-4 gap-x-2"
      >
        <span v-if="changetable == false"
          >Table #{{ table ? table : "0" }}</span
        >
        <div v-else class="flex justify-center items-center">
          Table #
          <form-kit
            type="number"
            :classes="{
              input: 'w-12 !h-8 !text-2xl !text-center !font-semibold !p-0',
              outer: 'mb-0',
            }"
            v-model.number="table"
            @keydown="nameKeydown($event)"
          />
        </div>
        <button
          class="p-1 px-2 bg-heandshe text-white rounded-xl text-sm hover:bg-heandshe"
          @click="changetable ? (changetable = false) : (changetable = true)"
        >
          Change table
        </button>
      </div>
      <div v-if="guestMode == true">
        <div class="h-full p-4">
          <rs-button
            class="w-full mb-4 bg-heandshe hover:bg-heandshe"
            @click="customerAdvanced((dataUser = 'Guest'))"
          >
            Enter Customer Details
          </rs-button>
          <hr class="my-2" />
          <rs-button
            @click="customerAdvancedOrder(table)"
            class="w-full"
            variant="primary-outline"
            >Guest
          </rs-button>
          <hr class="my-2" />
          <rs-button
            @click="checkPreviousOrder()"
            class="w-full"
            variant="primary-outline"
            v-if="this.orderid != null"
            >Check Previous Order
          </rs-button>
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
          @click="customerAdvancedOrder(table)"
          >Proceed Order</rs-button
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
      table: 0,
      dataUser: "Guest",
      guestMode: true,
      customerProceed: false,
      orderid: null,
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
    async customerAdvancedOrder(table) {
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
