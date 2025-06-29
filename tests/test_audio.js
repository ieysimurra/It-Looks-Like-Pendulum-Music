/**
 * Audio Tests for Interactive Musical Pendulums
 * 
 * Tests the audio synthesis, sound mapping, and musical relationships.
 */

describe('Audio Synthesis', () => {
  let pendulum;
  let mockAudioContext;
  
  beforeEach(() => {
    pendulum = TestUtils.createTestPendulum();
    mockAudioContext = TestUtils.createMockAudioContext();
  });
  
  describe('Frequency Mapping', () => {
    test('should map mass to frequency correctly', () => {
      const freq1 = TestUtils.massToFrequency(5); // Minimum mass
      const freq2 = TestUtils.massToFrequency(50); // Maximum mass
      const freq3 = TestUtils.massToFrequency(27.5); // Middle mass
      
      expect(freq1).toHaveValidFrequency();
      expect(freq2).toHaveValidFrequency();
      expect(freq3).toHaveValidFrequency();
      
      // Inverse relationship: higher mass = lower frequency
      expect(freq1).toBeGreaterThan(freq2);
      expect(freq3).toBeWithinRange(freq2, freq1);
    });
    
    test('should produce musical intervals', () => {
      const mass1 = 20;
      const mass2 = 13.33; // Should create 3:2 ratio (perfect fifth)
      
      const freq1 = TestUtils.massToFrequency(mass1);
      const freq2 = TestUtils.massToFrequency(mass2);
      
      const ratio = freq2 / freq1;
      
      // Should be close to 3:2 ratio (1.5)
      expect(ratio).toBeNearlyEqual(1.5, 1);
    });
    
    test('should handle extreme mass values', () => {
      expect(() => {
        TestUtils.massToFrequency(1); // Very low mass
        TestUtils.massToFrequency(100); // Very high mass
      }).not.toThrow();
      
      const lowFreq = TestUtils.massToFrequency(1);
      const highFreq = TestUtils.massToFrequency(100);
      
      expect(lowFreq).toHaveValidFrequency();
      expect(highFreq).toHaveValidFrequency();
    });
  });
  
  describe('FM Synthesis Parameters', () => {
    test('should map velocity to modulation index', () => {
      const velocities = [0, 0.5, 1.0];
      const modIndices = velocities.map(vel => map(Math.abs(vel), 0, 1, 0, 10));
      
      expect(modIndices[0]).toBe(0);
      expect(modIndices[1]).toBe(5);
      expect(modIndices[2]).toBe(10);
    });
    
    test('should map color to harmonicity', () => {
      const colors = [1, 128, 255];
      const harmonicities = colors.map(color => map(color, 1, 255, 1, 1000));
      
      expect(harmonicities[0]).toBeNearlyEqual(1);
      expect(harmonicities[1]).toBeNearlyEqual(500.5, 1);
      expect(harmonicities[2]).toBeNearlyEqual(1000);
    });
    
    test('should create valid FM synthesis parameters', () => {
      pendulum.arm1.aVelocity = 0.5;
      pendulum.arm2.aVelocity = -0.3;
      
      const fmParams = calculateFMParameters(pendulum);
      
      expect(fmParams.modulationIndex).toBeWithinRange(0, 20);
      expect(fmParams.harmonicity).toBeGreaterThan(0);
      expect(fmParams.carrierFreq).toHaveValidFrequency();
    });
  });
  
  describe('Spatial Audio', () => {
    test('should map position to stereo panning', () => {
      const positions = [0, 400, 800]; // Left, center, right
      const panValues = positions.map(x => map(x, 0, 800, -1, 1));
      
      expect(panValues[0]).toBeNearlyEqual(-1); // Full left
      expect(panValues[1]).toBeNearlyEqual(0);  // Center
      expect(panValues[2]).toBeNearlyEqual(1);  // Full right
    });
    
    test('should handle edge cases in panning', () => {
      const extremePositions = [-100, 900]; // Outside canvas bounds
      const panValues = extremePositions.map(x => constrain(map(x, 0, 800, -1, 1), -1, 1));
      
      expect(panValues[0]).toBeWithinRange(-1, 1);
      expect(panValues[1]).toBeWithinRange(-1, 1);
    });
    
    test('should calculate distance-based amplitude', () => {
      const distances = [0, 100, 200, 400];
      const amplitudes = distances.map(d => Math.max(0, 1 - d / 400));
      
      expect(amplitudes[0]).toBe(1); // Maximum amplitude at zero distance
      expect(amplitudes[3]).toBe(0); // Zero amplitude at maximum distance
      expect(amplitudes[1]).toBe(0.75);
      expect(amplitudes[2]).toBe(0.5);
    });
  });
  
  describe('Harmonic Relationships', () => {
    test('should detect consonant intervals', () => {
      const frequencies = [220, 330, 440]; // A3, E4, A4 (perfect fifth and octave)
      
      const intervals = calculateIntervals(frequencies);
      
      expect(intervals).toContain(1.5); // Perfect fifth (3:2)
      expect(intervals).toContain(2.0); // Octave (2:1)
    });
    
    test('should calculate dissonance levels', () => {
      const consonantFreqs = [220, 330]; // Perfect fifth
      const dissonantFreqs = [220, 311]; // Close but not perfect
      
      const consonantDissonance = calculateDissonance(consonantFreqs);
      const dissonantDissonance = calculateDissonance(dissonantFreqs);
      
      expect(dissonantDissonance).toBeGreaterThan(consonantDissonance);
    });
    
    test('should handle multiple pendulum harmonies', () => {
      const pendulums = [
        TestUtils.createTestPendulum({ mass1: 20, mass2: 20 }), // Fundamental
        TestUtils.createTestPendulum({ mass1: 13.33, mass2: 13.33 }), // Perfect fifth
        TestUtils.createTestPendulum({ mass1: 10, mass2: 10 }) // Octave
      ];
      
      const frequencies = pendulums.map(p => TestUtils.massToFrequency(p.arm1.mass));
      const harmony = analyzeHarmony(frequencies);
      
      expect(harmony.consonanceLevel).toBeGreaterThan(0.7); // Should be highly consonant
    });
  });
  
  describe('Audio Context Management', () => {
    test('should handle suspended audio context', () => {
      mockAudioContext.state = 'suspended';
      
      expect(() => {
        resumeAudioContext(mockAudioContext);
      }).not.toThrow();
      
      expect(mockAudioContext.resume).toHaveBeenCalled();
    });
    
    test('should create audio nodes correctly', () => {
      const synth = createMockSynthesizer(mockAudioContext);
      
      expect(synth.frequency).toBeDefined();
      expect(synth.connect).toBeDefined();
      expect(synth.disconnect).toBeDefined();
    });
    
    test('should dispose of audio resources', () => {
      const synth = createMockSynthesizer(mockAudioContext);
      
      expect(() => {
        disposeSynthesizer(synth);
      }).not.toThrow();
    });
  });
  
  describe('Performance Optimization', () => {
    test('should use efficient parameter updates', () => {
      const updateCount = 1000;
      
      const benchmark = PerformanceUtils.benchmarkFunction(() => {
        updateAudioParameters(pendulum);
      }, updateCount);
      
      // Audio updates should be very fast
      expect(benchmark.average).toBeLessThan(1); // 1ms average
    });
    
    test('should handle multiple simultaneous pendulums', () => {
      const pendulums = Array.from({ length: 5 }, () => TestUtils.createTestPendulum());
      
      const benchmark = PerformanceUtils.benchmarkFunction(() => {
        pendulums.forEach(p => updateAudioParameters(p));
      }, 100);
      
      // Should handle 5 pendulums efficiently
      expect(benchmark.average).toBeLessThan(5); // 5ms average for 5 pendulums
    });
  });
  
  describe('Audio Quality', () => {
    test('should prevent audio artifacts', () => {
      // Rapid parameter changes that could cause artifacts
      const rapidChanges = [100, 500, 200, 800, 150];
      
      rapidChanges.forEach(freq => {
        expect(() => {
          updateFrequencySmooth(pendulum.synth1, freq);
        }).not.toThrow();
      });
    });
    
    test('should clamp parameters to valid ranges', () => {
      const extremeValues = {
        frequency: [-100, 0, 25000], // Below/above audio range
        amplitude: [-0.5, 2.0], // Below/above 0-1 range
        modIndex: [-5, 50] // Extreme modulation values
      };
      
      Object.entries(extremeValues).forEach(([param, values]) => {
        values.forEach(value => {
          const clamped = clampAudioParameter(param, value);
          expect(isValidAudioParameter(param, clamped)).toBe(true);
        });
      });
    });
  });
});

