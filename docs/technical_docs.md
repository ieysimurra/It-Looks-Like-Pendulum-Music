# Technical Documentation

## 🔧 Architecture Overview

The Interactive Musical Pendulums application is built using a modular architecture that separates concerns between physics simulation, audio synthesis, user interface, and data management.

### Core Components

```
Interactive Musical Pendulums
├── Physics Engine (Pendulum.js, Arm.js)
├── Audio Engine (Tone.js integration)
├── User Interface (Controls, Actions)
├── Recording System (WebRTC MediaRecorder)
├── Data Management (CSV logging)
└── Visualization (p5.js Canvas)
```

## 🎯 Physics Engine

### Double Pendulum Mathematics

The double pendulum system is governed by two coupled differential equations:

#### First Pendulum (Upper Arm)
```
θ₁'' = [M₂L₁θ₁'²sin(Δθ)cos(Δθ) + M₂gsin(θ₂)cos(Δθ) + M₂L₂θ₂'²sin(Δθ) - (M₁+M₂)gsin(θ₁)] / [L₁(M₁+M₂) - M₂L₁cos²(Δθ)]
```

#### Second Pendulum (Lower Arm)
```
θ₂'' = [-M₂L₂θ₂'²sin(Δθ)cos(Δθ) + (M₁+M₂)(gsin(θ₁)cos(Δθ) - L₁θ₁'²sin(Δθ) - gsin(θ₂))] / [L₂(M₁+M₂) - M₂L₂cos²(Δθ)]
```

Where:
- `Δθ = θ₁ - θ₂` (angle difference)
- `M₁, M₂` = masses of the pendulum bobs
- `L₁, L₂` = lengths of the pendulum arms
- `g` = gravitational acceleration
- `θ₁, θ₂` = angles from vertical
- `θ₁', θ₂'` = angular velocities
- `θ₁'', θ₂''` = angular accelerations

### Implementation Details

#### Arm Class
```javascript
class Arm {
  constructor(x, y, length, mass, angle, col, gravity) {
    this.origin = createVector(x, y);
    this.position = createVector();
    this.length = length;
    this.angle = angle;
    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.mass = mass;
    this.gravity = gravity;
    this.trace = [];
    this.col = col;
  }

  update() {
    // Simplified physics calculation
    let force = (this.gravity / this.length) * sin(this.angle);
    this.aAcceleration = -force;
    this.aVelocity += this.aAcceleration;
    this.aVelocity *= 0.99; // Damping factor
    this.angle += this.aVelocity;

    // Update position based on polar coordinates
    this.position.set(
      this.origin.x + this.length * sin(this.angle),
      this.origin.y + this.length * cos(this.angle)
    );

    // Maintain trace for visualization
    this.trace.push(this.position.copy());
    if (this.trace.length > 200) {
      this.trace.shift();
    }
  }
}
```

#### Pendulum Class
```javascript
class Pendulum {
  constructor(x, y, length1, length2, mass1, mass2, angle1, angle2, col1, col2, gravity) {
    this.arm1 = new Arm(x, y, length1, mass1, angle1, col1, gravity);
    this.arm2 = new Arm(
      this.arm1.position.x,
      this.arm1.position.y,
      length2,
      mass2,
      angle2,
      col2,
      gravity
    );
    
    // Initialize audio components
    this.initializeAudio();
  }

  update() {
    // Update physics
    this.arm1.update();
    this.arm2.origin = this.arm1.position.copy();
    this.arm2.update();

    // Update audio parameters
    this.updateSound();

    // Check removal conditions
    this.checkRemovalConditions();
  }
}
```

## 🎵 Audio Engine

### Frequency Modulation (FM) Synthesis

The application uses FM synthesis to generate complex harmonic content. Each pendulum arm controls different aspects of the sound:

#### Sound Parameter Mapping

| Physical Property | Audio Parameter | Formula |
|------------------|-----------------|---------|
| Mass | Base Frequency | `freq = map(mass, 5, 50, 200, 1000)` |
| X Position | Stereo Panning | `pan = map(x, 0, width, -1, 1)` |
| Red Slider | Harmonicity | `harmonicity = map(red, 1, 255, 1, 1000)` |
| Blue Slider | Modulation Index | `modIndex = map(blue, 1, 255, 1, 10)` |
| Amplitude Slider | Master Volume | `volume = Tone.gainToDb(amplitude)` |

#### Audio Implementation

