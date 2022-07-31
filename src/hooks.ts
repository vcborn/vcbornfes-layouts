import { useCallback, useEffect, useRef, useState } from 'react';
import { replicantDefaultValues, type ReplicantMap } from './replicant';

export const useReplicant = <T extends keyof ReplicantMap>(
    name: T
): [ReplicantMap[T] | undefined, (newValue: ReplicantMap[T]) => void] => {
    const [rep] = useState(() =>
        nodecg.Replicant(name, {
            defaultValue: replicantDefaultValues[name]
        })
    );
    const [value, setValue] = useState(rep.value);
    useEffect(() => {
        const handleChange = (newValue: ReplicantMap[T]) => setValue(newValue);
        rep.on('change', handleChange);
        return () => {
            rep.removeListener('change', handleChange);
        };
    }, [rep]);
    return [value, useCallback(newValue => (rep.value = newValue), [rep])];
};

export const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};