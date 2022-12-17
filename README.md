# VCborn Fes Layouts

This is the NodeCG bundle for the VCborn Fes.

## Dependencies

* NodeCG
* twitter-api-v2
* youtube-chat
* swiper.js

## Installation

1. Setup NodeCG
2. Clone this repository to bundles/vcborn-fes
3. Install node packages
4. Create a config named "vcborn-fes.json"

```json
{
  "twitter": {
    "bearerToken": "",
    "keyword": "#VCFes -is:retweet -is:reply"
  },
  "youtube": {
    "liveID": ""
  },
  "discord": {
    "botToken": ""
  }
}
```

## Contents

### Dashboard 

* Sampler
* Advertisement
* Next Schedule
* Current Event

### Graphics

* Main
* Waiting

### Extensions

All of the following will appear together in the chat section of the Main screen.

* Live Twitter Search
* YouTube Live Chat
* Discord Live Chat
