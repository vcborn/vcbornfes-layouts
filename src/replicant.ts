export interface ReplicantMap {
    main: {
        title: string;
        presentor: string;
        program: string;
    },
    chat: Msgs
}

export const replicantDefaultValues: ReplicantMap = {
    main: {
        title: "タイトル",
        presentor: "プレゼンター",
        program: "プログラム"
    },
    chat: []
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