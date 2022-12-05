<template>
  <div v-for="(item, index) in menuItem" :key="index">
    <div
      v-if="item.header"
      class="text-left font-normal text-xs mx-6 mt-5 mb-2"
    >
      <span class="uppercase text-primary-500 dark:text-primary-400">
        {{ item.header ? item.header : "" }}
      </span>
      <p class="text-gray-400 dark:text-secondary">
        {{ item.description ? item.description : "" }}
      </p>
    </div>
    <ul class="navigation-menu">
      <li
        class="navigation-item"
        v-for="(item2, index2) in item.child"
        :key="index2"
        @click="
          item2.child === undefined || item2.child.length === 0
            ? navigateMenu(item2.route)
            : openMenu($event)
        "
      >
        <div v-if="checkNavigationGuard(item2.meta)">
          <a
            class="flex items-center px-4 py-3 mx-3 rounded-lg cursor-pointer"
            style="transition: margin 0.2s ease-in-out"
            :class="activeMenu(item2.route?.name || '')"
          >
            <vue-feather
              v-if="item2.icon"
              :type="item2.icon"
              size="18"
            ></vue-feather>
            <vue-feather v-else type="circle" size="18"></vue-feather>
            <span class="mx-3 font-normal">{{ item2.title }}</span>
            <vue-feather
              v-if="item2.child && item2.child.length > 0"
              class="ml-auto"
              type="chevron-right"
              size="18"
            ></vue-feather>
          </a>
          <rs-menu-child-items
            v-if="item2.child"
            :items="item2.child"
            @navigateMenu="navigateMenu"
            @openMenu="openMenu"
            @activeMenu="activeMenu"
          ></rs-menu-child-items>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "@/router";
import RsMenuChildItems from "./MenuChildItem.vue";

export default {
  name: "RsMenuItems",
  props: {
    items: {
      type: Array,
      required: true,
    },
    staffCategory: {
      type: String,
      required: false,
    },
  },
  components: {
    RsMenuChildItems,
  },
  setup(props) {
    const menuOpen = ref(false);

    // Navigate to route
    function navigateMenu(route) {
      try {
        router.push(route);
      } catch (e) {
        router.push({ name: "error-404" });
      }
    }

    // Toggle show and hide menu content
    function openMenu(event) {
      const target = event.currentTarget;
      try {
        target.querySelector("a").classList.toggle("nav-open");
        target.querySelector("ul").classList.toggle("hide");
      } catch (e) {
        console.log(e);
        return;
      }
    }

    // Active menu
    function activeMenu(routeName) {
      return router.currentRoute.value.name == routeName
        ? ` shadow-lg
            shadow-white-700/30
            dark:shadow-white-500/10
            text-[#1A1819]
            bg-white
            active-menu`
        : `hover:ml-4`;
    }

    function checkNavigationGuard(routeMeta) {
      try {
        if (routeMeta && routeMeta.staffCategory) {
          let staffCategory = parseInt(props.staffCategory);

          if (routeMeta.staffCategory.includes(staffCategory)) {
            return true;
          } else if (routeMeta.staffCategory == "all") {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } catch (error) {
        return;
      }
    }

    return {
      menuItem: props.items ? props.items : [],
      menuOpen,
      navigateMenu,
      openMenu,
      activeMenu,
      checkNavigationGuard,
    };
  },
};
</script>

<style lang="scss" scoped></style>
