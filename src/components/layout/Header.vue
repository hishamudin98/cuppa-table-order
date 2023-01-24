<template>
  <div
    class="w-header z-20 bg-[#1A1819] dark:bg-slate-800 fixed top-0 right-0 px-5 duration-300 shadow-md shadow-slate-200 dark:shadow-slate-900 py-3"
  >
    <div class="flex items-center justify-between">
      <div class="flex">
        <span class="flex items-center justify-center"
          ><button
            class="icon-btn h-10 w-10 rounded-full"
            @click="toggleMenuOpened"
          >
            <vue-feather type="menu" mb-2></vue-feather></button
        ></span>
      </div>

      <div class="flex gap-2 items-center justify-items-end">
        <div class="text-white">{{ this.staffName }}</div>
        <img src="@/assets/images/logo/cuppa.png" style="width: 40px" />
      </div>
    </div>
  </div>

  <!-- Search Nav for Layout Vertical -->
  <div
    tabindex="0"
    class="w-header-search bg-white dark:bg-slate-800 px-4 z-40 duration-300 shadow-md shadow-slate-200 dark:shadow-slate-900 -top-20 focus-within:top-0 right-0"
  >
    <vue-feather type="search" mb-2 size="18"></vue-feather>
    <input
      id="header-search"
      type="text"
      class="w-full ml-2 px-2 py-3 appearance-none text-md rounded-lg focus:outline-none dark:bg-slate-800"
      name="Search"
      placeholder="Search..."
    />
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";
import state from "@/store";
export default {
  name: "header-component",
  emits: ["toggleMenu"],
  setup(_, { emit }) {
    const dark = ref(false);
    const staffName = ref("");

    // Get darkmode from localstorage and toggle dark mode
    dark.value = state.getters.darkMode;

    // Watch for changes in Dark mode
    watch(dark, (value) => {
      state.commit("CHANGE_DARK_MODE", {
        value,
      });
      state.dispatch("toggleDarkMode");
    });

    // Computed for change window width
    const isDesktop = computed(() => {
      return state.getters.windowWidth >= state.getters.mobileWidth
        ? true
        : false;
    });

    // Check if vertical layout is active
    const nonHorizontal = computed(() => {
      return state.getters.layoutType !== "horizontal" ? true : false;
    });

    // Toggle default setting after component mounted
    onMounted(async () => {
      if (!isDesktop.value) {
        toggleMenuOpened();
      }
      await getData();
    });

    // Change Layout Type
    function changeLayout() {
      const layoutType =
        state.getters.layoutType === "vertical" ? "horizontal" : "vertical";
      state.dispatch("changeLayoutType", { layoutType: layoutType });
      localStorage.setItem("layoutType", layoutType);
    }

    // Toggle Open/Close menu
    function toggleMenuOpened() {
      emit("toggleMenu");
    }

    // Focus on search input
    function toggleSearch() {
      document.getElementById("header-search").value = "";
      document.getElementById("header-search").focus();
    }

    const getData = async () => {
      var axios = require("axios");
      var data = JSON.stringify({
        staffid: localStorage.staff,
      });
      var config = {
        method: "post",
        url: process.env.VUE_APP_FNB_URL + "/admin/dashboard" /*  */,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(function (response) {
          staffName.value = response.data.data[0].staff_name;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      dark: dark,
      isDesktop,
      nonHorizontal,
      toggleMenuOpened,
      toggleSearch,
      changeLayout,
      staffName,
    };
  },
};
</script>
