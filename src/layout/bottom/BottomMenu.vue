<template>
  <rs-header></rs-header>
  <div class="content-page">
    <slot />
  </div>
</template>

<script setup>
import RsHeader from "@/layout/components/Header.vue";
</script>

<style lang="scss" scoped>
</style>