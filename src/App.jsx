import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import DropsPage from "./pages/DropsPage";
import CollectionPage from "./pages/CollectionPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import BuyTicketPage from "./pages/BuyTicketPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/drops" element={<DropsPage />} />
                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/ticket-detail/:collectionId" element={<TicketDetailPage />} />
                <Route path="/buy-ticket/:eventId" element={<BuyTicketPage />} />
            </Routes>
        </>
    );
}

export default App;
