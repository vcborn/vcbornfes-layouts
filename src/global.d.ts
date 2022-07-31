import type { CreateNodecgInstance } from 'ts-nodecg/browser';
import type { ReplicantMap } from './replicant';

declare global {
    const nodecg: CreateNodecgInstance<
        'fes',
        undefined,
        ReplicantMap,
        { [x: string]: never }
    >;
}