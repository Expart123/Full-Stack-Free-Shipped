import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;  // Ensure state is updated
   console.log(action.payload)
    }
  },
})

// Action creators are generated for each reducer function
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer
