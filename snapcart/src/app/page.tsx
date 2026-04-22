
import connectDb from "../lib/db";
import User from "../models/user.model";
import { auth } from "./auth";
import React from "react";
import EditRoleMobile from "../components/EditRoleMobile";
import Nav from "../components/Nav";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import DeliveryBoy from "../components/DeliveryBoy";
import HeroSection from "../components/HeroSection";
import { redirect } from "next/navigation";
import GeoUpdater from "../components/GeoUpdater";
import Grocery, { IGrocery } from "../models/grocery.model";
import Footer from "../components/Footer";


export async function Home(props:{
  searchParams:Promise<{
    q:string
  }>
}) {

  const searchParams=await props.searchParams
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if (!user) {
    redirect("/login")
  }
  const inComplete = !user.mobile || !user.role || (!user.mobile && !user.role)
  if (inComplete) {
    return <EditRoleMobile />
  }

  const planeUser = JSON.parse(JSON.stringify(user))

  let groceryList:IGrocery[]=[]
  if(user.role==="user"){
    if(searchParams.q){
      groceryList=await Grocery.find({
        $or:[
          {name:{$regex:searchParams?.q || "", $options:"i"}},
          {category:{$regex:searchParams?.q || "", $options:"i"}},
        ]
      })
    }else{
      groceryList=await Grocery.find({})

    }
  }
  return (
    <>
      <Nav user={planeUser} />
      <GeoUpdater userId={planeUser._id}/>
      {user.role == "user" ? (
        <UserDashboard groceryList={groceryList}/>
      ) : user.role == "admin" ? (
        <AdminDashboard />
      ) : <DeliveryBoy />}
      <Footer/>

    </>
  );
}
export default Home;
