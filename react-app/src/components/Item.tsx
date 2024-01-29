// Item.tsx
import { FC } from 'react';

interface ItemProps {
  value: string;
}

const Item: FC<ItemProps> = ({ value }) => {
  return (
    <div style={{ padding: '10px', margin: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
      {value}
    </div>
  );
};

export default Item;
