import { Tag } from "./questionTypes";

export interface SearchRequest {
    title: string;
    tags: Tag[]
}

export interface SearchRequestImp {
    title: string;
    tags: string
}