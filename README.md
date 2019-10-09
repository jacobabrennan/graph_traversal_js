# PathFinding.js

PathFinding.js provides algorithms and data structures commonly used for finding paths across nodes on a graph. Path finding is often used to find a literal path through physical space, but can also solve many other complex problems modelled as graphs.

This repository offers these algorithms and data structures as an ES6 module, for inclusing in JavaScript projects.

## Contents
- **[Installation and Use](#installation-and-use)**
    - **[NodeJS](#nodejs)**
    - **[HTML](#html)**
- **[Documentation](#documentation)**
    - **[PriorityQueue](#priorityqueue)**
    - **[A*](#astar)**

## Installation and Use

### NodeJS

1. Add PathFinding.js to your project via NPM

    ```sh
    npm install @jacobabrennan/pathfinding
    ```
    
2. Import the module in your code
    
    ```js
    import * as pathFinding from '@jacobabrennan/pathfinding';
    ```

3. Enable ES6 modules.

    As of v12.11.1, Node.js doesn't allow the use of ES6 modules without the ```--experimental-modules``` flag. You can read about enabling ES6 modules in Node.js in the [official documentation](https://nodejs.org/api/esm.html#esm_ecmascript_modules).
  
    ```sh
    node --experimental-modules app.js
    ```

### HTML

1. Download and unzip the repository into your project's scripts repository

2. Import the module directly

    ```js
    import * as pathFinding from './scripts_directory/path_finding';
    ```

## Documentation

### PriorityQueue
A priority queue is a data structure used to keep items sorted by priority. As items are added to the queue, they are placed in order based on a sorting function. The highest priority item can be popped from the queue at any time without disrupting the order of the queue.

#### Constructor Parameters:
- **comparator**(**N1**, **N2**): A function which accepts two arguments, N1 and N2, and returns their sort order. Must return 1 when P1 has greater priority, -1 when P2 has greater priority, and 0 if N1 and N2 have equal priority.
  
#### Properties:
- length: The number of items in the queue.

#### Methods:
- **push**(**newItem**): Adds newItem to the queue
- **pop**(): Removes and returns the item with the greatest priority
- **peek**(): Returns the item with the greatest priority, without removing it
- **contains**(**testItem**): Returns true if item is in queue, false otherwise

#### Example:
       
```js
import {PriorityQueue} from './path_finder';
let minComparator(N1, N2) {
    return Math.sign(costTotal(N2) - costTotal(N1));
}
let minQueue = new PriorityQueue(minComparator);
minQueue.push(4);
minQueue.push(2);
minQueue.push(3);
console.log(minQueue.pop()); // 2
```
<hr />

### A* <a name="astar">(A-star)</a>
A* is an algorithm for efficiently finding the lowest cost path on a graph from specified start and end vertices. The end node is not supplied as an argument, but rather determined implicitely as any node satisfying: ```costHeuristic(node) <= 0```

#### Return Values:
If a path from the provided start node to an end node is found, the function returns that path as an array of nodes sorted from start to end. If no path could be found, the function will return null. If the function stops for another reason, such as maxDepth being exceeded, it will return undefined.

#### Parameters:
- **nodeStart**: the node at which to start the search
- **costHeuristic**(**node**): an admissible function which returns the lowest possible cost to travel from the supplied node to an end node
- **getNeighbors**(**node**): a function which returns an array. The first element of this array is an array of nodes adjacent to the supplied node. The second element of the array is the associated costs of moving from this node to each adjacent node. For example:
```js
getNeighbors = (node1) => [ [node2, node3], [7, 4] ]
```
- **options**: An optional object specifying any of the following values:
    - **maxCost**: No nodes with a cost higher than this will be expanded.
    - **maxDepth**: The search will stop after expanding this many nodes.

#### Example:
       
```js
import {aStar} from './path_finder';
function Node(x, y) {
    this.x = x;
    this.y = y;
}
const startNode = Node(0, 0);
const endNode = Node(5, 5);
function distanceHeuristic(node) {
    const deltaX = endNode.x - node.x;
    const deltaY = endNode.y - node.y;
    return Math.max(deltaX, deltaY);
    // Will return 0 when node == endNode
}
function adjacentNodes(node) {
    // ...
    return [nodeNorth, nodeSouth, nodeEast, nodeWest];
}
let path = aStar(
    startNode,
    distanceHeuristic,
    adjacentNodes,
    {maxCost: 20},
);
```
