import { Prisma } from '@prisma/client';

export type JwtUserPayload = {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
  humanId?: string;
  privileges: {
    bId: string;
    accesses: string[];
  }[];
};

export type JwtUserResponse = {
  user: JwtUserPayload;
  refreshToken: string;
};

export type ProductWithCategoryAndStock = Prisma.ProductGetPayload<{ include: { subCategory: true; stocks: true } }>;
export type ProductInfoWithComments = Prisma.ProductGetPayload<{ include: { subCategory: true; stocks: true; comments: true } }>;
export type SubCategoryWithParent = Prisma.SubCategoryGetPayload<{ include: { category: true } }>;
export type CategoryWithChildrens = Prisma.CategoryGetPayload<{ include: { subCategories: { select: { id: true; name: true } } } }>;
export type CommentWithProduct = Prisma.CommentGetPayload<{ include: { product: true } }>;
export type TicketWithUser = Prisma.TicketGetPayload<{ include: { user: { select: { id: true; name: true } } } }>;
