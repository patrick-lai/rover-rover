/***
 * Generate an n*m iterable plateau
 * Handles rover movement
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

const parseDimensions = input => {
  if (!validateDimensions(input))
    throw new Error('Invalid dimensions, must be 2 Ints spaced');

  return input.split(' ').map(d => parseInt(d, 10));
};

export default class Plateau {
  // Internal representation of the plateau grid
  // This is going to be an NxM 2d array of rovers (also an array)
  grid = null;
  // This is purely to keep order of entry
  rovers = [];
  // Maximum rovers that can fit on a single square
  maxStackingRovers;

  constructor(config = {}) {
    const { maxStackingRovers, dimensions } = config;

    if (!validateMaxStackingRovers(maxStackingRovers))
      throw new Error(
        'Invalid maxStackingRovers, must be an integer larger than 0'
      );

    // Validation of dimensions is done inside this function
    const _size = parseDimensions(dimensions);
    this.maxStackingRovers = maxStackingRovers;

    // Init the grid
    // NOTE - gotta fill it with undefined pointers else we cant map
    // NOTE - co-ordinates start from 0 so make sure to +1 to the index
    this.grid = new Array(_size[0] + 1)
      .fill(undefined)
      .map((x, i) => new Array(_size[1] + 1).fill(undefined).map(() => []));
  }

  /*
   * Utilities
   */

  // DEBUG
  _printGrid = () => {
    for (const x in this.grid)
      for (const y in this.grid[x])
        console.log(`${x},${y} rovers:${this.grid[x][y].length}`);
  };

  // Validate if a target location is in bounds
  _isInBounds = target => {
    const { x, y } = target;
    return x < this.grid.length && y < this.grid[x].length && x >= 0 && y >= 0;
  };

  _getRovers = target => this.grid[target.x][target.y];
  _placeRover = (rover, target) => {
    const { x, y } = target;
    // Check if the rover can fit on the square
    if (!this._isInBounds(target))
      throw new Error('Cannot place a rover out of bounds');

    const roversOnTarget = this._getRovers(target).length;

    if (roversOnTarget >= this.maxStackingRovers) {
      rover.disable();
      throw new Error(
        `Cannot place rover on ${x},${y}. Maximum rovers reached. Rover has been disabled`
      );
    }

    this.grid[x][y].push(rover);
  };

  // NOTE - Allow it to jump
  _migrateRover = (rover, target) => {
    if (!this._isInBounds(target))
      throw new Error('Cannot place a rover out of bounds');

    // Find the rover and then shift it into new spot
    for (const x in this.grid)
      for (const y in this.grid[x]) {
        const index = this.grid[x][y].findIndex(r => r === rover);
        if (index > -1) {
          // Place rover first so if it errors we stop here
          this._placeRover(rover, target);
          // Splice out the rover and add it to the target
          const _rovers = this.grid[x][y].splice(index, 1);
          return;
        }
      }
  };

  getRoverState = rover => {
    // Find the rover in our grid
    // TODO - We should be using normal for-loop
    for (const x in this.grid)
      for (const y in this.grid[x])
        if (this.grid[x][y].includes(rover))
          return [parseInt(x, 10), parseInt(y, 10), rover.facing];

    // Else cant find it
    throw new Error('Cannot find rover');
  };

  _moveForward = rover => {
    const state = this.getRoverState(rover);
    let target;
    switch (state[2]) {
      case 'N':
        target = { x: state[0], y: state[1] + 1 };
        break;
      case 'E':
        target = { x: state[0] + 1, y: state[1] };
        break;
      case 'S':
        target = { x: state[0], y: state[1] - 1 };
        break;
      case 'W':
        target = { x: state[0] - 1, y: state[1] };
        break;
      default:
        throw new Error(`Rover facing unknown direction: ${state[2]}`);
    }

    if (!this._isInBounds(target)) {
      console.warn('Rover is trying to move out of bounds, disabling rover');
      rover.disable();
    }

    // Finally migrate the rover forward
    this._migrateRover(rover, target);
  };

  /*
   * Public Methods
   */

  deployRover = rover => {
    const { landingSpot } = rover;
    if (rover.constructor !== Rover) throw new Error('Can only add type Rover');
    // Put the rover on the grid
    this._placeRover(rover, { x: landingSpot[0], y: landingSpot[1] });
    // Lets init it as per spec/assumptions
    rover.init();
    // Add the rover into our sequence to keep track of things
    this.rovers.push(rover);
  };

  executeNextInstructionOfRover = rover => {
    const instruction = rover.executeNextInstruction();
    switch (instruction) {
      case 'M':
        // Move the rover forward
        this._moveForward(rover);
      default:
      //Do nothing on the plateau
    }
  };
}
