import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client = contentful.createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessTokenDelivery,
  })

  get getContent() {
    return this.client.getEntries({
      content_type: 'mainPage',
    })
  }
  constructor() { }
}
