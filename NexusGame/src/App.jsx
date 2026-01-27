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
import { GameLibraryPage } from './components/pages/GameLibraryPage/GameLibraryPage'
import { Community } from './components/pages/CommunityPage/Community'
import { DetailsPost } from './components/pages/CommunityPage/DetailsPost'
import { Library } from './components/pages/LibraryPage/Library'
import { CommunityContext } from './Context/CommunityContext'
import { CommunityProvider } from './Context/CommunityData'
import { Register } from './components/pages/AuthPage/Register'
function App() {
  return (
    <div className="bg-bg-base h-screen w-screen font-Rajdhani ">
      <div className="h-screen w-screen bg-bg-base flex flex-col max-w-8xl mx-auto">
        <CommunityProvider>
          <CartProvider>
            <DataGameProvider>
              <ScrollToTop />
              <Header></Header>
              <Routes>
                <Route path="/" element={
                  <HomePage />
                }></Route>
                <Route path="/games" element={<GameLibraryPage />} />
                <Route path="/games/:id" element={
                  <GameDetails />
                }></Route>
                <Route path="/community" element={<Community />} />
                <Route path="/community/posts/:id" element={<DetailsPost />} />
                <Route path="/genres"></Route>
                <Route path="/platform"></Route>
                <Route path="/discount" ></Route>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/library" element={<Library />} />
                <Route path = "/api/auth/register" element = {<Register />}></Route>
                <Route path="*" element={<NotFound />}></Route>
                x
              </Routes>
            </DataGameProvider>
          </CartProvider>
        </CommunityProvider>




      </div>
    </div>


  )
}

export default App
