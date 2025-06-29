/**
 * Code Templates for Interactive Musical Pendulums
 * 
 * This file contains templates and examples for common development tasks,
 * including creating custom pendulum behaviors, audio mappings, and UI components.
 */

// ===========================================
// PENDULUM CREATION TEMPLATES
// ===========================================

/**
 * Template: Basic Pendulum Creation
 * Use this template to create simple pendulums with default parameters
 */
function createBasicPendulumTemplate() {
  const pendulum = new Pendulum(
    width / 2,           // x position (center screen)
    height / 2,          // y position (center screen)
    100,                 // length of first arm
    100,                 // length of second arm
    15,                  // mass of first bob
    15,                  // mass of second bob
    PI / 4,              // initial angle of first arm
    PI / 4,              // initial angle of second arm
    color(255, 0, 127),  // color of first bob
    color(127, 0, 255),  // color of second bob
    1.0                  // gravity
  );
  
  return pendulum;
}

/**
 * Template: Random Pendulum Generator
 * Use this for creating pendulums with randomized parameters
 */
function createRandomPendulumTemplate() {
  return new Pendulum(
    random(width * 0.2, width * 0.8),      // Random x position
    random(height * 0.2, height * 0.6),    // Random y position
    random(50, 150),                        // Random length 1
    random(50, 150),                        // Random length 2
    random(8, 25),                          // Random mass 1
    random(8, 25),                          // Random mass 2
    random(0, TWO_PI),                      // Random angle 1
    random(0, TWO_PI),                      // Random angle 2
    color(random(100, 255), 0, random(100, 255)), // Random color 1
    color(random(100, 255), 0, random(100, 255)), // Random color 2
    random(0.5, 2.0)                        // Random gravity
  );
}

/**
 * Template: Harmonic Pendulum Pair
 * Creates two pendulums with musical interval relationships
 */
function createHarmonicPairTemplate(fundamental = 220) {
  const ratio = 3/2; // Perfect fifth
  const mass1 = 20;
  const mass2 = mass1 / ratio; // Inverse relationship for frequency
  
  const pendulum1 = new Pendulum(
    width / 2 - 100, height / 2,
    120, 120, mass1, mass1,
    PI / 3, PI / 6,
    color(255, 100, 100),
    color(200, 50, 50),
    1.0
  );
  
  const pendulum2 = new Pendulum(
    width / 2 + 100, height / 2,
    120, 120, mass2, mass2,
    PI / 6, PI / 3,
    color(100, 100, 255),
    color(50, 50, 200),
    1.0
  );
  
  return [pendulum1, pendulum2];
}

// ===========================================
// CUSTOM AUDIO MAPPING TEMPLATES
// ===========================================

/**
 * Template: Frequency Scaling Functions
 * Different approaches to map physical parameters to frequencies
 */
const FrequencyMappingTemplates = {
  
  // Linear mapping
  linear: (mass, minMass = 5, maxMass = 50, minFreq = 200, maxFreq = 1000) => {
    return map(mass, minMass, maxMass, maxFreq, minFreq); // Inverse relationship
  },
  
  // Logarithmic mapping (more musical)
  logarithmic: (mass, minMass = 5, maxMass = 50, baseFreq = 220) => {
    const semitones = map(mass, minMass, maxMass, -24, 24); // ±2 octaves
    return baseFreq * Math.pow(2, semitones / 12);
  },
  
  // Harmonic series mapping
  harmonic: (mass, minMass = 5, maxMass = 50, fundamental = 110) => {
    const harmonic = Math.floor(map(mass, minMass, maxMass, 1, 16));
    return fundamental * harmonic;
  },
  
  // Pentatonic scale mapping
  pentatonic: (mass, minMass = 5, maxMass = 50, root = 220) => {
    const scale = [1, 9/8, 5/4, 3/2, 5/3]; // Pentatonic ratios
    const octave = Math.floor(map(mass, minMass, maxMass, 0, 3));
    const noteIndex = Math.floor(map(mass, minMass, maxMass, 0, scale.length)) % scale.length;
    return root * Math.pow(2, octave) * scale[noteIndex];
  }
};

/**
 * Template: Custom Audio Parameter Mapping
 * Maps pendulum properties to synthesizer parameters
 */
