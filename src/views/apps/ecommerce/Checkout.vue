<template>
  <rs-layout>
    <rs-breadcrumb />
    <rs-card>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="py-7 bg-white dark:bg-slate-800 rounded-l-lg">
          <div class="px-10">
            <h5>Summary Order</h5>
            <p>This is a list of items in the cart.</p>
          </div>
          <perfect-scrollbar class="mt-7 px-10" style="height: 350px">
            <rs-card class="p-5" v-for="(product, index) in data" :key="index">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="product-img flex items-center w-30 h-30">
                  <img class="object-center" :src="product.images[0]" alt="" />
                </div>
                <div class="product-title flex-1 flex flex-col justify-between">
                  <div>
                    <h5 class="line-clamp-1">
                      {{ product.name }}
                    </h5>
                    <span> {{ product.sku }} </span><br />
                    <span> Quantity: 1 </span>
                  </div>
                  <div class="product-price my-2">
                    <span class="text-xl font-semibold"
                      >RM{{ formatPrice(product.price) }}</span
                    >
                    <span
                      v-if="product.discountedPrice"
                      class="
                        text-base
                        line-through
                        text-secondary
                        ml-0
                        md:ml-2
                        mt-1
                        block
                        md:inline-block
                        text-gray-400
                      "
                    >
                      {{ product.currency }}{{ formatPrice(product.price) }}
                    </span>
                  </div>
                </div>
              </div>
            </rs-card>
          </perfect-scrollbar>
          <div class="mt-7 px-10">
            <span class="font-semibold">Address</span>
            <rs-card class="mt-7 p-5 text-white !bg-primary-400">
              <h6>Home</h6>
              <p>
                116, Jalan Tengku Badar, Kampung Raja Uda, 42000 Pelabuhan
                Klang, Selangor
              </p>
            </rs-card>
            <rs-card class="mt-5 p-5">
              <h6>Office</h6>
              <p>
                11, Jalan Tasik Selatan 3, Bandar Tasik Selatan, 57000 Kuala
                Lumpur, Wilayah Persekutuan Kuala Lumpur
              </p>
            </rs-card>
          </div>
        </div>
        <div class="py-7 bg-gray-50 dark:bg-slate-700 rounded-r-lg">
          <div class="px-10">
            <h5>Payment Details</h5>
            <p>Enter your payment details below.</p>
          </div>
          <div class="form-detail mt-7">
            <div
              class="
                text-base
                font-semibold
                bg-gray-200
                dark:bg-slate-600
                py-3
                px-10
                my-4
              "
            >
              Customer Information
            </div>
            <div class="form-customer px-10">
              <FormKit
                type="text"
                label="Name"
                placeholder="Enter your name"
              /><FormKit
                type="email"
                label="Email Address"
                placeholder="Enter your email"
              />
              <FormKit
                type="mask"
                label="Phone Number"
                placeholder="Enter your phone number"
                mask="###########"
              >
              </FormKit>
            </div>

            <div
              class="
                text-base
                font-semibold
                bg-gray-200
                dark:bg-slate-600
                py-3
                px-10
                my-4
              "
            >
              Payment Type
            </div>
            <div class="flex mx-4">
              <div class="w-full">
                <ul class="flex mb-0 list-none pt-4 pb-3 flex-col">
                  <li
                    class="
                      mb-0
                      last:mr-0
                      flex-auto
                      text-left
                      sm:text-center
                      relative
                    "
                  >
                    <a
                      class="
                        text-xs
                        font-bold
                        uppercase
                        px-5
                        py-4
                        shadow
                        block
                        leading-normal
                      "
                      @click="toggleTabs(1)"
                      :class="{
                        'text-primary bg-white': paymentMethod !== 1,
                        'text-white bg-primary-400': paymentMethod === 1,
                      }"
                    >
                      Online Banking (FPX)
                      <img
                        src="@/assets/images/fpx-default.png"
                        class="w-16 float-right invisible md:visible"
                        style="position: absolute; top: 9px; right: 15px"
                        alt=""
                        v-if="paymentMethod !== 1"
                      />
                      <img
                        src="@/assets/images/fpx-white.png"
                        class="w-16 float-right invisible md:visible"
                        style="position: absolute; top: 9px; right: 15px"
                        alt=""
                        v-if="paymentMethod === 1"
                      />
                    </a>
                  </li>
                  <li
                    class="
                      -mb-px
                      mr-2
                      last:mr-0
                      flex-auto
                      text-left
                      sm:text-center
                      relative
                    "
                  >
                    <a
                      class="
                        text-xs
                        font-bold
                        uppercase
                        px-5
                        py-4
                        shadow
                        block
                        leading-normal
                      "
                      @click="toggleTabs(2)"
                      :class="{
                        'text-primary bg-white': paymentMethod !== 2,
                        'text-white bg-primary-400': paymentMethod === 2,
                      }"
                    >
                      Kad Kredit / Debit

                      <img
                        src="@/assets/images/card-credit-trans.png"
                        class="w-16 float-right invisible md:visible"
                        style="position: absolute; top: 14px; right: 15px"
                        alt=""
                      />
                    </a>
                  </li>
                </ul>
                <div class="payment-card">
                  <div
                    class="
                      relative
                      flex flex-col
                      min-w-0
                      break-words
                      w-full
                      mb-6
                    "
                  >
                    <div class="px-4 py-5 flex-auto">
                      <div class="tab-content tab-space">
                        <div
                          :class="{
                            hidden: paymentMethod !== 1,
                            block: paymentMethod === 1,
                          }"
                        >
                          <div class="grid gap-2 grid-cols-2 md:grid-cols-4">
                            <div v-for="val in getBankCode" :key="val.CODE">
                              <button
                                class="
                                  px-4
                                  pb-2
                                  pt-3
                                  bg-gray-200
                                  hover:bg-gray-300
                                  text-sm
                                  font-medium
                                  w-full
                                  h-full
                                "
                                @click="bankcode = val.CODE"
                                :class="{
                                  '!bg-primary-400 text-white':
                                    bankcode === val.CODE,
                                }"
                              >
                                <img
                                  :src="`https://assets-toyyibinfaq.s3.ap-southeast-1.amazonaws.com/logobank/${val.CODE}.png`"
                                  class="w-10 mx-auto"
                                  v-if="val.CODE !== 'BIMB0340'"
                                />
                                <img
                                  :src="`https://assets-toyyibinfaq.s3.ap-southeast-1.amazonaws.com/logobank/${val.CODE}.png`"
                                  class="w-20 mx-auto"
                                  v-if="val.CODE === 'BIMB0340'"
                                />
                                <br />
                                <span> {{ val.NAME }}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          :class="{
                            hidden: paymentMethod !== 2,
                            block: paymentMethod === 2,
                          }"
                        >
                          <!-- CREDIT CARD -->
                          <div class="bg-gray-300 w-full p-4 rounded-md">
                            <ul>
                              <li>
                                Payment using credit/debit card will be using
                                iServe platform.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-10">
              <div class="subtotal flex justify-between">
                <div class="font-semibold">Subtotal</div>
                <div>RM 3200.50</div>
              </div>
              <div class="discount flex justify-between my-2">
                <div class="font-semibold">Discount (10%)</div>
                <div>RM 2,880.45</div>
              </div>
              <hr />
              <div class="total flex justify-between my-2 text-xl">
                <div class="font-semibold">Total</div>
                <div>RM 2,880.45</div>
              </div>
              <rs-button class="w-full mt-4">Pay Now</rs-button>
            </div>
          </div>
        </div>
      </div>
    </rs-card>
  </rs-layout>
</template>

<script>
/* eslint-disable */
import { ref, onMounted } from "vue";
import RsButton from "@/components/Button";
import products from "./data";
import axios from "axios";

export default {
  name: "ecommerce-checkout",
  components: {
    RsButton,
  },
  setup() {
    const data = ref(products);
    const getBankCode = ref("");
    const bankcode = ref("");
    const paymentMethod = ref(0);

    const formatPrice = (price) => {
      return parseFloat(price)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const toggleTabs = (tabNumber) => {
      paymentMethod.value = tabNumber;
    };

    onMounted(() => {
      axios
        .get(`${process.env.VUE_APP_TYP_URL}/api/getBankFPX`)
        .then((response) => {
          if (response.status == 200)
            getBankCode.value = JSON.parse(JSON.stringify(response.data));
          console.log(getBankCode.value);
        });
    });

    return {
      data,
      formatPrice,
      toggleTabs,
      getBankCode,
      bankcode,
      paymentMethod,
    };
  },
};
</script>
