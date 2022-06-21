<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import NavMenu from "./components/shared/nav-menu.svelte";
</script>


<div class="container-fluid">
  <div class="row wrapper">
    <NavMenu />
    <main class="col-12 col-md-9 col-lg-10 px-4">
      <Router {routes} />
    </main>
  </div>
</div>