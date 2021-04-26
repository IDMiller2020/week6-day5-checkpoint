<template>
  <nav class="navbar navbar-dark bg-primary">
    <span id="accountInfo" class="navbar-text">
      <button
        class="btn btn-sm btn-outline-success text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <div class="dropdown" v-else>
        <div
          class="dropdown-toggle"
          @click="state.dropOpen = !state.dropOpen"
        >
          <img
            :src="user.picture"
            alt="user photo"
            height="40"
            class="rounded-circle"
          />
          <!-- <span class="mx-3">{{ user.name }}</span> -->
        </div>
        <div
          class="dropdown-menu p-0 list-group w-100"
          :class="{ show: state.dropOpen }"
          @click="state.dropOpen = false"
        >
          <router-link :to="{ name: 'Account' }">
            <div class="list-group-item list-group-item-action hoverable">
              Account
            </div>
          </router-link>
          <div
            class="list-group-item list-group-item-action hoverable"
            @click="logout"
          >
            logout
          </div>
        </div>
      </div>
    </span>
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div id="logo" class="d-flex flex-column align-items-center">
        <p class="pl-2 m-0">
          Network
        </p>
      </div>
    </router-link>
    <router-link :to="{ name: 'Home' }" class="nav-link hoverable text-white">
      Home
    </router-link>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
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

<style scoped>

.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--dark);
}
@media screen and (min-width: 1000px) {
  #accountInfo {
    display: none;
  }
  #logo {
    font-size: 2.5rem;
  }
}
@media screen and (max-width: 1000px) {
  #logo {
    font-size: 2rem;
  }
}
</style>
