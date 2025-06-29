# 🎼 Music Theory Documentation

This document explores the musical and theoretical foundations behind the Interactive Musical Pendulums, explaining how physical motion translates into musical expression and the compositional possibilities this creates.

## 📋 Table of Contents

1. [Musical Foundations](#musical-foundations)
2. [Sound Synthesis Theory](#sound-synthesis-theory)
3. [Harmonic Relationships](#harmonic-relationships)
4. [Rhythmic Patterns](#rhythmic-patterns)
5. [Compositional Techniques](#compositional-techniques)
6. [Steve Reich's Pendulum Music](#steve-reichs-pendulum-music)
7. [Generative Music Theory](#generative-music-theory)
8. [Advanced Musical Concepts](#advanced-musical-concepts)

---

## 🎵 Musical Foundations

### Frequency and Pitch

The relationship between physical parameters and musical pitch forms the core of our system:

#### Equal Temperament
Modern Western music uses equal temperament, where each octave is divided into 12 equal semitones:

```
f(n) = f₀ × 2^(n/12)
```

Where:
- `f₀` = Reference frequency (usually A4 = 440 Hz)
- `n` = Number of semitones from reference

#### Implementation in Pendulums
```javascript
function massToEqualTemperament(mass, baseFreq = 220) {
  const semitone = map(mass, 5, 50, -24, 24); // ±2 octaves
  return baseFreq * Math.pow(2, semitone / 12);
}
```

### Just Intonation

Just intonation uses simple frequency ratios that create pure harmonic intervals:

| Interval | Ratio | Frequency Multiplier |
|----------|-------|---------------------|
| Unison | 1:1 | 1.000 |
| Major Second | 9:8 | 1.125 |
| Major Third | 5:4 | 1.250 |
| Perfect Fourth | 4:3 | 1.333 |
| Perfect Fifth | 3:2 | 1.500 |
| Major Sixth | 5:3 | 1.667 |
| Major Seventh | 15:8 | 1.875 |
| Octave | 2:1 | 2.000 |

#### Creating Harmonic Pendulums
```javascript
function createJustIntonationSet(fundamental = 220) {
  const ratios = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2];
  return ratios.map(ratio => {
    const frequency = fundamental * ratio;
    const mass = frequencyToMass(frequency);
    return createPendulum({ mass: mass });
  });
}
```

### Scales and Modes

Different scales create different emotional and harmonic contexts:

#### Major Scale (Ionian Mode)
- Pattern: W-W-H-W-W-W-H
- Intervals: 1-2-3-4-5-6-7-8
- Character: Bright, happy, resolved

#### Minor Scale (Aeolian Mode)
- Pattern: W-H-W-W-H-W-W
- Intervals: 1-2-♭3-4-5-♭6-♭7-8
- Character: Dark, sad, contemplative

#### Pentatonic Scale
- Pattern: W-W-m3-W-m3
- Intervals: 1-2-3-5-6
- Character: Universal, simple, folk-like

```javascript
const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10]
};

function constrainToScale(frequency, scale = 'major', root = 220) {
  const semitone = Math.round(Math.log2(frequency / root) * 12);
  const scaleIndex = semitone % 12;
  const octave = Math.floor(semitone / 12);
  
  // Find closest note in scale
  const scaleNotes = SCALES[scale];
  const closestNote = scaleNotes.reduce((prev, curr) => 
    Math.abs(curr - scaleIndex) < Math.abs(prev - scaleIndex) ? curr : prev
  );
  
  return root * Math.pow(2, (octave * 12 + closestNote) / 12);
}
```

---

## 🔊 Sound Synthesis Theory

### Frequency Modulation (FM) Synthesis

FM synthesis, developed by John Chowning, uses one oscillator (modulator) to modulate the frequency of another (carrier):

#### Basic FM Formula
```
output = sin(2π × fc × t + I × sin(2π × fm × t))
```

Where:
- `fc` = Carrier frequency
- `fm` = Modulator frequency
- `I` = Modulation index (depth)
- `t` = Time

#### Harmonic Content
The modulation index determines the number and amplitude of sidebands:
- `I = 0`: Pure sine wave
- `I = 1`: Rich harmonic content
- `I > 5`: Noisy, bell-like timbres

#### Pendulum FM Mapping
```javascript
function updateFMSynthesis(pendulum) {
  // Carrier frequency from mass
  const carrierFreq = massToFrequency(pendulum.arm1.mass);
  
  // Modulator frequency from length ratio
  const modulatorRatio = pendulum.arm2.length / pendulum.arm1.length;
  const modulatorFreq = carrierFreq * modulatorRatio;
  
  // Modulation index from velocity
  const modIndex = map(Math.abs(pendulum.arm1.aVelocity), 0, 1, 0, 10);
  
  // Apply to synthesizer
  pendulum.synth.frequency.setValueAtTime(carrierFreq, Tone.now());
  pendulum.synth.harmonicity.setValueAtTime(modulatorRatio, Tone.now());
  pendulum.synth.modulationIndex.setValueAtTime(modIndex, Tone.now());
}
```

### Additive Synthesis

Building complex timbres by combining simple sine waves:

#### Harmonic Series
Natural instruments produce harmonics at integer multiples of the fundamental:
- f₁ = f₀ (fundamental)
- f₂ = 2f₀ (octave)
- f₃ = 3f₀ (perfect fifth above octave)
- f₄ = 4f₀ (two octaves)
- f₅ = 5f₀ (major third above two octaves)

#### Pendulum Harmonic Control
```javascript
function createAdditiveVoice(pendulum) {
  const fundamental = massToFrequency(pendulum.arm1.mass);
  const harmonics = [];
  
  for (let i = 1; i <= 8; i++) {
    const harmonic = new Tone.Oscillator(fundamental * i, 'sine');
    const amplitude = 1 / i; // Natural rolloff
    const gain = new Tone.Gain(amplitude);
    
    harmonic.connect(gain);
    harmonics.push({ osc: harmonic, gain: gain });
  }
  
  return harmonics;
}
```

### Granular Synthesis

Breaking sound into tiny grains and reassembling them:

#### Grain Parameters
- **Duration**: 1-100ms typical
- **Frequency**: Grain playback speed
- **Amplitude**: Grain volume
- **Pan**: Stereo position
- **Density**: Grains per second

#### Pendulum Granular Mapping
```javascript
function createGranularFromTrail(trail) {
  const grains = [];
  
  for (let i = 1; i < trail.length; i++) {
    const distance = dist(trail[i-1].x, trail[i-1].y, trail[i].x, trail[i].y);
    const velocity = distance; // Approximate velocity
    
    grains.push({
      duration: map(distance, 0, 50, 0.01, 0.1),
      frequency: map(trail[i].y, 0, height, 200, 2000),
      amplitude: map(velocity, 0, 50, 0, 1),
      pan: map(trail[i].x, 0, width, -1, 1),
      delay: i * 0.01 // Temporal spacing
    });
  }
  
  return grains;
}
```

---

## 🎼 Harmonic Relationships

### Consonance and Dissonance

The relationship between frequencies determines the perceived harmony:

#### Consonant Intervals (Simple Ratios)
- **Perfect Unison**: 1:1 (most consonant)
- **Perfect Octave**: 2:1
- **Perfect Fifth**: 3:2
- **Perfect Fourth**: 4:3
- **Major Third**: 5:4
- **Minor Third**: 6:5

#### Dissonant Intervals (Complex Ratios)
- **Minor Second**: 16:15
- **Major Seventh**: 15:8
- **Tritone**: 45:32 (most dissonant in traditional theory)

### Beating and Roughness

When two frequencies are close but not identical, they create beating:

#### Beat Frequency
```
fbeat = |f1 - f2|
```

#### Roughness Curve
Roughness peaks when beat frequency ≈ 30-40 Hz, creating a sensation of dissonance.

#### Pendulum Beating Effects
```javascript
function calculateBeating(pendulum1, pendulum2) {
  const freq1 = massToFrequency(pendulum1.arm1.mass);
  const freq2 = massToFrequency(pendulum2.arm1.mass);
  const beatFreq = Math.abs(freq1 - freq2);
  
  // Apply beating effect to amplitude modulation
  const beatRate = Math.min(beatFreq, 20); // Limit to audible range
  return {
    rate: beatRate,
    depth: map(beatFreq, 0, 50, 0, 1)
  };
}
```

### Chord Progressions

Multiple pendulums can create chord progressions:

#### Common Progressions
- **I-V-vi-IV**: C-G-Am-F (very popular)
- **ii-V-I**: Dm-G-C (jazz standard)
- **vi-IV-I-V**: Am-F-C-G (emotional)

#### Pendulum Chord Mapping
```javascript
function createChordProgression(pendulums, progression = ['C', 'G', 'Am', 'F']) {
  const chordTones = {
    'C': [261.63, 329.63, 392.00], // C-E-G
    'G': [392.00, 493.88, 587.33], // G-B-D
    'Am': [220.00, 261.63, 329.63], // A-C-E
    'F': [349.23, 220.00, 261.63]  // F-A-C
  };
  
  progression.forEach((chord, index) => {
    const tones = chordTones[chord];
    if (pendulums[index] && tones) {
      const targetMass = frequencyToMass(tones[0]); // Root note
      pendulums[index].arm1.mass = targetMass;
    }
  });
}
```

---

## 🥁 Rhythmic Patterns

### Meter and Time Signatures

Rhythm provides the temporal framework for music:

#### Common Time Signatures
- **4/4**: Four quarter notes per measure (most common)
- **3/4**: Three quarter notes per measure (waltz)
- **6/8**: Six eighth notes per measure (compound)
- **5/4**: Five quarter notes per measure (asymmetrical)

### Pendulum Rhythm Generation

Physical pendulum periods can create natural rhythmic patterns:

#### Period-Based Rhythms
```javascript
function pendulumToRhythm(pendulum) {
  const period = calculatePendulumPeriod(pendulum);
  const beatsPerMinute = 60 / period; // Convert to BPM
  
  // Quantize to musical subdivisions
  const subdivision = findNearestSubdivision(beatsPerMinute);
  
  return {
    bpm: beatsPerMinute,
    subdivision: subdivision,
    pattern: generatePattern(subdivision)
  };
}

function findNearestSubdivision(bpm) {
  const commonBPMs = [60, 80, 100, 120, 140, 160, 180];
  return commonBPMs.reduce((prev, curr) => 
    Math.abs(curr - bpm) < Math.abs(prev - bpm) ? curr : prev
  );
}
```

#### Polyrhythmic Combinations
When multiple pendulums have different periods, they create polyrhythms:

```javascript
function createPolyrhythm(pendulums) {
  const periods = pendulums.map(p => calculatePendulumPeriod(p));
  const lcm = calculateLCM(periods); // Least common multiple
  
  const pattern = [];
  for (let t = 0; t < lcm; t += 0.1) {
    const beats = periods.map((period, index) => {
      return Math.sin(2 * Math.PI * t / period) > 0 ? index : -1;
    }).filter(beat => beat >= 0);
    
    if (beats.length > 0) {
      pattern.push(beats);
    }
  }
  
  return pattern;
}
```

### African Polyrhythmic Principles

Inspired by African musical traditions:

#### Cross-Rhythms
Different pendulums emphasize different beats:
- Pendulum 1: Emphasizes beats 1 and 3
- Pendulum 2: Emphasizes beats 2 and 4
- Pendulum 3: Emphasizes off-beats

#### Rhythmic Density
```javascript
function calculateRhythmicDensity(pendulum) {
  const attackRate = Math.abs(pendulum.arm1.aVelocity) + Math.abs(pendulum.arm2.aVelocity);
  return map(attackRate, 0, 2, 1, 16); // 1 to 16 attacks per measure
}
```

---

## 🎨 Compositional Techniques

### Minimalist Composition

Following Steve Reich's minimalist approach:

#### Phase Shifting
Gradually shifting identical patterns out of phase:

```javascript
function createPhaseShift(pendulum1, pendulum2, shiftRate = 0.001) {
  // Gradually adjust the period of pendulum2
  pendulum2.phaseShift = (pendulum2.phaseShift || 0) + shiftRate;
  pendulum2.arm1.angle += pendulum2.phaseShift;
  pendulum2.arm2.angle += pendulum2.phaseShift;
}
```

#### Process Music
Letting simple processes unfold over time:

```javascript
function applyGradualProcess(pendulum, processType = 'gravity') {
  switch(processType) {
    case 'gravity':
      pendulum.gravity += 0.001; // Gradual gravity increase
      break;
    case 'damping':
      pendulum.damping *= 0.9999; // Gradual energy loss
      break;
    case 'length':
      pendulum.arm1.length *= 1.0001; // Gradual length change
      break;
  }
}
```

### Aleatoric (Chance) Music

Using pendulum chaos for controlled randomness:

#### Controlled Chaos
```javascript
function controlledChaos(pendulum, chaosLevel = 0.5) {
  if (Math.random() < chaosLevel * 0.01) {
    // Introduce small random perturbations
    pendulum.arm1.aAcceleration += (Math.random() - 0.5) * 0.1;
    pendulum.arm2.aAcceleration += (Math.random() - 0.5) * 0.1;
  }
}
```

#### Probability-Based Events
```javascript
function probabilisticEvents(pendulum) {
  const energy = calculatePendulumEnergy(pendulum);
  const eventProbability = map(energy, 0, 1, 0.001, 0.1);
  
  if (Math.random() < eventProbability) {
    return {
      type: 'accent',
      intensity: energy,
      duration: random(0.1, 1.0)
    };
  }
  
  return null;
}
```

### Form and Structure

Creating larger musical structures:

#### ABA Form
```javascript
function createABAForm(duration = 180) { // 3 minutes
  const sections = [
    { name: 'A', start: 0, end: 60, gravity: 1.0, pendulumCount: 3 },
    { name: 'B', start: 60, end: 120, gravity: 2.0, pendulumCount: 5 },
    { name: 'A', start: 120, end: 180, gravity: 1.0, pendulumCount: 3 }
  ];
  
  return sections;
}
```

#### Through-Composed Form
```javascript
function createThroughComposed(duration = 300) {
  const events = [];
  let currentTime = 0;
  
  while (currentTime < duration) {
    events.push({
      time: currentTime,
      action: generateRandomEvent(),
      duration: random(10, 30)
    });
    currentTime += random(15, 45);
  }
  
  return events;
}
```

---

## 🎼 Steve Reich's Pendulum Music

### Historical Context

"Pendulum Music" (1968) was composed during Reich's exploration of process-based composition:

#### Original Concept
- Microphones suspended as pendulums over speakers
- Natural feedback creates the musical content
- Process determines the outcome, not predetermined notes

#### Key Principles
1. **Process as Content**: The process IS the music
2. **Gradual Change**: Slow, perceptible transformations
3. **Non-intentional Music**: Removing personal taste from composition
4. **Audible Structure**: Process should be clearly hearable

### Digital Interpretation

Our pendulum system extends Reich's concepts:

#### Virtual Feedback
```javascript
function createVirtualFeedback(pendulum) {
  // Simulate microphone-speaker feedback
  const distance = dist(pendulum.arm2.position.x, pendulum.arm2.position.y, 
                       width/2, height/2); // Distance to virtual speaker
  
  const feedbackAmount = map(distance, 0, 100, 1.0, 0.0);
  
  if (feedbackAmount > 0.7) {
    // Create feedback oscillation
    pendulum.feedbackFreq = pendulum.feedbackFreq || random(200, 800);
    return {
      frequency: pendulum.feedbackFreq,
      amplitude: feedbackAmount,
      feedback: 0.8
    };
  }
  
  return null;
}
```

#### Process Documentation
```javascript
function documentProcess(pendulum, timestamp) {
  return {
    time: timestamp,
    angle1: pendulum.arm1.angle,
    angle2: pendulum.arm2.angle,
    velocity1: pendulum.arm1.aVelocity,
    velocity2: pendulum.arm2.aVelocity,
    energy: calculatePendulumEnergy(pendulum),
    position: pendulum.arm2.position.copy(),
    audioState: {
      frequency: pendulum.currentFreq,
      amplitude: pendulum.currentAmp
    }
  };
}
```

---

## 🔄 Generative Music Theory

### Algorithmic Composition

Using algorithms to generate musical content:

#### Cellular Automata
```javascript
function cellularMelody(rule = 30, length = 16) {
  let cells = [1, 0, 1, 0, 1, 0, 1, 0]; // Initial state
  const melody = [];
  
  for (let generation = 0; generation < length; generation++) {
    // Convert cells to musical notes
    const note = cellsToNote(cells);
    melody.push(note);
    
    // Evolve cells
    cells = evolveCells(cells, rule);
  }
  
  return melody;
}

function cellsToNote(cells) {
  const binary = cells.join('');
  const decimal = parseInt(binary, 2);
  const scaleIndex = decimal % 8;
  return SCALES.major[scaleIndex];
}
```

#### L-Systems (Lindenmayer Systems)
```javascript
function lSystemMelody(axiom = 'F', rules = {'F': 'F+F-F'}, iterations = 3) {
  let current = axiom;
  
  for (let i = 0; i < iterations; i++) {
    current = current.split('').map(char => rules[char] || char).join('');
  }
  
  return lSystemToNotes(current);
}

function lSystemToNotes(lString) {
  const notes = [];
  let currentNote = 60; // Middle C
  
  for (const char of lString) {
    switch(char) {
      case 'F': notes.push(currentNote); break;
      case '+': currentNote += 2; break; // Move up
      case '-': currentNote -= 2; break; // Move down
    }
  }
  
  return notes;
}
```

### Artificial Intelligence in Music

#### Neural Network Composition
```javascript
class SimpleNeuralComposer {
  constructor() {
    this.weights = this.initializeWeights();
    this.trainingData = [];
  }
  
  // Train on pendulum motion patterns
  trainOnPendulum(pendulum, desiredOutput) {
    const input = this.pendulumToInput(pendulum);
    this.trainingData.push({ input, output: desiredOutput });
    this.backpropagate(input, desiredOutput);
  }
  
  pendulumToInput(pendulum) {
    return [
      pendulum.arm1.angle / (2 * Math.PI),
      pendulum.arm2.angle / (2 * Math.PI),
      pendulum.arm1.aVelocity,
      pendulum.arm2.aVelocity
    ];
  }
  
  generateNote(pendulum) {
    const input = this.pendulumToInput(pendulum);
    return this.feedForward(input);
  }
}
```

#### Genetic Algorithms
```javascript
class GeneticComposer {
  constructor(populationSize = 50) {
    this.population = this.initializePopulation(populationSize);
    this.generation = 0;
  }
  
  evolvePopulation() {
    // Evaluate fitness of each individual
    const fitness = this.population.map(individual => 
      this.evaluateFitness(individual)
    );
    
    // Select parents for reproduction
    const parents = this.selection(fitness);
    
    // Create new generation
    this.population = this.reproduction(parents);
    this.generation++;
  }
  
  evaluateFitness(individual) {
    // Fitness based on harmonic consonance, rhythmic interest, etc.
    return this.harmonicFitness(individual) + this.rhythmicFitness(individual);
  }
}
```

---

## 🎯 Advanced Musical Concepts

### Spectral Music

Working with the frequency spectrum directly:

#### Spectral Analysis
```javascript
function analyzeSpectrum(pendulum) {
  const fft = new Tone.Analyser('fft', 1024);
  pendulum.synth.connect(fft);
  
  const spectrum = fft.getValue();
  return {
    fundamentalFreq: findFundamental(spectrum),
    harmonics: extractHarmonics(spectrum),
    spectralCentroid: calculateCentroid(spectrum),
    spectralRolloff: calculateRolloff(spectrum)
  };
}

function findFundamental(spectrum) {
  let maxIndex = 0;
  let maxValue = spectrum[0];
  
  for (let i = 1; i < spectrum.length; i++) {
    if (spectrum[i] > maxValue) {
      maxValue = spectrum[i];
      maxIndex = i;
    }
  }
  
  return indexToFrequency(maxIndex);
}
```

#### Spectral Morphing
```javascript
function morphSpectra(spectrum1, spectrum2, morphAmount) {
  const morphed = [];
  
  for (let i = 0; i < spectrum1.length; i++) {
    morphed[i] = lerp(spectrum1[i], spectrum2[i], morphAmount);
  }
  
  return morphed;
}
```

### Microtonality

Using intervals smaller than semitones:

#### Quarter-Tone System
```javascript
function quarterToneFrequency(baseFreq, quarterTones) {
  return baseFreq * Math.pow(2, quarterTones / 24);
}

function pendulumToMicrotonal(pendulum) {
  const quarterTones = map(pendulum.arm1.mass, 5, 50, -48, 48);
  return quarterToneFrequency(220, quarterTones);
}
```

#### Just Intonation Ratios
```javascript
const JUST_RATIOS = [
  1/1, 16/15, 9/8, 6/5, 5/4, 4/3, 7/5, 3/2, 8/5, 5/3, 9/5, 15/8, 2/1
];

function justIntonationFreq(baseFreq, ratioIndex) {
  return baseFreq * JUST_RATIOS[ratioIndex % JUST_RATIOS.length];
}
```

### Extended Techniques

#### Prepared Pendulums
Adding virtual "preparations" that modify the sound:

```javascript
function preparePendulum(pendulum, preparationType) {
  switch(preparationType) {
    case 'damped':
      pendulum.damping *= 0.5; // Heavy damping
      break;
    case 'excited':
      pendulum.arm1.aAcceleration += random(-0.1, 0.1); // Random excitation
      break;
    case 'coupled':
      pendulum.couplingStrength = 0.1; // Couple to nearest pendulum
      break;
  }
}
```

#### Extended Synthesis Techniques
```javascript
function createExtendedSynth(pendulum) {
  // Multi-band synthesis
  const lowBand = new Tone.Filter(200, 'lowpass');
  const midBand = new Tone.Filter(2000, 'bandpass');
  const highBand = new Tone.Filter(5000, 'highpass');
  
  // Granular delay
  const granularDelay = new Tone.GrainDelay();
  
  // Frequency shifter
  const freqShifter = new Tone.FrequencyShifter();
  
  return pendulum.synth
    .fan(lowBand, midBand, highBand)
    .connect(granularDelay)
    .connect(freqShifter);
}
```

### Performance and Interaction

#### Live Coding Integration
```javascript
function liveCodingInterface(code) {
  try {
    const processFunction = new Function('pendulums', 'time', code);
    return processFunction;
  } catch (error) {
    console.error('Live coding error:', error);
    return null;
  }
}

// Example live coding session:
const liveCode = `
  // Gradually increase gravity over time
  pendulums.forEach(p => p.gravity = 1 + Math.sin(time * 0.001));
  
  // Create frequency relationships
  if (pendulums.length >= 2) {
    const ratio = 3/2; // Perfect fifth
    const freq1 = massToFrequency(pendulums[0].arm1.mass);
    const targetMass = frequencyToMass(freq1 * ratio);
    pendulums[1].arm1.mass = lerp(pendulums[1].arm1.mass, targetMass, 0.01);
  }
`;
```

This music theory documentation provides a comprehensive foundation for understanding and creating sophisticated musical experiences with the Interactive Musical Pendulums system. The combination of physical simulation, sound synthesis theory, and compositional techniques opens up endless possibilities for musical exploration and artistic expression.