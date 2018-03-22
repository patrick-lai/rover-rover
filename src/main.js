/***
 * From an input string execute some rovers on a plateau
 */

require('dotenv').config();
import Plateau from './lib/Plateau';
import Rover from './lib/Rover';
import { isValidLandingSpot, isValidInstructions } from './lib/instructions';

const filename = process.argv[2];
const { MAX_STACKING_ROVERS } = process.env;
const maxStackingRovers = parseInt(MAX_STACKING_ROVERS, 10);
if (isNaN(maxStackingRovers))
  throw new Error('Expected MAX_STACKING_ROVERS to be an Integer in env');

export const executeInput = data => {
  const rovers = [];
  // Split the data by lines, filter out trailing lines/spaces
  const rows = data.split('\n').filter(r => r && r !== '');

  // Consume first row
  const plateau = new Plateau({ maxStackingRovers, dimensions: rows.shift() });

  // Make some rovers
  while (rows.length > 0) {
    const landingSpot = rows.shift();
    const instructions = rows.shift();

    if (!isValidLandingSpot(landingSpot))
      throw new Error(`Invalid landing spot: ${landingSpot}`);

    if (!isValidInstructions(instructions))
      throw new Error(`Invalid instructions: ${instructions}`);

    const rover = new Rover({ landingSpot, instructions });
    plateau.deployRover(rover);
  }

  // Execute all rovers
  plateau.rovers.forEach(rover => {
    while (!rover.isCompleted()) plateau.executeNextInstructionOfRover(rover);
  });

  const roverStates = plateau.rovers.map(rover => plateau.getRoverState(rover));
  return roverStates.join('\n');
};
