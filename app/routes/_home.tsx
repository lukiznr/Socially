import { Outlet } from "@remix-run/react";
import NavBar from "~/components/navbar"
import { useLocation } from "@remix-run/react";
export default function HomeLayout(){
  const location = useLocation()
  return(
    <>
      <Outlet/>
      <NavBar location={location.pathname}/>
    </>
  )
}
