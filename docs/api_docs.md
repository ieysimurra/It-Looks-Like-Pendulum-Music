# 🔧 API Reference

This document provides a comprehensive reference for the Interactive Musical Pendulums API, including all classes, methods, and configuration options.

## 📋 Table of Contents

1. [Core Classes](#core-classes)
2. [Physics Engine](#physics-engine)
3. [Audio Engine](#audio-engine)
4. [UI Controllers](#ui-controllers)
5. [Recording System](#recording-system)
6. [Utility Functions](#utility-functions)
7. [Configuration](#configuration)
8. [Events](#events)

---

## 🎯 Core Classes

### Pendulum Class

The main pendulum object that combines physics simulation with audio synthesis.

```javascript
class Pendulum {
  constructor(x, y, length1, length2, mass1, mass2, angle1, angle2, col1, col2, gravity)
}
```

#### Constructor Parameters

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `x` | Number | 0 - canvas.width | X coordinate of anchor point |
| `y` | Number | 0 - canvas.height | Y coordinate of anchor point |
| `length1` | Number | 50 - 400 | Length of first arm in pixels |
| `length2` | Number | 50 - 400 | Length of second arm in pixels |
| `mass1` | Number | 5 - 50 | Mass of first bob |
| `mass2` | Number | 5 - 50 | Mass of second bob |
| `angle1` | Number | 0 - 2π | Initial angle of first arm (radians) |
| `angle2` | Number | 0 - 2π | Initial angle of second arm (radians) |
| `col1` | p5.Color | - | Color of first bob |
| `col2` | p5.Color | - | Color of second bob |
| `gravity` | Number | -10 - 10 | Gravitational acceleration |

#### Methods

```javascript
// Update physics and audio
pendulum.update()

// Render the pendulum
pendulum.display()

// Remove pendulum and cleanup audio
pendulum.remove()

// Get current state
pendulum.getState()

// Set audio parameters
pendulum.setAudioParams(params)
```

#### Properties

```javascript
pendulum.arm1          // First arm object
pendulum.arm2          // Second arm object
pendulum.synth1        // Audio synthesizer for arm 1
pendulum.synth2        // Audio synthesizer for arm 2
pendulum.isActive      // Boolean indicating if pendulum is active
pendulum.startTime     // Creation timestamp
```

#### Example Usage

```javascript
// Create a new pendulum
const pendulum = new Pendulum(
  width/2, height/2,    // Center position
  100, 100,             // Arm lengths
  15, 15,               // Masses
  PI/4, PI/4,           // Initial angles (45 degrees)
  color(255, 0, 127),   // Colors
  color(127, 0, 255),
  1.0                   // Gravity
);

// Add to pendulum array
pendulums.push(pendulum);
```

---

### Arm Class

Represents a single pendulum arm with physics simulation.

```javascript
class Arm {
  constructor(x, y, length, mass, angle, col, gravity)
}
```

#### Constructor Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `x, y` | Number | Origin coordinates |
| `length` | Number | Arm length |
| `mass` | Number | Bob mass |
| `angle` | Number | Initial angle |
| `col` | p5.Color | Bob color |
| `gravity` | Number | Gravitational force |

#### Methods

```javascript
// Update physics simulation
arm.update()

// Render arm and bob
arm.display()

// Get position vector
arm.getPosition()

// Set new origin point
arm.setOrigin(x, y)
```

#### Properties

```javascript
arm.origin         // Vector - Origin point
arm.position       // Vector - Current position
arm.angle          // Number - Current angle
arm.aVelocity      // Number - Angular velocity
arm.aAcceleration  // Number - Angular acceleration
arm.trace          // Array - Position history for trails
```

---

## ⚛️ Physics Engine

### Physics Configuration

```javascript
const PHYSICS_CONFIG = {
  damping: 0.99,           // Energy loss factor
  maxTraceLength: 200,     // Maximum trail points
  timeStep: 1/60,          // Simulation time step
  integrationMethod: 'euler', // Integration method
  minVelocity: 0.01,       // Threshold for pendulum removal
  maxLifetime: 10000       // Maximum pendulum lifetime (ms)
};
```

### Physics Utility Functions

```javascript
// Calculate angular acceleration for coupled pendulums
function calculateCoupledAcceleration(arm1, arm2, gravity) {
  // Complex double pendulum equations
  return {
    accel1: /* formula */,
    accel2: /* formula */
  };
}

// Apply Runge-Kutta integration
function rungeKuttaStep(arm, dt) {
  // Fourth-order Runge-Kutta integration
}

// Check for chaotic behavior
function isChaoticMotion(arm1, arm2) {
  // Analyze motion patterns
  return boolean;
}
```

### Physics Constants

```javascript
const PHYSICS_CONSTANTS = {
  G: 9.81,                    // Standard gravity
  AIR_RESISTANCE: 0.001,      // Air resistance coefficient
  COUPLING_STRENGTH: 1.0,     // Inter-arm coupling
  ENERGY_THRESHOLD: 0.001,    // Minimum energy for motion
  MAX_ANGULAR_VELOCITY: 10.0  // Velocity clamp
};
```

---

## 🎵 Audio Engine

### Audio Configuration

```javascript
const AUDIO_CONFIG = {
  sampleRate: 44100,
  bufferSize: 512,
  masterVolume: 0.8,
  synthType: 'FMSynth',
  effectsChain: ['delay', 'panner'],
  spatialAudio: true
};
```

### AudioEngine Class

```javascript
class AudioEngine {
  constructor(config = AUDIO_CONFIG)
  
  // Initialize audio context and master chain
  init()
  
  // Create synthesizer for pendulum
  createSynth(type = 'FMSynth')
  
  // Update audio parameters
  updateParameters(pendulum, params)
  
  // Cleanup audio resources
  dispose()
}
```

### Sound Mapping Functions

```javascript
// Map mass to frequency
function massToFrequency(mass, range = [200, 1000]) {
  return map(mass, 5, 50, range[0], range[1]);
}

// Map position to stereo panning
function positionToPanning(x, canvasWidth) {
  return map(constrain(x, 0, canvasWidth), 0, canvasWidth, -1, 1);
}

// Map color to harmonicity
function colorToHarmonicity(colorValue, range = [0.5, 20]) {
  return map(colorValue, 0, 255, range[0], range[1]);
}

// Map velocity to modulation depth
function velocityToModulation(velocity, range = [0, 10]) {
  return map(Math.abs(velocity), 0, 1, range[0], range[1]);
}
```

### Audio Effects

```javascript
// Available audio effects
const AUDIO_EFFECTS = {
  delay: {
    type: 'FeedbackDelay',
    params: { delayTime: 0.15, feedback: 0.4, wet: 0.65 }
  },
  reverb: {
    type: 'Reverb',
    params: { roomSize: 0.8, dampening: 0.5, wet: 0.3 }
  },
  distortion: {
    type: 'Distortion',
    params: { distortion: 0.4, wet: 0.2 }
  },
  filter: {
    type: 'Filter',
    params: { frequency: 1000, type: 'lowpass', rolloff: -12 }
  }
};
```

---

## 🖥️ UI Controllers

### ControlsManager Class

```javascript
class ControlsManager {
  constructor(pendulumManager)
  
  // Initialize all UI controls
  init()
  
  // Update slider values
  updateSliders(pendulum)
  
  // Handle slider input events
  onSliderChange(event)
  
  // Show/hide controls
  toggleControls()
  
  // Get current control values
  getCurrentValues()
}
```

### Control Configuration

```javascript
const CONTROL_CONFIG = {
  sliders: {
    angle1: { min: 0, max: TWO_PI, step: 0.01, default: PI/4 },
    angle2: { min: 0, max: TWO_PI, step: 0.01, default: PI/4 },
    length1: { min: 50, max: 400, step: 1, default: 100 },
    length2: { min: 50, max: 400, step: 1, default: 100 },
    mass1: { min: 5, max: 50, step: 0.1, default: 15 },
    mass2: { min: 5, max: 50, step: 0.1, default: 15 },
    gravity: { min: -10, max: 10, step: 0.1, default: 1.0 },
    amplitude: { min: 0.01, max: 1, step: 0.01, default: 0.5 }
  },
  colorSliders: {
    r1: { min: 1, max: 255, step: 1, default: 127 },
    g1: { min: 1, max: 255, step: 1, default: 0 },
    b1: { min: 1, max: 255, step: 1, default: 127 },
    r2: { min: 1, max: 255, step: 1, default: 127 },
    g2: { min: 1, max: 255, step: 1, default: 0 },
    b2: { min: 1, max: 255, step: 1, default: 255 }
  }
};
```

### Action Handlers

```javascript
// Action button handlers
const ACTIONS = {
  addPendulum: () => pendulumManager.add(),
  removePendulum: () => pendulumManager.remove(),
  zoomIn: () => viewport.zoomIn(),
  zoomOut: () => viewport.zoomOut(),
  reset: () => pendulumManager.reset(),
  toggleControls: () => ui.toggleControls(),
  startVideoRecord: () => recorder.startVideo(),
  startAudioRecord: () => recorder.startAudio(),
  showInstructions: () => ui.showModal('instructions')
};
```

---

## 📹 Recording System

### Recorder Class

```javascript
class Recorder {
  constructor(canvas, audioContext)
  
  // Start video recording
  startVideo(options = {})
  
  // Start audio recording
  startAudio(options = {})
  
  // Stop current recording
  stop()
  
  // Get recording status
  getStatus()
  
  // Configure recording settings
  setConfig(config)
}
```

### Recording Configuration

```javascript
const RECORDING_CONFIG = {
  video: {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 2500000,
    audioBitsPerSecond: 128000,
    frameRate: 30
  },
  audio: {
    mimeType: 'audio/webm;codecs=opus',
    audioBitsPerSecond: 128000,
    sampleRate: 44100
  },
  maxDuration: 300000, // 5 minutes
  autoDownload: true
};
```

### Recording Events

```javascript
// Recording event handlers
recorder.onStart = (type) => {
  console.log(`Started ${type} recording`);
  updateUI('recording', true);
};

recorder.onStop = (type, blob) => {
  console.log(`Stopped ${type} recording`);
  downloadBlob(blob, `pendulum_${type}_${Date.now()}.webm`);
  updateUI('recording', false);
};

recorder.onError = (error) => {
  console.error('Recording error:', error);
  showErrorMessage('Recording failed: ' + error.message);
};
```

---

## 🛠️ Utility Functions

### Mathematical Utilities

```javascript
// Angle normalization
function normalizeAngle(angle) {
  return ((angle % TWO_PI) + TWO_PI) % TWO_PI;
}

// Vector operations
function addVectors(v1, v2) {
  return createVector(v1.x + v2.x, v1.y + v2.y);
}

function vectorMagnitude(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// Interpolation
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
```

### Color Utilities

```javascript
// Color space conversions
function rgbToHsl(r, g, b) {
  // RGB to HSL conversion
}

function hslToRgb(h, s, l) {
  // HSL to RGB conversion
}

// Color interpolation
function lerpColor(c1, c2, factor) {
  return color(
    lerp(red(c1), red(c2), factor),
    lerp(green(c1), green(c2), factor),
    lerp(blue(c1), blue(c2), factor)
  );
}
```

### Performance Utilities

```javascript
// FPS monitoring
class FPSMonitor {
  constructor() {
    this.frames = 0;
    this.lastTime = performance.now();
    this.fps = 0;
  }
  
  update() {
    this.frames++;
    const currentTime = performance.now();
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.frames = 0;
      this.lastTime = currentTime;
    }
  }
  
  getFPS() {
    return this.fps;
  }
}

// Memory monitoring
function getMemoryUsage() {
  if (performance.memory) {
    return {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576),
      total: Math.round(performance.memory.totalJSHeapSize / 1048576),
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
    };
  }
  return null;
}
```

---

## ⚙️ Configuration

### Global Configuration Object

```javascript
const CONFIG = {
  // Application settings
  app: {
    name: 'Interactive Musical Pendulums',
    version: '1.0.0',
    maxPendulums: 5,
    canvasSize: { width: 'auto', height: 'auto' },
    backgroundColor: '#5C5C5C',
    language: 'en' // 'en' or 'pt'
  },
  
  // Physics settings
  physics: PHYSICS_CONFIG,
  
  // Audio settings
  audio: AUDIO_CONFIG,
  
  // UI settings
  ui: {
    controlsVisible: true,
    statusBarVisible: true,
    theme: 'auto', // 'light', 'dark', 'auto'
    animations: true,
    tooltips: true
  },
  
  // Recording settings
  recording: RECORDING_CONFIG,
  
  // Performance settings
  performance: {
    maxFPS: 60,
    enableGPU: true,
    lowPowerMode: false,
    qualityScale: 1.0
  },
  
  // Debug settings
  debug: {
    showFPS: false,
    showMemory: false,
    logAudio: false,
    logPhysics: false
  }
};
```

### Configuration Methods

```javascript
// Load configuration
function loadConfig(configObject) {
  Object.assign(CONFIG, configObject);
  applyConfig();
}

// Save configuration
function saveConfig() {
  localStorage.setItem('pendulum-config', JSON.stringify(CONFIG));
}

// Reset to defaults
function resetConfig() {
  loadConfig(DEFAULT_CONFIG);
}

// Get configuration value
function getConfig(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], CONFIG);
}

// Set configuration value
function setConfig(path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((obj, key) => obj[key] = obj[key] || {}, CONFIG);
  target[lastKey] = value;
}
```

---

## 📡 Events

### Event System

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}
```

### Available Events

```javascript
// Application events
app.on('init', () => console.log('App initialized'));
app.on('ready', () => console.log('App ready'));
app.on('error', (error) => console.error('App error:', error));

// Pendulum events
pendulumManager.on('pendulum:added', (pendulum) => {
  console.log('Pendulum added:', pendulum.id);
});

pendulumManager.on('pendulum:removed', (pendulum) => {
  console.log('Pendulum removed:', pendulum.id);
});

pendulumManager.on('pendulum:collision', (pendulum1, pendulum2) => {
  console.log('Pendulum collision detected');
});

// Audio events
audioEngine.on('context:suspended', () => {
  showMessage('Audio suspended - click to resume');
});

audioEngine.on('context:resumed', () => {
  hideMessage('audio-suspended');
});

// Recording events
recorder.on('recording:started', (type) => {
  updateRecordingUI(type, true);
});

recorder.on('recording:stopped', (type, blob) => {
  updateRecordingUI(type, false);
  downloadBlob(blob);
});

// UI events
ui.on('controls:hidden', () => {
  adjustCanvasSize();
});

ui.on('controls:shown', () => {
  adjustCanvasSize();
});
```

### Custom Event Examples

```javascript
// Create custom events for specific features
function createPendulumEvents(pendulum) {
  // Emit chaos detection
  if (pendulum.isChaoticMotion()) {
    app.emit('chaos:detected', {
      pendulum: pendulum,
      timestamp: Date.now()
    });
  }
  
  // Emit harmonic resonance
  if (pendulum.hasHarmonicResonance()) {
    app.emit('harmony:detected', {
      pendulum: pendulum,
      frequency: pendulum.getDominantFrequency()
    });
  }
  
  // Emit energy threshold events
  if (pendulum.getEnergy() < ENERGY_THRESHOLD) {
    app.emit('energy:low', { pendulum: pendulum });
  }
}
```

---

## 🔌 Plugin System (Future)

### Plugin Interface

```javascript
class PendulumPlugin {
  constructor(name, version) {
    this.name = name;
    this.version = version;
    this.enabled = false;
  }
  
  // Called when plugin is loaded
  init(app) {
    this.app = app;
  }
  
  // Called on every frame
  update(deltaTime) {
    // Override in child classes
  }
  
  // Called when pendulum is created
  onPendulumCreated(pendulum) {
    // Override in child classes
  }
  
  // Called when plugin is enabled
  enable() {
    this.enabled = true;
  }
  
  // Called when plugin is disabled
  disable() {
    this.enabled = false;
  }
  
  // Plugin cleanup
  destroy() {
    this.disable();
  }
}
```

### Example Plugin

```javascript
class GravityWavePlugin extends PendulumPlugin {
  constructor() {
    super('GravityWave', '1.0.0');
    this.wavePhase = 0;
  }
  
  update(deltaTime) {
    if (!this.enabled) return;
    
    // Create gravity waves
    this.wavePhase += deltaTime * 0.001;
    const gravityModulation = Math.sin(this.wavePhase) * 0.5;
    
    // Apply to all pendulums
    pendulums.forEach(pendulum => {
      pendulum.arm1.gravity += gravityModulation;
      pendulum.arm2.gravity += gravityModulation;
    });
  }
}
```

---

## 📊 Data Export/Import

### Export Functions

```javascript
// Export pendulum state
function exportPendulumState(pendulum) {
  return {
    id: pendulum.id,
    position: { x: pendulum.x, y: pendulum.y },
    arm1: exportArmState(pendulum.arm1),
    arm2: exportArmState(pendulum.arm2),
    audio: exportAudioState(pendulum),
    timestamp: Date.now()
  };
}

// Export complete scene
function exportScene() {
  return {
    version: CONFIG.app.version,
    timestamp: Date.now(),
    config: CONFIG,
    pendulums: pendulums.map(exportPendulumState),
    viewport: {
      zoom: zoom,
      offset: { x: offsetX, y: offsetY }
    }
  };
}
```

### Import Functions

```javascript
// Import scene
function importScene(sceneData) {
  // Validate scene data
  if (!validateSceneData(sceneData)) {
    throw new Error('Invalid scene data');
  }
  
  // Clear current scene
  resetScene();
  
  // Apply configuration
  loadConfig(sceneData.config);
  
  // Recreate pendulums
  sceneData.pendulums.forEach(pendulumData => {
    const pendulum = createPendulumFromData(pendulumData);
    pendulums.push(pendulum);
  });
  
  // Restore viewport
  zoom = sceneData.viewport.zoom;
  offsetX = sceneData.viewport.offset.x;
  offsetY = sceneData.viewport.offset.y;
}
```

---

This API documentation provides a comprehensive reference for developers who want to extend or modify the Interactive Musical Pendulums application. For more specific implementation details, please refer to the source code and technical documentation.