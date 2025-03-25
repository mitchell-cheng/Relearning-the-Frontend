import React, { useState } from 'react'
import Item from './types'
import { generateItems, chunk } from './utils'

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [itemNum, setItemNum] = useState<number>(0)
  const [searchItem, setSearchItem] = useState('')
  const [renderingTime, setRenderingTime] = useState<string>('')
  const [renderingMethod, setRenderingMethod] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const filteredItem = items.filter((item) => item.name === searchItem)
    setItems(filteredItem)
  }

  const handleGenerateItems = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const startTime = performance.now()
    const items: Item[] = generateItems(itemNum)
    const elapsedTime =
      String((performance.now() - startTime).toFixed(2)) + 'ms'
    setRenderingTime(elapsedTime)
    setItems(items)
  }

  const handleRendering = (event: React.SyntheticEvent) => {
    setRenderingMethod((event.target as HTMLSelectElement).value)

    if (renderingMethod === 'pagination') {
      setItems(chunk(items, 10000))
    }
  }

  return (
    <div className="container flex flex-col flex-wrap gap-10">
      <h1 className="text-4xl text-center">
        Let's test the performance of rendering a long items
      </h1>
      <form className="flex gap-8">
        <label className="font-semibold">How many items to generate?</label>
        <select
          className="font-bold border-2"
          onChange={(event) => setItemNum(Number(event.target.value))}
          defaultValue={0}
        >
          <option value="0">Select an option</option>
          <option value="10000">10000</option>
          <option value="100000">100000</option>
          <option value="500000">500000</option>
        </select>
        <button
          className=" bg-amber-300 rounded-3xl border-1"
          onClick={handleGenerateItems}
        >
          Generate
        </button>
      </form>
      <div className="flex justify-center flex-wrap flex-col gap-5">
        <h1 className="text-1xl font-bold">
          Item list length: {items.length} <br />
          Time to generate: {renderingTime} <br />
          Rendering by {renderingMethod}
        </h1>
        <div className="flex gap-3">
          <h1 className="text-1xl font-bold">Ways to handle large list</h1>
          <select
            onChange={handleRendering}
            className="flex flex-col gap-2 font-bold border-2"
          >
            <option value="">Select an option</option>
            <option
              value="fullLoad"
              className="bg-yellow-100 rounded-3xl border-1"
            >
              Full Load
            </option>
            <option
              value="pagination"
              className="bg-yellow-100 rounded-3xl border-1"
            >
              Pagination
            </option>
            <option
              value="lazyLoading"
              className="bg-yellow-50 rounded-3xl border-1"
            >
              Lazy Loading
            </option>
          </select>
          <button
            className="bg-blue-300 rounded-3xl border-1"
            onClick={() => setIsShow(true)}
          >
            Show
          </button>
        </div>
        <form className="flex gap-5">
          Enter the item name to search:{' '}
          <input
            className="border-2"
            type="text"
            placeholder="search"
            onChange={(event) => setSearchItem(event.target.value)}
          />
          <button
            className="bg-emerald-300 rounded-3xl border-1"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
        <ul>
          {isShow &&
            items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} ({item.category})
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default App
