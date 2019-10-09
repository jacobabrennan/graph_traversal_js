

//== Priority Queue ============================================================
/*
    A priority queue is a data structure used to keep items sorted by priority.
    As items are added to the queue, they are placed in order based on a sorting
    function. The highest priority item can be popped from the queue at any time
    without disrupting the order of the queue.
*/
/*
    This module exports one class, the PriorityQueue. The PriorityQueue
    constructor takes one argument, a comparator function used to sort items
    added to the queue. The comparator must be a function of two arguments, P1
    and P2, and must return one of three values:
         0: P1 and P2 have equal priority
        +1: P1 has greater priority
        -1: P2 has greater priority
    
    PriorityQueue instances have two methods, push and pop, that function as
    expected from similarly named array methods:
        Push(newItem): Adds newItem to the queue
        Pop(): Removes and returns the item with the greatest priority
*/
/*
    Note: The implementations of both push and pop contain not only the logic
    required to push and pop, but also for sifting down and bubbling up. These
    behaviors are often defined in separate private methods, but I've chosen not
    to do so. The result is larger and more complex looking methods, but no
    confusion over behavior: there is never a time where sift or bubble would be
    called outside of push or pop, so it would be improper to define them
    separetly.
*/

//------------------------------------------------
export default class PriorityQueue {
    constructor(comparator) {
        this.compare = comparator;
        this.storage = [];
    }
    push(item) {
        // Add item to the end of the storage array
        this.storage.push(item);
        // Iteratively swap item with parent until it reaches proper sort order
        let indexCurrent = this.storage.length-1;
        while(indexCurrent > 0) {
            const indexParent = Math.floor((indexCurrent-1)/2);
            const nodeCurrent = this.storage[indexCurrent]
            const nodeParent = this.storage[indexParent]
            const order = this.compare(nodeParent, nodeCurrent);
            if(order >= 0) { break;}
            this.storage[indexCurrent] = nodeParent;
            this.storage[indexParent] = nodeCurrent;
            indexCurrent = indexParent;
        }
    }
    pop() {
        // Handle very simple heaps by shifting
        if(this.storage.length <= 2) {
            return this.storage.shift();
        }
        // Get top of heap, return it at end of function
        const nodeNext = this.storage[0];
        // SiftDown: Remove last item from array, place at top of heap, resort
        // Remove last item and place at top of heap
        const nodeCurrent = this.storage.pop();
        var indexCurrent = 0;
        this.storage[indexCurrent] = nodeCurrent;
        // Swap nodes down the heap until sort order is valid
        let indexNext;
        const indexLast = this.storage.length-1;
        let index1st = indexCurrent*2 +1;
        let index2nd = index1st+1;
        while(index1st <= indexLast) {
            indexNext = index1st;
            // Only check second child if one exists
            if(index2nd <= indexLast) {
                let childOrder = this.compare(
                    this.storage[index1st],
                    this.storage[index2nd],
                );
                if(childOrder < 0) {
                    indexNext = index2nd;
                }
            }
            // Stop sifting if item has reached proper place
            let nodeNext = this.storage[indexNext];
            let nodeCurrent = this.storage[indexCurrent];
            if(this.compare(nodeNext, nodeCurrent) < 0) { break;}
            // Otherwise perform a swap
            this.storage[indexNext] = nodeCurrent;
            this.storage[indexCurrent] = nodeNext;
            indexCurrent = indexNext;
            index1st = indexCurrent*2 +1;
            index2nd = index1st+1;
        }
        // Return the original top of the heap
        return nodeNext;
    }
}
