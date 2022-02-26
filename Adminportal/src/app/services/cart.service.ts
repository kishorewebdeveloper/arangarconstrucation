import { environment } from '../../environments/environment';
import { Injectable, Inject } from '@angular/core';
;

@Injectable()

export class CartService {

    create(cartId: string, data: any) {// jshint ignore:line
        this.setLocalStorageProperties(cartId, data);
        this.setSessionProperties(cartId, data);
    }

    destroy(cartId) {// jshint ignore:line
        this.setLocalStorageProperties(cartId, null);
        this.setSessionProperties(cartId, null);
    }

    load(cartId) { // jshint ignore:line
        const jsonData = localStorage.getItem(cartId);
        if (jsonData)
            this.setSessionProperties( cartId, jsonData);
        return JSON.parse(jsonData);
    }

    setLocalStorageProperties(cartId: string, data: any) {// jshint ignore:line
        localStorage.setItem(cartId, JSON.stringify(data));
    }

    setSessionProperties(cartId: string, data: any) {// jshint ignore:line
        sessionStorage.setItem(cartId, JSON.stringify(data));
    }

    getLocalStorageWithKey(key: any) {// jshint ignore:line
        return localStorage.getItem(key);
    }

    setLocalStorageWithKey(key: any, session: any) {// jshint ignore:line
        localStorage.setItem(key, JSON.stringify(session));
    }
}