describe('Musical Theory Implementation', () => {
  describe('Scale Generation', () => {
    test('should generate major scale correctly', () => {
      const scale = generateScale('major', 261.63); // C major
      const expectedRatios = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2];
      
      scale.forEach((freq, index) => {
        expect(freq / 261.63).toBeNearlyEqual(expectedRatios[index], 2);
      });
    });
    
    test('should generate pentatonic scale correctly', () => {
      const scale = generateScale('pentatonic', 220);
      
      expect(scale).toHaveLength(5);
      scale.forEach(freq => {
        expect(freq).toHaveValidFrequency();
      });
    });
  });
  
  describe('Chord Recognition', () => {
    test('should recognize major triad', () => {
      const frequencies = [261.63, 329.63, 392.00]; // C major triad
      const chord = analyzeChord(frequencies);
      
      expect(chord.type).toBe('major');
      expect(chord.root).toBeNearlyEqual(261.63, 1);
    });
    
    test('should recognize minor triad', () => {
      const frequencies = [220, 261.63, 329.63]; // A minor triad
      const chord = analyzeChord(frequencies);
      
      expect(chord.type).toBe('minor');
      expect(chord.root).toBeNearlyEqual(220, 1);
    });
  });
  
  describe('Rhythm Analysis', () => {
    test('should detect regular rhythmic patterns', () => {
      const pattern = [1, 0, 1, 0, 1, 0, 1, 0]; // Regular beat
      const analysis = analyzeRhythm(pattern);
      
      expect(analysis.regularity).toBeGreaterThan(0.8);
      expect(analysis.period).toBe(2);
    });
    
    test('should detect complex polyrhythms', () => {
      const pattern1 = [1, 0, 0, 1, 0, 0]; // 3-beat pattern
      const pattern2 = [1, 0, 1, 0]; // 2-beat pattern
      
      const polyrhythm = combineRhythms([pattern1, pattern2]);
      const analysis = analyzeRhythm(polyrhythm);
      
      expect(analysis.complexity).toBeGreaterThan(0.5);
    });
  });
});

