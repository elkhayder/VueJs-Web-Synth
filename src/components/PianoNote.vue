<template>
   <div
      :class="{
         note: true,
         black: isBlack,
         clicked: isClicked,
      }"
   >
      {{ name }}
   </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, onUpdated } from "vue";
import { Instrument } from "../audio/Instrument";
import { useAudioStore } from "../store/audio";

const props = defineProps<{
   isBlack: boolean;
   name: string;
   keyboardKey: string;
   frequency: number;
   onStatusChange: (val: boolean) => void;
}>();

const isClicked = ref(false);

const instrument = new Instrument([
   { type: "sine", gain: 0.7 },
   { type: "square", gain: 0.7 },
]);

onUpdated(() => {
   if (isClicked.value) {
      props.onStatusChange(true);
      instrument.play(props.frequency);
   } else {
      props.onStatusChange(false);
      instrument.stop();
   }
});

const keydownEventHandler = (ev: KeyboardEvent) => {
   if (ev.key.toLowerCase() == props.keyboardKey) {
      isClicked.value = true;
   }
};
const keyupEventHandler = (ev: KeyboardEvent) => {
   if (ev.key.toLowerCase() == props.keyboardKey) {
      isClicked.value = false;
   }
};

onMounted(() => {
   document.addEventListener("keydown", keydownEventHandler);
   document.addEventListener("keyup", keyupEventHandler);
});

onUnmounted(() => {
   document.removeEventListener("keydown", keydownEventHandler);
   document.removeEventListener("keyup", keyupEventHandler);
});
</script>

<style lang="scss" scoped>
.note {
   $width: 40px;
   $height: 100px;

   width: $width;
   height: $height;
   background-color: black;
   border: 1px solid pink;
   color: white;
   text-align: center;
   line-height: $height;
   font-size: 12px;

   &.clicked {
      background-color: lightcoral;
   }

   &.black {
      color: black;
      background-color: white;
      margin-left: -5px;
      margin-right: -5px;
      width: $width - 10px;
      height: calc($height / 2);
      line-height: calc($height / 2);
      z-index: 2;

      &.clicked {
         background-color: lightgreen;
      }
   }
}
</style>
