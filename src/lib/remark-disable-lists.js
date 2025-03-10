// remark-disable-lists.js
import { visit } from 'unist-util-visit';

export default function remarkDisableLists(options = {}) {
  return (tree) => {
    visit(tree, 'list', (node, index, parent) => {
      // Build a raw text version of the list.
      // For each list item, join its textual content.
      const listText = node.children
        .map((listItem, idx) => {
          // Extract text from each child of the list item.
          // (This assumes each list item contains a paragraph.)
          const itemText = listItem.children
            .filter(child => child.type === 'paragraph')
            .map(child =>
              child.children
                .map(grandchild => (grandchild.value ? grandchild.value : ''))
                .join('')
            )
            .join('\n');
          // For ordered lists, preserve the original numbering (if possible)
          // by using the item's index plus one; for unordered, use a dash.
          if (node.ordered) {
            return `${idx + 1}. ${itemText}`;
          } else {
            return `- ${itemText}`;
          }
        })
        .join('\n');
      // Replace the list node with a paragraph node holding the raw text.
      parent.children[index] = {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: listText,
          },
        ],
      };
    });
  };
}
