<template>
  <rs-layout>
    <div class="bg-primary-400 after:content-[''] p-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-x-2">
          <p class="font-semibold text-white text-lg">Receipt</p>
        </div>
        <div class="bg-white px-3 py-1 rounded-full text-primary-400">
          Table 1
        </div>
      </div>
    </div>
    <div class="my-5">
      <div class="flex justify-center items-center mb-2">
        <img
          class="w-9 h-9"
          src="https://www.pngall.com/wp-content/uploads/8/Green-Check-Mark-PNG-Image.png"
          alt="checked"
        />
      </div>
      <p
        class="
          flex
          justify-center
          items-center
          font-semibold
          text-lg text-green-500
        "
      >
        Order has been made.
      </p>
      <p class="flex justify-center items-center font-semibold text-2xl">
        RM 885.00
      </p>
    </div>
    <rs-card class="py-3 px-4">
      <div class="order-detail-wrapper">
        <div class="flex justify-between items-center my-3">
          <p class="font-semibold uppercase">Order Details (#Hko2-32rfs)</p>
        </div>
        <div class="order-wrapper flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <div>Nasi Arab Ayam (x2)</div>
            <div class="font-semibold">RM30.00</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Nasi Arab Kambing (x2)</div>
            <div class="font-semibold">RM55.00</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Teh O Ais Limau (x4)</div>
            <div class="font-semibold">RM12.00</div>
          </div>
          <hr class="my-2" />
          <div class="flex justify-between items-center">
            <div class="font-semibold">Service Charge (10%)</div>
            <div class="font-semibold">RM10.00</div>
          </div>
          <div class="flex justify-between items-center">
            <div class="font-semibold">SST (6%)</div>
            <div class="font-semibold">RM10.00</div>
          </div>
          <div class="flex justify-between items-center">
            <div class="font-semibold">Infaq</div>
            <div class="font-semibold">RM10.00</div>
          </div>
          <hr class="my-2 mb-1" />
          <div class="flex justify-between items-center text-xl">
            <div class="font-semibold">Total</div>
            <div class="font-semibold">RM12.00</div>
          </div>
        </div>
      </div>
    </rs-card>
    <rs-card class="py-3 px-4">
      <div class="payment-detail-wrapper">
        <div class="flex justify-between items-center my-3">
          <p class="font-semibold uppercase">Payment Details</p>
        </div>
        <div class="order-wrapper flex flex-col gap-2 mb-5">
          <div class="flex justify-between items-center">
            <div>Status Payment</div>
            <div class="font-semibold text-green-400">Success</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Transaction ID</div>
            <div class="font-semibold">MG220332</div>
          </div>
          <div class="flex justify-between items-center">
            <div>FPX Transaction ID</div>
            <div class="font-semibold">2022039459813492</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Date Order</div>
            <div class="font-semibold">04/05/2022</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Order Time</div>
            <div class="font-semibold">10.00am</div>
          </div>
          <div class="flex justify-between items-center">
            <div>Payment Type</div>
            <div class="font-semibold">FPX</div>
          </div>
        </div>
      </div>
    </rs-card>
    <div class="flex flex-col items-center justify-center gap-3 mx-4">
      <rs-button class="w-full gap-x-2">
        Print Receipt
        <vue-feather type="bookmark"></vue-feather>
      </rs-button>
      <router-link class="w-full" :to="{ name: 'order' }">
        <rs-button class="w-full gap-x-2 mb-6" variant="primary-outline">
          Order Again
        </rs-button>
      </router-link>
    </div>
  </rs-layout>
</template>

<script>
import RsButton from "@/components/Button.vue";

export default {
  components: {
    RsButton,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>