/**
 * Inventory Service
 *
 * Handles inventory management operations.
 */

/**
 * Represents an item in the inventory.
 */
export interface InventoryItem {
  id: string
  name: string
  quantity: number
  price: number
}

/**
 * InventoryService class for managing inventory operations.
 */
export class InventoryService {
  private items: Map<string, InventoryItem>

  constructor() {
    this.items = new Map()
  }

  /**
   * Get an item by its ID.
   */
  getItem(id: string): InventoryItem | undefined {
    return this.items.get(id)
  }

  /**
   * Add a new item to the inventory.
   */
  addItem(item: InventoryItem): void {
    this.items.set(item.id, item)
  }

  /**
   * Update an existing item in the inventory.
   */
  updateItem(id: string, updates: Partial<Omit<InventoryItem, 'id'>>): boolean {
    const item = this.items.get(id)
    if (!item) {
      return false
    }
    this.items.set(id, { ...item, ...updates })
    return true
  }

  /**
   * Remove an item from the inventory.
   */
  removeItem(id: string): boolean {
    return this.items.delete(id)
  }

  /**
   * Get all items in the inventory.
   */
  getAllItems(): InventoryItem[] {
    return Array.from(this.items.values())
  }

  /**
   * Get the total count of items.
   */
  getItemCount(): number {
    return this.items.size
  }
}