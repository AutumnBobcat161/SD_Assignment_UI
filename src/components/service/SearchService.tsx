import { SearchRequest, SearchRequestImp } from "../types/searchTypes"

export class SearchService {

    public static createEmptySearchRequest() {
        const searchRequest: SearchRequest = {
            title: '',
            tags: []
        }
        return searchRequest
    }

    public static createEmptySearchRequestImp() {
        const searchRequest: SearchRequestImp = {
            title: '',
            tags: ''
        }
        return searchRequest
    }
}