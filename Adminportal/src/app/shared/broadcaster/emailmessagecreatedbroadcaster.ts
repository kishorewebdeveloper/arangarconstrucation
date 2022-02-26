import { Subject, Observable } from "rxjs";
import { filter, map } from 'rxjs/operators';

interface IBroadcastEvent {
    key: any;
    data?: any;
}

export class EmailMessageCreatedBroadCaster {

    private eventBus: Subject<IBroadcastEvent>;

    constructor() {
        this.eventBus = new Subject<IBroadcastEvent>();
    }

    broadCast(key: any, data?: any) {
        this.eventBus.next({ key, data });
    }

    on<T>(key: any): Observable<T> {
        return this.eventBus.asObservable().pipe(
            filter(event => event.key === key),
            map(event => <T>event.data)
        );
    }
}
