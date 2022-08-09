<template>
  <rs-layout>
    <div class="welcome mb-4 text-2xl">Welcome to Malaya Grill,</div>
    <div class="advertisment">
      <div
        class="flex justify-center items-center w-full border border-gray-400 text-gray-400 h-30 p-5 rounded-lg"
      >
        Advertisement here
      </div>
    </div>
    <div class="pt-5">
      <div class="filter-top-wrapper flex pb-4">
        <perfect-scrollbar style="width: 100%">
          <div class="category-wrapper flex gap-x-4">
            <button
              class="flex items-center rounded-lg py-2 px-3 bg-white dark:bg-slate-800 dark:text-gray-300 hover:bg-slate-200 font-semibold text-sm shadow-md shadow-slate-200 dark:shadow-slate-900 whitespace-nowrap"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div
                class="flex items-center bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 w-10 h-10 rounded-lg mr-2"
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
        <rs-card
          @click="viewDetailItem(product)"
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
                <div class="product-price flex justify-between">
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
                </div>
              </div>
            </div>
          </div>
        </rs-card>
      </div>
    </div>

    <rs-modal
      title="This is a modal"
      v-model="openModal"
      position="bottom"
      size="full"
    >
      <template #no-body>
        <div class="rounded-t-3xl" style="min-height: 95vh">
          <button
            class="flex justify-center items-center p-1 bg-primary-400 absolute top-2 right-2 rounded-full"
          >
            <vue-feather
              @click="openModal = false"
              class="text-primary-100"
              type="x"
            ></vue-feather>
          </button>

          <img
            class="w-full h-60 object-cover rounded-t-3xl"
            :src="modalData ? modalData.image : ''"
            alt=""
          />
          <div class="modal-item-wrapper pt-4 px-2 overflow-hidden">
            <div class="modal-item-header">
              <span class="font-semibold text-lg line-clamp-2 mb-2">{{
                modalData ? modalData.name : ""
              }}</span>
              <p class="line-clamp-2 text-sm text-gray-400">
                {{ modalData ? modalData.description : "" }}
              </p>
            </div>
            <hr class="my-4" />
            <div class="modal-item-content h-46 overflow-auto">
              <div v-if="modalData.variants" class="modal-item-variance">
                <div v-for="(val, index) in modalData.variants" :key="index">
                  <div class="font-semibold text-lg mb-4">
                    {{ val.title }}
                    <span
                      class="text-gray-400 font-normal text-sm"
                      v-if="val.required"
                      >(required)</span
                    >
                  </div>
                  <form-kit
                    :type="val.type"
                    :options="val.data"
                    :classes="{
                      fieldset: '!border-0 !p-0',
                    }"
                  />
                </div>
              </div>
              <div
                class="modal-item-action absolute bottom-1 right-0 flex w-full justify-between items-center overflow-auto px-2 gap-x-2"
              >
                <button
                  class="bg-primary-400 text-white w-full py-2 px-4 rounded-full"
                >
                  Add to Cart
                </button>
                <div class="flex gap-x-2">
                  <button
                    class="flex items-center justify-center bg-primary-400 text-primary-50 p-1 rounded-lg"
                  >
                    <vue-feather type="minus"></vue-feather>
                  </button>
                  <form-kit
                    type="text"
                    :classes="{
                      outer: 'mb-0',
                      input: 'w-10 h-10',
                    }"
                  />
                  <button
                    class="flex items-center justify-center bg-primary-400 text-primary-50 p-1 rounded-lg"
                  >
                    <vue-feather type="plus"></vue-feather>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </rs-modal>

    <div
      v-if="order && order.length > 0"
      class="button-to-cart p-2 flex w-full z-50 rounded-full"
    >
      <button
        class="bg-primary-500 py-4 px-5 rounded-l-full text-white whitespace-nowrap shadow-md shadow-primary-200"
      >
        RM 20.00
      </button>
      <button
        class="flex justify-between items-center w-full bg-primary-400 py-4 px-5 rounded-r-full text-white whitespace-nowrap shadow-md shadow-primary-200"
      >
        <div>Confirm Order ({{ order.length }})</div>
        <vue-feather type="shopping-cart"></vue-feather>
      </button>
    </div>
  </rs-layout>
</template>

<script>
/* eslint-disable */
import { ref, computed, watch, onMounted } from "vue";
import items from "./data";
import category from "./category";

import RsModal from "@/components/Modal.vue";

export default {
  name: "TableOrder",
  components: {
    RsModal,
  },
  setup() {
    const data = ref(items);
    const categories = ref(category);

    const order = ref([]);
    const openModal = ref(false);

    const modalData = ref({});

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

    const addToCart = (product) => {
      // check if product already exist

      const exist = order.value.find((item) => item.sku === product.sku);

      if (exist) {
        exist.quantity++;
      } else {
        order.value.push({
          sku: product.sku,
          name: product.name,
          price: product.discountedPrice
            ? formatPrice(product.discountedPrice)
            : formatPrice(product.price),
          quantity: 1,
        });
      }
    };

    const viewDetailItem = (product) => {
      modalData.value.image = product.images ? product.images[0] : "";
      modalData.value.name = product.name ? product.name : "";
      modalData.value.description = product.description
        ? product.description
        : "";
      modalData.value.variants = product.variants ? product.variants : "";

      openModal.value = true;
    };
    return {
      items: data,
      categories,
      order,
      modalData,
      openModal,
      formatPrice,
      formatSold,
      viewDetailItem,
      addToCart,
    };
  },
};
</script>

<style lang="scss">
.button-to-cart {
  position: fixed;
  left: 50%;
  top: 92%;
  transform: translate(-50%, -50%);
}
</style>
