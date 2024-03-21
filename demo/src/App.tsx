import AppContextProvider from "./AppContextProvider";
import AppMenu from "./AppMenu";
import Demos from "./Demos";
import { AlertsProvider } from "@react-base/src/providers";

export default function App() {
    return (
        <AlertsProvider>
            <AppContextProvider>
                <div className="flex flex-row h-full">
                    <AppMenu />
                    <Demos className="flex-grow px-10 py-5" />
                </div>
            </AppContextProvider>
        </AlertsProvider>
    );
}