// Helper functions for audio tests
function calculateFMParameters(pendulum) {
  const carrierFreq = TestUtils.massToFrequency(pendulum.arm1.mass);
  const modulationIndex = map(Math.abs(pendulum.arm1.aVelocity), 0, 1, 0, 10);
  const harmonicity = map(127, 1, 255, 1, 1000); // Default color value
  
  return {
    carrierFreq,
    modulationIndex,
    harmonicity
  };
}

function calculateIntervals(frequencies) {
  const fundamental = Math.min(...frequencies);
  return frequencies.map(f => f / fundamental);
}

function calculateDissonance(frequencies) {
  let dissonance = 0;
  for (let i = 0; i < frequencies.length; i++) {
    for (let j = i + 1; j < frequencies.length; j++) {
      const ratio = frequencies[j] / frequencies[i];
      // Simple dissonance measure based on how far ratio is from simple fractions
      const closestSimpleRatio = findClosestSimpleRatio(ratio);
      dissonance += Math.abs(ratio - closestSimpleRatio);
    }
  }
  return dissonance / (frequencies.length * (frequencies.length - 1) / 2);
}

function findClosestSimpleRatio(ratio) {
  const simpleRatios = [1, 6/5, 5/4, 4/3, 3/2, 5/3, 15/8, 2];
  return simpleRatios.reduce((prev, curr) => 
    Math.abs(curr - ratio) < Math.abs(prev - ratio) ? curr : prev
  );
}

function analyzeHarmony(frequencies) {
  const intervals = calculateIntervals(frequencies);
  const dissonance = calculateDissonance(frequencies);
  const consonanceLevel = 1 / (1 + dissonance);
  
  return {
    intervals,
    dissonance,
    consonanceLevel,
    complexity: frequencies.length
  };
}

