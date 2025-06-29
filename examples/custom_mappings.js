/**
 * Custom Sound Mappings for Interactive Musical Pendulums
 * 
 * This file demonstrates various approaches to mapping physical pendulum
 * parameters to musical and audio synthesis parameters. These examples
 * show how to create unique sonic experiences beyond the default mappings.
 */

// ========== FREQUENCY MAPPING STRATEGIES ==========

// 1. Logarithmic Frequency Mapping (Musical Scale)
class MusicalFrequencyMapper {
  constructor(baseFrequency = 220) { // A3
    this.baseFrequency = baseFrequency;
    this.chromaticScale = this.generateChromaticScale();
  }
  
  generateChromaticScale() {
    const scale = [];
    for (let i = 0; i < 88; i++) { // Piano range
      scale.push(this.baseFrequency * Math.pow(2, (i - 49) / 12));
    }
    return scale;
  }
  
  // Map mass to chromatic scale
  massToMusicalFreq(mass, minMass = 5, maxMass = 50) {
    const scaleIndex = Math.floor(map(mass, minMass, maxMass, 0, this.chromaticScale.length - 1));
    return this.chromaticScale[scaleIndex];
  }
  
  // Map to pentatonic scale (more harmonious)
  massToPentatonicFreq(mass, minMass = 5, maxMass = 50) {
    const pentatonicIntervals = [0, 2, 4, 7, 9]; // Major pentatonic
    const octave = Math.floor(map(mass, minMass, maxMass, 0, 4));
    const note = pentatonicIntervals[Math.floor(map(mass, minMass, maxMass, 0, 5)) % 5];
    
    return this.baseFrequency * Math.pow(2, octave) * Math.pow(2, note / 12);
  }
  
  // Map to just intonation ratios
  massToJustIntonation(mass, minMass = 5, maxMass = 50) {
    const justRatios = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2];
    const ratioIndex = Math.floor(map(mass, minMass, maxMass, 0, justRatios.length - 1));
    return this.baseFrequency * justRatios[ratioIndex];
  }
}

// 2. Physical Frequency Mapping (Based on Real Pendulum Physics)
class PhysicalFrequencyMapper {
  // Real pendulum frequency: f = 1/(2π) * √(g/L)
  lengthToNaturalFreq(length, gravity = 9.81) {
    const lengthInMeters = length / 100; // Convert pixels to meters (rough approximation)
    return (1 / (2 * Math.PI)) * Math.sqrt(gravity / lengthInMeters);
  }
  
  // Scale to audible range
  lengthToAudibleFreq(length, minLength = 50, maxLength = 200) {
    const naturalFreq = this.lengthToNaturalFreq(length);
    return map(naturalFreq, 0.5, 2, 200, 2000); // Scale to 200Hz - 2kHz
  }
  
  // Compound pendulum frequency
  doublePendulumFreq(length1, length2, mass1, mass2) {
    // Simplified approximation for double pendulum dominant frequency
    const totalLength = length1 + length2;
    const totalMass = mass1 + mass2;
    const effectiveLength = totalLength * (mass1 + 2 * mass2) / (3 * totalMass);
    
    return this.lengthToNaturalFreq(effectiveLength);
  }
}

// ========== TIMBRE MAPPING STRATEGIES ==========

// 3. Advanced FM Synthesis Mapping
class AdvancedFMMapper {
  constructor() {
    this.harmonicSeries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  }
  
  // Map velocity to complex FM parameters
  velocityToFM(velocity) {
    const absVel = Math.abs(velocity);
    
    return {
      harmonicity: map(absVel, 0, 1, 0.5, 8),
      modulationIndex: map(absVel, 0, 1, 0, 20),
      modulationType: absVel > 0.5 ? 'square' : 'sine',
      feedback: map(absVel, 0, 1, 0, 0.9)
    };
  }
  
  // Map angle to harmonic series
  angleToHarmonic(angle) {
    const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const harmonicIndex = Math.floor(map(normalizedAngle, 0, 2 * Math.PI, 0, this.harmonicSeries.length));
    return this.harmonicSeries[harmonicIndex];
  }
  
  // Map chaos level to modulation complexity
  chaosToModulation(pendulum) {
    const chaos = this.calculateChaosLevel(pendulum);
    
    return {
      modulationIndex: map(chaos, 0, 1, 1, 15),
      harmonicity: chaos > 0.7 ? map(chaos, 0.7, 1, 2, 0.1) : map(chaos, 0, 0.7, 0.5, 2),
      envelope: {
        attack: map(chaos, 0, 1, 0.5, 0.01),
        decay: map(chaos, 0, 1, 0.5, 0.1),
        sustain: map(chaos, 0, 1, 0.8, 0.3),
        release: map(chaos, 0, 1, 1.0, 0.2)
      }
    };
  }
  
