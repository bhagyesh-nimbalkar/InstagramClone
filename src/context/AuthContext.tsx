import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import {useContext,createContext,useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
     id:'',
     name:'',
     username:'',
     email:'',
     imageUrl:'',
     bio:'',
}
const INITIAL_AUTH_STATE = {
    user:INITIAL_USER,
    isLoading:true,
    isAuthenticated:false,
    setUser: () =>{},
    setIsAuthenticated: () =>{},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_AUTH_STATE);
const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const navigate = useNavigate();
  const [user,setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading,setIsLoading] = useState(false);
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('cookieFallback') === '[]' || 
    localStorage.getItem('cookieFallback') === null ) navigate('/sign-in')
       checkAuthUser();
  },[]);
  const checkAuthUser = async() =>{
     try {
        const CurrentAccount = await getCurrentUser();
        if(CurrentAccount){
            setUser({
                id:CurrentAccount.$id, 
                name:CurrentAccount.name,
                username:CurrentAccount.username,
                email:CurrentAccount.email,
                imageUrl:CurrentAccount.imageUrl,
                bio:CurrentAccount.bio,
            })
            setIsAuthenticated(true);
            return true;
        }
        return false;
     } catch (error) {
        console.log(error);
        return false;
     }finally{
        setIsLoading(false);
     }
  }
  const value = {
    user,isLoading,isAuthenticated,setUser,setIsAuthenticated,setIsLoading,checkAuthUser
  }
  return (
       <AuthContext.Provider value={value}>
        {children}
       </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);