import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2;

  public loginForm = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(private router:Router,private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.renderButtom();
  }

  login() {
    this.formSubmitted = true;
    this.usuarioService.login(this.loginForm.value).subscribe((resp: any) => {
      if (resp.status) {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        Swal.fire({
          title: 'Exito!',
          text: resp.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(result);
            this.router.navigateByUrl('/');
          }
        });
      } else {
      }
    });
  }

  renderButtom(){
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () =>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '967406621873-6h1haeas02m3kkbm18a5gsa8ni4dk7q8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);

          const cu = googleUser.getBasicProfile().du;
          this.usuarioService.loginGoogle(id_token).subscribe((usutoken: any)=>{
            if (usutoken.status) {
              localStorage.setItem('email', cu);
              Swal.fire({
                title: 'Exito!',
                text: usutoken.message,
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('/');
                }
              });
            } else {
              Swal.fire({
                title: 'Error!',
                text: usutoken.message,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          } );


        }, (error) =>{
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  alerta(){
    Swal.fire({ // inicio swal.fire
      title: 'Forgot password?',
      text: ' Ingresa el email... ',
      input: 'email', // Cambiar a email
      inputPlaceholder: 'Enter your email address',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
      }
    });// fin swal.fire
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
        return true;
      } else{
        return false;
      }
     }
}
