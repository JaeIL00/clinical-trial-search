import "./App.css";
import InputSearchText from "./components/InputSearchText";
import CacheProvider from "./provider/CacheProvider";

function App() {
    return (
        <CacheProvider>
            <InputSearchText />
        </CacheProvider>
    );
}

export default App;
