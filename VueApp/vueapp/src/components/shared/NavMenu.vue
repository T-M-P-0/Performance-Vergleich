<template>
  <nav
    class="col-12 col-md-3 col-lg-2 navbar navbar-expand-md navbar-dark bg-dark pt-md-3 pl-md-2 pl-xl-3 d-flex d-md-block">
    <a class="navbar-brand" href="/">
      <i class="fas fa-cog"></i>
      Vue App
    </a>
    <hr />

    <div id="sidebar">
      <ul class="nav nav-pills flex-column navbar-nav d-block mr-auto">
        <li class="nav-item w-100 btn btn-dark text-left">
          <router-link to="/" active-class="active" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#home"></use>
            </svg>
            Home
          </router-link>
        </li>

        <li class="nav-item w-100 btn btn-dark text-left">
          <router-link to="/test1" exact-active-class="active" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Test 1
          </router-link>
        </li>
        <li class="nav-item w-100 btn btn-dark text-left">
          <router-link to="/test2" exact-active-class="active" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Test 2
          </router-link>
        </li>
        <li class="nav-item w-100 btn btn-dark text-left">
          <router-link to="/test3" exact-active-class="active" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Test 3
          </router-link>
        </li>
        <li class="nav-item w-100 btn btn-dark text-left">
          <router-link to="/test4" exact-active-class="active" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#speedometer2"></use>
            </svg>
            Test 4
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style>
hr {
  height: 2px;
  border-width: 0;
  color: gray;
  background-color: gray;
}

nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}
</style>