import { useRef } from "react";

type DelayType = number;

const useDebounce = <Params extends any[]>(
    callback: (...args: Params) => any,
    delay: DelayType
) => {
    const timer = useRef<number>();

    return (...args: Params) => {
        clearTimeout(timer.current);

        timer.current = setTimeout(() => callback(...args), delay);
    };
};

export default useDebounce;
