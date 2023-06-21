import { useReducer, useEffect } from 'react'

// define defaults and constants incl currency formatter
const defaultState = {}
const localStorageKey = 'shoppingCartState'
const USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const availableItems = [{
  key: 'apple',
  name: 'apple',
  price: 0.39
}, {
  key: 'banana',
  name: 'banana',
  price: 0.79
}, {
  key: 'cherryTomatoes',
  name: 'cherry tomatoes',
  price: 3.99
}]

function reducer (state, { action, itemKey, itemSpec }) {
  switch (action) {
    case ('addToCart'):
      return { ...state, [itemKey]: { ...itemSpec, quantity: 1 } }
    case ('removeFromCart'):
      delete state[itemKey]
      return { ...state }
    case ('increaseQuantity'):
      return { ...state, [itemKey]: { ...state[itemKey], quantity:  state[itemKey].quantity++ } }
    case ('reduceQuantity'):
      return { ...state, [itemKey]: { ...state[itemKey], quantity:  state[itemKey].quantity-- } }
    case ('clear'):
    default:
      return defaultState
  }
}

function createInitialState ({ localStorageKey, defaultState }) {
  return localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : defaultState
}

function ShoppingCart () {

  const [state, dispatch] = useReducer(reducer, { localStorageKey, defaultState }, createInitialState) // use recreating initial state by passing third init fn

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state))
  }, [state])

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className='cart'>
        <div className='items'>
          <h2>Items</h2>
          {availableItems.map(item => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => {
                Object.hasOwn(state, item.key) ?
                  dispatch({ action: 'increaseQuantity', itemKey: item.key })
                : dispatch({ action: 'addToCart', itemKey: item.key, itemSpec: item })
              }}>
                Add to Cart
              </button>
            </div>)
          )}
        </div>
        <div>
          <h2>Cart</h2>
          {Object.entries(state).map(([itemKey, item]) => {
            return (<div key={itemKey}>
              <h3>{item.name}</h3>
              <p>
                <button onClick={() => {
                  state[item.key]?.quantity > 1 ?
                    dispatch({ action: 'reduceQuantity', itemKey: item.key })
                  : dispatch({ action: 'removeFromCart', itemKey: item.key })
                }}>-</button>
                {item.quantity}
                <button onClick={() => dispatch({ action: 'increaseQuantity', itemKey })}>+</button>
              </p>
              <p>Subtotal: {USDollar.format(item.quantity * item.price)}</p>
            </div>)
          })}
          {(
            Object.keys(state).length > 0 ?
              <button onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) dispatch({ action: 'clear' })
              }}>
                Clear Cart
              </button>
            : <div>Cart is empty!</div>
          )}
        </div>
      </div>
      <div className='total'>
        <h2>Total: {USDollar.format(Object.values(state).reduce((acc, c) => acc + (c.quantity * c.price), 0))}</h2>
      </div>
    </div>
  )
}

export default ShoppingCart
