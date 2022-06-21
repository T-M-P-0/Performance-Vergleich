import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import TestView1 from '../views/TestView1.vue'
import TestView2 from '../views/TestView2.vue'
import TestView3 from '../views/TestView3.vue'
import TestView4 from '../views/TestView4.vue'

const routes = [
  {
    path: "/",
    name: "indexView",
    component: IndexView
  },
  {
    path: "/test1",
    name: "TestView1",
    component: TestView1
  },
  {
    path: "/test2",
    name: "TestView2",
    component: TestView2
  },
  {
    path: "/test3",
    name: "TestView3",
    component: TestView3
  },
  {
    path: "/test4",
    name: "TestView4",
    component: TestView4
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
