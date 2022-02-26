import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from "../../environments/environment"; 
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

    private baseUrl = environment.apiBaseUrl;

    private cache: any = {};

    constructor(private http: HttpClient) {
    }

    getData(route: string, refresh: boolean) {
        if (this.dataForRouteIsCached(route, refresh)) {
            return of(this.cache[route]);
        } else { // no cached data or refresh requested
            return this.http.get<any>(this.baseUrl + route).pipe(map(response => {
                this.cache[route] = response;
                return response;
            }));
        }
    }

    getDataWithParams(route: string, params: any, refresh: boolean) {
        if (this.dataForRouteIsCached(route, refresh)) {
            return of(this.cache[route]);
        } else { // no cached data or refresh requested
            return this.http.get<any>(this.baseUrl + route, { params: params }).pipe(map(response => {
                this.cache[route] = response;
                return response;
            }));
        }
    }

    getRecord(route: string) {
        return this.http.get<any>(this.baseUrl + route);
    }

    getRecordWithParams(route: string, params: any) {
        return this.http.get<any>(this.baseUrl + route, { params: params });
    }

    post(route: string, data: any) {
        return this.http.post<any>(this.baseUrl + route, data);
    }

    delete(route: string) {
        return this.http.delete(this.baseUrl + route).pipe(map(response => {
            return response;
        }));
    }

    downloadFile(route: string) {
        return this.http.get(this.baseUrl + route, { responseType: 'blob' });
    }

    getExternalData(route: string) {
        return this.http.get<any>(route).pipe(map(response => {
            return response;
        }));
    }

    dataForRouteIsCached(route: string, refresh: boolean) {
        return this.cache[route] && (refresh === false || refresh === undefined);
    }

    clearCache() {
        this.cache = {};
    }

    clearRouteCache(route: string) {
        this.cache[route] = null;
    }

    getHttpParams(data: any) {
        let httpParams = new HttpParams();
        Object.keys(data).forEach(key => {
            httpParams = httpParams.append(key, data[key]);
        });
        return data;
    }
}