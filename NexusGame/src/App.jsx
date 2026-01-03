import { Route, Routes } from 'react-router'
import './App.css'
import { Header } from './components/General/Header'
import { HomePage } from './components/pages/HomePage/HomePage'
import { DataGameProvider } from './Context/GameData'
import { GameDetails } from './components/pages/Details/GameDetails'
import { NotFound } from './components/pages/NotFound'
import { Checkout } from './components/pages/Checkout/Checkout'
import { CartProvider } from './Context/CartData'
import { ScrollToTop } from './components/General/ScollToTop'
function App() {
  return (
    <div className="bg-bg-base h-screen w-screen font-Rajdhani ">
      <div className="h-screen w-screen bg-bg-base flex flex-col max-w-8xl mx-auto">
        <CartProvider>
          <DataGameProvider>
            <ScrollToTop />
            <Header></Header>
            <Routes>

              <Route path="/" element={
                <HomePage />
              }></Route>
              <Route path="/games">
                <Route path=":id" element={
                  <GameDetails />
                }></Route>
              </Route>
              <Route path="/genres"></Route>
              <Route path="/platform"></Route>
              <Route path="/discount" ></Route>
              <Route path="/checkout" element={<Checkout />
              } />
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </DataGameProvider>
          
        </CartProvider>





      </div>
    </div>


  )
}

export default App
