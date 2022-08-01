export interface ReplicantMap {
    main: {
        title: string;
        presentor: string;
        program: string;
    },
    chat: Msgs,
    ad: ad,
    next: next
}

export const replicantDefaultValues: ReplicantMap = {
    main: {
        title: "タイトル",
        presentor: "プレゼンター",
        program: "プログラム"
    },
    chat: [],
    ad: [],
    next: []
};

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

export type next = {
    time: string;
    event: string;
}[];