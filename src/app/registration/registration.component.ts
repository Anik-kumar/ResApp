import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {RegistrationService} from '../services/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];
  // @ts-ignore
  days = Array(31).fill().map((x, i) => i);
  // @ts-ignore
  years = Array(100).fill().map( (x, i) => i);
  years2 = 2018;

  constructor(private regService: RegistrationService) { }

  ngOnInit() {
  }

  onRegister(event: NgForm) {
    // console.log(event);

    if ( event.invalid ) {
      console.log("Form is Invalid");
    } else {
      const firstName = event.value.firstName;
      const lastName = event.value.lastName;
      const email = event.value.email;
      const password = event.value.password;
      const password2 = event.value.password2;
      const dobMonth = event.value.dobMonth;
      const dobDay = event.value.dobDay;
      const dobYear = event.value.dobYear;

      // console.log(firstName, lastName, email, password, password2, dobMonth, dobDay, dobYear);

      this.regService.registerNewUser(firstName, lastName, email, password, password2, dobDay, dobMonth, dobYear);
      // this.regService.formReset();
    }

  }


}