  calculateChaosLevel(pendulum) {
    // Measure chaos using velocity variance and angle change rate
    const vel1 = Math.abs(pendulum.arm1.aVelocity);
    const vel2 = Math.abs(pendulum.arm2.aVelocity);
    const avgVel = (vel1 + vel2) / 2;
    const velVariance = Math.abs(vel1 - vel2);
    
    return Math.min(avgVel + velVariance, 1);
  }
}

// 4. Granular Synthesis Mapping
class GranularSynthMapper {
  // Map pendulum trail to grain parameters
  trailToGrains(trail) {
    const grainParams = [];
    
    for (let i = 1; i < trail.length; i++) {
      const distance = dist(trail[i-1].x, trail[i-1].y, trail[i].x, trail[i].y);
      const direction = atan2(trail[i].y - trail[i-1].y, trail[i].x - trail[i-1].x);
      
      grainParams.push({
        duration: map(distance, 0, 50, 0.01, 0.1),
        pitch: map(direction, -Math.PI, Math.PI, 200, 2000),
        pan: map(trail[i].x, 0, width, -1, 1),
        amplitude: map(distance, 0, 50, 0, 1)
      });
    }
    
    return grainParams;
  }
  
  // Map energy changes to grain density
  energyToGrainDensity(pendulum) {
    const currentEnergy = this.calculateEnergy(pendulum);
    const energyChange = Math.abs(currentEnergy - (pendulum.lastEnergy || 0));
    pendulum.lastEnergy = currentEnergy;
    
    return map(energyChange, 0, 1, 1, 50); // 1-50 grains per second
  }
  
  calculateEnergy(pendulum) {
    const ke1 = 0.5 * pendulum.arm1.mass * Math.pow(pendulum.arm1.aVelocity, 2);
    const ke2 = 0.5 * pendulum.arm2.mass * Math.pow(pendulum.arm2.aVelocity, 2);
    return (ke1 + ke2) / 100; // Normalized
  }
}

// ========== SPATIAL AUDIO MAPPINGS ==========

// 5. 3D Spatial Audio Mapping
class SpatialAudioMapper {
  constructor() {
    this.roomSize = { width: 20, height: 20, depth: 10 }; // Virtual room in meters
  }
  
  // Map 2D pendulum position to 3D space
  positionTo3D(pendulum) {
    const x = map(pendulum.arm2.position.x, 0, width, -this.roomSize.width/2, this.roomSize.width/2);
    const y = 0; // Keep at ear level
    const z = map(pendulum.arm2.position.y, 0, height, -this.roomSize.depth/2, this.roomSize.depth/2);
    
    return { x, y, z };
  }
  
  // Map velocity to doppler effect
  velocityToDoppler(pendulum) {
    const velocity = createVector(
      pendulum.arm2.position.x - (pendulum.arm2.lastPosition?.x || pendulum.arm2.position.x),
      pendulum.arm2.position.y - (pendulum.arm2.lastPosition?.y || pendulum.arm2.position.y)
    );
    
    pendulum.arm2.lastPosition = pendulum.arm2.position.copy();
    
    const speed = velocity.mag();
    const speedOfSound = 343; // m/s
    const dopplerFactor = speedOfSound / (speedOfSound + speed);
    
    return dopplerFactor;
  }
  
  // Map distance to reverb and filtering
  distanceToAcoustics(distance) {
    return {
      volume: map(distance, 0, this.roomSize.width, 0, -40), // dB
      highCut: map(distance, 0, this.roomSize.width, 20000, 1000), // Hz
      reverbSend: map(distance, 0, this.roomSize.width, 0, 0.8)
    };
  }
}

// 6. Ambisonic Field Mapping
class AmbisonicMapper {
  // Map pendulum ensemble to ambisonic field
  ensembleToAmbisonics(pendulums) {
    const ambisonicCoeffs = { W: 0, X: 0, Y: 0, Z: 0 };
    
    pendulums.forEach(pendulum => {
      const pos = this.normalizePosition(pendulum.arm2.position);
      const amplitude = this.calculateAmplitude(pendulum);
      
      // B-format encoding
      ambisonicCoeffs.W += amplitude * 0.707; // Omnidirectional
      ambisonicCoeffs.X += amplitude * pos.x;  // Front-back
      ambisonicCoeffs.Y += amplitude * pos.y;  // Left-right
      ambisonicCoeffs.Z += amplitude * 0;      // Up-down (2D system)
    });
    
    return ambisonicCoeffs;
  }
  
