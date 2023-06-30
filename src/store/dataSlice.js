import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [], 
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      state.data = action.payload
    },
    addAdditionalData: (state, action) => {
        state.data.push(action.payload)
    },
  },
})

export const { setInitialData, addAdditionalData } = dataSlice.actions

export default dataSlice.reducer
