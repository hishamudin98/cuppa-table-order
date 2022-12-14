<template>
  <div class="bg-heandshe after:content-[''] p-4">
    <div class="flex justify-between items-center">
      <div v-if="this.status != 'FAIL'">
        <div class="flex items-center gap-x-2" v-if="this.time == null">
          <router-link
            class="flex items-center justify-center"
            :to="{
              name: 'order',
              params: {
                branchID: this.branch,
                table: this.tableNo,
                orderID: this.MenuID,
              },
            }"
          >
            <vue-feather class="text-white" type="chevron-left"></vue-feather>
          </router-link>
          <p class="font-semibold text-white text-lg">Order Confirmation</p>
        </div>

        <div class="flex items-center gap-x-2" v-else>
          <router-link
            class="flex items-center justify-center"
            :to="{
              name: 'takeaway',
              params: {
                branchID: this.branch,
                table: this.tableNo,
                orderID: this.MenuID,
              },
            }"
          >
            <vue-feather class="text-white" type="chevron-left"></vue-feather>
          </router-link>
          <p class="font-semibold text-white text-lg">Order Confirmation</p>
        </div>
      </div>
      <div class="flex items-center gap-x-2" v-else></div>
      <div class="bg-white px-3 py-1 rounded-full text-heandshe">
        {{ this.tableNo }}
      </div>
    </div>
  </div>
  <div v-if="this.orders.length != 0">
    <div class="font-semibold text-xl mx-3 mt-5 mb-3">Dine In</div>
    <perfect-scrollbar style="height: 17rem">
      <div class="gap-4">
        <rs-card
          class="relative mb-5 cursor-pointer"
          v-for="(product, index) in orders"
          :key="index"
          @click="viewDetailItem(product)"
        >
          <div class="flex justify-center items-center">
            <div class="product-image relative w-30 h-30 p-4 rounded-lg">
              <img
                class="object-scale-down w-full"
                :src="
                  product.menu_image && product.menu_image.length > 0
                    ? product.menu_image[0]
                    : ''
                "
                :alt="product.menu_name"
                style="width: 80px; height: 80px"
                @error="setAltImg"
              />
            </div>
            <div class="product-content-wrapper flex-1 flex flex-col px-4 mb-4">
              <div
                class="product-title mt-4"
                v-if="product.menu_variation[1] != null"
              >
                <span class="block text-base font-semibold line-clamp-2"
                  >{{ product.menu_name }} ({{
                    product.menu_variation[0].name
                  }}
                  , {{ product.menu_variation[1].name }})
                </span>
              </div>
              <div
                class="product-title mt-4"
                v-else-if="product.menu_variation[0] != null"
              >
                <span class="block text-base font-semibold line-clamp-2"
                  >{{ product.menu_name }} ({{
                    product.menu_variation[0].name
                  }})
                </span>
              </div>
              <div class="product-title mt-4" v-else>
                <span class="block text-base font-semibold line-clamp-2"
                  >{{ product.menu_name }}
                </span>
              </div>
              <div class="product-content flex flex-col">
                <div class="product-price flex justify-between items-center">
                  <div class="truncate">
                    <div class="text-sm text-heandshe">
                      RM {{ product.currency
                      }}<span class="text-lg">
                        {{
                          (
                            product.menu_quantity *
                            (product.discountedPrice
                              ? formatPrice(product.discountedPrice)
                              : formatPrice(product.menu_price))
                          ).toFixed(2)
                        }}</span
                      >
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-center h-7 w-7 bg-heandshe text-primary-100 rounded-full text-sm"
                  >
                    x{{ product.menu_quantity }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </rs-card>
      </div>
    </perfect-scrollbar>
  </div>
  <div v-if="this.orders2.length != 0">
    <div class="font-semibold text-xl mx-3 mt-4 mb-3">Takeaway</div>
    <perfect-scrollbar style="height: 17rem">
      <div class="gap-4">
        <rs-card
          class="relative mb-5 cursor-pointer"
          v-for="(product, index) in orders2"
          :key="index"
          @click="viewDetailItem(product)"
        >
          <div class="flex justify-center items-center">
            <div class="product-image relative w-30 h-30 p-4 rounded-lg">
              <img
                class="object-scale-down w-full"
                :src="
                  product.menu_image && product.menu_image.length > 0
                    ? product.menu_image[0]
                    : ''
                "
                style="width: 80px; height: 80px"
                :alt="product.menu_name"
                @error="setAltImg"
              />
            </div>
            <div class="product-content-wrapper flex-1 flex flex-col px-4 mb-4">
              <div
                class="product-title mt-4"
                v-if="product.menu_variation[1] != null"
              >
                <span class="block text-base font-semibold line-clamp-2"
                  >{{ product.menu_name }} ({{
                    product.menu_variation[0].name
                  }}
                  , {{ product.menu_variation[1].name }})
                </span>
              </div>
              <div
                class="product-title mt-4"
                v-else-if="product.menu_variation[0] != null"
              >
                <span class="block text-base font-semibold line-clamp-2"
                  >{{ product.menu_name }} ({{
                    product.menu_variation[0].name
                  }})
                </span>
              </div>
              <div class="product-title mt-4" v-else>
                <span class="block text-base font-semibold line-clamp-2"
                  >{{ product.menu_name }}
                </span>
              </div>
              <div class="product-content flex flex-col">
                <div class="product-price flex justify-between items-center">
                  <div class="truncate">
                    <div class="text-sm text-heandshe">
                      RM {{ product.currency
                      }}<span class="text-lg">
                        {{
                          (
                            product.menu_quantity *
                            (product.discountedPrice
                              ? formatPrice(product.discountedPrice)
                              : formatPrice(product.menu_price))
                          ).toFixed(2)
                        }}</span
                      >
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-center h-7 w-7 bg-heandshe text-primary-100 rounded-full text-sm"
                  >
                    x{{ product.menu_quantity }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </rs-card>
      </div>
    </perfect-scrollbar>
  </div>
  <div class="px-4 pb-6">
    <rs-card class="p-4 mt-4">
      <div class="subtotal flex justify-between">
        <div class="font-semibold">Subtotal</div>
        <div>RM {{ formatPrice(this.totalAmount) }}</div>
      </div>
      <!--  <div class="discount flex justify-between my-2">
          <div class="font-semibold">Membership Discount (7%)</div>
          <div>RM {{ formatPrice(this.discountedP) }}</div>
        </div> -->
      <!-- <div class="discount flex justify-between my-2">
          <div class="font-semibold">Outlet Discount (10%)</div>
          <div>RM {{ formatPrice(this.outletDisc) }}</div>
        </div> -->
      <div class="discount flex justify-between my-2">
        <div class="font-semibold">SST(6%)</div>
        <div class="text-red-500">RM {{ formatPrice(this.sst) }}</div>
      </div>
      <!-- <div class="discount flex justify-between my-2">
          <div class="font-semibold">Service Charges(10%)</div>
          <div class="text-red-500">RM {{ formatPrice(this.service) }}</div>
        </div> -->
      <!-- <div class="discount flex justify-between my-2">
          <div class="font-semibold">Infaq</div>
          <div class="text-red-500">RM 0.00</div>
        </div> -->
      <hr />
      <div class="total flex justify-between my-2 text-xl">
        <div class="font-semibold">Total</div>
        <div class="font-semibold">RM {{ formatPrice(this.totalPay) }}</div>
      </div>
    </rs-card>

    <div class="text-base font-semibold">Payment Type</div>
    <div class="flex mb-2">
      <div class="w-full">
        <ul class="flex mb-0 list-none pt-4 pb-3 flex-col">
          <li
            class="mb-0 last:mr-0 flex-auto text-left sm:text-center relative"
          >
            <a
              class="text-xs font-bold uppercase px-5 py-4 shadow block leading-normal"
              @click="toggleTabs(1)"
              :class="{
                'text-primary bg-white': paymentMethod !== 1,
                'text-white bg-heandshe': paymentMethod === 1,
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
            class="mb-0 last:mr-0 flex-auto text-left sm:text-center relative"
          >
            <a
              class="text-xs font-bold uppercase px-5 py-4 shadow block leading-normal"
              @click="toggleTabs(2)"
              :class="{
                'text-primary bg-white': paymentMethod !== 2,
                'text-white bg-heandshe': paymentMethod === 2,
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
          <li
            class="-mb-px mr-2 last:mr-0 flex-auto text-left sm:text-center relative"
          >
            <a
              class="text-xs font-bold uppercase px-5 py-4 shadow block leading-normal"
              @click="toggleTabs(3)"
              :class="{
                'text-primary bg-white': paymentMethod !== 3,
                'text-white bg-heandshe': paymentMethod === 3,
              }"
            >
              Payment Link

              <img
                src="@/assets/images/card-credit-trans.png"
                class="w-16 float-right invisible md:visible"
                style="position: absolute; top: 14px; right: 15px"
                alt=""
              />
            </a>
          </li>
        </ul>
        <div
          class="payment-card"
          :class="{
            hidden: paymentMethod == '',
            block: paymentMethod != '',
          }"
        >
          <div class="relative flex flex-col min-w-0 break-words w-full">
            <div class="">
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
                        class="px-4 pb-2 pt-3 bg-gray-200 hover:bg-gray-300 text-sm font-medium w-full h-full"
                        @click="SetBank(val.CODE)"
                        :class="{
                          '!bg-heandshe text-white': bankcode === val.CODE,
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
                  <br />
                  <rs-button
                    class="w-full bg-heandshe hover:bg-heandshe"
                    @click="sentBank()"
                    :disabled="loading"
                  >
                    <span v-if="loading"> Loading </span>
                    <span v-else
                      >Pay Online RM {{ formatPrice(this.totalPay) }}</span
                    >
                  </rs-button>
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
                <div
                  :class="{
                    hidden: paymentMethod !== 3,
                    block: paymentMethod === 3,
                  }"
                >
                  <!-- CREDIT CARD -->
                  <div class="bg-white w-full p-4 rounded-md">
                    <!-- <form-kit
                        type="number"
                        placeholder="Enter your phone number"
                        v-model="phone"
                        @keydown="nameKeydown($event)"
                      ></form-kit> -->
                    <rs-button
                      class="w-full"
                      @click="sentPaymentLink()"
                      variant="primary-outline"
                      :disabled="loading"
                    >
                      <span v-if="loading"> Loading </span>
                      <span v-else> Get Payment Link</span></rs-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  <rs-button @click="openModalConfirmation = true" class="w-full mb-2"
        >Pay Now with min infaq RM {{ formatPrice(Math.ceil(this.totalPay)) }}
      </rs-button>
      <rs-button
        @click="openModalConfirmation = true"
        class="w-full mb-2"
        variant="primary-outline"
        >Pay Now with more infaq RM
        {{ formatPrice(Math.ceil(this.totalPay)) }}</rs-button
      > -->
    <!-- <router-link :to="{ name: 'order-confirm' }"> -->
    <hr class="my-1" />
    <center>OR</center>
    <hr class="mb-4" />
    <rs-button
      class="w-full my-2"
      variant="primary-outline"
      @click="sentPOS()"
      :disabled="loading"
    >
      <span v-if="loading"> Loading </span>
      <span v-else> Pay at counter RM {{ formatPrice(this.totalPay) }}</span>
    </rs-button>
    <!-- <rs-button variant="primary-outline" class="w-full" @click="sentBank()">
        Pay Online RM {{ formatPrice(this.totalPay) }}
      </rs-button> -->
    <!-- </router-link> -->
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
            class="flex justify-center items-center p-1 bg-heandshe absolute top-2 right-2 rounded-full z-50"
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
              :src="modalData ? modalData.menu_image[0] : ''"
              alt=""
            />
            <rs-button class="absolute bottom-2 right-2 py-1 !px-4 bg-heandshe">
              RM
              {{
                modalData && modalData.discountedPrice
                  ? formatPrice(modalData.discountedPrice)
                  : formatPrice(modalData.menu_price)
              }}</rs-button
            >
          </div>

          <div class="modal-item-wrapper pt-4 px-2 overflow-hidden">
            <div class="modal-item-header">
              <span class="font-semibold text-lg line-clamp-2 mb-2">{{
                modalData ? modalData.menu_name : ""
              }}</span>
              <p class="line-clamp-2 text-sm text-gray-400">
                {{ modalData ? modalData.menu_description : "" }}
              </p>
            </div>
            <hr class="my-4" />
            <div class="modal-item-content">
              <!-- <div
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
                </div> -->

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
                  <div class="variant-choice">
                    <form-kit
                      v-if="val.type == 'radio'"
                      :type="val.type"
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
                            :id="modalData.sku + '-check-' + index"
                            :value="val"
                          />
                          <label
                            class="text-gray-700 dark:text-gray-200 text-sm formkit-disabled:text-gray-300 dark:formkit-disabled:text-gray-700"
                            :for="modalData.sku + '-check-' + index"
                          >
                            {{ val }}
                            <span class="text-primary-500">( +1.00 )</span>
                          </label>
                        </div>
                        <div class="flex items-center gap-x-2">
                          <button
                            class="flex items-center justify-center bg-primary-400 text-primary-50 p-1 rounded-lg"
                          >
                            <vue-feather size="1rem" type="minus"></vue-feather>
                          </button>
                          <span class="text-gray-500">x1</span>
                          <button
                            class="flex items-center justify-center bg-primary-400 text-primary-50 p-1 rounded-lg"
                          >
                            <vue-feather size="1rem" type="plus"></vue-feather>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  <div class="modal-item-type mb-6 px-2">
              <div class="font-semibold text-lg mb-4">Order Type</div>
              <div class="flex gap-4">
                <rs-button variant="primary" class="h-10">Dine-In</rs-button>
                <rs-button variant="primary-outline" class="h-10"
                  >Takeaway</rs-button
                >
              </div>
            </div> -->
          <div v-if="this.status != 'FAIL'">
            <div
              class="modal-item-action flex w-full justify-between items-center overflow-auto px-2 gap-x-2"
            >
              <button
                class="bg-heandshe text-white w-full py-2 px-4 rounded-full"
                @click="addToCart(modalData)"
              >
                Save to Cart - RM
                {{
                  modalData && modalData.discountedPrice
                    ? formatPrice(modalData.discountedPrice)
                    : formatPrice(modalData.menu_price)
                }}
              </button>
              <div class="flex gap-x-2">
                <button
                  class="flex items-center justify-center bg-heandshe text-primary-50 p-1 rounded-lg"
                  @click="decrement()"
                >
                  <vue-feather type="minus"></vue-feather>
                </button>
                {{ modalData.menu_quantity }}
                <button
                  class="flex items-center justify-center bg-heandshe text-primary-50 p-1 rounded-lg"
                  @click="increment()"
                >
                  <vue-feather type="plus"></vue-feather>
                </button>
              </div>
            </div>
          </div>
        </perfect-scrollbar>
      </div>
    </template>
  </rs-modal>
  <rs-modal
    title="This is a modal"
    position="bottom"
    size="full"
    v-model="openModalConfirmation"
  >
    <template #custom>
      <div class="rounded-t-3xl" style="min-height: 50vh">
        <button
          class="flex justify-center items-center p-1 bg-primary-400 absolute top-2 right-2 rounded-full z-50"
        >
          <vue-feather
            @click="openModalConfirmation = false"
            class="text-primary-100"
            type="x"
          ></vue-feather>
        </button>

        <vue-feather
          v-if="infaqtype == 'choose'"
          @click="infaqtype = ''"
          class="text-primary-400 absolute top-3 left-3"
          type="chevron-left"
        ></vue-feather>

        <div v-if="infaqtype != 'choose'" class="h-full p-4">
          <div class="font-semibold text-xl text-center mt-6 mb-4">
            Infaq Type
          </div>
          <form-kit type="number" value="2">
            <template #prefix>
              <div
                class="bg-slate-100 dark:bg-slate-700 h-full rounded-l-md p-3"
              >
                RM
              </div>
            </template>
          </form-kit>
          <rs-button class="w-full mb-4" @click="infaqtype = 'choose'">
            Choose organization to infaq
          </rs-button>
          <hr class="my-6" />
          <rs-button
            @click="navigateConfirm({ name: 'order-confirm' })"
            class="w-full"
            variant="primary-outline"
            >Let Us Choose for You</rs-button
          >
        </div>
        <div v-else class="p-4 h-full">
          <div class="font-semibold text-xl text-center mt-6 mb-4">
            Choose Organization
          </div>
          <div class="p-4">
            <swiper
              :slidesPerView="2"
              :spaceBetween="20"
              :freeMode="true"
              :modules="modules"
            >
              <swiper-slide
                v-for="(org, index) in organizationList"
                :key="index"
              >
                <div class="shadow-md w-full rounded-lg h-full relative">
                  <input
                    class="rs-radio !mr-0 absolute top-2 right-2"
                    type="radio"
                    name="organization"
                    :id="'infaq-check-' + index"
                    :value="org.name"
                  />
                  <label
                    class="absolute after:content-[''] w-full h-full"
                    :for="'infaq-check-' + index"
                  >
                  </label>
                  <img
                    class="h-26 object-cover w-full rounded-t-lg"
                    :src="org.image"
                    alt=""
                  />
                  <div class="p-2">
                    <span class="text-sm font-semibold line-clamp-1">{{
                      org.name
                    }}</span>
                    <p class="text-xs text-primary-400 uppercase">
                      {{ org.type }}
                    </p>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <rs-button
            @click="navigateConfirm({ name: 'order-confirm' })"
            class="w-full mt-4"
            >Pay RM 885.00 with RM 5.00 infaq</rs-button
          >
        </div>
      </div>
    </template>
  </rs-modal>
  <rs-modal
    title="Payment Link"
    v-model="modalOpen"
    position="middle"
    size="full"
  >
    <div>
      <div>
        <center>
          <qrcode-vue :value="this.value" :size="size" level="L" />
        </center>
      </div>
      <div class="my-4 text-center">
        <div>{{ this.link }}</div>
        <input type="hidden" id="testing-code" :value="this.link" />
        <div class="mt-4">
          <rs-button
            class="w-full bg-heandshe"
            @click.stop.prevent="copyTestingCode"
          >
            Copy
          </rs-button>
        </div>
      </div>
    </div>
  </rs-modal>
  <rs-modal
    title="Payment Counter"
    v-model="modalPOS"
    position="middle"
    size="full"
  >
    Please pay for Order No. {{ this.MenuID }} , Table No {{ this.tableNo }}
  </rs-modal>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import items from "./data";
