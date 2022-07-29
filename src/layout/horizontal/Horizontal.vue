<template>
  <div>
    <rs-header></rs-header>
    <rs-top-menu></rs-top-menu>
    <div class="content-page">
      <slot />
    </div>
    <rs-footer></rs-footer>
  </div>
</template>

<script>
import RsHeader from "@/components/layout/Header.vue";
import RsTopMenu from "@/components/layout/vertical/TopMenu.vue";
import RsFooter from "@/components/layout/Footer.vue";

export default {
  name: "layout-horizontal",
  inheritAttrs: false,
  components: {
    RsHeader,
    RsTopMenu,
    RsFooter,
  },
  setup() {
    return {};
  },
};
</script>