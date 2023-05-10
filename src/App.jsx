import "./App.css";
import ConnectButton from "./components/UI/ConnectButton";


function App() {
    return (
        <>
            <div className="connectButton">
                <ConnectButton />
            </div>
            <h1>TicketIn</h1>
            <div className="grid-container">
                <div className="tickets">Hello, World!</div>
            </div>
        </>
    );
}

export default App;
