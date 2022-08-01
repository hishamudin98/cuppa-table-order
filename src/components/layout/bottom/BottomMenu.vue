<template>
  <div
    class="
      w-full
      fixed
      bottom-0
      z-40
      bg-white
      dark:bg-slate-800
      shadow-md shadow-slate-200
      dark:shadow-slate-900
      text-gray-500
    "
  >
    <ul class="flex items-stretch justify-between">
      <li
        class="
          cursor-pointer
          hover:text-primary-500 hover:border-t hover:border-t-primary-500
          py-2
          px-5
          flex-1 flex flex-col
          items-center
          justify-center
        "
        :class="activeMenu(item.route.name)"
        v-for="(item, index) in menuItem"
        :key="index"
        @click="navigateMenu(item.route)"
      >
        <vue-feather :type="item.icon"></vue-feather>
        <a href="">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import { ref } from "vue";
import Menu from "@/layout/navigation/bottom";
import router from "@/router";
export default {
  name: "bottom-menu-component",
  setup() {
    const menuItem = Menu;

    // Navigate to route
    function navigateMenu(route) {
      try {
        router.push(route);
      } catch (e) {
        router.push({ name: "error-404" });
      }
    }

    // Active menu
    function activeMenu(routeName) {
      return router.currentRoute.value.name == routeName
        ? `text-primary-500 border-t border-t-primary-500`
        : ``;
    }
    return {
      activeMenu,
      menuItem,
      navigateMenu,
    };
  },
};
</script>

<style lang="scss" scoped></style>
