<template>
  <rs-layout>
    <!-- Get Customer and Phone -->
    <div v-if="!customerProceed" class="order-customer">
      <div
        style="
          height: 56vh;
          border-bottom-left-radius: 2rem;
          border-bottom-right-radius: 2rem;
        "
        class="
          bg-primary-400
          after:content-['']
          flex flex-col
          justify-center
          items-center
        "
      >
        <div class="absolute top-3 left-3 bg-black h-12 w-12 p-1 rounded-full">
          <img
            class="flex-1"
            src="@/assets/images/logo/logo-white.png"
            alt=""
          />
        </div>
        <div class="w-70">
          <img
            class="object-scale-down"
            src="@/assets/images/illustration/eating.svg"
            alt=""
          />
        </div>
      </div>
      <div class="m-8">
        <div
          class="
            order-table-number
            text-center
            font-semibold
            text-2xl
            md:text-3xl
            mb-4
          "
        >
          Table #1
        </div>
        <form-kit type="text" placeholder="Customer Name" />
        <form-kit type="text" placeholder="Customer Phone Number" />
        <rs-button class="w-full" @click="customerProceed = true"
          >Proceed Order</rs-button
        >
      </div>
    </div>

    <!-- Order Menu Page -->
    <div v-else class="order-menu-page">
      <div style="height: 43vh" class="bg-primary-400 after:content-[''] p-4">
        <div class="flex justify-between items-center mb-7">
          <div class="flex items-center gap-x-2">
            <vue-feather
              class="text-white"
              type="chevron-left"
              @click="customerProceed = false"
            ></vue-feather>
            <div class="welcome text-lg font-semibold text-white">Table #1</div>
          </div>
          <div class="text-white">Hishammudin Ali</div>
        </div>

        <div class="advertisment">
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
                "
              >
                <vue-feather
                  @click="openModal = false"
                  class="text-primary-100"
                  type="x"
                ></vue-feather>
              </button>

              <img
                class="w-full h-60 object-cover rounded-t-3xl"
                :src="modalData.images ? modalData.images[0] : ''"
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
                    />
                    <rs-button>Apply</rs-button>
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
                      <div class="flex">
                        <form-kit
                          :type="val.type"
                          :options="val.data"
                          :classes="{
                            fieldset: '!border-0 !p-0',
                          }"
                        />
                        <!-- <div v-if="val.type== 'checkbox'">
                          asdsad
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-item-type pb-4 px-2">
                <div class="font-semibold text-lg mb-4">Order Type</div>
                <div class="flex gap-4">
                  <rs-button variant="primary" class="h-10">Dine-In</rs-button>
                  <rs-button variant="primary-outline" class="h-10"
                    >Takeaway</rs-button
                  >
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
                  @click="addToCart(modalData)"
                >
                  Add to Cart - RM 34.50
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
                    @click="quantity > 0 ? quantity-- : (quantity = 0)"
                  >
                    <vue-feather type="minus"></vue-feather>
                  </button>
                  <form-kit
                    type="text"
                    :value="quantity"
                    :classes="{
                      outer: 'mb-0',
                      input: 'w-10 h-10 text-center',
                    }"
                  />
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
                    @click="quantity = 4"
                  >
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
          RM 20.00
        </button>
        <router-link
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
          :to="{ name: 'order-payment' }"
        >
          <div>Confirm Order ({{ order.length }})</div>
          <vue-feather type="shopping-cart"></vue-feather>
        </router-link>
      </div>
    </div>
  </rs-layout>
</template>

<script>
/* eslint-disable */
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import items from "./data";
import category from "./category";

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
    SwiperSlide,
  },
  setup() {
    const customerData = ref({
      name: "",
      phone: "",
    });
    const customerProceed = ref(true);

    const data = ref(items);
    const categories = ref(category);

    const order = ref([]);
    const search = ref("");
    const quantity = ref(1);

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

      openModal.value = false;
    };
    const viewDetailItem = (product) => {
      modalData.value = product;
      openModal.value = true;
    };

    watch(openModal, () => {
      disableScroll();
    });

    const disableScroll = () => {
      const body = document.querySelector("body");
      body.classList.toggle("hidden-modal");

      if (!body.classList.contains("hidden-modal")) {
        // Disable scroll
        body.style.overflow = "auto";
      } else {
        // Enable scroll
        body.style.overflow = "hidden";
      }
    };

    return {
      customerData,
      customerProceed,
      items: data,
      categories,
      order,
      search,
      modalData,
      openModal,
      quantity,
      formatPrice,
      formatSold,
      viewDetailItem,
      addToCart,
      modules: [Navigation, Autoplay, Scrollbar, A11y],
    };
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
</style>
