/**
 * Test Setup for Interactive Musical Pendulums
 * 
 * This file configures the testing environment and provides utilities
 * for testing the pendulum physics, audio synthesis, and UI components.
 */

// Mock p5.js functions for testing environment
global.createVector = (x = 0, y = 0) => ({ x, y, copy: () => ({ x, y }) });
global.sin = Math.sin;
global.cos = Math.cos;
global.PI = Math.PI;
global.TWO_PI = Math.PI * 2;
global.map = (value, start1, stop1, start2, stop2) => {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};
global.constrain = (value, min, max) => Math.max(min, Math.min(max, value));
global.dist = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
global.random = (min, max) => {
  if (min === undefined) return Math.random();
  if (max === undefined) return Math.random() * min;
  return Math.random() * (max - min) + min;
};
global.color = (r, g, b) => ({ r: r || 0, g: g || 0, b: b || 0 });

// Mock DOM elements
global.document = {
  getElementById: jest.fn(() => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    value: 0,
    textContent: '',
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(() => false)
    }
  })),
  createElement: jest.fn(() => ({
    addEventListener: jest.fn(),
    click: jest.fn(),
    href: '',
    download: ''
  })),
  body: {
    appendChild: jest.fn()
  }
};

global.window = {
  innerWidth: 1024,
  innerHeight: 768,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  URL: {
    createObjectURL: jest.fn(() => 'blob:test-url'),
    revokeObjectURL: jest.fn()
  },
  performance: {
    now: jest.fn(() => Date.now())
  }
};

// Mock Tone.js for audio testing
global.Tone = {
  context: {
    state: 'running',
    resume: jest.fn(),
    suspend: jest.fn(),
    sampleRate: 44100
  },
  Master: {
    volume: { value: 0 },
    connect: jest.fn()
  },
  now: jest.fn(() => 0),
  gainToDb: jest.fn((gain) => 20 * Math.log10(gain)),
  FMSynth: jest.fn(() => ({
    frequency: { rampTo: jest.fn(), setValueAtTime: jest.fn(), value: 440 },
    harmonicity: { rampTo: jest.fn(), setValueAtTime: jest.fn() },
    modulationIndex: { rampTo: jest.fn(), setValueAtTime: jest.fn() },
    volume: { rampTo: jest.fn(), setValueAtTime: jest.fn() },
    triggerAttack: jest.fn(),
    triggerRelease: jest.fn(),
    connect: jest.fn(),
    dispose: jest.fn()
  })),
  Panner: jest.fn(() => ({
    pan: { rampTo: jest.fn(), setValueAtTime: jest.fn() },
    connect: jest.fn(),
    toDestination: jest.fn()
  })),
  FeedbackDelay: jest.fn(() => ({
    delayTime: 0.15,
    feedback: 0.4,
    wet: 0.65,
    connect: jest.fn()
  }))
};

