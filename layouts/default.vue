<template>
  <div class="bg-dark">
    <div id="app">
      <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow">
        <div class="container">
          <a class="navbar-brand" href="#">
            Nuxt App
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="ToggleNaviagtion"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav me-auto">
            </ul>

            <ul class="navbar-nav ms-auto" v-if="$auth.loggedIn">
              <!-- Authentication Links -->
              <li class="nav-item dropdown">
                <a id="navbarDropdown"
                   class="nav-link dropdown-toggle"
                   href="#" role="button"
                   @click="openMenu"
                   data-bs-toggle="dropdown"
                   aria-haspopup="true"
                   aria-expanded="false">{{ $auth.user.name }}
                </a>

                <div class="dropdown-menu dropdown-menu-dark dropdown-menu-end" :class="isOpen ? 'show' : ''" aria-labelledby="navbarDropdown">
                  <div class="dropdown-item"
                     @click="$auth.logout()">
                    Logout
                  </div>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </nav>

      <main class="py-4">
        <Nuxt />
      </main>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    openMenu() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>
<style>
@import "assets/css/style.css";
</style>
