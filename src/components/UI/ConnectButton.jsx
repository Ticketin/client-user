import { ConnectKitButton } from "connectkit";

const ConnectButton = () => {
    return (
        <>
            <ConnectKitButton
                className="connectButton"
                customTheme={{
                    // "--ck-connectbutton-color": "#000000",
                    // "--ck-connectbutton-background": "#27dfe6",
                }}
            />
        </>
    );
};

export default ConnectButton;
