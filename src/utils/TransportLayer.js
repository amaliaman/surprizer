import ajaxUtils from './AjaxUtils';

// Return a promise
class TransportLayer {

    // Get event with all greetings (trimmed by user permissions)
    getEventFull = (eventId, userId) => {
        const url = `${ajaxUtils.EVENTS_PATH}/${eventId}/${userId}`;
        return ajaxUtils.queryApi('get', url);
    };

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

    // Update user
    updateUser = (userId, updateObject) => {
        const url = `${ajaxUtils.USERS_PATH}/${userId}`;
        return ajaxUtils.queryApi('put', url, updateObject);
    };

    // Get greeting types
    getGreetingTypes = () => {
        const url = `${ajaxUtils.GREETING_TYPES_PATH}`;
        return ajaxUtils.queryApi('get', url);
    }

    // Update greeting
    updateGreeting = (greetingId, updateObject) => {
        const url = `${ajaxUtils.GREETING_PATH}/${greetingId}`;
        return ajaxUtils.queryApi('put', url, updateObject);
    };

    // Create greeting
    createGreeting = (greetingObject) => {
        const url = ajaxUtils.GREETING_PATH;
        return ajaxUtils.queryApi('post', url, greetingObject);
    };

    // Delete greeting
    deleteGreeting = greetingId => {
        const url = `${ajaxUtils.GREETING_PATH}/${greetingId}`;
        return ajaxUtils.queryApi('delete', url);
    };

    // ===== chat related

    // Create chat room
    createChatRoom = eventId => {
        const url = ajaxUtils.CHAT_ROOMS_PATH;
        return ajaxUtils.queryApi('post', url, { eventId });
    }

    chatLogin = body => {
        const url = ajaxUtils.CHAT_USERS_PATH;
        return ajaxUtils.queryApi('post', url, body);
    };
}

const transportLayer = new TransportLayer();
export default transportLayer;