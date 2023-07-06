import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ShipActive {
  companyId: string;
  loading:boolean;
}

const defaultType: ShipActive = {
  companyId: "",
  loading: false
}

interface ShipState {
  shipActive: ShipActive ;
};

const slice = createSlice({
  name: "ship",
  initialState: {
    shipActive: defaultType
  } as ShipState,
  reducers: {
    setShipActive: (state, action: PayloadAction<ShipState>) => {
      state.shipActive = action.payload.shipActive
    },
  },
});

export const { setShipActive } = slice.actions;
export default slice.reducer;
export const selectShipActive: any = (state: RootState) => { return state.ship.shipActive };
