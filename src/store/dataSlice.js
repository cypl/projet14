import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [], 
}

export const dataSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      state.data = action.payload
    },
    addEmployee: (state, action) => {
        state.data.push(action.payload)
    },
  },
})

export const { setInitialData, addEmployee } = dataSlice.actions

export default dataSlice.reducer
