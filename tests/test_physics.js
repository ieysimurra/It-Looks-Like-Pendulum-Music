/**
 * Physics Tests for Interactive Musical Pendulums
 * 
 * Tests the physics simulation, pendulum behavior, and mathematical accuracy.
 */

describe('Pendulum Physics', () => {
  let pendulum;
  
  beforeEach(() => {
    pendulum = TestUtils.createTestPendulum();
  });
  
  describe('Basic Physics Properties', () => {
    test('should initialize with correct properties', () => {
      expect(pendulum.arm1.length).toBe(100);
      expect(pendulum.arm2.length).toBe(100);
      expect(pendulum.arm1.mass).toBe(15);
      expect(pendulum.arm2.mass).toBe(15);
      expect(pendulum.arm1.angle).toBeNearlyEqual(Math.PI / 4);
      expect(pendulum.arm2.angle).toBeNearlyEqual(Math.PI / 4);
    });
    
    test('should have zero initial velocity', () => {
      expect(pendulum.arm1.aVelocity).toBe(0);
      expect(pendulum.arm2.aVelocity).toBe(0);
    });
    
    test('should calculate position correctly', () => {
      const expectedX1 = pendulum.arm1.origin.x + pendulum.arm1.length * Math.sin(pendulum.arm1.angle);
      const expectedY1 = pendulum.arm1.origin.y + pendulum.arm1.length * Math.cos(pendulum.arm1.angle);
      
      expect(pendulum.arm1.position.x).toBeNearlyEqual(expectedX1);
      expect(pendulum.arm1.position.y).toBeNearlyEqual(expectedY1);
    });
  });
  
  describe('Energy Conservation', () => {
    test('should conserve energy in ideal system', () => {
      const initialEnergy = TestUtils.calculateEnergy(pendulum);
      
      // Simulate motion without damping
      const originalDamping = 0.99;
      pendulum.arm1.damping = 1.0; // No damping
      pendulum.arm2.damping = 1.0;
      
      TestUtils.simulatePendulumMotion(pendulum, 100);
      
      const finalEnergy = TestUtils.calculateEnergy(pendulum);
      
      // Energy should be conserved (within numerical precision)
      expect(Math.abs(finalEnergy.total - initialEnergy.total)).toBeLessThan(0.1);
    });
    
    test('should lose energy with damping', () => {
      const initialEnergy = TestUtils.calculateEnergy(pendulum);
      
      TestUtils.simulatePendulumMotion(pendulum, 100);
      
      const finalEnergy = TestUtils.calculateEnergy(pendulum);
      
      // Energy should decrease due to damping
      expect(finalEnergy.total).toBeLessThan(initialEnergy.total);
    });
    
    test('should convert between kinetic and potential energy', () => {
      // Start with pendulum at maximum displacement
      pendulum.arm1.angle = Math.PI / 2;
      pendulum.arm1.aVelocity = 0;
      
      const motionData = TestUtils.simulatePendulumMotion(pendulum, 50);
      
      // Check that energy oscillates between kinetic and potential
      let maxKinetic = 0;
      let minKinetic = Infinity;
      
      motionData.forEach(data => {
        const energy = TestUtils.calculateEnergy(pendulum);
        maxKinetic = Math.max(maxKinetic, energy.kinetic);
        minKinetic = Math.min(minKinetic, energy.kinetic);
      });
      
      expect(maxKinetic).toBeGreaterThan(minKinetic);
    });
  });
  
  describe('Pendulum Period', () => {
    test('should have period related to length', () => {
      const shortPendulum = TestUtils.createTestPendulum({ length1: 50, length2: 50 });
      const longPendulum = TestUtils.createTestPendulum({ length1: 200, length2: 200 });
      
      const shortPeriod = calculateApproximatePeriod(shortPendulum);
      const longPeriod = calculateApproximatePeriod(longPendulum);
      
      // Longer pendulum should have longer period
      expect(longPeriod).toBeGreaterThan(shortPeriod);
    });
    
    test('should have period related to gravity', () => {
      const lowGravity = TestUtils.createTestPendulum({ gravity: 0.5 });
      const highGravity = TestUtils.createTestPendulum({ gravity: 2.0 });
      
      const lowGravityPeriod = calculateApproximatePeriod(lowGravity);
      const highGravityPeriod = calculateApproximatePeriod(highGravity);
      
      // Higher gravity should result in shorter period
      expect(highGravityPeriod).toBeLessThan(lowGravityPeriod);
    });
  });
  
  describe('Chaotic Behavior', () => {
    test('should exhibit sensitive dependence on initial conditions', () => {
      const pendulum1 = TestUtils.createTestPendulum({ angle1: Math.PI / 4 });
      const pendulum2 = TestUtils.createTestPendulum({ angle1: Math.PI / 4 + 0.001 }); // Tiny difference
      
      const motion1 = TestUtils.simulatePendulumMotion(pendulum1, 200);
      const motion2 = TestUtils.simulatePendulumMotion(pendulum2, 200);
      
      // Calculate divergence over time
      const divergence = motion1.map((data1, index) => {
        const data2 = motion2[index];
        return Math.abs(data1.angle1 - data2.angle1) + Math.abs(data1.angle2 - data2.angle2);
      });
      
      // Divergence should grow over time (butterfly effect)
      const initialDivergence = divergence[10];
      const finalDivergence = divergence[divergence.length - 1];
      
      expect(finalDivergence).toBeGreaterThan(initialDivergence * 2);
    });
    
    test('should show different behavior with different mass ratios', () => {
      const equalMass = TestUtils.createTestPendulum({ mass1: 15, mass2: 15 });
      const unequalMass = TestUtils.createTestPendulum({ mass1: 5, mass2: 25 });
      
      const equalMotion = TestUtils.simulatePendulumMotion(equalMass, 100);
      const unequalMotion = TestUtils.simulatePendulumMotion(unequalMass, 100);
      
      // Calculate motion complexity (variance in velocity)
      const equalComplexity = calculateMotionComplexity(equalMotion);
      const unequalComplexity = calculateMotionComplexity(unequalMotion);
      
      // Different mass ratios should produce different motion patterns
      expect(Math.abs(equalComplexity - unequalComplexity)).toBeGreaterThan(0.1);
    });
  });
  
  describe('Extreme Conditions', () => {
    test('should handle zero gravity', () => {
      pendulum.arm1.gravity = 0;
      pendulum.arm2.gravity = 0;
      
      const motionData = TestUtils.simulatePendulumMotion(pendulum, 50);
      
      // With zero gravity, angular velocity should remain constant (no damping)
      if (pendulum.arm1.aVelocity === 0) {
        motionData.forEach(data => {
          expect(data.velocity1).toBeNearlyEqual(0, 3);
        });
      }
    });
    
    test('should handle negative gravity', () => {
      pendulum.arm1.gravity = -1;
      pendulum.arm2.gravity = -1;
      
      // Should not crash and should produce valid motion
      expect(() => {
        TestUtils.simulatePendulumMotion(pendulum, 50);
      }).not.toThrow();
    });
    
    test('should handle very small masses', () => {
      pendulum.arm1.mass = 0.1;
      pendulum.arm2.mass = 0.1;
      
      expect(() => {
        TestUtils.simulatePendulumMotion(pendulum, 50);
      }).not.toThrow();
    });
    
    test('should handle very large masses', () => {
      pendulum.arm1.mass = 1000;
      pendulum.arm2.mass = 1000;
      
      expect(() => {
        TestUtils.simulatePendulumMotion(pendulum, 50);
      }).not.toThrow();
    });
  });
  
  describe('Numerical Stability', () => {
    test('should remain stable over long simulations', () => {
      const longMotion = TestUtils.simulatePendulumMotion(pendulum, 1000);
      
      // Check that values don't become NaN or infinite
      longMotion.forEach(data => {
        expect(isFinite(data.angle1)).toBe(true);
        expect(isFinite(data.angle2)).toBe(true);
        expect(isFinite(data.velocity1)).toBe(true);
        expect(isFinite(data.velocity2)).toBe(true);
        expect(isNaN(data.angle1)).toBe(false);
        expect(isNaN(data.angle2)).toBe(false);
      });
    });
    
    test('should handle rapid oscillations', () => {
      // Create conditions for rapid oscillation
      pendulum.arm1.aVelocity = 10;
      pendulum.arm2.aVelocity = -10;
      
      expect(() => {
        TestUtils.simulatePendulumMotion(pendulum, 100, 1/120); // High frequency update
      }).not.toThrow();
    });
  });
  
  describe('Performance', () => {
    test('should simulate efficiently', () => {
      const benchmark = PerformanceUtils.benchmarkFunction(() => {
        TestUtils.simulatePendulumMotion(pendulum, 60); // One second at 60fps
      }, 100);
      
      // Should complete simulation in reasonable time
      expect(benchmark.average).toBeLessThan(10); // 10ms average
      expect(benchmark.max).toBeLessThan(50); // 50ms maximum
    });
  });
});