function customAudioMappingTemplate(pendulum) {
  // Get current pendulum state
  const velocity1 = Math.abs(pendulum.arm1.aVelocity);
  const velocity2 = Math.abs(pendulum.arm2.aVelocity);
  const angle1 = pendulum.arm1.angle;
  const angle2 = pendulum.arm2.angle;
  const position1 = pendulum.arm1.position;
  const position2 = pendulum.arm2.position;
  
  // Calculate derived parameters
  const totalEnergy = pendulum.getTotalEnergy();
  const motionComplexity = velocity1 + velocity2;
  const angleSpread = Math.abs(angle1 - angle2);
  
  return {
    // Frequency mapping
    frequency1: FrequencyMappingTemplates.logarithmic(pendulum.arm1.mass),
    frequency2: FrequencyMappingTemplates.logarithmic(pendulum.arm2.mass),
    
    // FM synthesis parameters
    harmonicity: map(angleSpread, 0, PI, 0.5, 8),
    modulationIndex: map(motionComplexity, 0, 2, 0, 15),
    
    // Effects parameters
    delayTime: map(totalEnergy, 0, 100, 0.1, 0.5),
    feedback: map(velocity1, 0, 1, 0, 0.8),
    
    // Spatial parameters
    pan1: map(position1.x, 0, width, -1, 1),
    pan2: map(position2.x, 0, width, -1, 1),
    
    // Amplitude envelope
    attack: map(velocity1, 0, 1, 0.01, 0.5),
    release: map(totalEnergy, 0, 100, 0.1, 2.0)
  };
}

// ===========================================
// EFFECT CHAIN TEMPLATES
// ===========================================

/**
 * Template: Custom Effect Chain
 * Creates a custom audio processing chain
 */
function createCustomEffectChain() {
  // Create effects
  const filter = new Tone.Filter({
    frequency: 1000,
    type: 'lowpass',
    rolloff: -24
  });
  
  const chorus = new Tone.Chorus({
    frequency: 2,
    delayTime: 2.5,
    depth: 0.7,
    wet: 0.3
  });
  
  const reverb = new Tone.Reverb({
    roomSize: 0.8,
    dampening: 0.5,
    wet: 0.3
  });
  
  const compressor = new Tone.Compressor({
    threshold: -20,
    ratio: 4,
    attack: 0.003,
    release: 0.1
  });
  
  // Chain effects
  const effectChain = [filter, chorus, reverb, compressor];
  
  // Connect in series
  for (let i = 0; i < effectChain.length - 1; i++) {
    effectChain[i].connect(effectChain[i + 1]);
  }
  
  // Connect last effect to destination
  effectChain[effectChain.length - 1].toDestination();
  
  return {
    input: effectChain[0],
    effects: {
      filter,
      chorus,
      reverb,
      compressor
    }
  };
}

/**
 * Template: Adaptive Filter
 * Filter that responds to pendulum motion
 */
class AdaptiveFilterTemplate {
  constructor() {
    this.filter = new Tone.Filter(1000, 'lowpass');
    this.targetFrequency = 1000;
    this.smoothingFactor = 0.1;
  }
  
  update(pendulum) {
    // Calculate filter frequency based on pendulum energy
    const energy = pendulum.getTotalEnergy();
    const velocity = Math.abs(pendulum.arm1.aVelocity) + Math.abs(pendulum.arm2.aVelocity);
    
    // Map to filter frequency range
    this.targetFrequency = map(energy + velocity * 50, 0, 200, 200, 5000);
    
    // Smooth transition
    const currentFreq = this.filter.frequency.value;
    const newFreq = lerp(currentFreq, this.targetFrequency, this.smoothingFactor);
    
    this.filter.frequency.rampTo(newFreq, 0.1);
  }
}

// ===========================================
// UI COMPONENT TEMPLATES
// ===========================================

/**
 * Template: Custom Control Panel
 * Creates a reusable control panel component
 */
