<template>
  <rs-layout>
    <div class="flex justify-between items-center mb-4">
      <p class="font-semibold text-lg">Order Confirmation</p>
      <div class="bg-primary-400 px-3 py-1 rounded-full text-white">
        Table 1
      </div>
    </div>

    <perfect-scrollbar style="height: 17rem">
      <div class="gap-4">
        <rs-card
          class="relative mb-5 cursor-pointer"
          v-for="(product, index) in items"
          :key="index"
        >
          <div class="flex justify-center items-center">
            <div class="product-image relative w-30 h-30 p-4 rounded-lg">
              <img
                class="object-scale-down w-full"
                :src="
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : ''
                "
                :alt="product.name"
              />
            </div>
            <div class="product-content-wrapper flex-1 flex flex-col px-4 mb-4">
              <div class="product-title mt-4">
                <span class="block text-base font-semibold line-clamp-2"
                  >{{ product.name }}
                </span>
              </div>
              <div class="product-content flex flex-col">
                <div class="product-price flex justify-between items-center">
                  <div class="truncate">
                    <div class="text-sm text-primary-500">
                      {{ product.currency
                      }}<span class="text-lg">
                        {{
                          product.discountedPrice
                            ? formatPrice(product.discountedPrice)
                            : formatPrice(product.price)
                        }}</span
                      >
                    </div>
                  </div>
                  <div
                    class="
                      flex
                      items-center
                      justify-center
                      h-7
                      w-7
                      bg-primary-400
                      text-primary-100
                      rounded-full
                      text-sm
                    "
                  >
                    x{{ Math.floor(Math.random() * (10 - 1 + 1)) + 1 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </rs-card>
      </div>
    </perfect-scrollbar>
    <rs-card class="p-4 mt-4">
      <div class="subtotal flex justify-between">
        <div class="font-semibold">Subtotal</div>
        <div>RM 1,000.00</div>
      </div>
      <div class="discount flex justify-between my-2">
        <div class="font-semibold">Discount (10%)</div>
        <div>RM 900.00</div>
      </div>
      <div class="discount flex justify-between my-2">
        <div class="font-semibold">SST(6%)</div>
        <div class="text-red-500">- RM 6.00</div>
      </div>
      <div class="discount flex justify-between my-2">
        <div class="font-semibold">Service Charges(10%)</div>
        <div class="text-red-500">- RM 10.00</div>
      </div>
      <hr />
      <div class="total flex justify-between my-2 text-xl">
        <div class="font-semibold">Total</div>
        <div class="font-semibold">RM 884.00</div>
      </div>
    </rs-card>

    <div class="text-base font-semibold px-2 my-4">Payment Type</div>
    <div class="flex">
      <div class="w-full">
        <ul class="flex mb-0 list-none pt-4 pb-3 flex-col">
          <li
            class="mb-0 last:mr-0 flex-auto text-left sm:text-center relative"
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
          <div class="relative flex flex-col min-w-0 break-words w-full mb-6">
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
                          '!bg-primary-400 text-white': bankcode === val.CODE,
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
                        Payment using credit/debit card will be using iServe
                        platform.
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
    <router-link
      class="
        rounded-lg
        flex
        justify-center
        items-center
        h-fit
        text-sm
        px-8
        py-2.5
        text-white
        bg-primary-400
        hover:bg-primary-500
        disabled:bg-primary-50
        disabled:text-primary-100
        disabled:border-primary-50
        disabled:cursor-default
        dark:disabled:bg-slate-700
        dark:disabled:text-slate-800
        dark:disabled:border-slate-700
        w-full
        mt-4
      "
      :to="{ name: 'order-confirm' }"
    >
      <div>Pay Now</div>
    </router-link>
  </rs-layout>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import items from "./data";

export default {
  setup() {
    const getBankCode = ref("");
    const bankcode = ref("");
    const paymentMethod = ref(0);

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
      items,
      bankcode,
      paymentMethod,
      getBankCode,
      toggleTabs,
      formatPrice,
      formatSold,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>