describe('Physics Utility Functions', () => {
  describe('Angle Normalization', () => {
    test('should normalize angles to 0-2π range', () => {
      expect(normalizeAngle(3 * Math.PI)).toBeNearlyEqual(Math.PI);
      expect(normalizeAngle(-Math.PI / 2)).toBeNearlyEqual(3 * Math.PI / 2);
      expect(normalizeAngle(0)).toBeNearlyEqual(0);
      expect(normalizeAngle(2 * Math.PI)).toBeNearlyEqual(0);
    });
  });
  
  describe('Vector Operations', () => {
    test('should add vectors correctly', () => {
      const v1 = createVector(3, 4);
      const v2 = createVector(1, 2);
      const result = addVectors(v1, v2);
      
      expect(result.x).toBe(4);
      expect(result.y).toBe(6);
    });
    
    test('should calculate vector magnitude', () => {
      const v = createVector(3, 4);
      const magnitude = vectorMagnitude(v);
      
      expect(magnitude).toBeNearlyEqual(5);
    });
  });
  
  describe('Energy Calculations', () => {
    test('should calculate kinetic energy correctly', () => {
      const pendulum = TestUtils.createTestPendulum({
        mass1: 10,
        mass2: 20
      });
      
      pendulum.arm1.aVelocity = 2;
      pendulum.arm2.aVelocity = 1;
      
      const energy = TestUtils.calculateEnergy(pendulum);
      
      // KE = 0.5 * m * v²
      const expectedKE1 = 0.5 * 10 * 4; // 20
      const expectedKE2 = 0.5 * 20 * 1; // 10
      
      expect(energy.kinetic).toBeNearlyEqual(expectedKE1 + expectedKE2);
    });
  });
});

