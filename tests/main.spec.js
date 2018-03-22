import fs from 'fs';
import { executeInput } from '../src/main';

const SAMPLE_FILE = './tests/sampleInput.txt';

describe('Rover behaviour', () => {
  test('Can run test case', done => {
    fs.readFile(SAMPLE_FILE, 'utf8', (err, input) => {
      if (err) throw err;
      expect(executeInput(input)).toMatchSnapshot();
      done();
    });
  });
});
