<script setup lang="ts">
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';

interface Props {
  page: number;
  hasMoreData: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
      :disabled="page == 1"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 bg-blue-500 px-4 py-1.5 rounded-lg text-white disabled:bg-gray-300 hover:bg-blue-600 transition-all"
    >
      <ArrowLeftIcon />
      Anteriores
    </button>
    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 bg-blue-500 px-4 py-1.5 rounded-lg text-white disabled:bg-gray-300 hover:bg-blue-600 transition-all"
    >
      Siguientes
      <ArrowRightIcon />
    </button>
  </div>
</template>
