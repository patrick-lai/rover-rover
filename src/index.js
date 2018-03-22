/***
 * Executes some text input for rovers on a plateau
 */

import fs from 'fs';
import { executeInput } from './main';

const filename = process.argv[2];
const { MAX_STACKING_ROVERS } = process.env;
const maxStackingRovers = parseInt(MAX_STACKING_ROVERS, 10);

// Checks
if (!filename) throw new Error('Please specify a filename');
if (isNaN(maxStackingRovers))
  throw new Error('Expected MAX_STACKING_ROVERS to be an Integer in env');

// Execute
fs.readFile(filename, 'utf8', (err, input) => {
  if (err) throw err;
  console.info(`Max rovers allowed at one point: ${maxStackingRovers}\n`);
  console.info(`Final rover states\n`);
  console.log(executeInput(input));
});
