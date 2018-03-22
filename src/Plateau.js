/***
 * Generate an n*n iterable plateau
 * Handles rover movement
 */

/*
 * Helpers
 */

import Rover from './Rover';

const validateMaxStackingRovers = input => input > 0;

const validateDimensions = input => {
  // Lets just ignore extra instructions
  const dimensions = input.split(' ');

  const width = parseInt(dimensions[0], 10);
  const height = parseInt(dimensions[1], 10);

  if (isNaN(width) || width < 1) return false;
  if (isNaN(height) || height < 1) return false;
  return true;
};

export default class Plateau {
  rovers = [];
  maxStackingRovers;
  constructor(config = {}) {
    const { maxStackingRovers, dimensions } = config;

    if (!validateDimensions(dimensions)) throw new Error('Invalid dimensions, must be 2 Ints spaced');
    if (!validateMaxStackingRovers(maxStackingRovers))
      throw new Error('Invalid maxStackingRovers, must be an integer larger than 0');

    this.maxStackingRovers = maxStackingRovers;
  }

  deployRover = rover => {
    if (rover.constructor !== Rover) throw new Error('Can only add type Rover');
    this.rovers.push(rover);

    // Lets land it as per spec
    rover.init();
  };
}
