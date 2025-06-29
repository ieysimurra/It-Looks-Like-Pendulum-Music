/**
 * Advanced Configuration Examples for Interactive Musical Pendulums
 * 
 * This file demonstrates advanced techniques, complex configurations,
 * and experimental features for power users and developers.
 */

// Advanced Pendulum Manager with sophisticated algorithms
class AdvancedPendulumManager {
  constructor() {
    this.pendulums = [];
    this.maxPendulums = 8;
    this.evolutionRate = 0.001;
    this.couplingStrength = 0.05;
    this.energyThreshold = 0.01;
    this.autoRemoval = true;
    this.harmonicAnalysis = true;
  }
  
  // Add pendulum with automatic harmonic spacing
  addHarmonicPendulum(fundamental = 220) {
    const harmonicRatios = [1, 1.125, 1.25, 1.333, 1.5, 1.667, 1.875, 2.0];
    const ratio = random(harmonicRatios);
    const targetFreq = fundamental * ratio;
    
    // Calculate mass for target frequency
    const mass = this.frequencyToMass(targetFreq);
    
    const pendulum = new Pendulum(
      random(width * 0.2, width * 0.8),
      random(height * 0.2, height * 0.6),
      random(80, 120),
      random(80, 120),
      mass,
      mass * random(0.8, 1.2),
      random(PI / 6, PI / 3),
      random(PI / 6, PI / 3),
      this.generateHarmonicColor(ratio),
      this.generateHarmonicColor(ratio * 1.1),
      1.0
    );
    
    this.addPendulum(pendulum);
    return pendulum;
  }
  
  // Convert frequency to mass (inverse of mass-to-frequency mapping)
  frequencyToMass(frequency) {
    // Inverse of: freq = map(mass, 5, 50, 200, 1000)
    return map(frequency, 200, 1000, 50, 5);
  }
  
  // Generate color based on harmonic ratio
  generateHarmonicColor(ratio) {
    const hue = map(ratio, 1, 2, 0, 360);
    return color(`hsl(${hue}, 70%, 60%)`);
  }
  
  // Apply coupling forces between nearby pendulums
  applyCoupling() {
    for (let i = 0; i < this.pendulums.length; i++) {
      for (let j = i + 1; j < this.pendulums.length; j++) {
        this.couplePendulums(this.pendulums[i], this.pendulums[j]);
      }
    }
  }
  
  couplePendulums(p1, p2) {
    const distance = dist(p1.x, p1.y, p2.x, p2.y);
    const maxCouplingDistance = 200;
    
    if (distance < maxCouplingDistance) {
      const strength = this.couplingStrength * (1 - distance / maxCouplingDistance);
      
      // Angle coupling
      const angleDiff1 = p1.arm1.angle - p2.arm1.angle;
      const angleDiff2 = p1.arm2.angle - p2.arm2.angle;
      
      p1.arm1.aAcceleration += strength * sin(angleDiff1);
      p1.arm2.aAcceleration += strength * sin(angleDiff2);
      p2.arm1.aAcceleration -= strength * sin(angleDiff1);
      p2.arm2.aAcceleration -= strength * sin(angleDiff2);
    }
  }
  
  // Evolutionary algorithm for pendulum parameters
  evolvePendulums() {
    this.pendulums.forEach(pendulum => {
      if (random() < this.evolutionRate) {
        this.mutatePendulum(pendulum);
      }
    });
  }
  
  mutatePendulum(pendulum) {
    const mutations = [
      () => pendulum.arm1.length += random(-2, 2),
      () => pendulum.arm2.length += random(-2, 2),
      () => pendulum.arm1.mass += random(-0.5, 0.5),
      () => pendulum.arm2.mass += random(-0.5, 0.5),
      () => pendulum.gravity += random(-0.1, 0.1)
    ];
    
    // Apply random mutation
    random(mutations)();
    
    // Constrain values to valid ranges
    pendulum.arm1.length = constrain(pendulum.arm1.length, 50, 200);
    pendulum.arm2.length = constrain(pendulum.arm2.length, 50, 200);
    pendulum.arm1.mass = constrain(pendulum.arm1.mass, 5, 50);
    pendulum.arm2.mass = constrain(pendulum.arm2.mass, 5, 50);
    pendulum.gravity = constrain(pendulum.gravity, -5, 5);
  }
  
  // Analyze harmonic content of current ensemble
  analyzeHarmonics() {
    const frequencies = this.pendulums.map(p => {
      return map(p.arm1.mass, 5, 50, 200, 1000);
    });
    
    return {
      fundamental: Math.min(...frequencies),
      intervals: this.calculateIntervals(frequencies),
      dissonance: this.calculateDissonance(frequencies),
      complexity: frequencies.length
    };
  }
  