// Helper functions for tests
function calculateApproximatePeriod(pendulum) {
  const motionData = TestUtils.simulatePendulumMotion(pendulum, 200);
  
  // Find peaks in angle to estimate period
  const peaks = [];
  for (let i = 1; i < motionData.length - 1; i++) {
    if (motionData[i].angle1 > motionData[i-1].angle1 && 
        motionData[i].angle1 > motionData[i+1].angle1) {
      peaks.push(motionData[i].time);
    }
  }
  
  if (peaks.length < 2) return Infinity;
  
  // Average period between peaks
  const periods = [];
  for (let i = 1; i < peaks.length; i++) {
    periods.push(peaks[i] - peaks[i-1]);
  }
  
  return periods.reduce((sum, period) => sum + period, 0) / periods.length;
}

function calculateMotionComplexity(motionData) {
  const velocities = motionData.map(data => Math.abs(data.velocity1) + Math.abs(data.velocity2));
  const mean = velocities.reduce((sum, v) => sum + v, 0) / velocities.length;
  const variance = velocities.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / velocities.length;
  
  return Math.sqrt(variance);
}

function normalizeAngle(angle) {
  return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
}

function addVectors(v1, v2) {
  return createVector(v1.x + v2.x, v1.y + v2.y);
}

function vectorMagnitude(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}