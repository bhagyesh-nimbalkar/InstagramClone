import {Routes,Route} from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import SignUpForm from './_auth/forms/SignUpForm';
import {Home,Explore,Saved,UpdateProfile,EditPost,CreatePost,AllUsers,PostDetails, LikedPosts} from './_root/pages';
import './globals.css';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"
import Profile from './_root/pages/Profile';

const App = () => {
  return (
    <main className='flex h-screen'>
         <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout/>}>
                <Route path="/sign-in" element={<SigninForm/>}/>
                <Route path="/sign-up" element={<SignUpForm/>}/>
            </Route>
            {/* Private Routes */}
            <Route element={<RootLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="/explore" element={<Explore/>}/>
                <Route path="/saved" element={<Saved/>}/>
                <Route path="/all-users" element={<AllUsers/>}/>
                <Route path="/create-post" element={<CreatePost/>}/>
                <Route path="/update-post/:id" element={<EditPost/>}/>
                <Route path="/posts/:id" element={<PostDetails/>}/>
                <Route path="/update-profile/:id/" element={<UpdateProfile/>}/>
                <Route path="/profile/:id/" element={<Profile/>}/>
                <Route path="/profile/:id/liked-posts" element={<LikedPosts/>}/>
            </Route>
         </Routes>
         <Toaster/>
    </main>
  )
}
export default App;