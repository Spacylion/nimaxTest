import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"
import "./app/lib/styles/global.scss"
import { Provider } from "react-redux"
import store from "./redux/store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
