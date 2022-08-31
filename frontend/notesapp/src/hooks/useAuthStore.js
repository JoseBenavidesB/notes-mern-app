import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { onLogoutNotes } from "../store";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";


export const useAuthStore = () => {

    const { status, user, errorMessage  } = useSelector( state => state.auth );

    const distpach = useDispatch();

    const startLogin = async({ email, password }) => {

        distpach( onChecking() );

        try {
            
            const { data } = await calendarApi.post('/auth', { email, password });
            console.log(data.token);
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            distpach( onLogin({ name: data.name, _id: data._id }) );


        } catch (error) {
            distpach( onLogout( 'Wrong credentials ') );
            setTimeout(() => {
                distpach( clearErrorMessage() );
            }, 10);
        }
    };

    const startRegister = async( name, email, password ) => {
        distpach( onChecking() );

        try {
            const { data } = await calendarApi.post('/user', { name, email, password });
            //console.log(data );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            distpach( onLogin({ name: data.name, uid: data.uid}))
            
        } catch (error) {
            distpach( onLogout( error.response.data?.msg || '--') );
            setTimeout(() => {
                distpach( clearErrorMessage() );
            }, 10);
        }
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token')
        if ( !token ) return distpach( onLogout() );

        try {
            
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            distpach( onLogin({ name: data.name, uid: data.uid}));

        } catch (error) {
            localStorage.clear();
            distpach( onLogout() );
        }
    };

    const startLogout = () => {
        localStorage.clear();
        distpach( onLogoutNotes() );
        distpach( onLogout() );
    };



    return {

        //properties
        status,
        user,
        errorMessage,


        //methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}