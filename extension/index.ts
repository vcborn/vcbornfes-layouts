import { requireService } from "nodecg-io-core";
import { NodeCG } from "nodecg-types/types/server";
import { DiscordServiceClient } from "nodecg-io-discord";
import { GoogleApisServiceClient } from "nodecg-io-googleapis";
import { TwitterServiceClient } from "nodecg-io-twitter";
import { ETwitterStreamEvent } from "twitter-api-v2";
import { Msg, Msgs } from "../src/replicant";

module.exports = function (nodecg: NodeCG) {
    nodecg.log.info("vcborn-fes bundle started.");

    const discord = requireService<DiscordServiceClient>(nodecg, "discord");
    const googleapis = requireService<GoogleApisServiceClient>(nodecg, "googleapis");
    const twitter = requireService<TwitterServiceClient>(nodecg, "twitter");

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

    discord?.onAvailable(async (discordClient) => {
        nodecg.log.info("discord service has been updated.");
        // You can now use the discord client here.
    });

    discord?.onUnavailable(() => {
        nodecg.log.info("discord has been unset.");
    });

    googleapis?.onAvailable(async (youtubeClient) => {
        nodecg.log.info("youtube service has been updated.");
        youtubeClient.on("chat", (chatItem) => {
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
        const ok = await youtubeClient.start()
        if (!ok) {
            nodecg.log.info("Failed to start, check emitted error")
        }
    });

    googleapis?.onUnavailable(() => {
        nodecg.log.info("googleapis has been unset.");
    });

    twitter?.onAvailable(async (twitterClient) => {
        nodecg.log.info("Twitter client has been updated.");
        const rules = await twitterClient.v2.streamRules();
        if (rules.data?.length) {
            await twitterClient.v2.updateStreamRules({
                delete: { ids: rules.data.map((rule: { id: any; }) => rule.id) },
            });
        }

        await twitterClient.v2.updateStreamRules({
            add: [{ value: 'JavaScript -filter:retweets -filter:replies -filter:links' }],
        });

        const stream = await twitterClient.v2.searchStream({
            'user.fields': ['profile_image_url', 'username', 'name']
        });
        // Enable auto reconnect
        stream.autoReconnect = true;

        stream.on(ETwitterStreamEvent.Data, async (tweet: any) => {
            const newTweet: Msg = {
                id: tweet.id_str,
                user: {
                    profileImageUrl: tweet.user.profile_image_url_https,
                    name: tweet.user.name,
                    screenName: tweet.user.screen_name,
                },
                service: "twitter",
                text: tweet.text.replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
                createdAt: new Date(tweet.created_at).toISOString(),
            };
            addMsg(newTweet);
        });
    });

    twitter?.onUnavailable(() => {
        nodecg.log.info("twitter has been unset.");
    });
}