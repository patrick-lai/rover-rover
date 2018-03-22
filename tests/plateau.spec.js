/***
 * Rover unit tests
 */

import Plateau from '../src/Plateau';
import Rover from '../src/Rover';

describe('Rover behaviour', () => {
  test('Can instantiate a plateau', () => {
    new Plateau({ dimensions: '1 1', maxStackingRovers: 1 });
    new Plateau({ dimensions: '600 100', maxStackingRovers: 999 });
  });

  test('Can not instantiate a bad plateau', () => {
    expect(() => new Plateau({ dimensions: '1 1', maxStackingRovers: 0 })).toThrow();
    expect(() => new Plateau({ dimensions: 'apple', maxStackingRovers: 999 })).toThrow();
    expect(() => new Plateau({ dimensions: null, maxStackingRovers: 1 })).toThrow();
    expect(() => new Plateau({ dimensions: '1 1', maxStackingRovers: null })).toThrow();
    expect(() => new Plateau()).toThrow();
  });

  test('Can deploy some rovers', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 2 });
    const r1 = new Rover({ landingSpot: '1 1 N' });
    const r2 = new Rover({ landingSpot: '1 2 E' });

    // Same spot as r2
    const r3 = new Rover({ landingSpot: '1 3 W' });

    plateau.deployRover(r1);
    expect(plateau.rovers.length).toBe(1);
    expect(r1.facing).toBe('N');

    plateau.deployRover(r2);
    expect(plateau.rovers.length).toBe(2);
    expect(r2.facing).toBe('E');

    plateau.deployRover(r3);
    expect(plateau.rovers.length).toBe(3);
    expect(r3.facing).toBe('W');
  });

  xtest('Cannot deploy more rovers than max', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 2 });
    const r1 = new Rover({ landingSpot: '1 1 N' });
    const r2 = new Rover({ landingSpot: '1 1 E' });
    const r3 = new Rover({ landingSpot: '1 1 W' });

    plateau.deployRover(r1);
    expect(plateau.rovers.length).toBe(1);
    plateau.deployRover(r2);
    expect(plateau.rovers.length).toBe(2);
    // 3rd one shouldn't fit
    expect(plateau.deployRover(r3)).toThrow();
    expect(plateau.rovers.length).toBe(2);
  });
});
