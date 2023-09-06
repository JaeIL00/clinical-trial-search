import { Outlet } from 'react-router-dom';
import './App.css';
import CacheProvider from './provider/CacheProvider';

function App() {
  return (
    <CacheProvider>
      <Outlet />
    </CacheProvider>
  );
}

export default App;
