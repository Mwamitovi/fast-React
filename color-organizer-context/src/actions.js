import C from './constants'
import { v4 } from 'uuid'


/**
 * Action Creators
 * 
 * Action objects are simply JavaScript literals.
 * Action creators are functions that create and return these literals.
 * Action creators can abstract away details of how an action is created, 
 * which can greatly simplify the process of creating an action. 
 * 
 * We can simplify the logic involved with generating an action by 
 * adding an action creator for each of our action types.
 * For example, if we create an action called sortBy, 
 * it can decide the appropriate action to take.
 */


export const addColor = (title, color) => ({
    type: C.ADD_COLOR,
    id: v4(),
    title,
    color,
    timestamp: new Date().toString()
});


export const removeColor = id => ({
    type: C.REMOVE_COLOR,
    id
});


export const rateColor = (id, rating) => ({
    type: C.RATE_COLOR,
    id,
    rating
});


export const sortColors = sortedBy => {
    (sortedBy === 'rating') ?
        ({
            type: C.SORT_COLORS,
            sortBy: 'SORTED_BY_RATNG'
        }) :
        (sortedBy === 'title') ?
            ({
                type: C.SORT_COLORS,
                sortBy: 'SORTED_BY_TITLE'
            }) :
            ({
                type: C.SORT_COLORS,
                sortBy: 'SORTED_BY_DATE'
            })
};
