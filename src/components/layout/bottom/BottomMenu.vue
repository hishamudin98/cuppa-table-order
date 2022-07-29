<template>
  <div
    class="w-full fixed bottom-0 z-40 bg-white dark:bg-slate-800 shadow-md shadow-slate-200 dark:shadow-slate-900"
  >
    <ul class="flex items-stretch justify-between">
      <li
        class="cursor-pointer hover:text-primary-500 hover:border-t hover:border-t-primary-500 py-2 px-5 flex-1 flex flex-col items-center justify-center"
      >
        <vue-feather type="home"></vue-feather>
        <a href="">Home</a>
      </li>
      <li
        class="cursor-pointer hover:text-primary-500 hover:border-t hover:border-t-primary-500 py-2 px-5 flex-1 flex flex-col items-center justify-center"
      >
        <vue-feather type="shopping-bag"></vue-feather>
        <a href="">Shop</a>
      </li>
      <li
        class="cursor-pointer hover:text-primary-500 hover:border-t hover:border-t-primary-500 py-2 px-5 flex-1 flex flex-col items-center justify-center"
      >
        <vue-feather type="map-pin"></vue-feather>
        <a href="">Location</a>
      </li>
      <li
        class="cursor-pointer hover:text-primary-500 hover:border-t hover:border-t-primary-500 py-2 px-5 flex-1 flex flex-col items-center justify-center"
      >
        <vue-feather type="settings"></vue-feather>
        <a href="">Settings</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "bottom-menu-component",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
