// ScrollableList.tsx
import { FC, ReactNode } from 'react';

interface ScrollableListProps {
  children: ReactNode;
}

const ScrollableList: FC<ScrollableListProps> = ({ children }) => {
  return (
    <div style={{ height: '300px', overflow: 'auto' }}>
      {children}
    </div>
  );
};

export default ScrollableList;
