import { configureStore } from "@reduxjs/toolkit";
import IsLoadingSlice from "./IsLoadingSlice";

const Store = configureStore({
    reducer : {
        Loader: IsLoadingSlice
    }
})

export default Store