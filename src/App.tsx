import "./App.css";
import SearchContainer from "./components/SearchContainer";
import CacheProvider from "./provider/CacheProvider";

function App() {
    return (
        <CacheProvider>
            <SearchContainer />
        </CacheProvider>
    );
}

export default App;
