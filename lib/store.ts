import { configureStore } from "@reduxjs/toolkit";
import { ecommerceApi } from "@/lib/feature/ecommerceApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [ecommerceApi.reducerPath]: ecommerceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ecommerceApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
