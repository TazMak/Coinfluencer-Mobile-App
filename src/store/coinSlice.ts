import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoins, fetchCoinDetail } from '../services/api';

interface CoinState {
  coins: any[];
  selectedCoin: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoinState = {
  coins: [],
  selectedCoin: null,
  loading: false,
  error: null,
};

export const getCoins = createAsyncThunk(
  'coins/getCoins',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCoins();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch coins');
    }
  }
);

export const getCoinDetail = createAsyncThunk(
  'coins/getCoinDetail',
  async (coinId: number, { rejectWithValue }) => {
    try {
      const data = await fetchCoinDetail(coinId);
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch coin details');
    }
  }
);

const coinSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    clearSelectedCoin: (state) => {
      state.selectedCoin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(getCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCoinDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoinDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCoin = action.payload;
      })
      .addCase(getCoinDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedCoin } = coinSlice.actions;
export default coinSlice.reducer;
