import { useAudioStore } from "../store/audio";

export type Oscillator = {
   type: OscillatorType;
   gain: number;
};

export class Instrument {
   oscillators: Oscillator[];
   oscillatorsInstances: OscillatorNode[];
   gainNode: GainNode;

   constructor(oscillators: Oscillator[]) {
      const audio = useAudioStore();
      this.oscillators = oscillators;
      this.oscillatorsInstances = [];
      this.gainNode = new GainNode(audio.context, {
         gain: 1 / Math.max(oscillators.length, 1), // Max to avoid division by 0
      });
      this.gainNode.connect(audio.gainNode);
   }

   play(frequency: number) {
      const audio = useAudioStore();
      for (let oscConfig of this.oscillators) {
         const osc = new OscillatorNode(audio.context, {
            ...oscConfig,
            frequency,
         });
         const gain = new GainNode(audio.context, {
            gain:
               oscConfig.gain /
               this.oscillators.reduce(
                  (prev, current) => prev + current.gain,
                  0
               ),
         });
         gain.connect(this.gainNode);
         osc.connect(gain);
         this.oscillatorsInstances.push(osc);
      }

      this.oscillatorsInstances.forEach((e) => e.start());
   }

   stop() {
      for (let osc of this.oscillatorsInstances) {
         osc.stop();
         osc.disconnect();
      }
      this.oscillatorsInstances = [];
   }
}
