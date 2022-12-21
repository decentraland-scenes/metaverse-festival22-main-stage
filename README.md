# Metaverse Festival 2022 Main Sage

Assets and code used for the [Metaverse Festival 2022](https://decentraland.org/blog/announcements/metaverse-music-festival-2022-everything-there-is-to-know-so-far/) Main Stage Scene

## How to deploy

NOTE: This is deployed by a git action
branches are configured to auto deploy.  Merge code ready to release into release branch

* release = production

> Requires an action secret setup named DCL_PRIVATE_KEY that has a private key to a wallet that has operator rights to the parcels you are deploying to 

## Description

This scene demonstrates how to synchronize actions in the scene to specific moments in a video by implementing the [Show Management Library](https://github.com/decentraland/show-management#readme).

This scene shows you:

- How to schedule playing a video streamed on-demand to play at a certain time
- How to sync actions in the scene to moments in the video 

> Note: For details on how to store videos in servers that can be fetched from Decentraland, see [Video Streaming](https://github.com/decentraland-scenes/video-streaming)

## Tutorial

### Show Managment Library

[https://github.com/decentraland/show-management#readme](https://github.com/decentraland/show-management#readme)

### Show Management Scene

[https://github.com/decentraland-scenes/show-management](https://github.com/decentraland-scenes/show-management)


[https://www.youtube.com/watch?v=EdcDVDUZX4E](https://www.youtube.com/watch?v=EdcDVDUZX4E)



## What is Where

#### src/show-management 

is a copy of the show management library code. hopfully you do not have to touch this. but is there for quick edits if needed

### src/subtitle-files 

holds subtitles for videos

### src/modules/festivalMgmt

serverHandler.ts handled pinging the remote server

manageShow.ts handles actions to fire for a show

### showMgmt/modules/showMgmt

#### showMgmt/modules/showMgmt/scheduleSetup.ts 

configured shows however serverHandler.ts will override this

Default video url is in here

#### showMgmt/modules/showMgmt/showEntities.ts

registers show entities with the show manager. Example animations

#### showMgmt/modules/showMgmt/showSetup.ts 

sets up the show manager instance



## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.