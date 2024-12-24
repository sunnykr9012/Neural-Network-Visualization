import { TreeNode } from '../types';

export type TraversalStep = {
  node: TreeNode;
  type: 'pre' | 'in' | 'post';
};

export function* inorderTraversal(root: TreeNode): Generator<TraversalStep> {
  if (root.left) {
    yield* inorderTraversal(root.left);
  }
  yield { node: root, type: 'in' };
  if (root.right) {
    yield* inorderTraversal(root.right);
  }
}

export function* preorderTraversal(root: TreeNode): Generator<TraversalStep> {
  yield { node: root, type: 'pre' };
  if (root.left) {
    yield* preorderTraversal(root.left);
  }
  if (root.right) {
    yield* preorderTraversal(root.right);
  }
}

export function* postorderTraversal(root: TreeNode): Generator<TraversalStep> {
  if (root.left) {
    yield* postorderTraversal(root.left);
  }
  if (root.right) {
    yield* postorderTraversal(root.right);
  }
  yield { node: root, type: 'post' };
}