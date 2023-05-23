import { Route, Routes } from "react-router";
import ConnectButton from "./components/UI/ConnectButton";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import User from "./pages/User";
import SingleEventDetails from "./components/User/SingleEventDetails";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User />} />
                <Route path="/user/event/:eventId" element={<SingleEventDetails />} />
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
