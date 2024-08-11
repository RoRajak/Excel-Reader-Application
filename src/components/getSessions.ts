import { getServerSession } from "next-auth/next"

export const getSession=async()=>{
    const session=await getServerSession();
    return session;

}
