/***
 * Rover unit tests
 */

import Rover from '../src/Rover';

describe('Rover behaviour', () => {
  test('Can instantiate a rover', () => {
    const r1 = new Rover({ landingSpot: '1 2 N', instructions: 'LMLMLMLMM' });
    const r2 = new Rover({ landingSpot: '1 2 N' });
  });

  test('Cannot instantiate on bad landingSpot', () => {
    expect(() => new Rover({ landingSpot: '12P' })).toThrow();
    expect(() => new Rover()).toThrow();
  });

  test('Rover inits with right direction and has seen it', () => {
    const north = new Rover({ landingSpot: '1 1 N' });
    const east = new Rover({ landingSpot: '1 1 E' });
    const south = new Rover({ landingSpot: '1 1 S' });
    const west = new Rover({ landingSpot: '1 1 W' });

    // Init rovers
    north.init();
    east.init();
    south.init();
    west.init();

    expect(north.hasSeen(['N'])).toBe(true);
    expect(east.hasSeen(['E'])).toBe(true);
    expect(south.hasSeen(['S'])).toBe(true);
    expect(west.hasSeen(['W'])).toBe(true);
  });

  test('Cannot double init', () => {
    const r1 = new Rover({ landingSpot: '1 1 N' });
    r1.init();
    expect(() => r1.init()).toThrow();
  });

  test('Can Execute an instruction', () => {
    const r1 = new Rover({ landingSpot: '1 1 N', instructions: 'LLLLRRRRM' });
    r1.init();

    // Full rotation anti-clockwise
    expect(r1.executeNextInstruction()).toBe('L');
    expect(r1.facing).toBe('W');
    expect(r1.executeNextInstruction()).toBe('L');
    expect(r1.facing).toBe('S');
    expect(r1.executeNextInstruction()).toBe('L');
    expect(r1.facing).toBe('E');
    expect(r1.executeNextInstruction()).toBe('L');
    expect(r1.facing).toBe('N');

    // Full rotation clockwise
    expect(r1.executeNextInstruction()).toBe('R');
    expect(r1.facing).toBe('E');
    expect(r1.executeNextInstruction()).toBe('R');
    expect(r1.facing).toBe('S');
    expect(r1.executeNextInstruction()).toBe('R');
    expect(r1.facing).toBe('W');
    expect(r1.executeNextInstruction()).toBe('R');
    expect(r1.facing).toBe('N');

    expect(r1.executeNextInstruction()).toBe('M');
    expect(r1.facing).toBe('N');
  });
});
