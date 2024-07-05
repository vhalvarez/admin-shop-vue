import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/products.interface';

export const getProductsActions = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `/products?limit=${limit}&offset=${page * limit}`,
    );

    return data;
  } catch (error) {
    throw new Error('Error getting products');
  }
};
