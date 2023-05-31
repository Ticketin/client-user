import { ConnectKitButton } from "connectkit";

const ConnectButton = () => {
    return (
        <>
            <ConnectKitButton
                className="connectButton"
                customTheme={{
                    "--ck-connectbutton-color": "#ffffff",
                    "--ck-connectbutton-background": "rgb(16 185 129)",
                }}
            />
        </>
    );
};

export default ConnectButton;
