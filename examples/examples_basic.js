/**
 * Basic Setup Examples for Interactive Musical Pendulums
 * 
 * This file contains simple examples to get started with the pendulum system.
 * Each example demonstrates different basic configurations and use cases.
 */

// Example 1: Simple Single Pendulum
function createBasicPendulum() {
  // Create a pendulum at the center of the screen
  const pendulum = new Pendulum(
    width / 2,    // x position (center)
    height / 2,   // y position (center)
    100,          // length of first arm
    100,          // length of second arm
    15,           // mass of first bob
    15,           // mass of second bob
    PI / 4,       // initial angle of first arm (45 degrees)
    PI / 4,       // initial angle of second arm (45 degrees)
    color(255, 0, 127),  // color of first bob (magenta)
    color(127, 0, 255),  // color of second bob (purple)
    1.0           // gravity
  );
  
  return pendulum;
}

// Example 2: Harmonic Duo - Two pendulums with musical interval
function createHarmonicDuo() {
  const pendulums = [];
  
  // First pendulum - fundamental frequency
  const pendulum1 = new Pendulum(
    width / 2 - 100, height / 2,
    120, 120,
    20, 20,  // Heavier mass = lower frequency
    PI / 3, PI / 6,
    color(255, 100, 100),  // Red-ish
    color(200, 50, 50),
    1.0
  );
  
  // Second pendulum - perfect fifth above (frequency ratio 3:2)
  const pendulum2 = new Pendulum(
    width / 2 + 100, height / 2,
    120, 120,
    13.3, 13.3,  // Mass adjusted for 3:2 frequency ratio
    PI / 6, PI / 3,
    color(100, 100, 255),  // Blue-ish
    color(50, 50, 200),
    1.0
  );
  
  pendulums.push(pendulum1, pendulum2);
  return pendulums;
}

// Example 3: Rhythmic Pattern - Different lengths for rhythmic interest
function createRhythmicPattern() {
  const pendulums = [];
  
  // Fast pendulum (short arms)
  const fast = new Pendulum(
    width / 3, height / 2,
    60, 80,      // Short arms = fast oscillation
    12, 15,
    PI / 2, PI / 4,
    color(255, 255, 0),   // Yellow
    color(255, 200, 0),
    1.0
  );
  
  // Medium pendulum
  const medium = new Pendulum(
    width / 2, height / 2,
    100, 120,    // Medium arms
    15, 18,
    PI / 3, PI / 6,
    color(0, 255, 255),   // Cyan
    color(0, 200, 255),
    1.0
  );
  
  // Slow pendulum (long arms)
  const slow = new Pendulum(
    2 * width / 3, height / 2,
    150, 180,    // Long arms = slow oscillation
    20, 25,
    PI / 6, PI / 8,
    color(255, 0, 255),   // Magenta
    color(200, 0, 255),
    1.0
  );
  
  pendulums.push(fast, medium, slow);
  return pendulums;
}

// Example 4: Zero Gravity Ambient
function createZeroGravityAmbient() {
  const pendulum = new Pendulum(
    width / 2, height / 2,
    150, 150,
    25, 25,
    PI / 2, PI / 3,
    color(100, 200, 255),  // Light blue
    color(150, 150, 255),  // Light purple
    0.0           // Zero gravity for floating motion
  );
  
  return pendulum;
}

// Example 5: Chaos Generator - High energy chaotic system
function createChaosGenerator() {
  const pendulum = new Pendulum(
    width / 2, height / 2,
    80, 120,
    10, 30,      // Different masses for asymmetry
    PI,          // Start inverted (180 degrees)
    3 * PI / 2,  // Complex starting position
    color(255, 0, 0),    // Bright red
    color(255, 100, 0),  // Orange
    2.5          // High gravity for chaotic motion
  );
  
  return pendulum;
}

// Example 6: Color Symphony - Multiple pendulums with color-coded roles
function createColorSymphony() {
  const pendulums = [];
  
  // Bass pendulum (low frequency)
  const bass = new Pendulum(
    width / 4, height / 2,
    140, 160,
    35, 40,      // Heavy masses for low frequency
    PI / 4, PI / 6,
    color(139, 69, 19),   // Brown (earthy bass)
    color(101, 67, 33),
    1.0
  );
  
  // Harmony pendulum (mid frequency)
  const harmony = new Pendulum(
    width / 2, height / 2,
    100, 120,
    20, 25,      // Medium masses
    PI / 3, PI / 4,
    color(34, 139, 34),   // Forest green (harmony)
    color(50, 205, 50),
    1.0
  );
  
  // Lead pendulum (high frequency)
  const lead = new Pendulum(
    3 * width / 4, height / 2,
    80, 100,
    12, 15,      // Light masses for high frequency
    PI / 2, PI / 3,
    color(255, 215, 0),   // Gold (bright lead)
    color(255, 255, 0),
    1.0
  );
  
  pendulums.push(bass, harmony, lead);
  return pendulums;
}

// Example 7: Minimal Setup - Single pendulum with specific parameters
function createMinimalPendulum() {
  return new Pendulum(
    windowWidth / 2,     // Center horizontally
    windowHeight / 3,    // Upper third vertically
    100, 100,            // Equal arm lengths
    15, 15,              // Equal masses
    PI / 4, PI / 4,      // Equal starting angles
    color(255),          // White first bob
    color(255),          // White second bob
    1.0                  // Standard gravity
  );
}

