import youtubeSearch from 'youtube-api-v3-search'

import YTApi from '../../services/apiYoutube'

const API_KEY = YTApi

export const searchVideoStart = () => {
    return {
        type: 'SEARCH_VIDEO',
        loading: true,
        error: false
    }
}

export const searchVideoSuccess = (videos) => {
    return {
        type: 'SEARCH_VIDEO_SUCCESS',
        videos,
        loading: false,
        error: false
    }
}

export const searchVideoError = () => {
    return {
        type: 'SEARCH_VIDEO_ERROR',
        loading: false,
        error: true
    }
}

export const searchVideo = (params) => {
    console.log(params)
    return dispatch => {

        dispatch(searchVideoStart())
        youtubeSearch(API_KEY, { q: params })
            .then((data) => dispatch(searchVideoSuccess(data.items)))
            .catch(() => dispatch(searchVideoError()))
    }
}