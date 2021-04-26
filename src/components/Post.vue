<template>
  <div class="post-photo col-md-3">
    <div class=" position-relative">
      <div v-if="post.imgUrl" class="py-4">
        <img id="postPic" :src="post.imgUrl" alt="Post Image" />
      </div>
      <div v-else class="py-4">
        <img src="https://via.placeholder.com/100/000000/ffffff/?text=CodeWorks" alt="Alt image is broken" />
      </div>
      <div class="text-left">
        <h4>{{ post.body }}</h4>
      </div>
      <!-- <router-link :to="{name: 'ProjectDetails', params: {id: post.id}}">
        <img :src="post.imgUrl" alt="Project Cover Image">
        <img class="rounded-circle small-img position-absolute" :src="post.creator.picture" alt="Creator Photo">
      </router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
 img{
   width: 100%
 }

 .small-img{
   width: 1em;
   left: 0;
   top: 5px
 }
</style>