// Test utilities
global.TestUtils = {
  // Create a basic pendulum for testing
  createTestPendulum: (options = {}) => {
    const defaults = {
      x: 400,
      y: 300,
      length1: 100,
      length2: 100,
      mass1: 15,
      mass2: 15,
      angle1: Math.PI / 4,
      angle2: Math.PI / 4,
      col1: color(255, 0, 127),
      col2: color(127, 0, 255),
      gravity: 1.0
    };
    
    const params = Object.assign(defaults, options);
    
    // Mock Pendulum class
    return {
      x: params.x,
      y: params.y,
      arm1: {
        origin: createVector(params.x, params.y),
        position: createVector(params.x + params.length1, params.y),
        length: params.length1,
        mass: params.mass1,
        angle: params.angle1,
        aVelocity: 0,
        aAcceleration: 0,
        gravity: params.gravity,
        trace: [],
        col: params.col1,
        update: jest.fn(),
        display: jest.fn()
      },
      arm2: {
        origin: createVector(params.x + params.length1, params.y),
        position: createVector(params.x + params.length1 + params.length2, params.y),
        length: params.length2,
        mass: params.mass2,
        angle: params.angle2,
        aVelocity: 0,
        aAcceleration: 0,
        gravity: params.gravity,
        trace: [],
        col: params.col2,
        update: jest.fn(),
        display: jest.fn()
      },
      synth1: global.Tone.FMSynth(),
      synth2: global.Tone.FMSynth(),
      isActive: true,
      startTime: Date.now(),
      update: jest.fn(),
      display: jest.fn(),
      remove: jest.fn(),
      updateSound: jest.fn()
    };
  },
  
  // Simulate pendulum motion for testing
  simulatePendulumMotion: (pendulum, steps = 10, deltaTime = 1/60) => {
    const motionData = [];
    
    for (let i = 0; i < steps; i++) {
      // Simple pendulum physics simulation
      const force1 = (pendulum.arm1.gravity / pendulum.arm1.length) * sin(pendulum.arm1.angle);
      const force2 = (pendulum.arm2.gravity / pendulum.arm2.length) * sin(pendulum.arm2.angle);
      
      pendulum.arm1.aAcceleration = -force1;
      pendulum.arm2.aAcceleration = -force2;
      
      pendulum.arm1.aVelocity += pendulum.arm1.aAcceleration * deltaTime;
      pendulum.arm2.aVelocity += pendulum.arm2.aAcceleration * deltaTime;
      
      pendulum.arm1.aVelocity *= 0.99; // Damping
      pendulum.arm2.aVelocity *= 0.99;
      
      pendulum.arm1.angle += pendulum.arm1.aVelocity * deltaTime;
      pendulum.arm2.angle += pendulum.arm2.aVelocity * deltaTime;
      
      // Update positions
      pendulum.arm1.position.x = pendulum.arm1.origin.x + pendulum.arm1.length * sin(pendulum.arm1.angle);
      pendulum.arm1.position.y = pendulum.arm1.origin.y + pendulum.arm1.length * cos(pendulum.arm1.angle);
      
      pendulum.arm2.origin = pendulum.arm1.position;
      pendulum.arm2.position.x = pendulum.arm2.origin.x + pendulum.arm2.length * sin(pendulum.arm2.angle);
      pendulum.arm2.position.y = pendulum.arm2.origin.y + pendulum.arm2.length * cos(pendulum.arm2.angle);
      
      motionData.push({
        step: i,
        time: i * deltaTime,
        angle1: pendulum.arm1.angle,
        angle2: pendulum.arm2.angle,
        velocity1: pendulum.arm1.aVelocity,
        velocity2: pendulum.arm2.aVelocity,
        position1: { x: pendulum.arm1.position.x, y: pendulum.arm1.position.y },
        position2: { x: pendulum.arm2.position.x, y: pendulum.arm2.position.y }
      });
    }
    
    return motionData;
  },
  
  // Calculate energy for testing
  calculateEnergy: (pendulum) => {
    const ke1 = 0.5 * pendulum.arm1.mass * Math.pow(pendulum.arm1.aVelocity, 2);
    const ke2 = 0.5 * pendulum.arm2.mass * Math.pow(pendulum.arm2.aVelocity, 2);
    const pe1 = pendulum.arm1.mass * pendulum.arm1.gravity * pendulum.arm1.length * (1 - cos(pendulum.arm1.angle));
    const pe2 = pendulum.arm2.mass * pendulum.arm2.gravity * pendulum.arm2.length * (1 - cos(pendulum.arm2.angle));
    
    return {
      kinetic: ke1 + ke2,
      potential: pe1 + pe2,
      total: ke1 + ke2 + pe1 + pe2
    };
  },
  
  // Test frequency calculations
  massToFrequency: (mass, minMass = 5, maxMass = 50, minFreq = 200, maxFreq = 1000) => {
    return map(mass, minMass, maxMass, maxFreq, minFreq); // Inverse relationship
  },
  
  // Mock audio context for testing
  createMockAudioContext: () => ({
    state: 'running',
    sampleRate: 44100,
    currentTime: 0,
    resume: jest.fn().mockResolvedValue(),
    suspend: jest.fn().mockResolvedValue(),
    createGain: jest.fn(() => ({
      gain: { value: 1, setValueAtTime: jest.fn() },
      connect: jest.fn(),
      disconnect: jest.fn()
    })),
    createOscillator: jest.fn(() => ({
      frequency: { value: 440, setValueAtTime: jest.fn() },
      type: 'sine',
      connect: jest.fn(),
      disconnect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn()
    })),
    createAnalyser: jest.fn(() => ({
      fftSize: 2048,
      frequencyBinCount: 1024,
      getFloatFrequencyData: jest.fn(),
      getByteFrequencyData: jest.fn()
    }))
  }),
  
  // Assert pendulum state
  assertPendulumState: (pendulum, expectedState) => {
    const tolerance = 0.001;
    
    if (expectedState.angle1 !== undefined) {
      expect(Math.abs(pendulum.arm1.angle - expectedState.angle1)).toBeLessThan(tolerance);
    }
    
    if (expectedState.angle2 !== undefined) {
      expect(Math.abs(pendulum.arm2.angle - expectedState.angle2)).toBeLessThan(tolerance);
    }
    
    if (expectedState.velocity1 !== undefined) {
      expect(Math.abs(pendulum.arm1.aVelocity - expectedState.velocity1)).toBeLessThan(tolerance);
    }
    
    if (expectedState.velocity2 !== undefined) {
      expect(Math.abs(pendulum.arm2.aVelocity - expectedState.velocity2)).toBeLessThan(tolerance);
    }
    
    if (expectedState.energy !== undefined) {
      const energy = TestUtils.calculateEnergy(pendulum);
      expect(Math.abs(energy.total - expectedState.energy)).toBeLessThan(tolerance);
    }
  },
  
  // Wait for async operations
  waitFor: (condition, timeout = 1000) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const check = () => {
        if (condition()) {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout waiting for condition'));
        } else {
          setTimeout(check, 10);
        }
      };
      
      check();
    });
  },
  
  // Generate test patterns
  generateTestPattern: (type = 'sine', length = 100) => {
    const pattern = [];
    
    for (let i = 0; i < length; i++) {
      const t = i / length;
      let value;
      
      switch (type) {
        case 'sine':
          value = Math.sin(t * 2 * Math.PI);
          break;
        case 'sawtooth':
          value = 2 * (t - Math.floor(t + 0.5));
          break;
        case 'square':
          value = Math.sign(Math.sin(t * 2 * Math.PI));
          break;
        case 'noise':
          value = Math.random() * 2 - 1;
          break;
        default:
          value = 0;
      }
      
      pattern.push(value);
    }
    
    return pattern;
  }
};

