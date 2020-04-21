import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import moment from 'moment-timezone';
import DateTime from 'luxon/src/datetime.js'

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;
  public timezone = '';
  public baseUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

    http.get(baseUrl + 'timezone').subscribe(result => {
      this.timezone = result[0];
    }, error => console.error(error));
  }

  public incrementCounter() {
    this.currentCount++;

    //let date1 = new Date('April 25, 2020 05:35:32');
    //let date2 = new Date('April 29, 2020 08:35:32');
    //let date1_iso = date1;//.toISOString();//.toISOString();//.substring(0, 10);
    //let date2_iso = date2;//.toISOString();
    //console.log('Date 1 iso ', date1_iso);
    //console.log('Date 2 iso ', date2_iso);

    //let date1_m = moment(moment(date1_iso).format());//('YYYY-MM-DDT00:00:00.0000Z'));
    //let date2_m = moment(date2_iso);

    //console.log('Date 1 moment ', date1_m);
    //console.log('Date 2 moment ', date2_m);

    //let date1_final = date1_m.tz(this.timezone);
    //let date2_final = date2_m.tz(this.timezone);
    //console.log('Date 1 final ', date1_final);
    //console.log('Date 2 final ', date2_final);

    //console.log('Date 1 final string ', date1_final.toISOString());
    //console.log('Date 2 final string ', date2_final.toISOString());

    //this.usingMomentjs();
    this.usingLuxon();
    
  }

  usingLuxon() {
    let date1 = new Date('April 25, 2020 05:35:32');//.toLocaleString("en-US", { timeZone: this.timezone });
    //let date1 = new Date("2020-04-25T05:35:32");//.toLocaleString("en-US", { timeZone: this.timezone });
    //let date1 = DateTime.fromISO("2020-04-25")
    let date2 = new Date('April 29, 2020 08:35:32');
    //let date1_iso = date1;//.substring(0, 10);
    console.log(`year ${date1.getFullYear()} month ${date1.getMonth()} day ${date1.getDay()}`)
    let date1_iso = DateTime.fromObject({
      year: date1.getFullYear(),
      month: 4,
      day: 25,
      hour: 0,
      minutes: 0,
      seconds: 0,
      zone: this.timezone
    }); 
    let date2_iso = DateTime.fromObject({
      year: date1.getFullYear(),
      month: 4,
      day: 29,
      hour: 23,
      minutes: 59,
      seconds: 59,
      zone: this.timezone
    });
    console.log('Date 1 iso ', date1_iso.toString());
    console.log('Date 2 iso ', date2_iso);

    let date1_l = DateTime.fromISO(date1_iso, { zone: 'utc' });//.format('YYYY-MM-DDT00:00:00.0000');
    let date2_l = DateTime.fromISO(date2_iso, { zone: 'utc' });

    console.log('Date 1 luxon ', date1_l);
    console.log('Date 2 luxon ', date2_l);

    let date1_final = date1_l; //date1_l.setZone(this.timezone);
    let date2_final = date2_l; //.setZone(this.timezone);
    console.log('Date 1 final ', date1_final);
    console.log('Date 2 final ', date2_final);

    //Expected: 2020-04-25T06:00:00.000Z
    console.log('Date 1 final string... ', date1_final.toISO()); // No respeta el Timezone de MT
    console.log('Date 1 final string without offset ', date1_final.toISO({ includeOffset: false }));
    console.log('Date 2 final string ', date2_final.toISO());

    const httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    const options = {
      headers: httpHeaders
    };
    this.http.post(this.baseUrl + 'timezone', JSON.stringify({ date1: date1_final.toISO(), date2: date2_final.toISO() }), options).subscribe(result => {
      //this.timezone = result;
      console.log(result);
    }, error => console.error(error));
  }

  usingMomentjs() {
    let date1 = new Date('April 25, 2020 05:35:32');
    let date2 = new Date('April 29, 2020 08:35:32');
    let date1_iso = date1.toISOString().substring(0, 10);
    let date2_iso = date2.toISOString();
    console.log('Date 1 iso ', date1_iso);
    console.log('Date 2 iso ', date2_iso);

    let date1_m = moment(date1_iso);//, this.timezone);//.format('YYYY-MM-DDT00:00:00.0000');
    let date2_m = moment(date2_iso);

    console.log('Date 1 moment ', date1_m);
    console.log('Date 2 moment ', date2_m);

    let date1_final = date1_m.tz(this.timezone);
    let date2_final = date2_m.tz(this.timezone);
    console.log('Date 1 final ', date1_final);
    console.log('Date 2 final ', date2_final);

    console.log('Date 1 final string ', date1_final.toISOString(true)); // No respeta el Timezone de MT
    console.log('Date 1 final string without offset ', date1_final.toISOString());
    console.log('Date 2 final string ', date2_final.toISOString());
  }

}
