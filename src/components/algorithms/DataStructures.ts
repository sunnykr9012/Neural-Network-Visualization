export interface TreeNode {
  id: string;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

export interface GraphNode {
  id: string;
  value: number;
  edges: string[];
}

export class BinarySearchTree {
  root: TreeNode | null = null;

  insert(value: number): void {
    const newNode = { id: Math.random().toString(), value };
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  traverse(callback: (node: TreeNode) => void): void {
    const inorder = (node: TreeNode | null) => {
      if (!node) return;
      inorder(node.left);
      callback(node);
      inorder(node.right);
    };
    inorder(this.root);
  }
}