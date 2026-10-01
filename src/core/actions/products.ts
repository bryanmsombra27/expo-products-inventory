import { API_URL, productsApi } from "../api/productsApi";
import { Gender, type Product } from "../interfaces/product";

interface productProps {
  limit?: number;
  offset?: number;
}

const emptyProduct: Product = {
  id: "",
  title: "",
  description: "",
  price: 0,
  gender: Gender.Unisex,
  sizes: [],
  images: [],
  slug: "",
  stock: 0,
  tags: [],
};

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
  if (id == "new") return emptyProduct;

  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`);

    return productMapper(data);
  } catch (error) {
    throw new Error("No fue posible obtener el producto");
  }
};

export const createUpdateProduct = async (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== "new") {
    return updateProduct(product);
  }

  return createProduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
  try {
    const { id, images = [], user, ...updateProduct } = product;
    const { data } = await productsApi.patch(`/products/${id}`, {
      ...updateProduct,
      images: saveImages(images),
    });

    return data;
  } catch (error) {
    throw new Error("No fue posible actualizar el producto");
  }
};

const createProduct = async (product: Partial<Product>) => {
  try {
    const { id, images = [], user, ...createProduct } = product;
    const { data } = await productsApi.post(`/products`, {
      ...createProduct,
      images: saveImages(images),
    });

    return data;
  } catch (error) {
    throw new Error("No fue posible actualizar el producto");
  }
};

const productMapper = (product: Product): Product => {
  return {
    ...product,
    images: product.images.map((image) => `${API_URL}/files/product/${image}`),
  };
};

const saveImages = (images: string[]) => {
  return images.map((image) => image.split("/").pop());
};
