import React from "react"
import { createRoot } from "react-dom"
import App from "@/app/App"
import "@/app/lib/styles/global.scss"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "@/redux/reducers/rootReducer"

const store = configureStore({
  reducer: rootReducer,
})

const root = document.getElementById("root")
const reactRoot = createRoot(root)

reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