function resumeAudioContext(context) {
  if (context.state === 'suspended') {
    context.resume();
  }
}

function createMockSynthesizer(context) {
  return {
    frequency: { value: 440, setValueAtTime: jest.fn(), rampTo: jest.fn() },
    harmonicity: { rampTo: jest.fn() },
    modulationIndex: { rampTo: jest.fn() },
    volume: { rampTo: jest.fn() },
    connect: jest.fn(),
    disconnect: jest.fn(),
    dispose: jest.fn()
  };
}

function disposeSynthesizer(synth) {
  if (synth.dispose) {
    synth.dispose();
  }
}

function updateAudioParameters(pendulum) {
  const freq = TestUtils.massToFrequency(pendulum.arm1.mass);
  const modIndex = map(Math.abs(pendulum.arm1.aVelocity), 0, 1, 0, 10);
  
  // Simulate parameter updates (normally would be Tone.js calls)
  pendulum.synth1.frequency.rampTo(freq, 0.1);
  pendulum.synth1.modulationIndex.rampTo(modIndex, 0.1);
}

function updateFrequencySmooth(synth, frequency) {
  const clampedFreq = constrain(frequency, 20, 20000);
  synth.frequency.rampTo(clampedFreq, 0.1);
}

function clampAudioParameter(param, value) {
  switch (param) {
    case 'frequency':
      return constrain(value, 20, 20000);
    case 'amplitude':
      return constrain(value, 0, 1);
    case 'modIndex':
      return constrain(value, 0, 20);
    default:
      return value;
  }
}

function isValidAudioParameter(param, value) {
  switch (param) {
    case 'frequency':
      return value >= 20 && value <= 20000;
    case 'amplitude':
      return value >= 0 && value <= 1;
    case 'modIndex':
      return value >= 0 && value <= 20;
    default:
      return true;
  }
}

function generateScale(scaleType, fundamental) {
  const scales = {
    major: [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2],
    minor: [1, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5, 2],
    pentatonic: [1, 9/8, 5/4, 3/2, 5/3]
  };
  
  const ratios = scales[scaleType] || scales.major;
  return ratios.map(ratio => fundamental * ratio);
}

function analyzeChord(frequencies) {
  const intervals = calculateIntervals(frequencies.sort((a, b) => a - b));
  const root = frequencies[0];
  
  // Simple chord recognition
  if (intervals.length >= 3) {
    const third = intervals[1];
    const fifth = intervals[2];
    
    if (Math.abs(third - 5/4) < 0.05 && Math.abs(fifth - 3/2) < 0.05) {
      return { type: 'major', root };
    } else if (Math.abs(third - 6/5) < 0.05 && Math.abs(fifth - 3/2) < 0.05) {
      return { type: 'minor', root };
    }
  }
  
  return { type: 'unknown', root };
}

function analyzeRhythm(pattern) {
  const beatIndices = pattern.map((beat, index) => beat ? index : -1).filter(i => i >= 0);
  
  if (beatIndices.length < 2) {
    return { regularity: 0, period: 0, complexity: 0 };
  }
  
  const intervals = [];
  for (let i = 1; i < beatIndices.length; i++) {
    intervals.push(beatIndices[i] - beatIndices[i - 1]);
  }
  
  const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
  const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;
  
  return {
    regularity: 1 / (1 + variance),
    period: avgInterval,
    complexity: Math.sqrt(variance) / avgInterval
  };
}

function combineRhythms(patterns) {
  const maxLength = Math.max(...patterns.map(p => p.length));
  const lcm = patterns.reduce((acc, pattern) => lcmTwoNumbers(acc, pattern.length), 1);
  
  const combined = new Array(lcm).fill(0);
  
  patterns.forEach(pattern => {
    for (let i = 0; i < lcm; i++) {
      if (pattern[i % pattern.length]) {
        combined[i] = 1;
      }
    }
  });
  
  return combined;
}

function lcmTwoNumbers(a, b) {
  return Math.abs(a * b) / gcdTwoNumbers(a, b);
}

function gcdTwoNumbers(a, b) {
  return b === 0 ? a : gcdTwoNumbers(b, a % b);
}