  normalizePosition(position) {
    return {
      x: map(position.x, 0, width, -1, 1),
      y: map(position.y, 0, height, -1, 1)
    };
  }
  
  calculateAmplitude(pendulum) {
    return Math.abs(pendulum.arm1.aVelocity) + Math.abs(pendulum.arm2.aVelocity);
  }
}

// ========== RHYTHMIC MAPPINGS ==========

// 7. Polyrhythmic Generator
class PolyrhythmMapper {
  constructor() {
    this.baseTimeUnit = 120; // BPM
    this.rhythmPatterns = [
      [1, 0, 1, 0], // Simple beat
      [1, 0, 0, 1, 0, 1], // Complex pattern
      [1, 1, 0, 1, 0, 0, 1, 0], // Syncopated
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 0] // Irregular
    ];
  }
  
  // Map pendulum period to rhythm
  periodToRhythm(pendulum) {
    const period = this.calculatePeriod(pendulum);
    const rhythmIndex = Math.floor(map(period, 0.5, 3, 0, this.rhythmPatterns.length));
    const pattern = this.rhythmPatterns[rhythmIndex] || this.rhythmPatterns[0];
    
    return {
      pattern: pattern,
      tempo: map(period, 0.5, 3, 60, 180), // BPM
      subdivision: Math.floor(map(pendulum.arm1.mass, 5, 50, 4, 16))
    };
  }
  
  calculatePeriod(pendulum) {
    // Estimate period from angular velocity
    if (Math.abs(pendulum.arm1.aVelocity) > 0.001) {
      return Math.abs(2 * Math.PI / pendulum.arm1.aVelocity);
    }
    return 2; // Default period
  }
  
  // Generate polyrhythmic triggers
  generatePolyrhythm(pendulums) {
    const rhythms = pendulums.map(p => this.periodToRhythm(p));
    const combinedPattern = this.combineRhythms(rhythms);
    
    return combinedPattern;
  }
  
  combineRhythms(rhythms) {
    const maxLength = Math.max(...rhythms.map(r => r.pattern.length));
    const combined = new Array(maxLength).fill(0);
    
    rhythms.forEach((rhythm, index) => {
      for (let i = 0; i < maxLength; i++) {
        const patternIndex = i % rhythm.pattern.length;
        if (rhythm.pattern[patternIndex]) {
          combined[i] |= (1 << index); // Bit flag for each pendulum
        }
      }
    });
    
    return combined;
  }
}

// ========== GENERATIVE MAPPINGS ==========

// 8. Markov Chain Melody Generator
class MarkovMelodyMapper {
  constructor() {
    this.noteTransitions = {};
    this.currentNote = 60; // Middle C
    this.scales = {
      major: [0, 2, 4, 5, 7, 9, 11],
      minor: [0, 2, 3, 5, 7, 8, 10],
      dorian: [0, 2, 3, 5, 7, 9, 10],
      pentatonic: [0, 2, 4, 7, 9]
    };
  }
  
  // Build transition matrix from pendulum motion
  buildTransitionMatrix(pendulum) {
    const motion = this.quantizeMotion(pendulum);
    
    if (this.lastMotion !== undefined) {
      if (!this.noteTransitions[this.lastMotion]) {
        this.noteTransitions[this.lastMotion] = {};
      }
      
      if (!this.noteTransitions[this.lastMotion][motion]) {
        this.noteTransitions[this.lastMotion][motion] = 0;
      }
      
      this.noteTransitions[this.lastMotion][motion]++;
    }
    
    this.lastMotion = motion;
  }
  
  quantizeMotion(pendulum) {
    // Quantize motion into discrete states
    const angle1 = Math.floor(pendulum.arm1.angle / (Math.PI / 4)); // 8 states
    const angle2 = Math.floor(pendulum.arm2.angle / (Math.PI / 4)); // 8 states
    return angle1 * 8 + angle2; // 64 possible states
  }
  
  // Generate next note based on current state
  generateNextNote(currentState, scale = 'major') {
    const transitions = this.noteTransitions[currentState];
    if (!transitions) return this.currentNote;
    
    // Choose next state probabilistically
    const nextState = this.weightedChoice(transitions);
    
    // Map state to musical note
    const scaleNotes = this.scales[scale];
    const noteIndex = nextState % scaleNotes.length;
    const octave = Math.floor(nextState / scaleNotes.length);
    
    this.currentNote = 60 + octave * 12 + scaleNotes[noteIndex]; // MIDI note
    return this.midiToFrequency(this.currentNote);
  }
  
  weightedChoice(weights) {
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * total;
    
    for (const [state, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) return parseInt(state);
    }
    
    return Object.keys(weights)[0]; // Fallback
  }
  
