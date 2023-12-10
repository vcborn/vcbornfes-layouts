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
export type Msgs = {
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
export type Msg = Msgs[number];
export type ad = string[];
export type deck = string;
export type next = {
    time: string;
    event: string;
}[];
//# sourceMappingURL=replicant.d.ts.map