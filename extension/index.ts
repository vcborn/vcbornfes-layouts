import { NodeCG } from "nodecg-types/types/server";
import { TwitterApi, ETwitterStreamEvent } from "twitter-api-v2";
import { LiveChat } from "youtube-chat"
import { Msg, Msgs } from "../src/replicant";

module.exports = async function (nodecg: NodeCG) {
    nodecg.log.info("vcborn-fes bundle started.");

    const msgsRep = nodecg.Replicant("chat", { defaultValue: [] });
    msgsRep.value = []

    const addMsg = (newMsg: Msg) => {
        if (msgsRep.value.length >= 20) {
            //@ts-ignore
            msgsRep.value.unshift(newMsg);
            msgsRep.value.pop();
        } else {
            //@ts-ignore
            msgsRep.value.unshift(newMsg);
        }
    };

    if (nodecg.bundleConfig.youtube.liveID !== "") {
        console.log(nodecg.bundleConfig.youtube.liveID)
        const liveChat = new LiveChat({ liveId: nodecg.bundleConfig.youtube.liveID })
        liveChat.on("chat", (chatItem) => {
            let message: string[] = []
            chatItem.message.forEach((msg) => {
                if ("text" in msg) {
                    message.push(msg.text)
                }
            });
            const newChat: Msg = {
                createdAt: new Date(chatItem.timestamp).toISOString(),
                text: message.join(),
                service: "youtube",
                user: {
                    screenName: chatItem.author.name,
                    profileImageUrl: chatItem.author.thumbnail?.url
                }
            }
            addMsg(newChat);
        })
        const ok = await liveChat.start()
        if (!ok) {
            nodecg.log.error("Failed to start, check emitted error")
        }
    } else {
        nodecg.log.info("liveid not set")
    }

    if (nodecg.bundleConfig.twitter.bearerToken !== "") {
        const twitterClient = new TwitterApi(nodecg.bundleConfig.twitter.bearerToken);
        const rules = await twitterClient.v2.streamRules();
        if (rules.data?.length) {
            await twitterClient.v2.updateStreamRules({
                delete: { ids: rules.data.map((rule: { id: any; }) => rule.id) },
            });
        }

        await twitterClient.v2.updateStreamRules({
            add: [{ value: 'JavaScript -is:retweet -is:reply' }],
        });

        const stream = await twitterClient.v2.searchStream({
            'tweet.fields': ['author_id', 'created_at'],
            'user.fields': ['profile_image_url', 'username', 'name'],
            expansions: ['author_id'],
        });
        // Enable auto reconnect
        stream.autoReconnect = true;

        stream.on(ETwitterStreamEvent.Data, async (tweet: any) => {
            const newTweet: Msg = {
                id: tweet.data.id,
                user: {
                    profileImageUrl: tweet.includes.users[0].profile_image_url,
                    name: tweet.includes.users[0].username,
                    screenName: tweet.includes.users[0].name,
                },
                service: "twitter",
                text: tweet.data.text.replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
                createdAt: new Date(tweet.data.created_at).toISOString(),
            };
            addMsg(newTweet);
        });
    } else {
        nodecg.log.info("bearer token not set")
    }
}