// Custom matchers for Jest
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
  
  toBeNearlyEqual(received, expected, precision = 5) {
    const pass = Math.abs(received - expected) < Math.pow(10, -precision);
    if (pass) {
      return {
        message: () => `expected ${received} not to be nearly equal to ${expected}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be nearly equal to ${expected} (precision: ${precision})`,
        pass: false,
      };
    }
  },
  
  toHaveValidFrequency(received) {
    const pass = received >= 20 && received <= 20000; // Audible range
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid audio frequency`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid audio frequency (20Hz - 20kHz)`,
        pass: false,
      };
    }
  }
});

// Performance testing utilities
global.PerformanceUtils = {
  measureExecutionTime: (fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    return {
      result,
      executionTime: end - start
    };
  },
  
  benchmarkFunction: (fn, iterations = 1000) => {
    const times = [];
    
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      fn();
      const end = performance.now();
      times.push(end - start);
    }
    
    const average = times.reduce((sum, time) => sum + time, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    
    return {
      average,
      min,
      max,
      median: times.sort()[Math.floor(times.length / 2)],
      standardDeviation: Math.sqrt(
        times.reduce((sum, time) => sum + Math.pow(time - average, 2), 0) / times.length
      )
    };
  }
};

// Setup global test environment
beforeEach(() => {
  // Reset mocks
  jest.clearAllMocks();
  
  // Reset global state
  global.pendulums = [];
  global.width = 800;
  global.height = 600;
  global.frameCount = 0;
  global.zoom = 1;
  global.offsetX = 0;
  global.offsetY = 0;
});

afterEach(() => {
  // Cleanup
  global.pendulums = [];
});

// Console override for testing
const originalConsole = console;
global.console = {
  ...originalConsole,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};