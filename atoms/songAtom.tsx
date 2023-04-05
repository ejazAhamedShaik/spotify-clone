import { atom } from "recoil";

export const currentTrackState = atom({
    key: 'currentTrackState',
    default: ''
})

export const isPlayingSong = atom({
    key: 'isPlayingSong',
    default: false
})
