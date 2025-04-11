import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  walletAddress: string | null;
  isConnecting: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  walletAddress: null,
  isConnecting: false,
  error: null,
};

export const connectWallet = createAsyncThunk(
  'auth/connectWallet',
  async (walletAddress: string, { rejectWithValue }) => {
    try {
      // In a real app, this would involve actual wallet connection logic
      // For now, just return the wallet address
      return { walletAddress };
    } catch (error) {
      return rejectWithValue('Failed to connect wallet');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    disconnectWallet: (state) => {
      state.isAuthenticated = false;
      state.walletAddress = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.pending, (state) => {
        state.isConnecting = true;
        state.error = null;
      })
      .addCase(connectWallet.fulfilled, (state, action: PayloadAction<{ walletAddress: string }>) => {
        state.isConnecting = false;
        state.isAuthenticated = true;
        state.walletAddress = action.payload.walletAddress;
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.isConnecting = false;
        state.error = action.payload as string;
      });
  },
});

export const { disconnectWallet } = authSlice.actions;
export default authSlice.reducer;