```javascript
initializeAudio() {
  // Create FM synthesizers for each arm
  this.synth1 = new Tone.FMSynth({
    modulationIndex: 12,
    harmonicity: 1,
    modulation: { type: 'sine' },
    modulationEnvelope: {
      attack: 0.5,
      decay: 0.5,
      sustain: 0.7,
      release: 0.5
    },
    envelope: {
      attack: 0.5,
      decay: 0.5,
      sustain: 0.7,
      release: 0.5
    }
  });

  // Create audio effects chain
  this.feedbackDelay = new Tone.FeedbackDelay({
    delayTime: 0.15,
    feedback: 0.4,
    wet: 0.65
  });

  this.panner = new Tone.Panner(0).toDestination();

  // Connect audio chain
  this.synth1.chain(this.feedbackDelay, this.panner);
  
  // Start continuous tone
  this.synth1.triggerAttack('C4');
}

updateSound() {
  let amplitude = amplitudeSlider.value();
  
  // Calculate frequency based on pendulum mass
  let freq1 = map(this.arm1.mass, 5, 50, 200, 1000);
  
  // Smooth parameter updates to avoid audio artifacts
  this.synth1.frequency.rampTo(freq1, 0.1);
  this.synth1.volume.rampTo(Tone.gainToDb(amplitude), 0.1);
  
  // Update stereo positioning
  let panPosition = map(
    constrain(this.arm1.position.x, 0, width), 
    0, width, -1, 1
  );
  this.panner.pan.rampTo(panPosition, 0.1);
  
  // Update FM parameters
  let modulationFrequency = map(r1Slider.value(), 1, 255, 1, 1000);
  this.synth1.harmonicity.rampTo(modulationFrequency, 0.1);
  
  let modulationDepth = map(b1Slider.value(), 1, 255, 1, 10);
  this.synth1.modulationIndex.rampTo(modulationDepth, 0.1);
}
```

### Audio Performance Optimization

1. **Parameter Smoothing**: Use `rampTo()` to prevent audio artifacts
2. **Efficient Updates**: Update audio parameters at 60fps but with smooth interpolation
3. **Memory Management**: Properly dispose of audio nodes when pendulums are removed
4. **Context Management**: Handle audio context suspension/resumption

## 🖥️ User Interface

### Control System

The UI is built with native HTML5 controls for maximum compatibility:

#### Slider Controls
```javascript
// Real-time parameter updates
function updateSliderValue(sliderId, displayId, formatter = (x) => x) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(displayId);
  
  slider.addEventListener('input', (e) => {
    display.textContent = formatter(e.target.value);
    updatePendulumParameters();
  });
}

// Custom formatters for different parameter types
updateSliderValue('angle1', 'angle1-value', (val) => `${Math.round(val * 180 / Math.PI)}°`);
updateSliderValue('mass1', 'mass1-value', (val) => parseFloat(val).toFixed(1));
```

#### Responsive Design
```css
/* Mobile-first responsive grid */
@media (max-width: 1024px) {
  #app-container {
    grid-template-areas: 
      "header"
      "canvas"
      "status";
    grid-template-columns: 1fr;
  }
  
  #controls-panel,
  #action-panel {
    position: fixed;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }
}
```

## 📹 Recording System

### Video Recording
```javascript
function startVideoRecording() {
  // Capture canvas stream at 30 FPS
  let canvasStream = canvas.canvas.captureStream(30);
  
  // Create audio destination for Tone.js
  let dest = Tone.context.createMediaStreamDestination();
  Tone.Master.connect(dest);
  let audioStream = dest.stream;
  
  // Combine video and audio streams
  let tracks = [...canvasStream.getTracks(), ...audioStream.getTracks()];
  let combinedStream = new MediaStream(tracks);
  
  // Configure MediaRecorder
  mediaRecorder = new MediaRecorder(combinedStream, {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 2500000
  });
  
  mediaRecorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };
  
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    triggerDownload(blob, 'pendulum_recording.webm');
    chunks = [];
  };
  
  mediaRecorder.start();
}
```

### Audio-Only Recording
```javascript
function startAudioRecording() {
  let dest = Tone.context.createMediaStreamDestination();
  Tone.Master.connect(dest);
  
  audioRecorder = new MediaRecorder(dest.stream, {
    mimeType: 'audio/webm;codecs=opus',
    audioBitsPerSecond: 128000
  });
  
  // Similar event handling as video recording
}
```

## 📊 Data Management

