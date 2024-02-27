
import Link from 'next/link';
import React from 'react';

type Props = {
  subCategory: { id: string; name: string };
};

 const CategoryListItem: React.FC<Props> = ({ subCategory }) => {
  return (
    <li className="right">
      <Link href={`/products?cat=${subCategory.id}`} className="rt rt-medium rt-777 rt-30px">
        {subCategory?.name}
      </Link>
    </li>
  );
};
export default CategoryListItem;