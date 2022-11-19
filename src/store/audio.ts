import { defineStore } from "pinia";
import { ref } from "vue";

export const useAudioStore = defineStore("Audio", () => {
   const context = ref<AudioContext>(new AudioContext());
   const gainNode = ref<GainNode>(
      (() => {
         const node = context.value.createGain();
         node.connect(context.value.destination);
         return node;
      })()
   );

   return { context, gainNode };
});
