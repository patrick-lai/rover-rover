# rover-rover

Library simulating rovers roaming around a rectangular plateau

### Usage

### Development

We code in `Es6`, please release build with `npm run release`.

Testing commands:

```
// Produces coverage report
npm run test

// Live reload tests
npm run watch:test
```

### Assumptions

* The rovers are smart and can weave past each other on a square.. however exists a MAX number before they done fit square. (lets make this configurable)

* If the instructions tell the rover to go off the plateau... its probably a good idea to just stop.. execution to save losing the expensive rover.

* The rover can see its initial (landing) position.

* Lets just reject landing any rovers areas that are initially off the plateau. But we will continue executing the rest of the fleet.

* The rovers are landed in sequence before moving any of them and we are just not going to land the rover if theres already MAX rovers on that square.

* A rover can just land and do nothing

* Rover must have a landing spot, If we have invalid instruction set we will not execute it at all. If it has a valid landing spot but invalid instructions.. we will land it but not execute anything.

* Casing of instruction is sensitive

### Journal

**Step 1) brain storm the problem**

* How many can fit on one square?
* What happens if the rover goes off the edge?
* How many rovers can land ontop of each other?
* All the nasty things happen on the execution of 'M'. so we can probably do something splitting the instructions by 'M' for validation.
* We prob want a Plateau class that can move around instances of Rovers, the rovers store the instructions

**Step 2) Design**

Lets try to build a library that handles various situations and make realistic assumptions. Lets make it as flexible as possible.

Probably want it to be imported by an API service and share its validators with front end.

Lets try to make it stateful so if we ever get to the front end we can maybe leverage off it to do some fancy animation ;).

**Step 3) Test cases (and some invariants)**

1. Validate input returning correct warnings
2. Check fleet has seen all directions
3. Rover lands and moves correctly around the plateau
4. You can't land a rover off the plateau
5. You can't drive a rover off the plateau

**step 4) Build...**

* 1st Session ~ 1.5 hours
* 2nd Session ~ 1 hour

total: 2.5 hours
