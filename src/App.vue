<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <span class="navbar-text">
          <button
            class="btn btn-outline-dark text-uppercase"
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>

          <img
            :src="user.picture"
            alt="user photo"
            height="200"
            class="rounded-circle"
            v-if="user.isAuthenticated"
          />
          <h3 class="mx-0">{{ user.name }}</h3>
          <div
            class="btn btn-outline-dark text-uppercase"
            @click="logout"
            v-if="user.isAuthenticated"
          >
            logout
          </div>

          <div v-if="state.dropOpen"
               class="dropdown-menu p-0 list-group w-100"
               :class="{ show: state.dropOpen }"
               @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
          </div>

        </span>
      </div>
      <div class="col-9">
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
import { computed, reactive } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    const state = reactive({
      dropOpen: false
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
img {
  max-width: 200px;
}
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}

</style>
