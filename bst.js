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

function main() {
  const BST = new BinarySearchTree();
  BST.insert(3, 'dog');
  BST.insert(1, 'cat');
  BST.insert(4, 'bat');
  BST.insert(6, 'gnat');
  console.log(BST, 'line 100');
  BST.insert(9, 'shat');
  BST.insert(2, 'wombat');
  BST.insert(5, 'rat');
  BST.insert(7, 'bird');

  console.log(BST);
}

main();
