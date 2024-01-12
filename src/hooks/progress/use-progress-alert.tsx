import { useAlerts } from "@react-client/contexts/alert-context";
import ProgressController, { ProgressListener } from "@client-util/progress-controller";
import Progress from "@react-client/components/data-display/loading/progress";
import { PropsOf } from "@react-client/util";
import clsx from "clsx";
import { firstInt } from "@client-util/iterables";

export type ProgressAlertOptions = {
    controller?: ProgressController;
    title?: string;
    progressProps?: Partial<PropsOf<typeof Progress>>;
    /**
     * Zeit, die der Alert bestehen bleibt, nachdem der Progress abgeschlossen ist (in Millisekunden).
     * @default 4000
     * */
    closeTimeout?: number;
    errorMessage?: string;
};

export default function useProgressAlert(options?: ProgressAlertOptions) {
    const { info } = useAlerts();

    function progressAlert(overwriteOptions?: ProgressAlertOptions) {
        const controller = options?.controller || overwriteOptions?.controller;
        // Merge `options` und `overwriteOptions`. Dabei überschreibt  `overwriteOptions` und `options`
        const _options: ProgressAlertOptions = { ...options, ...overwriteOptions, progressProps: { ...options?.progressProps, ...overwriteOptions?.progressProps } };

        if (!controller) return;

        const promise = new Promise<void>(resolve => {
            const listener: ProgressListener = ({ finished }) => {
                // nach success oder error 30 Sekunden abwarten, dann den alert schließen (also diesn Promise resolven)
                if (finished) {
                    controller.removeListener(listener);
                    setTimeout(() => resolve(), firstInt(options?.closeTimeout, 4000));
                }
            };
            controller.addListener(listener);
        });

        info(
            <Progress
                controller={controller}
                label={_options?.title}
                {..._options?.progressProps}
                className={clsx(options?.progressProps?.className, "max-w-full flex-grow")}
                slotProps={{ progressText: { style: { width: 50, maxWidth: 50 } } }}
            />,
            {
                duration: promise,
            }
        );
    }

    return progressAlert;
}
