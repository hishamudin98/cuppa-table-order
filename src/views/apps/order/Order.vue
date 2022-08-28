<template>
  <rs-layout>
    <!-- Get Customer and Phone -->
    <!-- <div v-if="customerProceed == false" class="order-customer">
      <div
        style="
          height: 56vh;
          border-bottom-left-radius: 2rem;
          border-bottom-right-radius: 2rem;
        "
        class="bg-primary-400 after:content-['']"
      >
        <div class="flex justify-between items-center p-2">
          <div class="bg-black h-10 w-10 p-1 rounded-full">
            <img
              class="flex-1"
              src="@/assets/images/logo/logo-white.png"
              alt=""
            />
          </div>
          <div class="text-white">Malaya Grill Sungai Buloh </div>
        </div>
        <div
          style="height: 40vh"
          class="flex flex-col justify-center items-center"
        >
          <div class="w-70">
            <img
              class="object-scale-down"
              src="@/assets/images/illustration/eating.svg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="m-8">
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
              validation="min:0"
              :validation-messages="{
                min: 'Please enter table number',
              }"
              :classes="{
                input: 'w-12 !h-8 !text-2xl !text-center !font-semibold !p-0',
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
              bg-primary-400
              text-white
              rounded-xl
              text-sm
              hover:bg-primary-300
            "
            @click="changetable ? (changetable = false) : (changetable = true)"
          >
            Change table
          </button>
        </div>
        <div v-if="guestMode == true">
          <div class="h-full p-4">
            <rs-button
              class="w-full mb-4"
              @click="customerAdvanced((dataUser = 'Guest'))"
            >
              Enter Customer Details
            </rs-button>
            <hr class="my-6" />
            <rs-button
              @click="customerAdvancedOrder(table)"
              class="w-full"
              variant="primary-outline"
              >Guest
            </rs-button>
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
            class="w-full"
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
    </div> -->
    
    <!-- v-elseOrder Menu Page -->
    <div class="order-menu-page">
      <div style="height: 43vh" class="bg-primary-400 after:content-[''] p-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-x-2">
            <vue-feather
              class="text-white"
              type="chevron-left"
              @click="customerProceed = false"
            ></vue-feather>
            <div class="welcome text-lg font-semibold text-white">
              Table #{{ $route.params.table  }}
            </div>
          </div>

          <div class="flex gap-x-2 items-center">
            <!-- <div class="text-white" v-if="guestMode == false">
              Hishammudin Ali
            </div>
            <div class="text-white" v-if="guestMode == true">Guest</div> -->
            <div class="text-white">Malaya Grill Sungai Buloh</div>
            <div class="bg-black h-10 w-10 p-1 rounded-full">
              <img
                class="flex-1"
                src="@/assets/images/logo/logo-white.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div style="height: 32vh" class="advertisment flex items-center">
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :centeredSlides="true"
            :autoplay="{
              delay: 4000,
            }"
          >
            <swiper-slide v-for="n in 4" :key="n">
              <div
                class="w-full h-40 flex justify-center items-center rounded-xl"
              >
                <img
                  :src="'https://pbs.twimg.com/media/ESuQl4yUEAAxsSX?format=jpg&name=900x900'"
                />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <FormKit
        v-model="search"
        id="search"
        placeholder="Search for a menu..."
        type="search"
        :classes="{
          inner:
            'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
          outer: 'flex-1 mb-0 relative -top-6 mx-4',
          input: 'h-12',
        }"
      />
      <div class="bg-white hidden sticky top-0">
        <FormKit
          v-model="search"
          id="search-sticky"
          placeholder="Search for a menu..."
          type="search"
          :classes="{
            inner:
              'border-0 rounded-md shadow-md shadow-slate-200 dark:shadow-slate-900',
            outer: 'flex-1 mb-0',
            input: 'h-12',
          }"
        />
      </div>
      <div class="menu">
        <div class="filter-top-wrapper flex pb-4">
          <perfect-scrollbar style="width: 100%">
            <div class="category-wrapper flex gap-x-4">
              <button
                class="
                  flex
                  items-center
                  rounded-lg
                  py-2
                  px-3
                  bg-white
                  dark:bg-slate-800 dark:text-gray-300
                  hover:bg-slate-200
                  font-semibold
                  text-sm
                  shadow-md shadow-slate-200
                  dark:shadow-slate-900
                  whitespace-nowrap
                "
                v-for="(category, index) in categories"
                :key="index"
              >
                <div
                  class="
                    flex
                    items-center
                    bg-slate-100
                    dark:bg-slate-700
                    border border-slate-200
                    dark:border-slate-700
                    w-10
                    h-10
                    rounded-lg
                    mr-2
                  "
                >
                  <img
                    class="h-full w-full object-scale-down"
                    :src="category.image"
                  />
                </div>
                <span>{{ category.name }}</span>
              </button>
            </div>
          </perfect-scrollbar>
        </div>
        <div
          class="gap-4"
          :class="{
            'pb-10': order && order.length > 0,
          }"
        >
          <div
            class="relative"
            v-for="(product, index) in searchMenus"
            :key="index"
            @click="viewDetailItem(product)"
          >
            <!-- <div
              v-if="index == menus.length - 1"
              class="
                bg-red-500
                absolute
                top-10
                left-6
                z-30
                text-white
                py-2
                px-2
                rounded-lg
              "
            >
              Sold Out
            </div>
            <div
              v-if="index == menus.length - 2"
              class="
                bg-red-500
                absolute
                top-10
                left-6
                z-30
                text-white
                py-2
                px-2
                rounded-lg
              "
            >
              Out of Stock
            </div> -->
            <rs-card class="mb-5 cursor-pointer"
              ><!-- :class="{
                'bg-gray-100 opacity-40':
                  index == menus.length - 1 || index == menus.length - 2,
              }" -->
              <div class="flex justify-center items-center">
                <div class="product-image relative w-30 h-30 p-4 rounded-lg">
                  <img
                    class="object-scale-down w-full"
                    :src="
                      product.images && product.images.length > 0
                        ? product.images
                        : ''
                    "
                    :alt="product.name"
                  />

                  <span
                    v-if="product.discount && product.discount != 0"
                    class="
                      product-discount
                      text-sm
                      bg-primary-500
                      text-white
                      absolute
                      top-3
                      -right-2
                      px-2
                      py-1
                      rounded-md
                    "
                  >
                    {{ product.discount }}% off
                  </span>
                </div>
                <div
                  class="product-content-wrapper flex-1 flex flex-col px-4 mb-4"
                >
                  <div class="product-title mt-4">
                    <span class="block text-base font-semibold line-clamp-2"
                      >{{ product.name }}
                    </span>
                  </div>
                  <div class="product-content flex flex-col">
                    <div class="product-price flex justify-between">
                      <div class="truncate leading-tight">
                        <div class="text-sm text-primary-500 flex items-center">
                          {{ product.currency }}
                          <span class="text-lg">
                            {{
                              product.discountedPrice
                                ? formatPrice(product.discountedPrice)
                                : formatPrice(product.price)
                            }}
                          </span>
                        </div>
                        <div
                          v-if="product.discountedPrice"
                          class="text-xs md:text-md text-gray-400"
                        >
                          <span class="line-through">
                            {{ product.currency
                            }}{{ formatPrice(product.price) }}
                          </span>
                          | {{ product.stock }} Left
                        </div>
                        <div
                          v-if="product.duration"
                          class="duration text-primary-400 text-xs md:text-md"
                        >
                          ({{ product.duration }} remaining)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div
                class="
                  tag
                  bg-primary-400
                  text-xs
                  px-1
                  w-fit
                  rounded-sm
                  text-white
                  absolute
                  bottom-2
                  right-2
                "
              >
                NEW
              </div>
              <div
                class="
                  tag
                  bg-primary-400
                  text-xs
                  px-1
                  w-fit
                  rounded-sm
                  text-white
                  absolute
                  bottom-2
                  right-14
                "
              >
                RECOMMEND
              </div> -->
            </rs-card>
          </div>
        </div>
      </div>

      <rs-modal
        title="This is a modal"
        v-model="openModal"
        position="bottom"
        size="full"
      >
        <template #custom>
          <div class="rounded-t-3xl" style="min-height: 90vh">
            <perfect-scrollbar class="mb-4" style="height: 90vh">
              <button
                class="
                  flex
                  justify-center
                  items-center
                  p-1
                  bg-primary-400
                  absolute
                  top-2
                  right-2
                  rounded-full
                  z-50
                "
              >
                <vue-feather
                  @click="openModal = false"
                  class="text-primary-100"
                  type="x"
                ></vue-feather>
              </button>
              <div class="relative">
                <img
                  class="w-full h-60 object-cover rounded-t-xl"
                  :src="modalData ? modalData.images[0] : ''"
                  alt=""
                />
              </div>

              <div class="modal-item-wrapper pt-4 px-2 overflow-hidden">
                <div class="modal-item-header">
                  <span class="font-semibold text-lg line-clamp-2 mb-2">{{
                    modalData ? modalData.name : ""
                  }}</span>
                  <p class="line-clamp-2 text-sm text-gray-400">
                    {{ modalData ? modalData.description : "" }}
                  </p>
                </div>
                <div class="flex justify-start items-center mt-2">
                  <div class="truncate leading-tight">
                    <div class="text-lg text-primary-500">
                      {{ modalData.currency
                      }}<span class="text-xl">
                        {{
                          modalData.discountedPrice
                            ? formatPrice(modalData.discountedPrice)
                            : formatPrice(modalData.price)
                        }}</span
                      >
                    </div>
                    <div
                      v-if="modalData.discountedPrice"
                      class="text-lg md:text-xl text-gray-400"
                    >
                      <span class="line-through">
                        {{ modalData.currency
                        }}{{ formatPrice(modalData.price) }}
                      </span>
                      | {{ modalData.stock }} Left
                    </div>
                  </div>
                </div>

                <hr class="my-4" />
                <div class="modal-item-content">
                  <div
                    class="
                      membership
                      flex
                      gap-3
                      rounded-md
                      shadow-md
                      w-full
                      p-3
                      mb-4
                    "
                  >
                    <form-kit
                      type="text"
                      placeholder="Got membership code?"
                      :classes="{
                        outer: 'flex-1 mb-0',
                      }"
                      v-model="mmberShip"
                    />
                    <rs-button @click="checkMembership()">Apply</rs-button>
                  </div>

                  <div v-if="modalData.variants" class="modal-item-variance">
                    <div
                      v-for="(val, index) in modalData.variants"
                      :key="index"
                    >
                      <div class="font-semibold text-lg mb-4">
                        {{ val.title }}
                        <span
                          class="text-gray-400 font-normal text-sm"
                          v-if="val.required"
                          >(required)</span
                        >
                      </div>
                      <div class="variant-choice">
                        <form-kit
                          v-if="val.type == 'radio'"
                          :type="val.type"
                          :value="
                            index == 1
                              ? 'Nasi Arab'
                              : index == 2
                              ? 'Spicy Level 2'
                              : index == 3
                              ? 'Tomato'
                              : ''
                          "
                          :options="val.data"
                          :classes="{
                            fieldset: '!border-0 !p-0',
                          }"
                        />
                        <div v-else>
                          <div
                            class="flex justify-between items-center mb-3"
                            v-for="(val, index) in val.data"
                            :key="index"
                          >
                            <div class="flex items-center cursor-pointer">
                              <input
                                class="rs-checkbox"
                                type="checkbox"
                                :id="menus.sku + '-check-' + index"
                                :value="val"
                              />
                              <label
                                class="
                                  text-gray-700
                                  dark:text-gray-200
                                  text-sm
                                  formkit-disabled:text-gray-300
                                  dark:formkit-disabled:text-gray-700
                                "
                                :for="menus.sku + '-check-' + index"
                              >
                                {{ val }}
                                <span class="text-primary-500">( +1.00 )</span>
                              </label>
                            </div>
                            <div class="flex items-center gap-x-2">
                              <button
                                class="
                                  flex
                                  items-center
                                  justify-center
                                  bg-primary-400
                                  text-primary-50
                                  p-1
                                  rounded-lg
                                "
                              >
                                <vue-feather
                                  size="1rem"
                                  type="minus"
                                ></vue-feather>
                              </button>
                              <span class="text-gray-500"
                                ><input
                                  type="number"
                                  min="0.00"
                                  :value="quantity"
                              /></span>
                              <button
                                class="
                                  flex
                                  items-center
                                  justify-center
                                  bg-primary-400
                                  text-primary-50
                                  p-1
                                  rounded-lg
                                "
                                @click="increment()"
                              >
                                <vue-feather
                                  size="1rem"
                                  type="plus"
                                ></vue-feather>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="
                  membership
                  flex
                  gap-3
                  rounded-md
                  shadow-md
                  w-full
                  p-3
                  mb-4
                "
              >
                <h4>Remarks</h4>
                <textarea variant="primary-outline" style="width:100%; border:solid 1px orange;" v-model="remarks"></textarea>
              </div>
              <div class="modal-item-type mb-6 px-2">
                <div class="font-semibold text-lg mb-4">Order Type</div>
                <div class="flex gap-4">
                  <!-- <rs-button  variant="primary" class="h-10">Dine-In </rs-button>
                  <rs-button variant="primary-outline" class="h-10"
                    >Takeaway</rs-button
                  > -->
                  <rs-button id="dineIn" variant="primary" class="h-10">
                    <input
                      class="rs-radio"
                      type="radio"
                      id="dineIn"
                      value="1"
                      v-model="picked"
                    />
                    <label for="dineIn">Dine In</label>
                  </rs-button>
                  <rs-button
                    id="takeAway"
                    variant="primary-outline"
                    class="h-10"
                  >
                    <input
                      class="rs-radio"
                      type="radio"
                      id="takeAway"
                      value="2"
                      v-model="picked"
                    />
                    <label for="takeAway">Take Away</label>
                  </rs-button>
                </div>
              </div>
              <div
                class="
                  modal-item-action
                  flex
                  w-full
                  justify-between
                  items-center
                  overflow-auto
                  px-2
                  gap-x-2
                "
              >
                <button
                  class="
                    bg-primary-400
                    text-white
                    w-full
                    py-2
                    px-4
                    rounded-full
                  "
                  @click="addToCart(modalData, picked, discount,remarks)"
                >
                  Add to Cart - RM
                  {{
                    modalData && modalData.price
                      ? formatPrice(modalData.price)
                      : formatPrice(modalData.price)
                  }}
                </button>
                <div class="flex gap-x-2">
                  <button
                    class="
                      flex
                      items-center
                      justify-center
                      bg-primary-400
                      text-primary-50
                      p-1
                      rounded-lg
                    "
                    @click="decrement()"
                  >
                    <!-- @click="quantity > 0 ? quantity-- : (quantity = 0)" -->
                    <vue-feather type="minus"></vue-feather>
                  </button>
                  {{ this.quantity }}
                  <!-- <form-kit
                    type="text"
                    :value="quantity"
                    :classes="{
                      outer: 'mb-0',
                      input: 'w-10 h-10 text-center',
                    }"
                  /> -->
                  <button
                    class="
                      flex
                      items-center
                      justify-center
                      bg-primary-400
                      text-primary-50
                      p-1
                      rounded-lg
                    "
                    @click="increment()"
                  >
                    <!-- @click="quantity = quantity + 1" -->
                    <vue-feather type="plus"></vue-feather>
                  </button>
                </div>
              </div>
            </perfect-scrollbar>
          </div>
        </template>
      </rs-modal>

      <div
        v-if="order && order.length > 0"
        class="button-to-cart p-2 flex w-full z-50 rounded-full"
      >
        <button
          class="
            bg-primary-500
            py-4
            px-5
            rounded-l-full
            text-white
            whitespace-nowrap
            shadow-md shadow-primary-200
          "
        >
          RM {{ formatPrice(totalPrice) }}
        </button>
        <rs-button
          class="
            flex
            justify-between
            items-center
            w-full
            bg-primary-400
            py-4
            px-5
            rounded-r-full
            text-white
            whitespace-nowrap
            shadow-md shadow-primary-200
          "
          v-on:click="insertOrder(discount)"
        >
          <div>Confirm Order ({{ order.length }})</div>
          <vue-feather type="shopping-cart"></vue-feather>
        </rs-button>
      </div>
    </div>
  </rs-layout>
