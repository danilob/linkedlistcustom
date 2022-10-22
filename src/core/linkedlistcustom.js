import { Patient } from '/src/core/patient.js'

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
};


function comparePriority(a, b) {
    return a.isPriority() != b.isPriority() ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}


export class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}

function defaultEquals(a, b) {
    return a === b;
}

export class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.equalsFn = equalsFn;
        this.count = 0;
        this.head = undefined;
    }

    push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) { //sem nenhum elemento
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.size() && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count;
    }
    getHead() {
        return this.head;
    }
    clear() {
        this.head = undefined;
        this.count = 0;
    }

    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element.toString()}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }

    toStringRec(node = this.head) {
        if (node.next === undefined || node.next === null) {
            return '[' + node.element + ']'
        } else {
            return '[' + node.element + ']' + this.toStringRec(node.next)
        }

    }
}

export class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = comparePriority) {
        super(equalsFn);
        this.equalsFn = equalsFn;
        this.compareFn = compareFn;
    }
    push(element) {
        if (this.isEmpty() || !element.isPriority()) {
            super.push(element);
        } else {
            const index = this.getIndexNextSortedElement(element);
            super.insert(element, index);
        }
    }
    insert(element, index = 0) {
        if (this.isEmpty()) {
            return super.insert(element, index === 0 ? index : 0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element, pos);
    }
    getIndexNextSortedElement(element) {
        let current = this.head;
        let i = 0;
        for (; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element);
            if (comp === Compare.LESS_THAN) {
                return i;
            }
            current = current.next;
        }
        return i;
    }
}