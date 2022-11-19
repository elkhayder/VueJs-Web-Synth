import { createApp } from "vue";
import Welcome from "./Welcome.vue";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import "./styles.scss";

createApp(Welcome)
   .use(createPinia())
   .use(PrimeVue as any)
   .mount("#app");
