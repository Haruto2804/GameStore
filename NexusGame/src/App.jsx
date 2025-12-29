import { Route, Routes } from 'react-router'
import './App.css'
import { Header } from './components/General/Header'
import { HomePage } from './components/pages/HomePage/HomePage'
import { DataGameProvider } from './Context/GameData'
import { GameDetails } from './components/pages/Details/GameDetails'
import { NotFound } from './components/pages/NotFound'
function App() {
  return (
    <div className="bg-bg-base h-screen w-screen font-Rajdhani ">
      <div className="h-screen w-screen bg-bg-base flex flex-col max-w-8xl mx-auto">
        <Header></Header>
        <Routes>
          <Route path="/" element={
            <DataGameProvider >
              <HomePage />
            </DataGameProvider>
          }></Route>
          <Route path="/games">
            <Route path=":id" element={<GameDetails />}></Route>
          </Route>
          <Route path="/genres"></Route>
          <Route path="/platform"></Route>
          <Route path="discount" ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>



      </div>
    </div>


  )
}

export default App
