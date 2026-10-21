import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthPage } from './pages/Auth.page';
import { CryptoProvider } from './providers/Crypto.provider';


function App() {
  return (
    <CryptoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />}/>
        </Routes>
      </BrowserRouter>
    </CryptoProvider>
  )
}

export default App