class CustomControlPanelTemplate {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.controls = [];
    this.visible = true;
  }
  
  addSlider(label, min, max, defaultValue, callback) {
    const slider = {
      type: 'slider',
      label,
      min,
      max,
      value: defaultValue,
      callback,
      x: this.x + 10,
      y: this.y + 30 + this.controls.length * 40,
      width: this.width - 20,
      height: 20
    };
    
    this.controls.push(slider);
    return slider;
  }
  
  addButton(label, callback) {
    const button = {
      type: 'button',
      label,
      callback,
      x: this.x + 10,
      y: this.y + 30 + this.controls.length * 40,
      width: this.width - 20,
      height: 30
    };
    
    this.controls.push(button);
    return button;
  }
  
  display() {
    if (!this.visible) return;
    
    // Draw panel background
    fill(255, 255, 255, 200);
    stroke(0);
    rect(this.x, this.y, this.width, this.height);
    
    // Draw controls
    this.controls.forEach(control => {
      if (control.type === 'slider') {
        this.drawSlider(control);
      } else if (control.type === 'button') {
        this.drawButton(control);
      }
    });
  }
  
  drawSlider(slider) {
    // Draw label
    fill(0);
    textAlign(LEFT);
    text(slider.label, slider.x, slider.y - 5);
    
    // Draw slider track
    stroke(100);
    line(slider.x, slider.y, slider.x + slider.width, slider.y);
    
    // Draw slider handle
    const handleX = map(slider.value, slider.min, slider.max, slider.x, slider.x + slider.width);
    fill(50, 150, 250);
    noStroke();
    ellipse(handleX, slider.y, 12, 12);
  }
  
  drawButton(button) {
    // Draw button
    fill(100, 150, 255);
    stroke(0);
    rect(button.x, button.y, button.width, button.height);
    
    // Draw label
    fill(255);
    textAlign(CENTER, CENTER);
    text(button.label, button.x + button.width/2, button.y + button.height/2);
  }
  
  handleClick(mouseX, mouseY) {
    this.controls.forEach(control => {
      if (this.isPointInControl(mouseX, mouseY, control)) {
        if (control.type === 'button') {
          control.callback();
        } else if (control.type === 'slider') {
          // Update slider value
          const newValue = map(mouseX, control.x, control.x + control.width, control.min, control.max);
          control.value = constrain(newValue, control.min, control.max);
          control.callback(control.value);
        }
      }
    });
  }
  
  isPointInControl(x, y, control) {
    return x >= control.x && x <= control.x + control.width &&
           y >= control.y - 10 && y <= control.y + control.height + 10;
  }
}

// ===========================================
// ANIMATION TEMPLATES
// ===========================================

/**
 * Template: Smooth Parameter Animation
 * Animates parameter changes over time
 */
class ParameterAnimatorTemplate {
  constructor() {
    this.animations = [];
  }
  
  animateTo(target, property, endValue, duration = 1000, easing = 'easeInOut') {
    const animation = {
      target,
      property,
      startValue: target[property],
      endValue,
      duration,
      startTime: millis(),
      easing,
      active: true
    };
    
    this.animations.push(animation);
    return animation;
  }
  
  update() {
    const currentTime = millis();
    
    this.animations = this.animations.filter(anim => {
      if (!anim.active) return false;
      
      const elapsed = currentTime - anim.startTime;
      const progress = Math.min(elapsed / anim.duration, 1);
      
      // Apply easing function
      const easedProgress = this.applyEasing(progress, anim.easing);
      
      // Calculate current value
      const currentValue = lerp(anim.startValue, anim.endValue, easedProgress);
      anim.target[anim.property] = currentValue;
      
      // Remove completed animations
      if (progress >= 1) {
        anim.active = false;
        return false;
      }
      
      return true;
    });
  }
  
  applyEasing(t, type) {
    switch (type) {
      case 'linear': return t;
      case 'easeIn': return t * t;
      case 'easeOut': return t * (2 - t);
      case 'easeInOut': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      case 'bounce': return this.bounceEasing(t);
      default: return t;
    }
  }
  
  bounceEasing(t) {
    if (t < 1/2.75) {
      return 7.5625 * t * t;
    } else if (t < 2/2.75) {
      return 7.5625 * (t -= 1.5/2.75) * t + 0.75;
    } else if (t < 2.5/2.75) {
      return 7.5625 * (t -= 2.25/2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625/2.75) * t + 0.984375;
    }
  }
}

// ===========================================
// PHYSICS MODIFICATION TEMPLATES
// ===========================================

/**
 * Template: Custom Physics Modifier
 * Allows modification of pendulum physics behavior
 */
class PhysicsModifierTemplate {
  constructor() {
    this.modifiers = [];
  }
  
  addGravityWave(amplitude = 0.5, frequency = 0.01) {
    this.modifiers.push({
      type: 'gravityWave',
      amplitude,
      frequency,
      phase: 0
    });
  }
  
