export * from "./react";

/** This is the prefix of ids and class names // TODO */
export const pre = "$B_";

// * Helpers

/** 🌊 🎯 */
export function collapse<V extends string, R = any>(value: V, map: { [K in V]: R }, fallback?: R): R {
    if (!(value in map) && fallback !== undefined) return fallback as R;
    return map[value];
}

/** 🌊 🎯 🥈 */
export function collapseWeak<V extends string, R = any>(
    value: V | undefined,
    map: { [K in V]?: R }
): R | undefined {
    if (value === undefined) return undefined;
    return map[value];
}

// * Timing

/**
 * Control points for a cubic bezier curve.
 */
export type CubicBezierInput = [number, number, number, number];

/**
 * [Bézierkurve](https://de.wikipedia.org/wiki/Bézierkurve), [Generator](https://cubic-bezier.com/#.17,.67,.83,.67)
 *
 * Berechnet den Wert an `t`.
 * @param t _0 <= t <= 1_
 * @param controllPoints Kontrollpunkte der Bézierkurve. Defaults to _[0, 0.1, 0.9, 1]_. `cubicBezier` besitzt auch Standard-Werte als static members. Defaults to `cubicBezier.easeIn`
 * @returns _0 <= t <= 1_. Es gilt `cubicBezier(0)=0` und `cubicBezier(1)=1`
 */
export function cubicBezier(t: number, controllPoints?: CubicBezierInput) {
    const [p0, p1, p2, p3] = controllPoints || cubicBezier.easeIn;

    /** Interpolation = estimate values between two points for a given function */
    function bezierInterpolation(t: number, p0: number, p1: number, p2: number, p3: number) {
        return (
            Math.pow(1 - t, 3) * p0 +
            3 * Math.pow(1 - t, 2) * t * p1 +
            3 * (1 - t) * Math.pow(t, 2) * p2 +
            Math.pow(t, 3) * p3
        );
    }

    // Calculate the value on the curve for a given time fraction 't'
    return bezierInterpolation(t, p0, p1, p2, p3);
}
cubicBezier.easeIn = [0.42, 0, 0.58, 1] as CubicBezierInput;
cubicBezier.easeOut = [0, 0, 0.42, 1] as CubicBezierInput;
cubicBezier.ease = [0.25, 0, 0.75, 1] as CubicBezierInput;
