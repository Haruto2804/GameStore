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
import { Login } from './components/pages/AuthPage/Login'
import { AuthProvider } from './Context/AuthHandle'
import { User } from './components/pages/UserPage/User'
import { EditProfile } from './components/pages/UserPage/EditProfilePage/EditProfile'
import { PreviewUser } from './components/pages/UserPage/PreviewUser'
function App() {
  return (
    <div className="bg-bg-base h-screen w-screen font-Rajdhani ">
      <div className="h-screen w-screen bg-bg-base flex flex-col max-w-8xl mx-auto">
        <AuthProvider >
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
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/user" element={<User />}></Route>
                  <Route path="/user/:userId" element={<PreviewUser />}></Route>
                  <Route path="/user/editProfile" element={<EditProfile />}></Route>
                  <Route path="*" element={<NotFound />}></Route>
                  x
                </Routes>
              </DataGameProvider>
            </CartProvider>
          </CommunityProvider>
        </AuthProvider>






      </div>
    </div>


  )
}

export default App
