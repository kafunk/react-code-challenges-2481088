import { useReducer } from 'react';

const initialState = { num1: 0, num2: 0, result: 'no result yet' };

function reducer (state, { action, key, value }) {
  switch(action) {
    case 'clear':
      return initialState;
    case 'update':
      let latestState = {
        ...state,
        [key]: value
      };
      return latestState.operator ?
        {
          ...latestState,
          result: latestState.operator == '-' ? latestState.num1 - latestState.num2 : latestState.num1 + latestState.num2
        }
      : latestState;
    }
}

export default function SimpleCalculator () {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div>
      <div>
        <h2>Number 1</h2>
        {numbers.map(number => (
          <button
            key={number}
            className={state.num1 === number ? 'selected' : ''}
            onClick={() => dispatch({ action: 'update', key: 'num1', value: number })}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        <h2>Number 2</h2>
        {numbers.map(number => (
          <button
            key={number}
            className={state.num2 === number ? 'selected' : ''}
            onClick={() => dispatch({ action: 'update', key: 'num2', value: number })}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        <h2>Actions</h2>
        <button className={state.operator === '+' ? 'selected' : ''} onClick={() => dispatch({ action: 'update', key: 'operator', value: '+' })}>+</button>
        <button className={state.operator === '-' ? 'selected' : ''} onClick={() => dispatch({ action: 'update', key: 'operator', value: '-' })}>-</button>
        <button onClick={() => dispatch({ action: 'clear' })}>c</button>
      </div>
      <div>
        <h2>Result:</h2>
        <h3>{state.result}</h3>
      </div>
    </div>
  )
}
