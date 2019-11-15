import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class MissionService {
  // Observable string sources  
  private missionheaderOpenSource = new Subject<string>();
  private missionheaderCloseSource = new Subject<string>();
  private missionheaderClosedSource = new Subject<string>();
  private missionheaderHelpCloseSource = new Subject<string>();
  private missionheaderRefreshSource = new Subject<string>();  
  private missionServerSource = new Subject<string>();
  private missionCatNameSource = new Subject<string>();
  private missionPopupSource = new Subject<string>();
  private SellPopupSource = new Subject<string>();
  
 
  
  // Observable string streams 
  missionheaderOpen$ = this.missionheaderOpenSource.asObservable();
  missionheaderClose$ = this.missionheaderCloseSource.asObservable();
  missionheaderClosed$ = this.missionheaderClosedSource.asObservable();
  missionheaderHelpClose$ = this.missionheaderHelpCloseSource.asObservable();
  missionheaderRefresh$ = this.missionheaderRefreshSource.asObservable();
  missionServer$ = this.missionServerSource.asObservable();
  missionCatName$ = this.missionCatNameSource.asObservable();
  missionPopup$ = this.missionPopupSource.asObservable();
  SellPopup$ = this.SellPopupSource.asObservable();
 
  
  // Service message commands  
  confirmheaderOpen(headerOpen: string) {
    this.missionheaderOpenSource.next(headerOpen);
  }

  confirmheaderClose(headerClose: string) {
    this.missionheaderCloseSource.next(headerClose);
  }

  confirmheaderClosed(headerClosed: string) {
    this.missionheaderClosedSource.next(headerClosed);
  }

  confirmheaderHelpClose(headerHelpClose: string) {
    this.missionheaderHelpCloseSource.next(headerHelpClose);
  }

  confirmheaderRefresh(headerRefresh: string) {
    this.missionheaderRefreshSource.next(headerRefresh);
  }
  
  confirmServer(serverError: string) {
    this.missionServerSource.next(serverError);
  }

  confirmcatName(catName: string) {
    this.missionCatNameSource.next(catName);
  }

  confirmLogin(popup: string) {
    this.missionPopupSource.next(popup);
  }

  confirmSellPopup(value: string) {
    this.SellPopupSource.next(value);
  }
  
}
