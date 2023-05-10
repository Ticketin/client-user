import "./App.css";
import RegisterTicket from "./components/RegisterTicket/RegisterTicket";
import ConnectButton from "./components/UI/ConnectButton";

function App() {
    return (
        <>
            <div className="connectButton">
                <ConnectButton />
            </div>
            <h1 className="title">TicketIn</h1>
            <div className="grid-container">
                <RegisterTicket />
            </div>
        </>
    );
}

export default App;