// Example 8: Advanced Setup with Custom Configuration
function createAdvancedPendulum(config = {}) {
  // Default configuration
  const defaults = {
    position: { x: width / 2, y: height / 2 },
    lengths: { arm1: 100, arm2: 100 },
    masses: { bob1: 15, bob2: 15 },
    angles: { theta1: PI / 4, theta2: PI / 4 },
    colors: { 
      bob1: color(127, 0, 255), 
      bob2: color(255, 0, 127) 
    },
    physics: { gravity: 1.0, damping: 0.99 }
  };
  
  // Merge with user configuration
  const settings = Object.assign(defaults, config);
  
  const pendulum = new Pendulum(
    settings.position.x,
    settings.position.y,
    settings.lengths.arm1,
    settings.lengths.arm2,
    settings.masses.bob1,
    settings.masses.bob2,
    settings.angles.theta1,
    settings.angles.theta2,
    settings.colors.bob1,
    settings.colors.bob2,
    settings.physics.gravity
  );
  
  // Apply custom damping if specified
  if (settings.physics.damping !== 0.99) {
    pendulum.arm1.damping = settings.physics.damping;
    pendulum.arm2.damping = settings.physics.damping;
  }
  
  return pendulum;
}

// Example 9: Preset Collection
const PENDULUM_PRESETS = {
  // Calm and peaceful
  peaceful: {
    lengths: { arm1: 120, arm2: 140 },
    masses: { bob1: 25, bob2: 30 },
    angles: { theta1: PI / 6, theta2: PI / 8 },
    colors: { 
      bob1: color(100, 200, 255), 
      bob2: color(150, 255, 200) 
    },
    physics: { gravity: 0.5 }
  },
  
  // Energetic and chaotic
  energetic: {
    lengths: { arm1: 80, arm2: 60 },
    masses: { bob1: 10, bob2: 35 },
    angles: { theta1: PI, theta2: PI / 2 },
    colors: { 
      bob1: color(255, 50, 50), 
      bob2: color(255, 150, 0) 
    },
    physics: { gravity: 3.0 }
  },
  
  // Musical harmony
  harmonic: {
    lengths: { arm1: 100, arm2: 100 },
    masses: { bob1: 16, bob2: 24 },  // 3:2 ratio for perfect fifth
    angles: { theta1: PI / 4, theta2: PI / 3 },
    colors: { 
      bob1: color(138, 43, 226), 
      bob2: color(75, 0, 130) 
    },
    physics: { gravity: 1.0 }
  }
};

// Example 10: Automated Pendulum Creation
function createRandomPendulum(style = 'balanced') {
  const styles = {
    balanced: {
      lengthRange: [80, 120],
      massRange: [12, 18],
      angleRange: [PI / 6, PI / 3],
      gravityRange: [0.8, 1.2]
    },
    chaotic: {
      lengthRange: [50, 150],
      massRange: [5, 40],
      angleRange: [0, PI],
      gravityRange: [1.5, 3.0]
    },
    gentle: {
      lengthRange: [100, 140],
      massRange: [20, 30],
      angleRange: [PI / 12, PI / 6],
      gravityRange: [0.3, 0.7]
    }
  };
  
  const s = styles[style] || styles.balanced;
  
  return new Pendulum(
    random(width * 0.2, width * 0.8),          // Random x position
    random(height * 0.2, height * 0.6),        // Random y position
    random(s.lengthRange[0], s.lengthRange[1]), // Random length 1
    random(s.lengthRange[0], s.lengthRange[1]), // Random length 2
    random(s.massRange[0], s.massRange[1]),     // Random mass 1
    random(s.massRange[0], s.massRange[1]),     // Random mass 2
    random(s.angleRange[0], s.angleRange[1]),   // Random angle 1
    random(s.angleRange[0], s.angleRange[1]),   // Random angle 2
    color(random(100, 255), random(0, 100), random(100, 255)), // Random color 1
    color(random(100, 255), random(0, 100), random(100, 255)), // Random color 2
    random(s.gravityRange[0], s.gravityRange[1]) // Random gravity
  );
}

// Usage Examples:

/*
// Example usage in main sketch:

function setup() {
  createCanvas(800, 600);
  
  // Create a basic pendulum
  let pendulum = createBasicPendulum();
  pendulums.push(pendulum);
  
  // Or create a harmonic duo
  // let duo = createHarmonicDuo();
  // pendulums.push(...duo);
  
  // Or use a preset
  // let preset = createAdvancedPendulum(PENDULUM_PRESETS.peaceful);
  // pendulums.push(preset);
  
  // Or create random pendulums
  // for (let i = 0; i < 3; i++) {
  //   let random = createRandomPendulum('balanced');
  //   pendulums.push(random);
  // }
}

function keyPressed() {
  // Add different types of pendulums with number keys
  if (key === '1') {
    pendulums.push(createBasicPendulum());
  } else if (key === '2') {
    pendulums.push(...createHarmonicDuo());
  } else if (key === '3') {
    pendulums.push(...createRhythmicPattern());
  } else if (key === '4') {
    pendulums.push(createZeroGravityAmbient());
  } else if (key === '5') {
    pendulums.push(createChaosGenerator());
  } else if (key === '6') {
    pendulums.push(...createColorSymphony());
  } else if (key === 'r') {
    pendulums.push(createRandomPendulum('chaotic'));
  }
}
*/