import axios from "axios";
import router from "@/router";

import RsModal from "@/components/Modal.vue";
import RsButton from "@/components/Button.vue";

import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRoute } from "vue-router";
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    RsModal,
    RsButton,
    Swiper,
    SwiperSlide,
    QrcodeVue,
  },
  setup() {
    const getBankCode = ref("");
    const bankcode = ref("");
    const paymentMethod = ref(0);
    const route = useRoute();
    const MenuID = route.params.id;

    const orders = ref([]);
    const orders2 = ref([]);

    const openModal = ref(false);
    const modalData = ref({});
    const quantity = ref(1);

    const openModalConfirmation = ref(false);

    const infaqtype = ref("choose");
    const organizationList = ref([
      {
        name: "K. Asrama Anak Yatim Pulau Indah",
        type: "Rumah Anak Yatim",
        image:
          "https://assets-toyyibinfaq.s3.ap-southeast-1.amazonaws.com/images/KOMPLEKSANAKYATIM01.jpg",
      },
      {
        name: "Masjid Seberang Jaya",
        type: "Masjid",
        image:
          "https://images.unsplash.com/photo-1552423314-cf29ab68ad73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWwlMjBhcXNhJTIwbW9zcXVlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      },
      {
        name: "Pengurusan Baitul Kasih",
        type: "Rumah Anak Yatim",
        image:
          "https://assets-toyyibinfaq.s3-ap-southeast-1.amazonaws.com/images/1838ff2b-ac1a-45ca-ae2e-1232396177cb.jpeg",
      },
      {
        name: "Maahad Tahfiz Darul Qodariah",
        type: "Tahfiz",
        image:
          "http://pitas.awfatech.com/persatuan/content/news/newsf1_Root_1527063956.jpg",
      },
    ]);

    onMounted(() => {
      axios
        .get(`${process.env.VUE_APP_TYP_URL}/api/getBankFPX`)
        .then((response) => {
          if (response.status == 200)
            getBankCode.value = JSON.parse(JSON.stringify(response.data));
          // console.log(getBankCode.value);
        });
    });

    watch(openModal, (val) => {
      if (val) {
        disableScroll(val);
      } else {
        disableScroll(val);
      }
    });

    watch(openModalConfirmation, (val) => {
      infaqtype.value = "";
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

    const navigateConfirm = (path) => {
      openModalConfirmation.value = false;
      router.push(path);
    };

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

    const viewDetailItem = (product) => {
      modalData.value = product;
      openModal.value = true;
    };

    return {
      items,
      bankcode,
      paymentMethod,
      getBankCode,
      quantity,
      orders,
      orders2,
      modalData,
      MenuID,
      openModal,
      openModalConfirmation,
      infaqtype,
      organizationList,
      toggleTabs,
      formatPrice,
      formatSold,
      viewDetailItem,
      navigateConfirm,
      modules: [FreeMode],
    };
  },

  //TEST FARIS
  data() {
    return {
      orderData: "",
      totalAmount: 0,
      sst: 0,
      service: 0,
      totalPay: 0,
      tableNo: 0,
      discount: "",
      discountedP: 0,
      bankCode: "",
      billName: "",
      name: "",
      modalOpen: false,
      link: "",
      phone: "",
      total: 0,
      orderno: "",
      custName: "",
      custPhone: "",
      modalPOS: false,
      value: "",
      size: 200,
      branch: 0,
      time: null,
      status: "",

      /* TIMER IDLE */
      /* IDLE_COUNTER: 60,
      LOADING_COUNTER: 30,
      idleSecondsTimer: 0,
      idleSecondsCounter: 0, */
      tablNo: 0,

      /* LOADING */
      loading: false,
    };
  },

  async created() {
    this.getOrder();
    this.branch = localStorage.branch;
    this.time = localStorage.time;
    this.status = localStorage.status;
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("branch", this.branch);
    });

    /* history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    }; */
  },

  mounted() {
    /* document.onclick = () => {
      this.idleSecondsCounter = 0;
    };
    document.onmousemove = () => {
      this.idleSecondsCounter = 0;
    };
    document.ontouchmove = () => {
      this.idleSecondsCounter = 0;
    };
    this.idleSecondsTimer = setInterval(this.idleChecker, 1000); */
  },

  methods: {
    /* async idleChecker() {
      this.idleSecondsCounter++; */
      /* this.idleSecondsCounter = this.IDLE_COUNTER - this.idleSecondsCounter; */
      /* if (this.idleSecondsCounter >= this.IDLE_COUNTER) {
        clearInterval(this.idleSecondsTimer);
        this.idleSecondsTimer = null;
        this.idleSecondsCounter = 0;
        alert("You have been idle for 1 minute");
        this.$router.push({
          name: "orderLogin",
          params: { branchID: this.branch, table: this.tablNo },
        });
      }
    }, */
    async SetBank(code) {
      this.bankcode = code;
    },

    async getOrder() {
      var axios = require("axios");
      var data = JSON.stringify({
        iOrder: this.MenuID,
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
            for (let i = 0; i < this.orderData.length; i++) {
              var images = this.orderData[i].menu_image;
              if (images == null) {
                images = [
                  {
                    image1:
                      "https://s3.ap-southeast-1.amazonaws.com/cdn.toyyibfnb.com/images/food.png",
                  },
                ];
              } else {
                images = [
                  {
                    image1: this.orderData[i].menu_image,
                  },
                ];
              }
              var variants = this.orderData[i].menu_variant;
              if (this.orderData[i].orderType == "1") {
                this.orders.push({
                  sku: this.orderData[i].sku,
                  menu_name: this.orderData[i].menu_name,
                  menu_price: this.orderData[i].menu_price,
                  menu_quantity: this.orderData[i].menu_quantity,
                  menu_variation: variants,
                  menu_image: [images[0].image1],
                  orderType: this.orderData[i].orderType,
                  menu_id: this.orderData[i].menu_id,
                  tableNo: this.orderData[i].tableNo,
                });
              } else {
                this.orders2.push({
                  sku: this.orderData[i].sku,
                  menu_name: this.orderData[i].menu_name,
                  menu_price: this.orderData[i].menu_price,
                  menu_quantity: this.orderData[i].menu_quantity,
                  menu_variation: variants,
                  menu_image: [images[0].image1],
                  orderType: this.orderData[i].orderType,
                  menu_id: this.orderData[i].menu_id,
                  tableNo: this.orderData[i].tableNo,
                });
              }
            }
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

    async addToCart(modalData) {
      /* VARIABLES */
      var total = 0;
      var sum = 0;
      var orderTotal = 0;
      var total1 = 0;
      var sum1 = 0;
      var orderTotal1 = 0;
      /* END VARIABLES */

      /* ________________________________________________________________________ */
      /* CHECK EXIST ORDER */
      let exist = this.orders.find(
        (item) =>
          item.sku === modalData.sku && item.orderType == modalData.orderType
      );
      /* _________________________________________________________________________ */
      /* CHECK EXIST ORDER2 */
      let exist2 = this.orders2.find(
        (item) =>
          item.sku === modalData.sku && item.orderType == modalData.orderType
      ); /* _________________________________________________________________________ */
      /* ADE DALAM ORDER (DINE IN)*/
      if (exist) {
        /* KALO NILAI DIA BERTAMBAH */
        if (modalData.menu_quantity != 0) {
          /* LOOP FOR TAMBAH ORDER AMOUNT */
          for (let i = 0; i < this.orders.length; i++) {
            sum = parseInt(this.orders[i].menu_quantity);
            total = parseFloat(this.orders[i].menu_price) * sum;
            orderTotal = orderTotal + total;
          }
          /* LOOP FOR TAMBAH ORDERS2 AMOUNT */
          for (let i = 0; i < this.orders2.length; i++) {
            sum1 = parseInt(this.orders2[i].menu_quantity);
            total1 = parseFloat(this.orders2[i].menu_price) * sum1;
            orderTotal1 = orderTotal1 + total1;
          }
          /* __________________________________________________________________________ */
          this.totalAmount = orderTotal1 + orderTotal;
          this.sst = this.totalAmount * 0.06;
          /* this.service = this.totalAmount * 0.1; */
          this.totalPay = this.totalAmount + this.sst;
          this.discount = this.orderData[0].discount;
          /* ___________________________________________________________________________ */
          /* KALO ADE DISCOUNT */
          if (this.discount == true) {
            this.discountedP = this.totalAmount * 0.07;
            this.totalPay = this.totalPay - this.discountedP;
          }
        } else {
          /* __________________________________________________________________________ */
          /* KALO NILAI DIA TOLAK */
          /* KALO NILAI DIE JADI 0 DALAM ARRAY */
          if (exist.menu_quantity == 0) {
            let index = this.orders.findIndex(
              (item) =>
                item.sku === modalData.sku &&
                item.orderType == modalData.orderType
            );
            /* BUANG DARI ORDER */
            this.orders.splice(index, 1);

            /* LOOP FOR TAMBAH ORDER AMOUNT */
            for (let i = 0; i < this.orders.length; i++) {
              sum = parseInt(this.orders[i].menu_quantity);
              total = parseFloat(this.orders[i].menu_price) * sum;
              orderTotal = orderTotal + total;
            }
            /* LOOP FOR TAMBAH ORDERS2 AMOUNT */
            for (let i = 0; i < this.orders2.length; i++) {
              sum1 = parseInt(this.orders2[i].menu_quantity);
              total1 = parseFloat(this.orders2[i].menu_price) * sum1;
              orderTotal1 = orderTotal1 + total1;
            }
            /* __________________________________________________________________________ */
            this.totalAmount = orderTotal1 + orderTotal;
            this.sst = this.totalAmount * 0.06;
            /* this.service = this.totalAmount * 0.1; */
            this.totalPay = this.totalAmount + this.sst;
            this.discount = this.orderData[0].discount;
            /* ___________________________________________________________________________ */
            /* KALO ADE DISCOUNT */
            if (this.discount == true) {
              this.discountedP = this.totalAmount * 0.07;
              this.totalPay = this.totalPay - this.discountedP;
            }
          } else {
            /* KALO NILAI TOLAK X JADI KOSONG */
            /* LOOP FOR TAMBAH ORDER AMOUNT */
            for (let i = 0; i < this.orders.length; i++) {
              sum = parseInt(this.orders[i].menu_quantity);
              total = parseFloat(this.orders[i].menu_price) * sum;
              orderTotal = orderTotal + total;
            }
            /* LOOP FOR TAMBAH ORDERS2 AMOUNT */
            for (let i = 0; i < this.orders2.length; i++) {
              sum1 = parseInt(this.orders2[i].menu_quantity);
              total1 = parseFloat(this.orders2[i].menu_price) * sum1;
              orderTotal1 = orderTotal1 + total1;
            }
            /* __________________________________________________________________________ */
            this.totalAmount = orderTotal1 + orderTotal;
            this.sst = this.totalAmount * 0.06;
            /* this.service = this.totalAmount * 0.1; */
            this.totalPay = this.totalAmount + this.sst;
            this.discount = this.orderData[0].discount;
            /* ___________________________________________________________________________ */
            /* KALO ADE DISCOUNT */
            if (this.discount == true) {
              this.discountedP = this.totalAmount * 0.07;
              this.totalPay = this.totalPay - this.discountedP;
            }
          }
        }
      } else {
        /* _____________________________________________________________________________ */
        /* ADE DALAM ORDER2 (TAKEAWAY) */
        /* KALO NILAI DIA BERTAMBAH */
        if (modalData.menu_quantity != 0) {
          /* LOOP FOR TAMBAH ORDER AMOUNT */
          for (let i = 0; i < this.orders.length; i++) {
            sum = parseInt(this.orders[i].menu_quantity);
            total = parseFloat(this.orders[i].menu_price) * sum;
            orderTotal = orderTotal + total;
          }
          /* LOOP FOR TAMBAH ORDERS2 AMOUNT */
          for (let i = 0; i < this.orders2.length; i++) {
            sum1 = parseInt(this.orders2[i].menu_quantity);
            total1 = parseFloat(this.orders2[i].menu_price) * sum1;
            orderTotal1 = orderTotal1 + total1;
          }
          /* __________________________________________________________________________ */
          this.totalAmount = orderTotal1 + orderTotal;
          this.sst = this.totalAmount * 0.06;
          /* this.service = this.totalAmount * 0.1; */
          this.totalPay = this.totalAmount + this.sst;
          this.discount = this.orderData[0].discount;
          /* ___________________________________________________________________________ */
          /* KALO ADE DISCOUNT */
          if (this.discount == true) {
            this.discountedP = this.totalAmount * 0.07;
            this.totalPay = this.totalPay - this.discountedP;
          }
        } else {
          /* _____________________________________________________________________________ */
          /* KALO NILAI DIA TOLAK */
          /* KALO NILAI DIE JADI 0 DALAM ARRAY */
          if (exist2.quantity == 0) {
            let index = this.orders2.findIndex(
              (item) =>
                item.sku === modalData.sku &&
                item.orderType == modalData.orderType
            );
            /* BUANG DARI ORDER */
            this.orders2.splice(index, 1);

            /* LOOP FOR TAMBAH ORDER AMOUNT */
            for (let i = 0; i < this.orders.length; i++) {
              sum = parseInt(this.orders[i].menu_quantity);
              total = parseFloat(this.orders[i].menu_price) * sum;
              orderTotal = orderTotal + total;
            }
            /* LOOP FOR TAMBAH ORDERS2 AMOUNT */
            for (let i = 0; i < this.orders2.length; i++) {
              sum1 = parseInt(this.orders2[i].menu_quantity);
              total1 = parseFloat(this.orders2[i].menu_price) * sum1;
              orderTotal1 = orderTotal1 + total1;
            }
            /* __________________________________________________________________________ */
            this.totalAmount = orderTotal1 + orderTotal;
            this.sst = this.totalAmount * 0.06;

            this.totalPay = this.totalAmount + this.sst;
            this.discount = this.orderData[0].discount;
            /* ___________________________________________________________________________ */
            /* KALO ADE DISCOUNT */
            if (this.discount == true) {
              this.discountedP = this.totalAmount * 0.07;
              this.totalPay = this.totalPay - this.discountedP;
            }
          } else {
            /* KALO NILAI TOLAK X JADI KOSONG */
            /* LOOP FOR TAMBAH ORDER AMOUNT */
            for (let i = 0; i < this.orders.length; i++) {
              sum = parseInt(this.orders[i].menu_quantity);
              total = parseFloat(this.orders[i].menu_price) * sum;
              orderTotal = orderTotal + total;
            }
            /* LOOP FOR TAMBAH ORDERS2 AMOUNT */
            for (let i = 0; i < this.orders2.length; i++) {
              sum1 = parseInt(this.orders2[i].menu_quantity);
              total1 = parseFloat(this.orders2[i].menu_price) * sum1;
              orderTotal1 = orderTotal1 + total1;
            }
            /* __________________________________________________________________________ */
            this.totalAmount = orderTotal1 + orderTotal;
            this.sst = this.totalAmount * 0.06;
            /* this.service = this.totalAmount * 0.1; */
            this.totalPay = this.totalAmount + this.sst;
            this.discount = this.orderData[0].discount;
            /* ___________________________________________________________________________ */
            /* KALO ADE DISCOUNT */
            if (this.discount == true) {
              this.discountedP = this.totalAmount * 0.07;
              this.totalPay = this.totalPay - this.discountedP;
            }
          }
        }
      }

      this.orders3 = this.orders.concat(this.orders2);

      var axios = require("axios");
      var data = JSON.stringify({
        order: this.orders3,
        total: this.totalAmount,
        discounted: this.discountedP,
        orderID: this.MenuID,
      });

      var config = {
        method: "post",
        url:
          process.env.VUE_APP_FNB_URL +
          "/tbl/updateOrdertbl" /* http://localhost:3000tbl/updateOrdertbl */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(function () {}.bind(this))
        .catch(function (error) {
          console.log(error);
        });

      this.quantity = 1;
      this.openModal = false;
      this.variasi = "hot  RM0.00";
    },

    /* FOR BANK PAYMENT */
    async sentBank() {
      if (this.bankcode != "") {
        this.loading = true;
        this.total = this.totalPay.toFixed(2);
        this.roundNumber =
          this.total.toString().split(".")[0] +
          this.total.toString().split(".")[1];
        this.service = 0.0;
        var axios = require("axios");
        var data = JSON.stringify({
          serviceCharge: this.service,
          discount: this.discountedP + this.outletDisc,
          tax: this.sst,
          billName: "Order For Table " + this.tableNo,
          billDesc: "Order For Table " + this.tableNo,
          billAmount: parseInt(this.roundNumber),
          billExternalReferenceNo: "Order For Table " + this.tableNo,
          billTo: localStorage.name,
          billPhone: localStorage.phone,
          orderNo: this.orderno,
          branch: localStorage.branch,
        });
        var config = {
          method: "POST",
          url: process.env.VUE_APP_FNB_URL + "/tbl/tblorderPayment" /*  */,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        await axios(config)
          .then(
            function (response) {
              clearInterval(this.idleSecondsTimer);
              this.idleSecondsTimer = null;
              this.idleSecondsCounter = 0;
              var link = response.data.data2;
              window.location.href = link;
            }.bind(this)
          )
          .catch(function (error) {
            this.loading = false;
            console.log(error);
          });
      } else {
        alert("Please Select Bank Before Payment");
      }
    },

    async sentPOS() {
      this.loading = true;
      var axios = require("axios");
      this.custName = localStorage.name;
      this.custPhone = localStorage.phone;
      this.service = 0.0;
      if (this.custName == null) {
        this.custName = "Customer";
        this.custPhone = "Customer Phone";
      }
      var data = JSON.stringify({
        serviceCharge: this.service,
        discount: this.discountedP + this.outletDisc,
        tax: this.sst,
        total: this.totalPay,
        customerName: this.custName,
        customerPhone: this.custPhone,
        MenuID: this.MenuID,
        outletID: this.branch,
      });

      var config = {
        method: "post",
        url:
          process.env.VUE_APP_FNB_URL +
          "/tbl/tblOrderPOS" /* http://localhost:3000tbltblOrderPOS */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(
          function (response) {
            /* :to="{ name: 'order-payment' , params:{id:  } }" */
            clearInterval(this.idleSecondsTimer);
            this.idleSecondsTimer = null;
            this.idleSecondsCounter = 0;
            this.$router.push({
              name: "order-table",
              params: {
                orderID: response.data.data.order_no,
                table: response.data.data.otd_table,
                branch: localStorage.branch,
              },
            });
          }.bind(this)
        )
        .catch(function (error) {
          this.loading = false;
          console.log(error);
        });
    },

    async sentPaymentLink() {
      this.loading = true;
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
        url:
          process.env.VUE_APP_FNB_URL +
          "/tbl/tblorderPayment" /*http://localhost:3000tbltblorderPayment */,
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
            this.modalOpen = false;
            clearInterval(this.idleSecondsTimer);
            this.idleSecondsTimer = null;
            this.idleSecondsCounter = 0;
            this.$router.push({
              name: "paymentlink",
              params: {
                orderid: this.MenuID,
              },
            });
          }.bind(this)
        )
        .catch(function (error) {
          this.loading = false;
          console.log(error);
        });
    },

    async setAltImg(event) {
      event.target.src =
        "https://s3.ap-southeast-1.amazonaws.com/cdn.toyyibfnb.com/images/food.png";
    },

    async increment() {
      this.modalData.menu_quantity++;
    },
    async decrement() {
      if (this.modalData.menu_quantity === 0) {
        alert("Negative quantity not allowed");
      } else {
        this.modalData.menu_quantity--;
      }
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
  box-shadow: unset;
}
.swiper-slide {
  height: auto;
}
</style>
