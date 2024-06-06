import { DebounceFunction } from "@/types/types";

export function debounce<F extends (...args: any[]) => any>(func: F, delay: number): DebounceFunction<F> {
    let timeoutid: ReturnType<typeof setTimeout>

    return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
        const context = this;
        clearTimeout(timeoutid);

        timeoutid = setTimeout(() => {
            func.apply(context, args);
        }, delay)
    }
}