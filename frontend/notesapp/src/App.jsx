import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import './App.css'
import { AppRouter } from "./router/AppRouter"
import { store } from "./store"


export const App = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}


export default App
