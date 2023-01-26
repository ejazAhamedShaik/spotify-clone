import { atom } from "recoil";
import { PlayListInterface } from "../types/PlayListsInterface";

export const playlistState = atom({
    key: 'playlistState',
    default: {} as any
})

export const playlistIdState = atom({
    key: 'playlistIdState',
    default: '17xJ6aUGPl70C3k0SwBkaN'
})
