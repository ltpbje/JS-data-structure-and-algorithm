<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';

const list = ref([1, 2, 3]);

// const itemRefs = useTemplateRef('items');
const items = ref([]);

onMounted(() => {
  // console.log(itemRefs.value.map(i => i));
  console.log(items.value);

});
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>