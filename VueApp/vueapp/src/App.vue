<template>
  <div class="container-fluid">
    <div class="row wrapper">
      <NavMenuVue></NavMenuVue>
      <main class="col-12 col-md-9 col-lg-10 px-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import NavMenuVue from './components/shared/NavMenu.vue'
export default {
  components: {
    NavMenuVue
  }
}
</script>

<style>
@import "@/styles/app.css";
</style>
