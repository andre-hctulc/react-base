import React from "react";

export default function useSnackbarTrigger(trigger: any): [boolean, () => void] {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        if (trigger) setIsOpen(true);
    }, [trigger]);

    const _close = () => setIsOpen(false);

    return [isOpen, _close];
}
