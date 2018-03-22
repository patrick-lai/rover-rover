/***
 * A simple rover
 */

import { isValidLandingSpot, isValidInstructions, DIRECTIONS, INSTRUCTIONS } from './instructions';

export default class Rover {
  // We want to disable the rover if it tries to do anything unexpected
  disabled = false;
  // Currently facing direction
  facing = null;
  // List of seen directions
  seen = [];
  // Some warning messages
  warnings = [];

  constructor(config = {}) {
    const { instructions, landingSpot } = config;
    if (!isValidLandingSpot(landingSpot)) throw new Error('Invalid landing spot');
    if (!isValidInstructions(instructions)) this.warnings.push['Invalid instructions'];

    // Setup data structures (Array)
    this.landingSpot = landingSpot.split(' ');
    this.instructions = instructions && instructions.split('');

    // Check config
    if (!landingSpot) throw new Error('Rover cannot be constructed without a landingSpot');
  }

  /*
   * Utilities
   */

  _isCompleted = () => this.instructions.length === 0;

  /*
   * Public methods
   */

  // Initiates a rover and sets its initial facing position
  // useful when we want to control when to land it
  init = () => this.setFacing(this.landingSpot[2]);

  // We purposely wont have a method to enable it
  disableRover = () => {
    this.disabled = true;
  };

  // Adds a direction to seen and set new facing direction
  setFacing = direction => {
    const { seen } = this;
    if (!DIRECTIONS.includes(direction)) throw new Error('Invalid direction');
    if (!seen.includes(direction)) seen.push(direction);
    this.facing = direction;
    return this.facing;
  };

  // Checks if the rover has seen a list of directions
  hasSeen = directions => {
    if (!Array.isArray(directions)) throw new Error('Expected array as an input for hasSeen');
    for (const d of directions) if (!this.seen.includes(d)) return false;
    return true;
  };

  executeNextInstruction = () => {
    if (this.facing === null) throw new Error('Rover has not be landed yet');
    if (this.disabled) return console.warn('Rover has been disabled, failed to execute instruction');
    if (this._isCompleted()) return console.warn('Tried to execute an empty instruction set');

    // NOTE - we can look to save it in an executed log but unneccesary for now
    const instruction = this.instructions.shift();

    // Used to calculate new direction
    const index = DIRECTIONS.indexOf(this.facing);
    let newDirection;

    switch (instruction) {
      case 'L':
        newDirection = DIRECTIONS[index > 0 ? index - 1 : DIRECTIONS.length - 1];
        break;
      case 'R':
        newDirection = DIRECTIONS[index < DIRECTIONS.length - 1 ? index + 1 : 0];
        break;
      case 'M':
        // Do nothing the plateau handles this
        break;
      default:
        throw new Error(`Unexpected instruction ${instruction}`);
    }

    // Update the new direction
    if (newDirection) this.setFacing(newDirection);

    return instruction;
  };
}
