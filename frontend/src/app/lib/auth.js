import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function getToken(){
    return Cookies.get('token') || null;
}

export function decodeToken(token){
    try{
        return jwtDecode(token);
    } catch{
        return null;
    }
}

export function clearToken(){
    Cookies.remove('token');
}