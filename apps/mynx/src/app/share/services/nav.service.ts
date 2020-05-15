import { Injectable } from '@angular/core';
import { SimpleReuseStrategy } from '../strategies/simple-reuse-srategy';
import { Location } from '@angular/common';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class NavService {

  clearTo = false;

  history: NavigationEnd[] = [];

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.router.events.pipe(filter(x => x instanceof NavigationStart))
      .subscribe((x: NavigationStart) => {
        if (this.clearTo) {
          SimpleReuseStrategy.deleteRouteSnapshot(x.url);
          this.clearTo = false;
        }
      });
    this.router.events.pipe(filter(x => x instanceof NavigationEnd))
      .subscribe((x: NavigationEnd) => {
        if (x.url === x.urlAfterRedirects) this.history.unshift(x);
      })
  }

  back(clearTo?: boolean) {
    this.removeThis();
    this.clearTo = clearTo;
    const first = _.first(this.history);
    const urlSplit = _.split(first.url, '/');
    if (urlSplit.length >= 3) {
      const url = _.join(_.take(urlSplit, 3), '/');
      const his = _.find(this.history, (x: NavigationEnd) =>
        x.id !== first.id
        && x.url.indexOf(url) === 0
        && x.url !== first.url);
      if (his) {
        this.router.navigateByUrl(his.url).then(() => {
          _.remove(this.history, x => x.id > his.id)
        });
      } else {
        const url1 = _.join(_.take(urlSplit, urlSplit.length - 1), '/');
        this.backTo(url1, first.url);
      }
      return false;
    }
    window.history.back();
  }

  backTo(url, nowUrl) {
    this.router.navigateByUrl(url).then(() => {
      if (_.first(this.history).urlAfterRedirects === nowUrl) {
        const urlSplit = _.split(url, '/');
        this.backTo(_.join(_.take(urlSplit, urlSplit.length - 1), '/'), nowUrl)
      }
    })
  }

  removeThis() {
    const url = this.location.path();
    SimpleReuseStrategy.deleteRouteSnapshot(url);
  }
}