  calculateIntervals(frequencies) {
    const fundamental = Math.min(...frequencies);
    return frequencies.map(f => f / fundamental);
  }
  
  calculateDissonance(frequencies) {
    let dissonance = 0;
    for (let i = 0; i < frequencies.length; i++) {
      for (let j = i + 1; j < frequencies.length; j++) {
        const ratio = frequencies[i] / frequencies[j];
        // Simple dissonance measure based on ratio complexity
        dissonance += Math.abs(ratio - Math.round(ratio));
      }
    }
    return dissonance / (frequencies.length * (frequencies.length - 1) / 2);
  }
}

// Advanced Audio Engine with custom synthesis
class AdvancedAudioEngine {
  constructor() {
    this.masterVolume = new Tone.Volume(-12).toDestination();
    this.compressor = new Tone.Compressor(-30, 3).connect(this.masterVolume);
    this.reverb = new Tone.Reverb(2).connect(this.compressor);
    this.delay = new Tone.FeedbackDelay(0.25, 0.3).connect(this.reverb);
    
    this.spatializer = new SpatialAudioProcessor();
    this.harmonicAnalyzer = new HarmonicAnalyzer();
    this.adaptiveFilter = new AdaptiveFilter();
  }
  
  createAdvancedSynth(pendulum) {
    // Use different synthesis methods based on pendulum characteristics
    const energy = this.calculatePendulumEnergy(pendulum);
    const complexity = this.calculateMotionComplexity(pendulum);
    
    let synth;
    if (energy > 0.8 && complexity > 0.7) {
      // High energy, complex motion -> FM synthesis
      synth = new Tone.FMSynth({
        harmonicity: 3,
        modulationIndex: 10,
        modulation: { type: 'square' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 1.2 }
      });
    } else if (complexity > 0.5) {
      // Complex motion -> AM synthesis
      synth = new Tone.AMSynth({
        harmonicity: 2,
        detune: 0,
        oscillator: { type: 'sine' },
        modulation: { type: 'triangle' },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 0.8 }
      });
    } else {
      // Simple motion -> basic oscillator
      synth = new Tone.Oscillator({
        type: 'sine',
        frequency: 440
      });
    }
    
    // Add adaptive effects chain
    const effects = this.createEffectsChain(pendulum);
    synth.chain(...effects, this.delay);
    
    return synth;
  }
  
  createEffectsChain(pendulum) {
    const effects = [];
    
    // Adaptive filter based on velocity
    const filter = new Tone.Filter({
      frequency: 1000,
      type: 'lowpass',
      rolloff: -24
    });
    effects.push(filter);
    
    // Chorus for complex motion
    if (this.calculateMotionComplexity(pendulum) > 0.6) {
      const chorus = new Tone.Chorus(4, 2.5, 0.5);
      effects.push(chorus);
    }
    
    // Distortion for high energy
    if (this.calculatePendulumEnergy(pendulum) > 0.7) {
      const distortion = new Tone.Distortion(0.4);
      effects.push(distortion);
    }
    
    return effects;
  }
  
  calculatePendulumEnergy(pendulum) {
    const ke1 = 0.5 * pendulum.arm1.mass * Math.pow(pendulum.arm1.aVelocity, 2);
    const ke2 = 0.5 * pendulum.arm2.mass * Math.pow(pendulum.arm2.aVelocity, 2);
    const pe1 = pendulum.arm1.mass * pendulum.gravity * pendulum.arm1.length * (1 - Math.cos(pendulum.arm1.angle));
    const pe2 = pendulum.arm2.mass * pendulum.gravity * pendulum.arm2.length * (1 - Math.cos(pendulum.arm2.angle));
    
    return (ke1 + ke2 + pe1 + pe2) / 100; // Normalized
  }
  
  calculateMotionComplexity(pendulum) {
    // Measure complexity using velocity variance
    const velocities = [pendulum.arm1.aVelocity, pendulum.arm2.aVelocity];
    const mean = velocities.reduce((a, b) => a + b) / velocities.length;
    const variance = velocities.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / velocities.length;
    
    return Math.min(variance / 0.1, 1); // Normalized to 0-1
  }
}

// Spatial Audio Processor for 3D positioning
class SpatialAudioProcessor {
  constructor() {
    this.listener = Tone.context.listener;
    this.panners = new Map();
  }
  
  createSpatialSynth(pendulum) {
    const panner = new Tone.Panner3D({
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      orientationX: 0,
      orientationY: 0,
      orientationZ: -1
    }).toDestination();
    
    this.panners.set(pendulum.id, panner);
    return panner;
  }
  
