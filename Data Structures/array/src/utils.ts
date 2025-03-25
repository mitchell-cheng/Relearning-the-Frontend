import Item from './types'

function generateItems(count: number): Item[] {
  const categories = ['electronics', 'clothing', 'books', 'toys', 'food']
  const items: Item[] = []

  for (let i = 1; i <= count; i++) {
    const item: Item = {
      id: i,
      name: `Item_${Math.random().toString(36).substring(2, 7)}`,
      price: Number((Math.random() * 1000).toFixed(2)),
      category: categories[Math.floor(Math.random() * categories.length)],
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
    }
    items.push(item)
  }

  return items
}

function chunk(arr: Item[], size: number) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    const chunked = arr.slice(i, i + size)
    result.push(chunked)
  }

  return result
}

export { generateItems, chunk }
