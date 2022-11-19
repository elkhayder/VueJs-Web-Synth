<template>
   <button v-if="!initiated" @click="() => (initiated = true)">Enter</button>
   <App v-if="initiated" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import App from "./App.vue";

let initiated = ref(false);
</script>

<style lang="scss" scoped></style>
