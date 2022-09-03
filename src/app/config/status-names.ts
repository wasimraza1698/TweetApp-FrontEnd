import { Injectable } from "@angular/core";

@Injectable()
export class StatusNames {
    public static readonly STATUS_NAMES = {
        200 : '200 OK',
        201 : '201 Created',
        400 : '400 Bad Request',
        401 : '401 Unauthorized',
        403 : '403 Forbidden',
        404 : '404 Not Found',
        405 : '405 Method Not Allowed'
    }
}