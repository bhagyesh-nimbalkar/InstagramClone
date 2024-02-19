import { Link,useNavigate,NavLink,useLocation} from 'react-router-dom'
import { useSignOutAccount} from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Button } from '../ui/button';

const LeftSidebar = () => {
  const {pathname} = useLocation();
  const {mutate:signOut,isSuccess} = useSignOutAccount();
  const navigate = useNavigate();
  const {user} = useUserContext();
  useEffect(()=>{
     if(isSuccess) navigate(0);
  },[isSuccess,navigate])
  return (
    <nav className='leftsidebar'>
        <div className='flex flex-1 gap-11 flex-col'>
        <Link to='/' className='flex gap-3 items-center'>
                <img
                   src="/assets/images/logo.svg"
                   alt="logo"
                   width={170}
                   height={36}
                />
        </Link>
        <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img src={user.imageUrl || '/assets/images/profile.png'}
                 alt="profile"
                 className='h-14 w-14 rounded-full'
            />
          <div className='flex flex-col'>
          <p className='body-bold'>{user.name}</p>
          <p className='small-regular text-light-3 hover:underline'>@{user.username}</p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
            {sidebarLinks.map((link:INavLink)=>{
              const isActive= pathname === link.route
              return (
              <li key={link.label} className={`leftsidebar-link ${isActive && 'bg-primary-500'} group`}>
                <NavLink to={link.route} className='flex gap-4 items-center p-4'>
                <img 
                src={link.imgURL}
                alt={link.label}
                className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                />
                    {link.label}
                </NavLink>
             </li>
              )
            })}
        </ul>
        </div>
    <Button 
        variant="ghost" 
        className='shad_button_ghost' 
        onClick={()=>signOut()}>
     <div className='flex w-full gap-4 items-center'>
        <img src='/assets/icons/logout.svg' alt='logout'/>
        <p className='small-medium lg:base-medium'>Logout</p>
     </div>
    </Button>
    </nav>
  )
}

export default LeftSidebar