import React from "react"
import { createRoot } from "react-dom"
import App from "@/app/App"
import "@/app/lib/styles/global.scss"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "@/redux/reducers/rootReducer" // Correct the import path

const store = createStore(rootReducer)

const root = document.getElementById("root")
const reactRoot = createRoot(root)

reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
