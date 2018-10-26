import { observable, action, reaction, computed } from 'mobx';
import axios from 'axios';

import transportLayer from '../utils/TransportLayer';
import ajaxUtils from '../utils/AjaxUtils';

// const LS_EVENT_KEY = 'event';
const LS_USER_KEY = 'user';

class Store {
    @observable currentEvent = null;
    @observable currentUser = null;
    @observable currentRole = null;
    @observable currentGreetings = [];
    @observable userEvents = [];

    @observable isSignedIn = false;

    @observable queryParams = {
        userId: null,
        eventId: null
    };

    // UI related
    @observable isLoginModal = false;
    @observable isNewEventModal = false;
    @observable isLoading = false;
    @observable redirectTo = null;

    constructor() {
        // Handle ajax errors
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    this.isAuthenticated = false;
                }
                else {
                    console.error(error.response);
                }
                return Promise.reject(error);
            });

        this.initialize();
    }

    @action initialize = async () => {
        this.getUserFromStorage();
        // await this.getUser(); // hard-coded login
        // await this.getEventsByUser(); // TODO: get only in home page
        // this.getEventFromStorage();
    };

    @action parseQueryParams = paramsObject => {
        Object.keys(paramsObject).forEach(k => {
            this.queryParams[k] = paramsObject[k];
        });
    };

    @computed get currentUserExists() {
        const exists = this.currentUser ? true : false;
        return exists;
    }

    // Only until proper login implemented
    @action dummyLogin = async () => {
        await this.getUser(1);
        this.toggleLoginModal();
        this.isSignedIn = true;
    };

    // @action getEventFromStorage = () => {
    //     this.currentEvent = JSON.parse(localStorage.getItem(LS_EVENT_KEY))
    //         || this.currentEvent;
    // };

    @action getUserFromStorage = () => {
        this.currentUser = JSON.parse(localStorage.getItem(LS_USER_KEY))
            || this.currentUser;
    };

    @action getEventFull = async (eventId, userId) => {
        try {
            this.isLoading = true;
            const data = await transportLayer.getEventFull(eventId, userId);
            this.currentEvent = data.event;
            this.currentRole = data.role;
            this.currentGreetings = data.greetings;
            this.getUser(userId);
            this.isLoading = false;
        }
        catch (err) { throw err; }
    }

    @action getUser = async userId => {
        try {
            this.isLoading = true;
            const user = await transportLayer.getUserById(userId);
            this.currentUser = user;
            this.isLoading = false;
        }
        catch (err) { throw err; }
    };

    @action getEventsByUser = async () => {
        try {
            this.isLoading = true;
            const events = await transportLayer.getEventsByUser(this.currentUser.id);
            this.userEvents = events;
            this.isLoading = false;
        }
        catch (err) { throw err; }
    };

    @action addEvent = async (title, date, users, isRedirect) => {
        try {
            this.isLoading = true;
            const userId = this.currentUser.id;
            const event = await transportLayer.createEvent({ title, date, userId, users });
            this.toggleNewEventModal();
            this.isLoading = false;
            if (isRedirect) {
                this.redirectTo = `${ajaxUtils.EVENTS_PATH}/${event.id}/${this.currentUser.id}`;
            }
            this.userEvents.push(event);
        }
        catch (err) { throw err; }
    };

    @action logout = () => {
        // TODO: logout user if he's signed-in
        this.currentUser = null;
        this.isSignedIn = false;
        this.queryParams.eventId = null;
        this.queryParams.userId = null;
        this.redirectTo = '/';
    };

    getEventDetails = reaction(
        () => ({ ...this.queryParams }),
        params => {
            if (params.userId && params.eventId) {
                this.getEventFull(params.eventId, params.userId);
            }
        }
    );

    // updateEventInStorage = reaction(
    //     () => ({ ...this.currentEvent }),
    //     event => { localStorage.setItem(LS_EVENT_KEY, JSON.stringify(event)) }
    // );

    updateUserInStorage = reaction(
        () => ({ ...this.currentUser }),
        () => {
            if (this.currentUser) {
                localStorage.setItem(LS_USER_KEY, JSON.stringify(this.currentUser))
            }
            else {
                localStorage.removeItem(LS_USER_KEY);
            }
        }
    );

    // UI related
    @action toggleLoginModal = () => {
        this.isLoginModal = !this.isLoginModal;
    };
    @action toggleNewEventModal = () => {
        this.isNewEventModal = !this.isNewEventModal;
    };

    @action resetRedirectTo = () => {
        this.redirectTo = null;
    };

    // Chat related
    @action createChatRoom = async () => {
        const roomId = await transportLayer.createChatRoom(this.currentEvent.id);
        this.currentEvent.chatRoomId = roomId;
    };
}

const store = new Store();
export default store;