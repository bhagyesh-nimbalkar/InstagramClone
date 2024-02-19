import {Outlet,Navigate} from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticate = false;
  return (
    <>
       {isAuthenticate?(
         <Navigate to="/"/>
       ):(
        <>
           <section className='flex flex-1 justify-center items-center flex-col'>
              <Outlet/>
           </section>
           <img 
              src="/assets/images/side-img.svg"
              alt="logo"
              className='hidden 2xl:block xl:block h-screen w-1/2 object-cover bg-no-repeat'
           ></img>
        </>
       )}
    </>
  )
}

export default AuthLayout;