/***
 * Instructions unit tests
 */

import {
  isValidLandingSpot,
  isValidInstructions,
  DIRECTIONS,
  INSTRUCTIONS
} from '../src/lib/instructions';

describe('Instruction methods for rover', () => {
  test('isValidLandingSpot passes good input', () => {
    expect(isValidLandingSpot('1 2 N')).toBe(true);
    expect(isValidLandingSpot('10 2 E')).toBe(true);
    expect(isValidLandingSpot('1 20 S')).toBe(true);
    expect(isValidLandingSpot('30 1000 W')).toBe(true);
    expect(isValidLandingSpot('1 2 N')).toBe(true);
    expect(isValidLandingSpot('3 3 E')).toBe(true);
    expect(isValidLandingSpot('0 0 E')).toBe(true);
  });

  test('isValidLandingSpot failes bad input', () => {
    expect(isValidLandingSpot('1 2 M')).toBe(false);
    expect(isValidLandingSpot('M 2 N')).toBe(false);
    expect(isValidLandingSpot('1 M S')).toBe(false);
    expect(isValidLandingSpot('15M')).toBe(false);
    expect(isValidLandingSpot('somethingrandom')).toBe(false);
    expect(isValidLandingSpot(undefined)).toBe(false);
    expect(isValidLandingSpot(null)).toBe(false);
    expect(isValidLandingSpot('-1 0 S')).toBe(false);
    expect(isValidLandingSpot('1 -1 S')).toBe(false);
  });

  test('isValidInstructions passes good input', () => {
    expect(isValidInstructions('')).toBe(true);
    expect(isValidInstructions('LMRM')).toBe(true);
    expect(isValidInstructions('LLLL')).toBe(true);
    expect(isValidInstructions('RRRR')).toBe(true);
    expect(isValidInstructions('LRLRLRLRRRR')).toBe(true);
    expect(isValidInstructions('LMLMLMLMM')).toBe(true);
    expect(isValidInstructions('MMRMMRMRRM')).toBe(true);
  });

  test('isValidInstructions fails bad input ', () => {
    expect(isValidInstructions('1')).toBe(false);
    expect(isValidInstructions('L2M')).toBe(false);
    expect(isValidInstructions('L L')).toBe(false);
    expect(isValidInstructions(' LLM')).toBe(false);
    expect(isValidInstructions('LLM ')).toBe(false);
    expect(isValidInstructions(undefined)).toBe(false);
    expect(isValidInstructions(null)).toBe(false);
  });
});