  updatePosition(pendulum) {
    const panner = this.panners.get(pendulum.id);
    if (panner) {
      // Map 2D position to 3D space
      const x = map(pendulum.arm2.position.x, 0, width, -10, 10);
      const y = map(pendulum.arm2.position.y, 0, height, 10, -10);
      const z = map(pendulum.arm2.aVelocity, -1, 1, -5, 5);
      
      panner.positionX.setValueAtTime(x, Tone.now());
      panner.positionY.setValueAtTime(y, Tone.now());
      panner.positionZ.setValueAtTime(z, Tone.now());
    }
  }
}

// Harmonic Analysis Engine
class HarmonicAnalyzer {
  constructor() {
    this.analyzer = new Tone.Analyser('fft', 1024);
    this.harmonicBuffer = [];
  }
  
  analyzeSpectrum() {
    const spectrum = this.analyzer.getValue();
    return this.extractHarmonics(spectrum);
  }
  
  extractHarmonics(spectrum) {
    const peaks = this.findPeaks(spectrum);
    const fundamentalIdx = peaks[0];
    const harmonics = [];
    
    for (let i = 2; i <= 8; i++) {
      const harmonicIdx = fundamentalIdx * i;
      if (harmonicIdx < spectrum.length) {
        harmonics.push({
          frequency: this.binToFrequency(harmonicIdx),
          amplitude: spectrum[harmonicIdx]
        });
      }
    }
    
    return harmonics;
  }
  
  findPeaks(spectrum) {
    const peaks = [];
    for (let i = 1; i < spectrum.length - 1; i++) {
      if (spectrum[i] > spectrum[i - 1] && spectrum[i] > spectrum[i + 1]) {
        peaks.push(i);
      }
    }
    return peaks.sort((a, b) => spectrum[b] - spectrum[a]);
  }
  
  binToFrequency(bin) {
    return (bin * Tone.context.sampleRate) / (2 * 1024);
  }
}

// Adaptive Filter System
class AdaptiveFilter {
  constructor() {
    this.filter = new Tone.Filter(1000, 'lowpass');
    this.targetFrequency = 1000;
    this.smoothingFactor = 0.1;
  }
  
  adaptToMotion(pendulum) {
    // Adapt filter based on pendulum motion characteristics
    const velocity = Math.abs(pendulum.arm1.aVelocity) + Math.abs(pendulum.arm2.aVelocity);
    const energy = this.calculateEnergy(pendulum);
    
    // Higher velocity/energy -> higher cutoff frequency
    this.targetFrequency = map(velocity + energy, 0, 2, 200, 5000);
    
    // Smooth the transition
    const currentFreq = this.filter.frequency.value;
    const newFreq = lerp(currentFreq, this.targetFrequency, this.smoothingFactor);
    
    this.filter.frequency.rampTo(newFreq, 0.1);
  }
  
  calculateEnergy(pendulum) {
    // Simplified energy calculation
    return Math.abs(pendulum.arm1.aVelocity * pendulum.arm1.length) +
           Math.abs(pendulum.arm2.aVelocity * pendulum.arm2.length);
  }
}

// Performance Optimization Manager
class PerformanceManager {
  constructor() {
    this.frameTime = 16.67; // Target 60 FPS
    this.adaptiveQuality = true;
    this.qualityLevel = 1.0;
    this.performanceHistory = [];
  }
  
  measurePerformance() {
    const now = performance.now();
    if (this.lastFrameTime) {
      const frameTime = now - this.lastFrameTime;
      this.performanceHistory.push(frameTime);
      
      if (this.performanceHistory.length > 60) {
        this.performanceHistory.shift();
      }
      
      this.adjustQuality();
    }
    this.lastFrameTime = now;
  }
  
  adjustQuality() {
    if (!this.adaptiveQuality) return;
    
    const avgFrameTime = this.performanceHistory.reduce((a, b) => a + b, 0) / this.performanceHistory.length;
    
    if (avgFrameTime > this.frameTime * 1.5) {
      // Performance is poor, reduce quality
      this.qualityLevel = Math.max(0.5, this.qualityLevel - 0.1);
    } else if (avgFrameTime < this.frameTime * 0.8) {
      // Performance is good, increase quality
      this.qualityLevel = Math.min(1.0, this.qualityLevel + 0.05);
    }
    
    this.applyQualitySettings();
  }
  
  applyQualitySettings() {
    // Adjust trail length based on quality
    const maxTraceLength = Math.floor(200 * this.qualityLevel);
    
    // Adjust audio buffer size
    const bufferSize = Math.floor(512 / this.qualityLevel);
    
    // Apply settings to all pendulums
    pendulums.forEach(pendulum => {
      pendulum.arm1.maxTraceLength = maxTraceLength;
      pendulum.arm2.maxTraceLength = maxTraceLength;
    });
  }
}

