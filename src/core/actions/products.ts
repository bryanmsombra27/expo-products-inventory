import { API_URL, productsApi } from "../api/productsApi";
import { type Product } from "../interfaces/product";

interface productProps {
  limit?: number;
  offset?: number;
}

export const getProducts = async (
  options?: productProps,
): Promise<Product[]> => {
  try {
    const limit = options?.limit ?? 10;
    const offset = options?.offset ?? 0;

    const { data } = await productsApi.get<Product[]>(`/products`, {
      params: {
        limit,
        offset,
      },
    });

    return data.map(productMapper);
  } catch (error) {
    throw new Error("No fue posible cargar los productos");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`);

    return productMapper(data);
  } catch (error) {
    throw new Error("No fue posible obtener el producto");
  }
};

const productMapper = (product: Product): Product => {
  return {
    ...product,
    images: product.images.map((image) => `${API_URL}/files/product/${image}`),
  };
};
