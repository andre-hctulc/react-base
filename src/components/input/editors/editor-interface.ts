import { InputLikeProps } from "../base/input";

export interface EditorProps<T = string> extends InputLikeProps<T> {
    onChange?: (value: T) => void;
}
