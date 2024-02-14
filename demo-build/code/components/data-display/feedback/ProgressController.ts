export type ProgressData = {
    progress: number;
    total: number;
    error: boolean;
    finished: boolean;
    data: any;
    message: string | null;
    stepId: string | null;
    /** Der `index` beginnt bei 0. */
    step: ProgressStep | null;
    totalSteps: number | null;
};

type UpdateProgressData = {
    progress: number;
    total: number;
    message: string | null;
    finished: boolean;
    stepId: string | null;
    stepProgress?: { progress: number; total: number } | null;
    error: boolean;
};

export type ProgressListener = (progressState: ProgressData) => void;

export type ProgressStep = { label: string; id: string; index: number; type?: "query" | "determinate" | "buffer"; progress: { total: number; progress: number } | null };

interface ProgressControllerOptions {
    steps?: Omit<ProgressStep, "index" | "progress">[];
    initialState?: Partial<UpdateProgressData>;
    clearOnFinish?: boolean;
}

/** Utility class for progress handling */
export default class ProgressController<D = any> {
    readonly steps: Map<string, ProgressStep> = new Map();
    private stepsArr: ProgressStep[] = [];
    private _finished = false;
    private _state: ProgressData;
    private listeners = new Set<ProgressListener>();
    private clearOnFinish: boolean;

    constructor(options?: ProgressControllerOptions) {
        this.clearOnFinish = options?.clearOnFinish !== false;
        // Default inital state
        this._state = {
            message: null,
            totalSteps: options?.steps ? options.steps.length : null,
            error: false,
            finished: false,
            data: undefined,
            total: 0,
            progress: 0,
            step: null,
            stepId: null,
        };

        if (options?.steps) this.setSteps(options?.steps);
        if (options?.initialState) this.updateState(options.initialState);
    }

    private updateState(data: Partial<UpdateProgressData>) {
        let step: ProgressData["step"] = this._state.step;

        // Step bestimmen, falls nur stepId angegeben ist
        if (data.stepId && this.steps.has(data.stepId)) step = this.steps.get(data.stepId)!;
        else if (data.stepId === null) step = null;
        else if (data.stepId === undefined) step = this._state.step;

        if (step && data.stepProgress) step.progress = data.stepProgress;

        for (const mem in data) if ((data as any)[mem] === undefined) delete (data as any)[mem];

        this._state = {
            ...this._state,
            ...data,
            step: step ? { ...step, progress: data.stepProgress === null ? null : data.stepProgress || step.progress || null } : null,
        };

        // stepProgress aus `this._state` entfernen. Die props ist evtl. in `data` enthalten und wird hier wieder entfernt d
        delete (this._state as any).stepProgress;
    }

    get finished() {
        return this._finished;
    }

    get state() {
        return this._state;
    }

    setSteps(steps: Omit<ProgressStep, "index" | "progress">[]) {
        this.stepsArr = steps.map((step, i) => ({ ...step, type: step.type || "determinate", index: i, progress: null }));
        this.stepsArr.forEach(step => this.steps.set(step.id, step));
        this._state.totalSteps = steps.length;
    }

    /**
     * @param listener
     * @param init Falls _true_, wird der `listener` direkt mit dem aktuellen Status aufgerufen
     */
    addListener(listener: ProgressListener, init?: boolean) {
        this.listeners.add(listener);
        if (init) listener(this._state);
    }

    onProgress(listener: ProgressListener) {
        this.listeners.add(listener);
    }

    removeListener(listener: ProgressListener) {
        this.listeners.delete(listener);
    }

    clear() {
        this.listeners.clear();
    }

    finish() {
        this._finished = true;
        if (this.clearOnFinish) this.clear();
    }

    private notifyListeners() {
        Array.from(this.listeners).forEach(listener => listener(this.state));
    }

    notify(data: Partial<UpdateProgressData>) {
        this.updateState(data);
        this.notifyListeners();
        if (data.finished) this.finish();
    }

    notifyError(data?: { message?: string | null; finished?: boolean }) {
        this.updateState({ ...data, error: true });
        this.notifyListeners();
    }

    notifyFinished(data?: { data?: D; message?: string | null }) {
        // Progress auf total setzen (Also 100%) + finished setzen
        this.updateState({ ...data, progress: this._state.total, finished: true });
        this.notifyListeners();
        this.finish();
    }
}
