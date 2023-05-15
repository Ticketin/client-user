import { Route, Routes } from "react-router";
import RegisterTicket from "./components/RegisterTicket/RegisterTicket";
import ConnectButton from "./components/UI/ConnectButton";
import Landing from "./pages/Landing";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
            {/* <div className="connectButton">
                <ConnectButton />
            </div>
            <h1 className="title">TicketIn</h1>
            <div className="grid-container">
                <RegisterTicket />
            </div> */}
        </>
    );
}

export default App;
