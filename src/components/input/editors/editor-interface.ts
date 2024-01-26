import { InputLikeProps } from "../base/Input/Input";

export interface EditorProps<T = string> extends InputLikeProps<T> {
    onChange?: (value: T) => void;
}
