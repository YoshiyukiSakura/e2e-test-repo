/**
 * Product type definition
 */
export interface Product {
  id: string
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Product creation input
 */
export interface CreateProductInput {
  name: string
  description: string
  price: number
}

/**
 * Product update input
 */
export interface UpdateProductInput {
  name?: string
  description?: string
  price?: number
}

/**
 * ProductService - Service for managing products
 */
export class ProductService {
  private products: Map<string, Product>

  constructor() {
    this.products = new Map()
  }

  /**
   * Get all products
   */
  getAll(): Product[] {
    return Array.from(this.products.values())
  }

  /**
   * Get a product by ID
   */
  getById(id: string): Product | undefined {
    return this.products.get(id)
  }

  /**
   * Create a new product
   */
  create(input: CreateProductInput): Product {
    const id = crypto.randomUUID()
    const now = new Date()

    const product: Product = {
      id,
      name: input.name,
      description: input.description,
      price: input.price,
      createdAt: now,
      updatedAt: now,
    }

    this.products.set(id, product)
    return product
  }

  /**
   * Update an existing product
   */
  update(id: string, input: UpdateProductInput): Product | undefined {
    const product = this.products.get(id)
    if (!product) {
      return undefined
    }

    const updated: Product = {
      ...product,
      name: input.name ?? product.name,
      description: input.description ?? product.description,
      price: input.price ?? product.price,
      updatedAt: new Date(),
    }

    this.products.set(id, updated)
    return updated
  }

  /**
   * Delete a product
   */
  delete(id: string): boolean {
    return this.products.delete(id)
  }
}