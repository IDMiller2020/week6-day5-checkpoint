<template>
  <div class="container-fluid">
    <div id="mainRow" class="row">
      <div id="leftCol" class="col-3 p-0">
        <span class="navbar-text">
          <button
            class="btn btn-outline-success text-uppercase"
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>
          <div class="p-4 d-flex justify-content-center">
            <img
              :src="user.picture"
              alt="user photo"
              height="200"
              class="rounded-circle"
              v-if="user.isAuthenticated"
            />
          </div>
          <div>
            <h3 class="pl-4 mx-0">{{ user.name }}</h3>
          </div>
          <div class="pl-4">
            <p>Submit a new post:</p>
          </div>
          <form @submit.prevent="create" v-if="user.isAuthenticated && state.activeProfile.id === state.account.id">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     class="form-control"
                     name="title"
                     id="title"
                     aria-describedby="helpId"
                     placeholder="Title..."
                     v-model="state.newProject.title"
              >
              <label for="imgUrl">Image</label>
              <input type="text"
                     class="form-control"
                     name="imgUrl"
                     id="imgUrl"
                     aria-describedby="helpId"
                     placeholder="Image Url..."
                     v-model="state.newProject.imgUrl"
              >
            </div>
            <button type="submit" class="btn btn-success">
              Create
            </button>
          </form>
          <!-- <div
            title="Open new post form"
            type="button"
            class="ml-4 btn btn-outline-success text-uppercase"
            data-toggle="modal"
            data-target="#new-post-form"
            v-if="user.isAuthenticated"
          >
            New Post
          </div> -->
          <div
            class="ml-4 btn btn-outline-danger text-uppercase"
            @click="logout"
            v-if="user.isAuthenticated"
          >
            logout
          </div>
        </span>
      </div>
      <div id="rightCol" class="col-9 p-0">
        <header>
          <Navbar />
        </header>
        <main>
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from './services/AuthService'
import { computed, reactive, onMounted } from 'vue'
import { AppState } from './AppState'
import { useRoute } from 'vue-router'
import { accountService } from './services/AccountService'
export default {
  name: 'App',
  setup() {
    const route = useRoute()
    const state = reactive({
      dropOpen: false
    })

    onMounted(async() => {
      console.log('App.vue onMounted')
      console.log(route.params.id)
      await accountService.getProfile(route.params.id)
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
#leftCol {
  background: #4e5d6c;
}
@media screen and (max-width: 1000px) {
    #leftCol {
      display: none;
    }
    #rightCol {
      flex: 100%;
      max-width: 100%;
    }
 }

</style>