</template>

<script>
/* eslint-disable */
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import items from "./data";
import category from "./category";
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
    const guestMode = ref(true);

    const route = useRoute();
    console.log(route.query);
    console.log(route.params);
    const table = ref(route.params.table);
    const branch = ref(route.query.branch);
    const orderID = ref(route.params.orderID);
    
    const customerData = ref({
      name: "",
      phone: "",
    });
    const customerProceed = ref(false);

    const data = ref(items);
    const categories = ref([]);
    const menus = ref([]);
    const dataUser = ref("Guest");

    const order = ref([]);
    const search = ref("");
    const quantity = ref(1);
    const totalPrice = ref(0);

    const openModal = ref(false);
    const modalData = ref({});
    const filters = ref([]);
    const activeFilter = ref("");

    const formatPrice = (price) => {
      return parseFloat(price)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatSold = (n) => {
      if (n < 1e3) return n;
      if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
    };

    const customerAdvanced = (dataUser) => {
      if (dataUser != "") {
        if (dataUser === "Guest") {
          guestMode.value = false;
        }
      }
    };

    const customerAdvancedOrder = (table) => {
      if (table != 0) {
        customerProceed.value = true;
      } else {
        alert("Please Enter a valid table number");
        
      }
    };

    const addToCart = (product, picked, discount,remarks) => {
      
      if (localStorage.name != "") {
        var nameCust = localStorage.name;
        var phoneCust = localStorage.phone;
      } else {
        var nameCust = "";
        var phoneCust = "";
      }

      const exist = order.value.find(
        (item) => item.sku === product.sku && item.orderType == picked
      );
      if (exist) {
        exist.quantity++;
        var total = 0;
        var sum = 0;
        for (let i = 0; i < order.value.length; i++) {
          sum = parseInt(order.value[i].quantity);
          total += parseFloat(order.value[i].price) * sum;
        }
        totalPrice.value = total;
      } else {
        order.value.push({
          tableNo: table.value,
          sku: product.sku,
          name: product.name,
          price: product.discountedPrice
            ? formatPrice(product.discountedPrice)
            : formatPrice(product.price),
          quantity: quantity.value,
          orderType: picked,
          id: product.id,
          custName: nameCust,
          custPhone: phoneCust,
          discount: discount,
          remarks: remarks
        });
        var total = 0;
        var sum = 0;
        for (let i = 0; i < order.value.length; i++) {
          sum = parseInt(order.value[i].quantity);
          total += parseFloat(order.value[i].price) * sum;
        }
        totalPrice.value = total;
      }
      openModal.value = false;
    };

    const viewDetailItem = (product) => {
      modalData.value = product;
      openModal.value = true;
    };

    watch(openModal, (val) => {
      if (val) {
        disableScroll(val);
      } else {
        disableScroll(val);
      }
    });

    const disableScroll = (hide) => {
      const body = document.querySelector("body");
      if (hide) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    };

    const searchMenus = computed(() => {
      return menus.value.filter((product) => {
        return (
          product.name.toLowerCase().indexOf(search.value.toLowerCase()) != -1
        );
      });
    });

    return {
      table,
      guestMode,
      changetable,
      customerData,
      customerProceed,
      items: data,
      categories,
      menus,
      order,
      totalPrice,
      search,
      searchMenus,
      modalData,
      openModal,
      quantity,
      dataUser,
      formatPrice,
      formatSold,
      viewDetailItem,
      addToCart,
      customerAdvanced,
      customerAdvancedOrder,
      modules: [Navigation, Autoplay, Scrollbar, A11y],
    };
  },

  //TEST FARIS//
  data() {
    return {
      name: "",
      phone: "",
      table: 0,
      picked: "1",
      IDMENU: 0,
      quantity: 1,
      mmberShip: "",
      discount: false,
      remarks:"",
      orderID:0,
    };
  },

  async created() {
    this.getCategories();
    this.getMenu();
  },

  mounted() {
    this.orderID = this.$route.params.orderID;
    this.table = this.$route.params.table;
    
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
    async getCategories() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: "http://localhost:3000/tbl/getCategory" /* https://toyyibfnb.com/api/tbl/getCategory */,
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              this.categories.push({
                name: response.data.data[i].category_name,
                image:
                  "https://cf.shopee.com.my/file/5798838bfaf96b0af5aa5810e4fddd30",
                id: response.data.data[i].category_id,
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    async getMenu() {
      var axios = require("axios");
      var config = {
        method: "get",
        url: "http://localhost:3000/getMenu" /* https://toyyibfnb.com/api/getMenu */,
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(
          function (response) {
            for (let i = 0; i < response.data.data.length; i++) {
              var images = JSON.parse(response.data.data[i].menu_image);
              if (images == null) {
                images = [{ image1: "" }];
              }
              this.menus.push({
                sku: response.data.data[i].menu_code,
                name: response.data.data[i].menu_name,
                description: response.data.data[i].menu_desc,
                price: response.data.data[i].menu_price,
                currency: "RM",
                store: "Malaya Grill",
                images: [images[0].image1],
                id: response.data.data[i].menu_id,
                catid: response.data.data[i].fkcat_id,
                /* images: [`https://s3.ap-southeast-1.amazonaws.com/cdn.toyyibfnb.com/images/${response.data.data[i].menu_code}.png`], */
              });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    async insertOrder(discount) {
      var axios = require("axios");
      var data = JSON.stringify({
        order: this.order,
        total: this.totalPrice,
        discounted: discount,
      });

      var config = {
        method: "post",
        url: "http://localhost:3000/tbl/insertOrder",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            this.IDMENU = response.data.data;
            /* :to="{ name: 'order-payment' , params:{id:  } }" */
            this.$router.push({
              name: "order-payment",
              params: { id: this.IDMENU },
            });
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    async checkMembership() {
      var axios = require("axios");
      var data = JSON.stringify({
        mmberID: this.mmberShip,
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/tbl/getMembership",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            if (response.data.status === 200) {
              this.discount = true;
              alert("Discount Applied");
            } else {
              this.discount = false;
              alert("No Membership Found");
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    async increment() {
      this.quantity++;
    },
    async decrement() {
      if (this.quantity === 1) {
        alert("Negative quantity not allowed");
      } else {
        this.quantity--;
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
.button-to-cart {
  position: fixed;
  left: 50%;
  top: 92%;
  transform: translate(-50%, -50%);
}

.triangle {
  width: 0;
  height: 0;
  border: 3px solid transparent;
  border-left: 0;
  border-right: 10px solid white;
}
</style>
