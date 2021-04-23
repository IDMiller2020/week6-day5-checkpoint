<template>
  <div class="about">
    <img class="rounded-circle" :src="account.picture" alt="" />
    <h3>{{ account.name }}</h3>
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 200px;
}
</style>
