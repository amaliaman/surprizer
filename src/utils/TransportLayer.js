import ajaxUtils from './AjaxUtils';

// Return a promise
class TransportLayer {

    // Get event with all greetings (trimmed by user permissions)
    getEventFull = (eventId, userId) => {
        const url = `${ajaxUtils.EVENTS_PATH}/${eventId}/${userId}`;
        return ajaxUtils.queryApi('get', url);
    };

    // // Update event details
    // updateEvent = (eventId, updateObject) => {
    //     const url = `${ajaxUtils.CHAT_PATH}/${eventId}`;
    //     return ajaxUtils.queryApi('put', url, updateObject);
    // };

    // Get event with all greetings (trimmed by user permissions)
    getUserById = userId => {
        const url = `${ajaxUtils.USERS_PATH}/${userId}`;
        return ajaxUtils.queryApi('get', url);
    };

    // Get events for current user (minus future events where he's surprisee)
    getEventsByUser = userId => {
        const url = `${ajaxUtils.USERS_PATH}/${userId}${ajaxUtils.EVENTS_PATH}`;
        return ajaxUtils.queryApi('get', url);
    };

    // Create event
    createEvent = event => {
        const url = ajaxUtils.EVENTS_PATH;
        return ajaxUtils.queryApi('post', url, event);
    }

    // Create chat room
    createChatRoom = eventId => {
        const url = ajaxUtils.CHAT_ROOMS_PATH;
        return ajaxUtils.queryApi('post', url, { eventId });
    }

    // Update user
    updateUser = (userId, updateObject) => {
        const url = `${ajaxUtils.USERS_PATH}/${userId}`;
        return ajaxUtils.queryApi('put', url, updateObject);
    };
}

const transportLayer = new TransportLayer();
export default transportLayer;