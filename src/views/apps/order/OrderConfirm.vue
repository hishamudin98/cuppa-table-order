<template>
  <rs-layout>
    <p class="flex justify-center items-center font-semibold text-lg">
      Order has been made.
    </p>
    <p class="flex justify-center items-center mb-4 font-semibold text-lg">
      (#8fhhbf1-32edw)
    </p>
    <rs-card class="p-3">
      <div class="flex items-center justify-center mt-4">
        <img
          class="w-20 h-20"
          src="https://www.pngall.com/wp-content/uploads/8/Green-Check-Mark-PNG-Image.png"
          alt="checked"
        />
      </div>
      <div class="flex justify-between items-center mb-4 mt-3">
        <p class="font-semibold">Order Details</p>
        <div class="bg-primary-400 px-3 py-1 rounded-full text-white">
          Table 1
        </div>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="mb-4 py-2 inline-block min-w-full sm:px-3 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border">
                <thead class="border-b">
                  <tr>
                    <th
                      scope="col"
                      class="
                        text-left text-sm
                        font-medium
                        text-gray-900
                        px-3
                        py-2
                        border-r
                      "
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="
                        text-left text-sm
                        font-medium
                        text-gray-900
                        px-3
                        py-2
                        border-r
                      "
                    >
                      Menu
                    </th>
                    <th
                      scope="col"
                      class="
                        text-left text-sm
                        font-medium
                        text-gray-900
                        px-3
                        py-2
                        border-r
                      "
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      class="
                        text-left text-sm
                        font-medium
                        text-gray-900
                        px-3
                        py-2
                        border-r
                      "
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td
                      class="
                        px-3
                        py-2
                        whitespace-nowrap
                        text-sm
                        font-medium
                        text-gray-900
                        border-r
                      "
                    >
                      1
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font-light
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      Nasi Arab
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font-light
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      1
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font-light
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      RM 30.00
                    </td>
                  </tr>
                  <tr class="border-b">
                    <td
                      class="
                        px-3
                        py-2
                        whitespace-nowrap
                        text-sm
                        font-medium
                        text-gray-900
                        border-r
                      "
                    >
                      2
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font-light
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      French Fries
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font-light
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      1
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font-light
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      RM 4.00
                    </td>
                  </tr>
                  <tr class="border-b">
                    <td
                      class="
                        px-3
                        py-2
                        whitespace-nowrap
                        text-sm
                        font-medium
                        text-gray-900
                        border-r
                      "
                    >
                      3
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font-light
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      Tembikai Ais
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font-light
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      1
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font-light
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      RM 10.00
                    </td>
                  </tr>
                  <tr class="border-b">
                    <td
                      colspan="3"
                      class="
                        text-sm text-gray-900
                        font-semibold
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      Total Price
                    </td>
                    <td
                      colspan="1"
                      class="
                        text-sm text-gray-900
                        font-semibold
                        px-3
                        py-2
                        whitespace-nowrap
                        border-r
                      "
                    >
                      RM 44.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center gap-3">
            <rs-button class="gap-x-2">
              Print Receipt
              <vue-feather type="bookmark"></vue-feather>
            </rs-button>
            <rs-button class="gap-x-2" variant="primary-outline">
              <router-link :to="{ name: 'order' }"> Order Again </router-link>
            </rs-button>
          </div>
        </div>
      </div>
    </rs-card>
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