import {TAGDATA} from "actions/tagData";

const initState = {
    tag: 'news_hot'
}

export default function reducer (state = initState, action) {
    switch (action.type) {
        case TAGDATA:
            return {
                tag: action.tag
            }
        default:
            return state;
    }
}