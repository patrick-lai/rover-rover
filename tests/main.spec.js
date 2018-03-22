import fs from 'fs';
import { executeInput } from '../src/main';

// OVERRIDE ENV
process.env.MAX_STACKING_ROVERS = 1;

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

  test('One failing doesnt stop the whole fleet', done => {
    const SAMPLE_FILE = './tests/sampleData/crash.txt';
    fs.readFile(SAMPLE_FILE, 'utf8', (err, input) => {
      if (err) throw err;
      expect(executeInput(input)).toMatchSnapshot();
      done();
    });
  });

  test('Rover stops before it goes off the plateau', done => {
    const SAMPLE_FILE = './tests/sampleData/outOfBounds.txt';
    fs.readFile(SAMPLE_FILE, 'utf8', (err, input) => {
      if (err) throw err;
      expect(executeInput(input)).toMatchSnapshot();
      done();
    });
  });
});
