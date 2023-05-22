import React, { useState } from "react";

const DataContext = React.createContext({
    eventData: null,
    updateEventData: () => {},
});

export const DataContextProvider = (props) => {
    const [eventData, setEventData] = useState(null);
    const [eventDataUser, setEventDataUser] = useState(null);

    const updateEventData = (newEventData) => {
        console.log(`updating event data!`);
        setEventData(newEventData);
    };

    const updateEventDataUser = (newEventData) => {
        console.log(`updating event data!`);
        setEventDataUser(newEventData);
    };

    return (
        <DataContext.Provider
            value={{
                eventData: eventData,
                eventDataUser: eventDataUser,
                updateEventData: updateEventData,
                updateEventDataUser: updateEventDataUser,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export default DataContext;
