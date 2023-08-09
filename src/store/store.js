import { configureStore } from "@reduxjs/toolkit"
import dataSlice from "./dataSlice"

/**
 * The Redux store of the application.
 * 
 * Currently, the store consists of a single slice `employees` which is
 * managed by the `dataSlice`.
 */
export const store = configureStore({
  reducer: {
    employees: dataSlice,
  },
})