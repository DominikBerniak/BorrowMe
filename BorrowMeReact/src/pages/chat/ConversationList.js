import {useEffect, useState} from "react";
import {getData} from "../../services/apiFetch";
import {useSelector} from "react-redux";
import ConversationsAnnouncements from "./conversationList/ConversationsAnnouncements";
import ConversationsReservations from "./conversationList/ConversationsReservations";

const ConversationList = () => {
    const [chosenConvoTab, setChosenConvoTab] = useState("announcements");
    const [fetchedConversations, setFetchedConversations] = useState(null);
    const userId = useSelector(state=>state.authUser.value).userId;

    useEffect(()=>{
         if (!fetchedConversations)
         {
             getData(`/api/Users/${userId}/conversations`)
                 .then(conversations=>{
                     setFetchedConversations(conversations);
                 })
         }
    },[])


    return (
        <div id="chat-conversation-list-container" className="w-100 user-select-none">
            <div className="d-flex justify-content-center w-100 mb-3">
                <button className={"chat-conversation-type-button ps-3 pe-3 py-2 w-50 "
                    + (chosenConvoTab === "announcements" && "selected-chat-conversation-type-button")
                }
                    onClick={()=>setChosenConvoTab("announcements")}
                >Twoje ogłoszenia</button>
                <button className={"chat-conversation-type-button ps-3 pe-3 py-2 w-50 "
                    + (chosenConvoTab === "reservations" && "selected-chat-conversation-type-button")
                }
                    onClick={()=>setChosenConvoTab("reservations")}
                >Twoje rezerwacje</button>
            </div>
            {fetchedConversations &&
                <div className="w-100">
                    {chosenConvoTab === "announcements" ?
                        <ConversationsAnnouncements announcements={fetchedConversations.announcements}/>
                        :
                        <ConversationsReservations reservations={fetchedConversations.reservations}/>
                    }
                </div>
            }
        </div>
    );
};

export default ConversationList;
