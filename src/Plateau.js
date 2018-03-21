/***
 * Generate an n*n iterable plateau
 * Handles rover movement
 */

class Plateau {
  constructor(config = {}) {
    const { maxStackingRovers } = config;
    if (!maxStackingRovers) throw new Error('Must specify maxStackingRovers');
  }
}
