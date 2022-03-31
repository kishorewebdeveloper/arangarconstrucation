import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable()
export class OurService {
  private baseUrl = environment.apiBaseUrl;
  servicesData: any;
  constructor(private httpClient: HttpClient) { }
  getServices(servicetype: any) {
    return this.httpClient.get<any>(this.baseUrl + "api/projectswithimages").pipe(
      map((response) => {
        return response;
      })
    );
  }
}
