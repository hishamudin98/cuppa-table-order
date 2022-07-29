<template>
  <rs-header></rs-header>
  <div class="content-page">
    <slot />
  </div>
  <rs-bottom-menu></rs-bottom-menu>
</template>

<script setup>
import RsHeader from "@/components/layout/Header.vue";
import RsBottomMenu from "@/components/layout/bottom/BottomMenu.vue";
</script>

<style lang="scss" scoped>
</style>