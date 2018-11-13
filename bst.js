class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === null) {
      return null;
    } else if (this.key === key) {
      return this.value;
    } else if (key < this.key) {
      return this.left.find(key);
    } else {
      return this.right.find(key);
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }

  remove(key) {
    if (this.key === null) {
      return null;
    } else if (this.key === key) {
      if (this.left === null && this.right === null) {
        this._replaceWith(null);
      } else if (this.left === null && this.right !== null) {
        this._replaceWith(this.right);
      } else if (this.right === null && this.left !== null) {
        this._replaceWith(this.left);
      } else {
        let node = this.left._findMax();
        this.key = node.key;
        this.value = node.value;
        node.remove(node.key);
      }
    }
  }
}

function findHeight(bst) {
  let left = 0;
  let right = 0;
  if (bst === null) {
    return 0;
  } else if (bst.left === null && bst.right === null) {
    return 1;
  }

  if (bst.left !== null) {
    left = findHeight(bst.left);
  }
  if (bst.right !== null) {
    right = findHeight(bst.right);
  }

  if (left > right) {
    return 1 + left;
  } else {
    return 1 + right;
  }
}

function main() {
  const BST = new BinarySearchTree();
  BST.insert(30, 'dog');
  BST.insert(10, 'cat');
  BST.insert(40, 'bat');
  BST.insert(60, 'gnat');
  console.log(BST, 'line 100');
  BST.insert(90, 'shat');
  BST.insert(20, 'wombat');
  BST.insert(50, 'rat');
  BST.insert(70, 'bird');
  BST.insert(15, 'goat');
  BST.insert(65, 'goat');

  console.log(BST);
  console.log(findHeight(BST));
}

main();