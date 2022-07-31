export interface ReplicantMap {
    main: {
        title: string;
        presentor: string;
        program: string;
    };
    chat: Msgs;
}
export declare const replicantDefaultValues: ReplicantMap;
export declare type Msgs = {
    id?: string;
    createdAt: string;
    text: string;
    service: string;
    user: {
        name?: string;
        screenName: string;
        profileImageUrl: string | undefined;
    };
}[];
export declare type Msg = Msgs[number];
//# sourceMappingURL=replicant.d.ts.map