import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      calculateBy: ['month'],
      dateRange: [''],
      selectShare: ['partners'],
    });
   }

  ngOnInit(): void {
  }

}
