import { createSlice } from '@reduxjs/toolkit'

/**
 * The initial state of the `employees` slice. 
 * It represents an array containing employees data.
 * 
 * @type {{ data: Object[] }}
 */
const initialState = {
    data: [] 
}

/**
 * A slice for managing the employees data in the Redux store.
 * 
 * This slice contains reducers to set the initial employees data 
 * and to add a new employee to the list.
 */
export const dataSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    /**
     * Set the initial employees data.
     * 
     * @param {Object} state The current state object.
     * @param {Object} action The dispatched action containing the payload with the initial data.
     */
    setInitialData: (state, action) => {
      state.data = action.payload
    },
    /**
     * Add a new employee to the list of employees.
     * 
     * @param {Object} state The current state object.
     * @param {Object} action The dispatched action containing the payload with the new employee data.
     */
    addEmployee: (state, action) => {
      state.data.push(action.payload)
    },
  },
})

export const { setInitialData, addEmployee } = dataSlice.actions

export default dataSlice.reducer