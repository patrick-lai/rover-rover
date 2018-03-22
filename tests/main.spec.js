import fs from 'fs';
import { executeInput } from '../src/main';

describe('Rover behaviour', () => {
  test('Can run test case', done => {
    const SAMPLE_FILE = './tests/sampleData/sampleInput.txt';
    fs.readFile(SAMPLE_FILE, 'utf8', (err, input) => {
      if (err) throw err;
      expect(executeInput(input)).toMatchSnapshot();
      done();
    });
  });

  test('Can run large complex case', done => {
    const SAMPLE_FILE = './tests/sampleData/largeGrid.txt';
    fs.readFile(SAMPLE_FILE, 'utf8', (err, input) => {
      if (err) throw err;
      expect(executeInput(input)).toMatchSnapshot();
      done();
    });
  });
});
