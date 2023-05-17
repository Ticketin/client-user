import React, { useState } from "react";

const DataContext = React.createContext({
    eventData: null,
    updateEventData: () => {},
});

export const DataContextProvider = (props) => {
    const [eventData, setEventData] = useState(null);

    const updateEventData = (newEventData) => {
        console.log(`updating event data!`);
        setEventData(newEventData);
    };

    return (
        <DataContext.Provider
            value={{
                eventData: eventData,
                updateEventData: updateEventData,
                // onConnect: connectWalletHandler,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export default DataContext;
