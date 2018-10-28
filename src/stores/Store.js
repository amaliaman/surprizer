import { observable, action, reaction, computed } from 'mobx';
import axios from 'axios';
import moment from 'moment';

import transportLayer from '../utils/TransportLayer';
import ajaxUtils from '../utils/AjaxUtils';

const LS_USER_KEY = 'user';

class Store {
    @observable currentEvent = null;
    @observable currentUser = null;
    @observable currentRole = null;
    @observable currentGreetings = [];
    @observable userEvents = [];
    @observable greetingTypes = [];
    @observable currentGreetingType = 1;

    @observable isSignedIn = false;

    @observable queryParams = {
        userId: null,
        eventId: null
    };

    // UI related
    @observable isLoginModal = false;
    @observable isNewEventModal = false;
    @observable isAddGreetingModal = false;
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
    };

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

    @action getGreetingTypes = async () => {
        // TODO: only if something changed on the server
        this.greetingTypes = await transportLayer.getGreetingTypes();
    }

    @computed get greetingTabsTitles() {
        return this.greetingTypes
            .map(t =>
                ({
                    id: t.id,
                    title: t.type,
                    count: this.currentGreetings
                        .filter(g => g.typeId === t.id)
                        .length
                }))
    }

    @computed get futureUserEvents() {
        return this.userEvents.filter(e => new Date(e.date) > new Date());
    }

    @computed get currentParties() {
        return this.userEvents
            .filter(e => {
                const now = moment();
                const eventDate = moment(e.date);
                const end = moment(e.date).add(4, 'h');
                return now.isBetween(eventDate, end);
            });
    }

    @action setGreetingType = typeId => {
        this.currentGreetingType = typeId;
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

    @action updateUser = async updateObject => {
        try {
            const user = await transportLayer.updateUser(this.currentUser.id, updateObject);
            if (user) {
                this.currentUser = user;
            }
        }
        catch (err) { throw err; }
    };

    @action createGreeting = async (text, isPrivate, typeId) => {
        try {
            this.isLoading = true;
            const userId = this.currentUser.id;
            const eventId = this.currentEvent.id;
            const greeting = await transportLayer.createGreeting({ userId, eventId, text, isPrivate, typeId });
            this.toggleAddGreetingModal();
            this.isLoading = false;
            this.currentGreetings.push(greeting);
            console.log(this.currentGreetings)
        }
        catch (err) { throw err; }
    };

    @action updateGreeting = async (greetingId, updateObject) => {
        const greeting = await transportLayer.updateGreeting(greetingId, updateObject);
        if (greeting) {
            let currentGreeting = this.currentGreetings.find(g => g.id === greetingId);
            Object.keys(updateObject).forEach(k => {
                currentGreeting[k] = updateObject[k];
            });
        }
    };

    @action deleteGreeting = async greetingId => {
        await transportLayer.deleteGreeting(greetingId);
        let currentIndex = this.currentGreetings.findIndex(g => g.id === greetingId);
        this.currentGreetings.splice(currentIndex, 1);
    };

    @action logout = () => {
        // TODO: logout user if he's signed-in
        this.currentUser = null;
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

    updateUserInStorage = reaction(
        () => ({ ...this.currentUser }),
        async () => {
            if (this.currentUser) {
                localStorage.setItem(LS_USER_KEY, JSON.stringify(this.currentUser))
                this.isSignedIn = true;
                await this.getEventsByUser();
            }
            else {
                localStorage.removeItem(LS_USER_KEY);
                this.isSignedIn = false;
                this.userEvents = [];
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

    @action toggleAddGreetingModal = () => {
        this.isAddGreetingModal = !this.isAddGreetingModal;
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