export interface ReplicantMap {
    main: {
        title: string;
        presentor: string;
        program: string;
    };
    chat: Msgs;
    ad: ad;
    deck: deck;
    next: next;
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
export declare type ad = string[];
export declare type deck = string;
export declare type next = {
    time: string;
    event: string;
}[];
//# sourceMappingURL=replicant.d.ts.map