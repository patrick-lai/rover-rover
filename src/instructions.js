/***
 * Definitions of instructions and some helpers
 */

export const DIRECTIONS = ['N', 'E', 'S', 'W'];
export const INSTRUCTIONS = ['L', 'R', 'M'];

// Expected Format: Int Int Direction
export const isValidLandingSpot = input => {
  if (typeof input !== 'string') return false;
  // Lets just ignore extra instructions
  const landingSpot = input.split(' ');
  if (isNaN(parseInt(landingSpot[0], 10))) return false;
  if (isNaN(parseInt(landingSpot[1], 10))) return false;
  if (!DIRECTIONS.includes(landingSpot[2])) return false;
  return true;
};

// Just check if each instruction is valid
export const isValidInstructions = instructions => {
  if (typeof instructions !== 'string') return false;
  const _instructions = instructions.split('');
  for (const i of _instructions) if (!INSTRUCTIONS.includes(i)) return false;
  return true;
};
