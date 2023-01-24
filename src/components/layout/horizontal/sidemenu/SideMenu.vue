<template>
  <div
    class="vertical-menu bg-[#1A1819] dark:bg-slate-800 text-white text-base h-screen fixed w-64 top-0 z-50 duration-300 border-l-0 "
  >
    <div class="flex flex-auto justify-center items-center bg-[#1A1819]">
      <img class="h-18 w-18 mt-4" src="@/assets/images/logo/cuppa.png" alt="" />
    </div>
    <div class="flex flex-col justify-between my-6">
      <perfect-scrollbar style="max-height: 87vh">
        <rs-menu-items
          v-if="staff_category"
          :items="menuItem"
          :staffCategory="staff_category"
        ></rs-menu-items>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import RsMenuItems from "./MenuItem.vue";
// import Menu from "@/layout/navigation/side";
import Menu from "@/navigation/menu";
import { ref } from "vue";

export default {
  components: {
    RsMenuItems,
  },
  setup() {
    const menuItem = Menu;
    const staff_category = ref("");
    const staffName = ref("");
    const staff_role = ref("");

    onMounted(async () => {
      try {
        const el = document
          .querySelector(".active-menu")
          .closest(".menu-content");
        const elParent = el.parentElement.parentElement;

        if (elParent) elParent.classList.remove("hide");
        if (el) el.classList.remove("hide");
      } catch (e) {
        return;
      } finally {
        await getData();
      }
    });

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
          staff_category.value = response.data.data[0].category.toString();
          staff_role.value = response.data.data[0].role;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      menuItem,
      getData,
      staff_category,
    };
  },
};
</script>

<style lang="scss" scoped></style>
