import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class OurService {
  servicesData: any;
  constructor(private httpClient: HttpClient) {}
  getServices(servicetype: any) {
    return this.httpClient.get<any>("assets/services.json").pipe(
      map((response) => {
        return response;
      })
    );
  }
}
