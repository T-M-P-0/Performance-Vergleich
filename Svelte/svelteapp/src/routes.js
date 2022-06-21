// Components
import Index from "./routes/Index.svelte";
import Test1View from "./routes/TestView1.svelte";
import Test2View from "./routes/TestView2.svelte";
import Test3View from "./routes/TestView3.svelte";
import Test4View from "./routes/TestView4.svelte";

// Export the route definition object
const routes = {
    // Exact path
    "/": Index,
    "/test1": Test1View,
    "/test2": Test2View,
    "/test3": Test3View,
    "/test4": Test4View,
};

export default routes;