  addMagneticField(strength = 0.1) {
    this.modifiers.push({
      type: 'magneticField',
      strength
    });
  }
  
  addWindResistance(coefficient = 0.01) {
    this.modifiers.push({
      type: 'windResistance',
      coefficient
    });
  }
  
  apply(pendulums) {
    this.modifiers.forEach(modifier => {
      switch (modifier.type) {
        case 'gravityWave':
          this.applyGravityWave(pendulums, modifier);
          break;
        case 'magneticField':
          this.applyMagneticField(pendulums, modifier);
          break;
        case 'windResistance':
          this.applyWindResistance(pendulums, modifier);
          break;
      }
    });
  }
  
  applyGravityWave(pendulums, modifier) {
    modifier.phase += modifier.frequency;
    const gravityOffset = modifier.amplitude * Math.sin(modifier.phase);
    
    pendulums.forEach(pendulum => {
      pendulum.arm1.gravity += gravityOffset;
      pendulum.arm2.gravity += gravityOffset;
    });
  }
  
  applyMagneticField(pendulums, modifier) {
    for (let i = 0; i < pendulums.length; i++) {
      for (let j = i + 1; j < pendulums.length; j++) {
        const p1 = pendulums[i];
        const p2 = pendulums[j];
        
        const distance = dist(
          p1.arm2.position.x, p1.arm2.position.y,
          p2.arm2.position.x, p2.arm2.position.y
        );
        
        if (distance > 0 && distance < 200) {
          const force = modifier.strength / (distance * distance);
          const angle = atan2(
            p2.arm2.position.y - p1.arm2.position.y,
            p2.arm2.position.x - p1.arm2.position.x
          );
          
          p1.arm2.aAcceleration += force * cos(angle);
          p2.arm2.aAcceleration -= force * cos(angle);
        }
      }
    }
  }
  
  applyWindResistance(pendulums, modifier) {
    pendulums.forEach(pendulum => {
      const resistance1 = -modifier.coefficient * pendulum.arm1.aVelocity;
      const resistance2 = -modifier.coefficient * pendulum.arm2.aVelocity;
      
      pendulum.arm1.aAcceleration += resistance1;
      pendulum.arm2.aAcceleration += resistance2;
    });
  }
}

// ===========================================
// USAGE EXAMPLES
// ===========================================

/**
 * Example: Complete Custom Pendulum System
 */
function createCustomPendulumSystem() {
  // Initialize components
  const controlPanel = new CustomControlPanelTemplate(10, 10, 200, 300);
  const animator = new ParameterAnimatorTemplate();
  const physicsModifier = new PhysicsModifierTemplate();
  const effectChain = createCustomEffectChain();
  
  // Create pendulums with custom mapping
  const pendulums = [];
  for (let i = 0; i < 3; i++) {
    const pendulum = createRandomPendulumTemplate();
    
    // Connect to custom effect chain
    if (pendulum.synth1) {
      pendulum.synth1.connect(effectChain.input);
    }
    
    pendulums.push(pendulum);
  }
  
  // Add controls
  controlPanel.addSlider('Gravity Wave', 0, 1, 0.5, (value) => {
    physicsModifier.addGravityWave(value, 0.01);
  });
  
  controlPanel.addSlider('Filter Cutoff', 200, 5000, 1000, (value) => {
    effectChain.effects.filter.frequency.rampTo(value, 0.1);
  });
  
  controlPanel.addButton('Animate Gravity', () => {
    pendulums.forEach(pendulum => {
      animator.animateTo(pendulum.arm1, 'gravity', random(0.5, 2.0), 2000, 'bounce');
      animator.animateTo(pendulum.arm2, 'gravity', random(0.5, 2.0), 2000, 'bounce');
    });
  });
  
  return {
    pendulums,
    controlPanel,
    animator,
    physicsModifier,
    effectChain
  };
}

// Export templates for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createBasicPendulumTemplate,
    createRandomPendulumTemplate,
    createHarmonicPairTemplate,
    FrequencyMappingTemplates,
    customAudioMappingTemplate,
    createCustomEffectChain,
    AdaptiveFilterTemplate,
    CustomControlPanelTemplate,
    ParameterAnimatorTemplate,
    PhysicsModifierTemplate,
    createCustomPendulumSystem
  };
}