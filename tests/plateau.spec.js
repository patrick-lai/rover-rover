/***
 * Rover unit tests
 */

import Plateau from '../src/lib/Plateau';
import Rover from '../src/lib/Rover';

describe('Rover behaviour', () => {
  test('Can instantiate a plateau', () => {
    new Plateau({ dimensions: '1 1', maxStackingRovers: 1 });
    new Plateau({ dimensions: '600 100', maxStackingRovers: 999 });
  });

  test('Can not instantiate a bad plateau', () => {
    expect(
      () => new Plateau({ dimensions: '1 1', maxStackingRovers: 0 })
    ).toThrow();
    expect(
      () => new Plateau({ dimensions: 'apple', maxStackingRovers: 999 })
    ).toThrow();
    expect(
      () => new Plateau({ dimensions: null, maxStackingRovers: 1 })
    ).toThrow();
    expect(
      () => new Plateau({ dimensions: '1 1', maxStackingRovers: null })
    ).toThrow();
    expect(() => new Plateau()).toThrow();
  });

  test('Can deploy some rovers', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 3 });
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

  test('Cannot deploy more rovers than max', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 2 });
    const r1 = new Rover({ landingSpot: '1 1 N' });
    const r2 = new Rover({ landingSpot: '1 1 E' });
    const r3 = new Rover({ landingSpot: '1 1 W' });

    plateau.deployRover(r1);
    expect(plateau.rovers.length).toBe(1);
    plateau.deployRover(r2);
    expect(plateau.rovers.length).toBe(2);
    // 3rd one shouldn't fit
    expect(() => plateau.deployRover(r3)).toThrow();
    expect(plateau.rovers.length).toBe(2);
  });

  test('Can correctly retrieve a rovers state', () => {
    const plateau = new Plateau({ dimensions: '6 3', maxStackingRovers: 5 });
    const r1 = new Rover({ landingSpot: '1 2 N' });
    const r2 = new Rover({ landingSpot: '5 0 E' });
    const r3 = new Rover({ landingSpot: '3 3 W' });

    plateau.deployRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([1, 2, 'N']);
    plateau.deployRover(r2);
    expect(plateau.getRoverState(r2)).toEqual([5, 0, 'E']);
    // 3rd one shouldn't fit
    plateau.deployRover(r3);
    expect(plateau.getRoverState(r3)).toEqual([3, 3, 'W']);
  });

  test('Can migrate a rover', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 5 });
    const r1 = new Rover({ landingSpot: '1 2 N', instructions: 'MM' });

    plateau.deployRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([1, 2, 'N']);
    plateau._migrateRover(r1, { x: 2, y: 2 });
    expect(plateau.getRoverState(r1)).toEqual([2, 2, 'N']);
    plateau._migrateRover(r1, { x: 5, y: 3 });
    expect(plateau.getRoverState(r1)).toEqual([5, 3, 'N']);
    plateau._migrateRover(r1, { x: 0, y: 0 });
    expect(plateau.getRoverState(r1)).toEqual([0, 0, 'N']);
  });

  test('Can not migrate a rover out of bounds', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 5 });
    const r1 = new Rover({ landingSpot: '1 2 N' });

    plateau.deployRover(r1);
    expect(() => plateau._migrateRover(r1, { x: 10, y: 2 })).toThrow();
    expect(() => plateau._migrateRover(r1, { x: 5, y: 12 })).toThrow();
  });

  test('Can execute a rovers instructions', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 5 });
    const r1 = new Rover({
      landingSpot: '1 2 N',
      instructions: 'LLRRMMLMLMLM'
    });

    plateau.deployRover(r1);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([1, 2, 'W']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([1, 2, 'S']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([1, 2, 'W']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([1, 2, 'N']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([1, 3, 'N']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([1, 4, 'N']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([1, 4, 'W']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([0, 4, 'W']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([0, 4, 'S']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([0, 3, 'S']);
    plateau.executeNextInstructionOfRover(r1);
    expect(plateau.getRoverState(r1)).toEqual([0, 3, 'E']);
  });

  test('Cannot move a rover into a slot that doesnt have room', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 2 });
    const r1 = new Rover({ landingSpot: '1 1 N', instructions: 'M' });
    const r2 = new Rover({ landingSpot: '1 2 N' });
    const r3 = new Rover({ landingSpot: '1 2 N' });

    plateau.deployRover(r1);
    plateau.deployRover(r2);
    plateau.deployRover(r3);

    expect(plateau.getRoverState(r1)).toEqual([1, 1, 'N']);
    expect(() => plateau.executeNextInstructionOfRover(r1)).toThrow();
    expect(plateau.getRoverState(r1)).toEqual([1, 1, 'N']);
    expect(r1.disabled).toBe(true);
  });

  test('Cannot move disabled rover', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 2 });
    const r1 = new Rover({ landingSpot: '1 1 N', instructions: 'M' });

    plateau.deployRover(r1);
    r1.disable();
    expect(r1.disabled).toBe(true);
    expect(() => plateau.executeNextInstructionOfRover(r1)).toThrow();
  });

  test('Can check if completed mission', () => {
    const plateau = new Plateau({ dimensions: '5 5', maxStackingRovers: 2 });
    const r1 = new Rover({ landingSpot: '1 1 N', instructions: 'M' });
    const r2 = new Rover({ landingSpot: '1 2 E', instructions: 'LLLL' });

    plateau.deployRover(r1);
    plateau.deployRover(r2);

    expect(plateau.hasCompletedMission()).toBe(false);
    while (!r2.isCompleted()) plateau.executeNextInstructionOfRover(r2);
    expect(plateau.hasCompletedMission()).toBe(true);
  });
});
