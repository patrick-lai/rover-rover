/***
 * A simple rover
 */

import {
  isValidLandingSpot,
  isValidInstructions,
  DIRECTIONS,
  INSTRUCTIONS
} from './instructions';

export default class Rover {
  constructor(config = {}) {
    const { instructions, landingSpot } = config;

    // Setup data structures (Array)
    this.instructions = instructions.split('');
    this.landingSpot = landingSpot.split(' ');

    // We want to disable the rover if it tries to do anything unexpected
    this.disabled = false;
    this.facing = null;
    this.warnings = [];

    // Check config
    if (!landingSpot)
      throw new Error('Rover cannot be constructed without a landingSpot');

    if (!isValidLandingSpot(landingSpot))
      throw new Error('Invalid landing spot');

    if (!isValidInstructions(instructions))
      this.warnings.push['Invalid instructions'];
  }

  // Initiates a rover and sets its initial facing position
  // useful when we want to control when to land it
  init = () => {
    this.facing = landingSpot[2];
  };

  getFacing = this.facing;

  executeInstruction = () => {};

  isCompleted = () => this.instructions.length === 0;
}
