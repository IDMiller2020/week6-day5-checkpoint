<template>
  <div class="modal fade"
       id="new-post-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Post
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createPost">
          <div class="modal-body">
            <div class="form-group">
              <label for="make">Post Body</label>
              <input type="text"
                     class="form-control"
                     id="body"
                     placeholder="Text..."
                     v-model="state.newPost.body"
                     required
              >
              <div class="form-group">
                <label for="imgUrl">Image Url</label>
                <input type="text" class="form-control" id="imgUrl" placeholder="Url..." v-model="state.newPost.imgUrl">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { postsService } from '../services/PostsService'
import $ from 'jquery'
export default {
  name: 'Component',
  setup() {
    const state = reactive({
      newPost: {}
    })
    return {
      state,
      async createPost() {
        try {
          await postsService.createPost(state.newPost)
          // NOTE reseting to the empty object resets the input fields
          state.newPost = {}
          $('#new-post-form').modal('hide')
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