  midiToFrequency(midiNote) {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
  }
}

// 9. Cellular Automata Rhythm Generator
class CellularRhythmMapper {
  constructor(width = 32) {
    this.width = width;
    this.cells = new Array(width).fill(0);
    this.rules = {
      rule30: [0, 1, 1, 1, 1, 0, 0, 0], // Chaotic rule
      rule110: [0, 1, 1, 0, 1, 1, 1, 0], // Complex rule
      rule90: [0, 1, 0, 1, 1, 0, 1, 0]   // Sierpinski triangle
    };
  }
  
  // Seed cellular automaton with pendulum state
  seedFromPendulum(pendulum) {
    for (let i = 0; i < this.width; i++) {
      const x = map(i, 0, this.width - 1, 0, width);
      const distance = Math.abs(x - pendulum.arm2.position.x);
      this.cells[i] = distance < 50 ? 1 : 0;
    }
  }
  
  // Evolve automaton and extract rhythm
  evolveAndExtractRhythm(rule = 'rule30') {
    this.evolve(this.rules[rule]);
    return this.extractRhythm();
  }
  
  evolve(rule) {
    const newCells = new Array(this.width);
    
    for (let i = 0; i < this.width; i++) {
      const left = this.cells[(i - 1 + this.width) % this.width];
      const center = this.cells[i];
      const right = this.cells[(i + 1) % this.width];
      
      const index = left * 4 + center * 2 + right;
      newCells[i] = rule[index];
    }
    
    this.cells = newCells;
  }
  
  extractRhythm() {
    return this.cells.map(cell => cell === 1);
  }
}

// ========== USAGE EXAMPLES ==========

/*
// Example usage in main sketch:

let frequencyMapper;
let fmMapper;
let spatialMapper;
let rhythmMapper;
let melodyMapper;

function setup() {
  createCanvas(800, 600);
  
  // Initialize custom mappers
  frequencyMapper = new MusicalFrequencyMapper(220); // A3
  fmMapper = new AdvancedFMMapper();
  spatialMapper = new SpatialAudioMapper();
  rhythmMapper = new PolyrhythmMapper();
  melodyMapper = new MarkovMelodyMapper();
}

function createCustomPendulum() {
  const pendulum = new Pendulum(
    width / 2, height / 2,
    100, 120,
    random(10, 30), random(10, 30),
    random(0, TWO_PI), random(0, TWO_PI),
    color(random(100, 255), random(0, 100), random(100, 255)),
    color(random(100, 255), random(0, 100), random(100, 255)),
    1.0
  );
  
  // Apply custom sound mapping
  applyCustomSoundMapping(pendulum);
  
  return pendulum;
}

function applyCustomSoundMapping(pendulum) {
  // Use musical frequency mapping
  const freq1 = frequencyMapper.massToPentatonicFreq(pendulum.arm1.mass);
  const freq2 = frequencyMapper.massToPentatonicFreq(pendulum.arm2.mass);
  
  // Apply advanced FM synthesis
  const fmParams1 = fmMapper.velocityToFM(pendulum.arm1.aVelocity);
  const fmParams2 = fmMapper.velocityToFM(pendulum.arm2.aVelocity);
  
  // Update synthesizer parameters
  pendulum.synth1.frequency.setValueAtTime(freq1, Tone.now());
  pendulum.synth2.frequency.setValueAtTime(freq2, Tone.now());
  
  pendulum.synth1.harmonicity.setValueAtTime(fmParams1.harmonicity, Tone.now());
  pendulum.synth1.modulationIndex.setValueAtTime(fmParams1.modulationIndex, Tone.now());
  
  // Apply spatial positioning
  const spatialPos = spatialMapper.positionTo3D(pendulum);
  // ... apply to 3D audio system
  
  // Generate rhythmic triggers
  melodyMapper.buildTransitionMatrix(pendulum);
  const nextNote = melodyMapper.generateNextNote(
    melodyMapper.quantizeMotion(pendulum),
    'pentatonic'
  );
}

function draw() {
  background(20);
  
  // Update all pendulums with custom mappings
  pendulums.forEach(pendulum => {
    pendulum.update();
    pendulum.display();
    
    // Apply continuous custom mappings
    applyCustomSoundMapping(pendulum);
  });
  
  // Generate polyrhythmic patterns
  if (frameCount % 60 === 0) { // Once per second
    const polyrhythm = rhythmMapper.generatePolyrhythm(pendulums);
    console.log('Polyrhythm pattern:', polyrhythm);
  }
}

// Add pendulum with specific custom mapping
function keyPressed() {
  if (key === 'c') {
    pendulums.push(createCustomPendulum());
  }
}
*/