### CSV Logging System
```javascript
let pendulumLog = [];

function logPendulumCreation(params) {
  pendulumLog.push({
    timestamp: Date.now(),
    angle1: params.angle1,
    angle2: params.angle2,
    length1: params.length1,
    length2: params.length2,
    mass1: params.mass1,
    mass2: params.mass2,
    r1: params.r1,
    b1: params.b1,
    r2: params.r2,
    b2: params.b2,
    gravity: params.gravity,
    areControlsShown: params.areControlsShown
  });
}

function exportLogData() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "timestamp,angle1,angle2,length1,length2,mass1,mass2,r1,b1,r2,b2,gravity,areControlsShown\n";
  
  pendulumLog.forEach(entry => {
    let row = Object.values(entry).join(",");
    csvContent += row + "\n";
  });
  
  let encodedUri = encodeURI(csvContent);
  triggerDownload(encodedUri, "pendulum_log.csv");
}
```

## 🎨 Visualization

### Canvas Optimization
```javascript
function optimizedDraw() {
  // Use efficient drawing techniques
  background(92); // Clear canvas
  
  // Batch transformations
  push();
  translate(offsetX, offsetY);
  scale(zoom);
  
  // Draw all pendulums in single pass
  for (let pendulum of pendulums) {
    pendulum.display();
  }
  
  pop();
  
  // Update UI elements outside transformation matrix
  displayUI();
}

// Efficient trail rendering
function drawTrail(points, color) {
  stroke(color);
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let point of points) {
    vertex(point.x, point.y);
  }
  endShape();
}
```

### Performance Monitoring
```javascript
class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 0;
  }
  
  update() {
    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      // Update FPS display
      document.getElementById('fps-counter').textContent = `FPS: ${this.fps}`;
    }
  }
  
  getMemoryUsage() {
    if (performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576)
      };
    }
    return null;
  }
}
```

## 🔒 Security Considerations

### Audio Context Security
- Audio context requires user gesture to activate
- Implement proper error handling for blocked autoplay
- Graceful fallback for unsupported browsers

### Recording Permissions
- Request microphone permissions appropriately
- Handle permission denial gracefully
- Provide clear user feedback about recording status

### Cross-Origin Isolation
- Ensure proper CORS headers for external resources
- Use HTTPS for production deployment
- Implement Content Security Policy (CSP)

## 🚀 Performance Optimization

### Memory Management
```javascript
class PendulumManager {
  constructor(maxPendulums = 5) {
    this.pendulums = [];
    this.maxPendulums = maxPendulums;
  }
  
  addPendulum(params) {
    if (this.pendulums.length >= this.maxPendulums) {
      this.removePendulum(0); // Remove oldest
    }
    
    this.pendulums.push(new Pendulum(params));
  }
  
  removePendulum(index) {
    if (this.pendulums[index]) {
      this.pendulums[index].dispose(); // Cleanup audio nodes
      this.pendulums.splice(index, 1);
    }
  }
  
  dispose() {
    this.pendulums.forEach(p => p.dispose());
    this.pendulums = [];
  }
}
```

### Audio Optimization
- Use object pooling for short-lived audio nodes
- Implement efficient parameter ramping
- Monitor audio context state
- Cleanup disposed synthesizers

### Rendering Optimization
- Use requestAnimationFrame for smooth animation
- Implement viewport culling for off-screen elements
- Optimize drawing calls
- Use efficient data structures for trail management

## 🧪 Testing Strategy

### Unit Tests
- Physics calculations accuracy
- Audio parameter mapping
- UI component functionality
- Data export/import

### Integration Tests
- Audio-visual synchronization
- Recording functionality
- Cross-browser compatibility
- Performance benchmarks

### User Testing
- Usability studies
- Accessibility testing
- Mobile device testing
- Performance on low-end devices

## 📱 Browser Compatibility

### Supported Features
| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Web Audio API | ✅ | ✅ | ✅ | ✅ |
| MediaRecorder | ✅ | ✅ | ✅ | ✅ |
| Canvas2D | ✅ | ✅ | ✅ | ✅ |
| ES6+ Features | ✅ | ✅ | ✅ | ✅ |
| CSS Grid | ✅ | ✅ | ✅ | ✅ |

### Polyfills and Fallbacks
- MediaRecorder polyfill for older browsers
- Web Audio API polyfill
- CSS Grid fallback layouts
- Touch event handling for mobile

## 🔧 Development Setup

### Prerequisites
- Modern web browser (Chrome 88+, Firefox 85+, Safari 14+)
- Local web server for development
- Text editor with ES6+ support

### Build Process
```bash
# Development server
npm run dev

# Production build
npm run build

# Testing
npm run test

# Linting
npm run lint
```

### Environment Variables
```env
# Development
NODE_ENV=development
DEBUG_PHYSICS=true
DEBUG_AUDIO=true

# Production
NODE_ENV=production
ENABLE_ANALYTICS=true
```