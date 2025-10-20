import { User, Product, Category, Order, Review, Cart, OrderItem, CartItem, UserRole, OrderStatus } from '@/lib/generated/prisma';

// Re-export Prisma types for convenience
export type {
  User,
  Product,
  Category,
  Order,
  Review,
  Cart,
  OrderItem,
  CartItem,
  UserRole,
  OrderStatus,
};

// Extended types for application use
export interface ProductWithCategory extends Product {
  category: Category;
}

export interface ProductWithReviews extends Product {
  reviews: Review[];
  category: Category;
}

export interface OrderWithItems extends Order {
  items: (OrderItem & {
    product: Product;
  })[];
  user: User;
}

export interface CartWithItems extends Cart {
  items: (CartItem & {
    product: Product;
  })[];
}

export interface UserWithOrders extends User {
  orders: Order[];
  reviews: Review[];
}

// Form input types
export interface CreateProductInput {
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  parentId?: string;
}

export interface CreateReviewInput {
  rating: number;
  comment?: string;
  productId: string;
  userId: string;
}

export interface CreateOrderInput {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
  total: number;
  shippingAddress?: string;
  billingAddress?: string;
}

export interface AddToCartInput {
  userId: string;
  productId: string;
  quantity?: number;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Search and filter types
export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

export interface ProductSortOptions {
  field: 'name' | 'price' | 'createdAt' | 'rating';
  order: 'asc' | 'desc';
}

// Dashboard analytics types
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueGrowth: number;
  orderGrowth: number;
  customerGrowth: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  product: Product;
  totalSold: number;
  revenue: number;
}

export interface CustomerInsight {
  user: User;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
}
