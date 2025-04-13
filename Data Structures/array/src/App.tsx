import React, { useMemo, useRef, useState } from 'react'
import Item from './types'
import { generateItems } from './utils'

const ITEMS_PER_PAGE = 100
const ITEMS_PER_LAZY_LOAD = 50
const VIRTUALIZED_ITEM_HEIGHT = 30

// --- Virtualization Row Component
const Row = ({
  index,
  style,
  data,
}: {
  index: number
  style: React.CSSProperties
  data: Item[]
}) => {
  const item = data[index]

  return (
    <div style={style} key={item.id}>
      {item.name} - ${item.price} ({item.category})
    </div>
  )
}

function App() {
  const [allItems, setAllItems] = useState<Item[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [itemNum, setItemNum] = useState<number>(0)
  const [searchItem, setSearchItem] = useState('')
  const [renderingTime, setRenderingTime] = useState<string>('')
  const [renderingMethod, setRenderingMethod] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState<number>(1)

  // --- Filtering State ---
  const [isFiltered, setIsFiltered] = useState<boolean>(false)
  const [filteredItems, setFilteredItems] = useState<Item[]>([])

  // --- Lazy Loading State & Refs ---
  const [lazyLoadPage, setLazyLoadPage] = useState(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const sourceList = useMemo(
    () => (isFiltered ? filteredItems : allItems),
    [isFiltered, filteredItems, allItems]
  )

  const totalPages = useMemo(
    () => Math.ceil(sourceList.length / ITEMS_PER_PAGE),
    [sourceList, ITEMS_PER_PAGE]
  )

  const hasMoreLazyLoad = useMemo(() => {
    if (renderingMethod === 'lazyLoading' && sourceList.length > 0) {
      return items.length < sourceList.length
    }
    return false
  }, [items.length, sourceList.length, renderingMethod])

  // --- Event Handlers ---

  const handleGenerateItems = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (itemNum <= 0) {
      return
    }

    const startTime = performance.now()
    const generated = generateItems(itemNum)
    const elapsedTime =
      String((performance.now() - startTime).toFixed(2)) + 'ms'

    setAllItems(generated)
    setFilteredItems([])
    setIsFiltered(false)
    setCurrentPage(1)
    setRenderingTime(elapsedTime)
    setSearchItem('')

    if (renderingMethod === 'pagination') {
      setItems(generated.slice(0, ITEMS_PER_PAGE))
    } else {
      setItems(generated)
    }
  }

  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const searchTerm = searchItem.trim().toLowerCase()

    if (!searchTerm) {
      setIsFiltered(false)
      setFilteredItems([])
      setCurrentPage(1)

      if (renderingMethod === 'pagination') {
        setItems(allItems.slice(0, ITEMS_PER_PAGE))
      } else {
        setItems(allItems)
      }

      return
    }

    const filtered = allItems.filter((item: Item) => {
      item.name.toLowerCase().includes(searchTerm)
    })

    setFilteredItems(filtered)
    setIsFiltered(true)
    setCurrentPage(1)

    if (renderingMethod === 'pagination') {
      setItems(filtered.slice(0, ITEMS_PER_PAGE))
    } else {
      setItems(filtered)
    }
    setIsShow(true)
  }

  const handleRenderingChange = (event: React.SyntheticEvent) => {
    const newMethod = event.target.value
    setRenderingMethod(newMethod)
    setCurrentPage(1)

    const listToDisplay = isFiltered ? filteredItems : allItems

    if (newMethod === 'pagination') {
      setItems(listToDisplay.slice(0, ITEMS_PER_PAGE))
    } else {
      setItems(listToDisplay)
    }

    if (newMethod !== 'pagination' && isShow) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }

  // --- Pagination Navigation Handlers ---

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return
    }

    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const listToPaginate = isFiltered ? filteredItems : allItems

    setItems(listToPaginate.slice(startIndex, endIndex))
    setCurrentPage(page)
    setIsShow(true)
  }

  const goToNextPage = () => {
    goToPage(currentPage + 1)
  }

  const goToPrevPage = () => {
    goToPage(currentPage - 1)
  }

  const displayListLength = sourceList.length

  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      {' '}
      {/* Added padding and mx-auto */}
      <h1 className="text-3xl text-center font-semibold mb-4">
        {' '}
        {/* Adjusted text size */}
        Testing List Rendering Performance
      </h1>
      {/* Generation Form */}
      <form className="flex flex-wrap items-center gap-4 p-4 bg-gray-100 rounded shadow">
        {' '}
        {/* Added styling */}
        <label htmlFor="itemNumSelect" className="font-medium">
          Items to generate:
        </label>
        <select
          id="itemNumSelect"
          className="p-2 border rounded font-bold"
          onChange={(event) => setItemNum(Number(event.target.value))}
          value={itemNum} // Controlled component
        >
          <option value="0" disabled>
            Select count
          </option>
          <option value="10000">10,000</option>
          <option value="50000">50,000</option>
          <option value="100000">100,000</option>
          <option value="200000">200,000</option> {/* Added more options */}
        </select>
        <button
          type="button" // Use type="button" if not submitting form data
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition duration-200"
          onClick={handleGenerateItems}
          disabled={itemNum <= 0} // Disable if no number selected
        >
          Generate
        </button>
      </form>
      {/* Controls and Info Area */}
      <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded shadow">
        {/* Info Display */}
        <div className="text-sm text-gray-700">
          Generated list size:{' '}
          <span className="font-bold">{allItems.length.toLocaleString()}</span>{' '}
          <br />
          {isFiltered && (
            <>
              Filtered list size:{' '}
              <span className="font-bold">
                {filteredItems.length.toLocaleString()}
              </span>{' '}
              <br />
            </>
          )}
          Time to generate:{' '}
          <span className="font-bold">{renderingTime || 'N/A'}</span> <br />
          Rendering Method:{' '}
          <span className="font-bold">
            {renderingMethod || 'None Selected'}
          </span>
        </div>

        {/* Rendering Method Selection */}
        <div className="flex flex-wrap items-center gap-4">
          <label htmlFor="renderSelect" className="font-medium">
            Render method:
          </label>
          <select
            id="renderSelect"
            onChange={handleRenderingChange} // Use the correct handler
            value={renderingMethod} // Controlled component
            className="p-2 border rounded font-bold flex-grow" // Allow select to grow
          >
            <option value="" disabled>
              Select method
            </option>
            <option value="fullLoad">Full Load</option>
            <option value="pagination">Pagination</option>
            {/* Add other options like Lazy Loading later */}
            {/* <option value="lazyLoading">Lazy Loading</option> */}
            {/* <option value="virtualization">Virtualization</option> */}
          </select>
          <button
            type="button"
            className={`px-4 py-2 rounded text-white transition duration-200 ${isShow ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={() => setIsShow(!isShow)} // Toggle visibility
            disabled={items.length === 0} // Disable if no items to show/hide
          >
            {isShow ? 'Hide List' : 'Show List'}
          </button>
        </div>

        {/* Search Form */}
        <form
          className="flex flex-wrap items-center gap-4"
          onSubmit={handleSearch}
        >
          <label htmlFor="searchInput" className="font-medium">
            Search by name:
          </label>
          <input
            id="searchInput"
            className="p-2 border rounded flex-grow" // Allow input to grow
            type="text"
            placeholder="Enter name (partial match)"
            value={searchItem} // Controlled component
            onChange={(event) => setSearchItem(event.target.value)}
          />
          <button
            type="submit" // Use type="submit" for form submission
            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition duration-200"
          >
            Search
          </button>
          {/* Optional: Add a clear button */}
          {isFiltered && (
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-200"
              onClick={() =>
                handleSearch({
                  preventDefault: () => {},
                } as React.SyntheticEvent)
              } // Simulate event to clear search
            >
              Clear
            </button>
          )}
        </form>
      </div>
      {/* List Display Area */}
      <div className="mt-4">
        {/* Pagination Controls - Only show if pagination is active and there are pages */}
        {renderingMethod === 'pagination' && totalPages > 0 && isShow && (
          <div className="flex justify-between items-center mb-4 p-2 bg-gray-200 rounded">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-400 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition duration-200"
            >
              Previous
            </button>
            <span className="font-medium text-gray-700">
              Page {currentPage} of {totalPages} (
              {displayListLength.toLocaleString()} items total)
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-400 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition duration-200"
            >
              Next
            </button>
          </div>
        )}

        {/* Item List */}
        {isShow && items.length > 0 && (
          <ul className="list-disc pl-5 max-h-96 overflow-y-auto border rounded p-2">
            {' '}
            {/* Added max height and scroll */}
            {items.map((item) => (
              <li key={item.id} className="text-sm py-0.5">
                {' '}
                {/* Reduced padding */}
                {item.name} - ${item.price} ({item.category})
              </li>
            ))}
          </ul>
        )}
        {isShow &&
          items.length === 0 &&
          displayListLength === 0 &&
          allItems.length > 0 && (
            <p className="text-center text-gray-500 mt-4">
              No items match your search criteria.
            </p>
          )}
        {isShow && items.length === 0 && allItems.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Generate items to see the list.
          </p>
        )}
      </div>
    </div>
  )
}

export default App
