# VUE

## Setup

* Erstellen eines Projekts:

```
vue create vue-app
```

https://vuejs.org/

* Under the hood, Vue compiles the templates into highly-optimized JavaScript code

* If you are familiar with Virtual DOM concepts and prefer the raw power of JavaScript, 
you can also directly write render functions instead of templates, with optional JSX support.
  * note that they do not enjoy the same level of compile-time optimizations as templates

* {{}} : The double mustaches interprets the data as plain text 
* Real Html can output with v-Html

* DOM Update Timing (https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

* When you mutate reactive state, the DOM is updated automatically. 
* However, it should be noted that the DOM updates are not applied synchronously. 
  * Instead, Vue buffers them until the "next tick" in the update cycle to ensure 
  that each component needs to update only once no matter how many state changes you have made.



? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, Linter
? Choose a version of Vue.js that you want to start the project with 3.x
? Use history mode for router? (Requires proper server setup for index fallback in production)
No
? Pick a linter / formatter config: Basic
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files

? Save this as a preset for future projects? N

Starten in Production:

npm install 

npm run build

Erzeugt den Build im dist folder

anschließend können kann Applikation mit

serve -i -destinationFolderVonBuld

gestartet werden

