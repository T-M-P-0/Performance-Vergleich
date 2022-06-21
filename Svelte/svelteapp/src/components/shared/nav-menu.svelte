<script>
    import { link, location } from "svelte-spa-router";
    import active from "svelte-spa-router/active";
</script>

<nav
    class="sticky navbar navbar-expand-md navbar-dark bg-dark col-12 col-md-3 col-lg-2  pt-md-3 pl-md-2 pl-xl-3 d-flex d-md-block"
>
    <a class="navbar-brand" href="/"> Svelte App</a>
    <hr />

    <div id="sidebar">
        <ul class="nav nav-pills flex-column navbar-nav d-block mr-auto">
            <li class="nav-item w-100 btn btn-dark text-left">
                <a href="/" class="nav-link text-white" use:link use:active>
                    <svg class="bi me-2" width="16" height="16">
                        <use xlink:href="#home" />
                    </svg>
                    Home
                </a>
            </li>
            <li class="nav-item w-100 btn btn-dark text-left">
                <a
                    href="/test1"
                    class="nav-link text-white"
                    use:link
                    use:active
                >
                    <svg class="bi me-2" width="16" height="16">
                        <use xlink:href="#speedometer2" />
                    </svg>
                    Test 1
                </a>
            </li>
            <li class="nav-item w-100 btn btn-dark text-left">
                <a
                    href="/test2"
                    class="nav-link text-white"
                    use:link
                    use:active
                >
                    <svg class="bi me-2" width="16" height="16">
                        <use xlink:href="#speedometer2" />
                    </svg>
                    Test 2
                </a>
            </li>
            <li class="nav-item w-100 btn btn-dark text-left">
                <a
                    href="/test3"
                    class="nav-link text-white"
                    use:link
                    use:active
                >
                    <svg class="bi me-2" width="16" height="16">
                        <use xlink:href="#speedometer2" />
                    </svg>
                    Test 3
                </a>
            </li>
            <li class="nav-item w-100 btn btn-dark text-left">
                <a
                    href="/test4"
                    class="nav-link text-white"
                    use:link
                    use:active
                >
                    <svg class="bi me-2" width="16" height="16">
                        <use xlink:href="#speedometer2" />
                    </svg>
                    Test 4
                </a>
            </li>
        </ul>
    </div>
</nav>

<style>
    hr {
        height: 2px;
        border-width: 0;
        color: gray;
        background-color: gray;
    }
</style>