// Experimental Features
class ExperimentalFeatures {
  constructor() {
    this.gravityWaves = false;
    this.magneticFields = false;
    this.timeDistortion = false;
    this.quantumEffects = false;
  }
  
  // Gravity waves that propagate through the system
  enableGravityWaves() {
    this.gravityWaves = true;
    this.wavePhase = 0;
    this.waveAmplitude = 0.5;
    this.waveFrequency = 0.01;
  }
  
  updateGravityWaves() {
    if (!this.gravityWaves) return;
    
    this.wavePhase += this.waveFrequency;
    const gravityModulation = this.waveAmplitude * sin(this.wavePhase);
    
    pendulums.forEach(pendulum => {
      pendulum.gravity += gravityModulation;
    });
  }
  
  // Magnetic field effects between pendulums
  enableMagneticFields() {
    this.magneticFields = true;
    this.magneticStrength = 0.1;
  }
  
  applyMagneticFields() {
    if (!this.magneticFields) return;
    
    for (let i = 0; i < pendulums.length; i++) {
      for (let j = i + 1; j < pendulums.length; j++) {
        const p1 = pendulums[i];
        const p2 = pendulums[j];
        
        const distance = dist(p1.arm2.position.x, p1.arm2.position.y,
                             p2.arm2.position.x, p2.arm2.position.y);
        
        if (distance > 0) {
          const force = this.magneticStrength / (distance * distance);
          const angle = atan2(p2.arm2.position.y - p1.arm2.position.y,
                             p2.arm2.position.x - p1.arm2.position.x);
          
          // Apply attractive/repulsive force
          p1.arm2.aAcceleration += force * cos(angle);
          p2.arm2.aAcceleration -= force * cos(angle);
        }
      }
    }
  }
  
  // Time distortion effects
  enableTimeDistortion() {
    this.timeDistortion = true;
    this.timeScale = 1.0;
  }
  
  updateTimeDistortion() {
    if (!this.timeDistortion) return;
    
    // Variable time scale based on total system energy
    const totalEnergy = pendulums.reduce((sum, p) => {
      return sum + Math.abs(p.arm1.aVelocity) + Math.abs(p.arm2.aVelocity);
    }, 0);
    
    this.timeScale = map(totalEnergy, 0, 10, 0.5, 2.0);
    
    // Apply time scaling to all pendulums
    pendulums.forEach(pendulum => {
      pendulum.timeScale = this.timeScale;
    });
  }
}

// Usage Examples:

/*
let advancedManager;
let advancedAudio;
let experimental;
let performance;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize advanced systems
  advancedManager = new AdvancedPendulumManager();
  advancedAudio = new AdvancedAudioEngine();
  experimental = new ExperimentalFeatures();
  performance = new PerformanceManager();
  
  // Enable experimental features
  experimental.enableGravityWaves();
  experimental.enableTimeDistortion();
  
  // Create initial pendulums with harmonic relationships
  for (let i = 0; i < 4; i++) {
    advancedManager.addHarmonicPendulum(220); // A3 fundamental
  }
}

function draw() {
  performance.measurePerformance();
  
  background(20);
  
  // Update advanced systems
  advancedManager.applyCoupling();
  advancedManager.evolvePendulums();
  experimental.updateGravityWaves();
  experimental.updateTimeDistortion();
  experimental.applyMagneticFields();
  
  // Update and draw pendulums
  advancedManager.pendulums.forEach(pendulum => {
    pendulum.update();
    pendulum.display();
    advancedAudio.spatializer.updatePosition(pendulum);
  });
  
  // Display harmonic analysis
  const analysis = advancedManager.analyzeHarmonics();
  displayHarmonicAnalysis(analysis);
}

function displayHarmonicAnalysis(analysis) {
  fill(255);
  textAlign(LEFT);
  text(`Fundamental: ${analysis.fundamental.toFixed(1)} Hz`, 10, 30);
  text(`Dissonance: ${analysis.dissonance.toFixed(3)}`, 10, 50);
  text(`Complexity: ${analysis.complexity}`, 10, 70);
  
  // Draw frequency spectrum visualization
  const intervals = analysis.intervals;
  for (let i = 0; i < intervals.length; i++) {
    const x = map(i, 0, intervals.length, 10, 200);
    const h = map(intervals[i], 1, 3, 0, 50);
    fill(100, 200, 255);
    rect(x, height - 60, 15, -h);
  }
}

function keyPressed() {
  if (key === 'h') {
    advancedManager.addHarmonicPendulum(random(200, 400));
  } else if (key === 'g') {
    experimental.gravityWaves = !experimental.gravityWaves;
  } else if (key === 'm') {
    experimental.magneticFields = !experimental.magneticFields;
  } else if (key === 't') {
    experimental.timeDistortion = !experimental.timeDistortion;
  }
}
*/