<template>
  <div />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
  const { params, query } = route
  const { path } = params
  router.replace({ path: '/' + path, query })
})
</script>
