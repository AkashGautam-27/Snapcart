'use client'
import { Boxes, ClipboardCheck, LogOut, Menu, Package, PlusCircle, Search, ShoppingCartIcon, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react';
import { signOut } from 'next-auth/react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';



interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "admin" | "deliveryBoy";
  image?: string;
}
function Nav({ user }: { user: IUser }) {
  const [open, setOpen] = useState(false);
  const profileDropDown = useRef<HTMLDivElement>(null);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const {cartData}=useSelector((state:RootState)=>state.cart)
  const [menuOpen,setMenuOpen]=useState(false)
  const [search,setSearch]=useState("")
  const router=useRouter()
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileDropDown.current && !profileDropDown.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

    const sideBar=menuOpen?createPortal(
      <AnimatePresence>
        <motion.div
         initial={{
        opacity: 0,x:-100
      }}
      animate={{
        opacity: 1, x: 0
      }}
      transition={{
        type:"spring",stiffness:100,damping:14
      }}
       exit={{
        opacity: 0,x:-100
      }}
      className='fixed top-0 left-0 h-full w-[75%] sm:w-[60%] z-9999 bg-linear-to-b from-green-900 via-green-900 top-green-900 backdrop:blur-xl border-r border-green-400/20 shadow[0_0_50px_-10px_rgba(0,255,100,0.3)] flex flex-col p-6 text-white'
        >
          <div className='flex justify-between items-center mb-2'>
            <h1 className='font-extrabold text-2xl  tracking-wide text-white/90'>Admin panel</h1>
            <button className='text-white/80 hover:text-red-400 text-2xl font-bold transition cursor-pointer'
            onClick={()=>{setMenuOpen(false)}}
            > <X/>   </button>
          </div>
         <div className='flex items-center gap-3 p-3 mt-3  rounded-xl bg-white/10 hover:bg-white/15 transition-all shadow-inner'>
           <div className='relative w-12 h-12 rounded-full overflow-hidden border-2'>
              {user.image ? <Image src={user.image} alt={user.name} fill className='object-cover rounded-full' /> : <User />}
          </div>
         <div>
           <h2 className='text-lg font-semibold text-white'>{user.name}</h2>
          <p className='text-xs text-green-200 capitalize tracking-wide'>{user.role}</p>
         </div>
         </div>

          <div className='flex flex-col gap-3 font-medium mt-6'>
             <Link href={"admin/add-grocery"} className='cursor-pointer flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 hover:pl-4 transition-all'> <PlusCircle className='w-5 h-5' /> Add grocery</Link>
            <Link href={"/admin/view-grocery"} className='cursor-pointer flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 hover:pl-4 transition-all'><Boxes className='w-5 h-5' />View grocery</Link>
            <Link href={"admin/manage-orders"} className='flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 hover:pl-4 transition-all cursor-pointer'> <ClipboardCheck className='w-5 h-5' /> Manage Orders</Link>
          </div>
          <div className='my-5 boredr-t border-white/20'>
            <div className='cursor-pointer flex items-center gap-3 p-3 mt-auto rounded-lg font-semibold text-red-300 bg-red-50 hover:bg-red-500/20 hover:pl-4 transition-all' onClick={async()=>await signOut({callbackUrl:"/"})}>
              <LogOut className='w-5 h-5 text-red-300'/>Log Out
            </div>
          </div>


        </motion.div>
      </AnimatePresence>,document.body
    ):null



    const handleSearch=(e:FormEvent)=>{
      e.preventDefault()
      const query=search.trim()
      if(!query){
        return router.push("/")
      }
      router.push(`/?q=${encodeURIComponent(query)}`)
      setSearch("")
      setSearchBarOpen(false)
    }
  return (
    <motion.div
      initial={{
        opacity: 0, y: -20
      }}
      animate={{
        opacity: 1, y: 0
      }}
      transition={{
        duration: 0.7
      }}
      className='flex fixed items-center h-20 px-4 md:px-8 z-50 shadow-lg shadow-black/30 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-2xl text-center p-6 w-[95%] top-6 left-1/2 '>
      <Link href={"/"} className='text-2xl  font-extrabold text-white sm:text-3xl tracking-wide hover:scale-105 transition-transform'>
        Snapcart
      </Link>
      {user.role == "user" && <form className='hidden md:flex items-center absolute left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md'>
        <Search className='text-gray-500 mr-2 w-5 h-5' onSubmit={handleSearch}/>
        <input
          type="text"
          placeholder="Search groceries..."
          className='placeholder:text-gray-400 focus:outline-none text-gray-700 w-full '
        onChange={(e)=>setSearch(e.target.value)}
        value={search}
        />
      </form>
      }

      <div className='flex items-center gap-3 md:gap-6 absolute right-6'>
        {user.role == "user" && <>
          <div className=' flex items-center justify-center shadow-md hover:scale-105 transition bg-white w-11 h-11 rounded-full md:hidden' onClick={() => setSearchBarOpen((prev) => !prev)}>
            <Search className='text-green-600 w-6 h-6' />
          </div>


          <Link href="/user/cart" className='relative flex items-center justify-center shadow-md hover:scale-105 transition bg-white w-11 h-11 rounded-full'>
            <ShoppingCartIcon className='text-green-600 w-6 h-6' />
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow'>{cartData.length}</span>
          </Link>


        </>}



        {user.role == "admin" && <>
          <div className='hidden md:flex items-center gap-4'>
            <Link href={"/admin/add-grocery"} className='items-center gap-4 flex bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-200 transition-all'> <PlusCircle className='w-5 h-5' /> Add grocery</Link>
            <Link href={"/admin/view-grocery"} className='items-center gap-4 flex bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-200 transition-all'><Boxes className='w-5 h-5' />  View grocery</Link>
            <Link href={"admin/manage-orders"} className='items-center gap-4 flex bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-200 transition-all'> <ClipboardCheck className='w-5 h-5' /> Manage Orders</Link>
          </div>
          <div className='md:hidden bg-white cursor-pointer rounded-full w-10 h-10 flex items-center justify-center shadow-md' onClick={()=>setMenuOpen(prev=>!prev)}>
            <Menu className='text-green-600 h-6 w-6'/>
          </div>

        </>}

        <div className='relative' ref={profileDropDown}>
          <div className=' w-11 h-11 bg-white cursor-pointer rounded-full flex items-center justify-center hover:scale-105 transition-transform overflow-hidden shadow-md' onClick={() => setOpen(prev => !prev)}>
            {user.image ? <Image src={user.image} alt={user.name} fill className='object-cover rounded-full' /> :
              <User />
            }
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0, y: -20 }}
                className='absolute right-0 mt-3 cursor-pointer w-56 bg-white rounded-2xl z-999 border border-gray-300 shadow-lg p-4'
              >
                <div className='flex items-center gap-3 px-3 py-2 border-b border-gray-200'>
                  <div className='w-10 h-10 relative rounded-full flex items-center justify-center overflow-hidden'>
                    {user.image ? <Image src={user.image} alt={user.name} fill className='object-cover rounded-full' /> : <User />
                    }
                  </div>
                  <div>
                    <div className='font-semibold text-gray-800'>{user.name}</div>
                    <div className='text-gray-500 capitalize'>{user.role}</div>
                  </div>
                </div>

                {user.role == "user" && <Link href={"/user/my-orders"} className='flex items-center gap-2 px-3 py-3 hover:bg-green-100 rounded-lg text-gray-700 font-medium' onClick={() => setOpen(false)}>
                  <Package className=' w-5 h-5 text-green-600' />
                  My Orders
                </Link>}

                <button className='flex items-center cursor-pointer gap-2 px-3 py-3 hover:bg-red-100 rounded-lg text-gray-700 font-medium w-full  text-left' onClick={() => {
                  setOpen(false)
                  signOut({ callbackUrl: "/login" })
                }}>
                  <LogOut className='w-5 h-5 text-red-600' />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {searchBarOpen && <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: -20 }}
              className='fixed top-24 left-1/2 -translate-x-1/2 w-[90%]  bg-white rounded-full shadow-lg z-40 flex items-center px-4 py-2'
            > <Search className='text-gray-500 mr-2 w-5 h-5' />
              <form className='grow' onSubmit={handleSearch}>
                <input type="text" className='w-full outline-none text-gray-700' placeholder='Search groceries....' 
                  onChange={(e)=>setSearch(e.target.value)}
        value={search}/>
              </form>
              <button onClick={() => setSearchBarOpen(false)}>
                <X className='text-gray-500 h-5 w-5' />
              </button>
            </motion.div>}
          </AnimatePresence>
          </div>
      </div>
      {sideBar}
    </motion.div>
  )
}

export default Nav
