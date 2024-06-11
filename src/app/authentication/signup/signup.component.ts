import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.RegisterForm();
  }

  RegisterForm() {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    })
  }

  registerUser() {
    if (this.registerForm.valid) {
      const { password, confirmPassword } = this.registerForm.value;
      if(password === confirmPassword) {
        const { username, email, password } = this.registerForm.value;
        this.authService.register(username, email, password).subscribe(
          response => {
            console.log('Registration successful:', response);
            this.router.navigate(['/Auth']);
          },
          error => {
            console.error('Registration failed:', error);
            // Handle error, show a message to the user, etc.
          }
        );
      } else {
        console.log("Password Does Not Matched")
      }
      
    } else {
      console.log('Form is not valid');
    }
  }

}
