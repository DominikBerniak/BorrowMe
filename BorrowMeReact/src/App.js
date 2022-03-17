import {Route, Routes} from "react-router-dom";
import "./styles/main.css"
import Layout from "./pages/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import AnnouncementPage from "./pages/AnnouncementPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import SearchResultsRedirect from "./pages/searchResults/SearchResultsRedirect";
import UserPage from "./pages/UserPage";
import Authentication from "./pages/Authentication";
import AddAnnouncement from "./pages/AddAnnouncement";
import ReservationConfirmation from "./pages/ReservationConfirmation";
import RequireAuth from "./components/RequireAuth";
import Chat from "./pages/Chat";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="search-results" element={<SearchResultsRedirect />}/>
                <Route path="search-results/:mainCategoryParam" element={<SearchResults />}/>
                <Route path="search-results/:mainCategoryParam/:subCategoryParam" element={<SearchResults />}/>
                <Route path="search-results/:mainCategoryParam/:subCategoryParam/:voivodeshipParam" element={<SearchResults />}/>
                <Route path="search-results/:mainCategoryParam/:subCategoryParam/:voivodeshipParam/:cityParam" element={<SearchResults />}/>
                <Route path="terms-of-use" element={<TermsOfUse/>}/>
                <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="announcement/:announcementId" element={<AnnouncementPage/>}/>
                <Route path="login" element={<Authentication pageType="login"/>}/>
                <Route path="register" element={<Authentication pageType="register"/>}/>
                <Route path="users/:userId" element={<UserPage/>}/>
                <Route path="announcement/new" element={
                    <RequireAuth>
                        <AddAnnouncement/>
                    </RequireAuth>
                }/>
                <Route path="chat" element={
                    <RequireAuth>
                        <Chat/>
                    </RequireAuth>
                }/>
                <Route path="reservation/:reservationId" element={<ReservationConfirmation/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
