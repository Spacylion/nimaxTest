import React from "react"
import { createRoot } from "react-dom" // Updated import
import App from "@/app/App"
import "@/app/lib/styles/global.scss"
import { Provider } from "react-redux"
import { createStore } from "redux" // Import createStore from Redux

// Import your reducers and combine them if you have multiple
import rootReducer from "@/redux/store/reducers/reducers"

// Create your Redux store
const store = createStore(rootReducer)

// Use createRoot from react-dom
const root = document.getElementById("root")
const reactRoot = createRoot(root)

// Render your app inside the Provider
reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
