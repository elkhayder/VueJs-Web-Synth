<script setup lang="ts">
import { useAudioStore } from "./store/audio";
import { ref, onUpdated, onMounted, onUnmounted } from "vue";
import PianoNote from "./components/PianoNote.vue";

type Note = {
   name: string;
   frequency: number;
   keyboardKey: string;
};

const audio = useAudioStore();

let playingNotesCount = 0;

const onNoteStatusChange = (status: boolean) => {
   if (status) {
      playingNotesCount++;
   } else {
      playingNotesCount--;
   }

   audio.gainNode.gain.value = 1 / Math.max(playingNotesCount, 1);
};

const notes: Note[] = [
   {
      name: "C4",
      frequency: 261.6,
      keyboardKey: "z",
   },
   {
      name: "C#4",
      frequency: 277.18,
      keyboardKey: "s",
   },
   {
      name: "D4",
      frequency: 293.66,
      keyboardKey: "x",
   },
   {
      name: "D#4",
      frequency: 311.13,
      keyboardKey: "d",
   },
   {
      name: "E4",
      frequency: 329.63,
      keyboardKey: "c",
   },
   {
      name: "F4",
      frequency: 349.23,
      keyboardKey: "v",
   },
   {
      name: "F#4",
      frequency: 369.99,
      keyboardKey: "g",
   },
   {
      name: "G4",
      frequency: 392.0,
      keyboardKey: "b",
   },
   {
      name: "G#4",
      frequency: 415.3,
      keyboardKey: "h",
   },
   {
      name: "A4",
      frequency: 440.0,
      keyboardKey: "n",
   },
   {
      name: "A#4",
      frequency: 466.16,
      keyboardKey: "j",
   },
   {
      name: "B4",
      frequency: 493.88,
      keyboardKey: "m",
   },
];
</script>

<template>
   <div class="piano-container">
      <PianoNote
         v-for="note in notes"
         :isBlack="note.name.charAt(1) == '#'"
         :name="note.name"
         :keyboardKey="note.keyboardKey"
         :frequency="note.frequency"
         :onStatusChange="onNoteStatusChange"
      />
   </div>
</template>

<style lang="scss" scoped>
.piano-container {
   display: flex;
   align-items: flex-start;
   justify-content: start;
   max-width: 650px;
}
</style>
