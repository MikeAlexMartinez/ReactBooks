import React from 'react';

export default function List ({ items, removeItem, toggleItem=f=>f }) {
  return (
    <ul>
      {items.map((item, i) =>
        <li key={item.id}>
          <span onClick={() => toggleItem(item.id)}
            style={{textDecoration: `${
              item.complete
                ? 'line-through'
                : 'none'
            }`}}
          >
            {item.name}
          </span>
          <button onClick={() => removeItem(item)}>X</button>
        </li>
      )}
    </ul>
  );
}
