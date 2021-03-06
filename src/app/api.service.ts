import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment'

@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private route: Router){}
    
    messages = []
    users = []
    TOKEN_KEY = 'token'
    path = environment.path;
    authPath = environment.path + '/auth';

    getMessage(userId) {
        this.http.get<any>(this.path +'/posts/' + userId).subscribe(res =>{
            this.messages = res;
        })
    }

    get token(){
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated(){
        return !!localStorage.getItem(this.TOKEN_KEY)
    }

    logout(){
        localStorage.removeItem(this.TOKEN_KEY);
    }
    postMessage(message) {
        this.http.post<any>(this.path +'/post', message).subscribe(res =>{
            this.messages = res
        })
    }
    getUsers() {
        this.http.get<any>(this.path +'/users').subscribe(res =>{
            this.users = res
        })
    }

    getProfile(id) {
        return this.http.get(this.path +'/profile/' + id)
    }

    sendUserRegistration(regData) {
        this.http.post<any>(this.authPath + '/register', regData).subscribe(res =>{ 
            console.log(res) 
            localStorage.setItem(this.TOKEN_KEY, res.token)  
            if(this.isAuthenticated){
                this.route.navigateByUrl("/")
            }else{
                console.log("Registration Failed")
            }     
        })
        
    }

    loginUser(loginData) {
        this.http.post<any>(this.authPath + '/login', loginData).subscribe(res =>{
            console.log(res);
            localStorage.setItem(this.TOKEN_KEY, res.token)
            if(this.isAuthenticated){
                this.route.navigateByUrl("/")
            }else{
                console.log("Registration Failed")
            }   
        })
    };
}