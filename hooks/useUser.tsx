"use client";

import { UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs"
import { useSessionContext , useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { Subscription } from "@supabase/gotrue-js";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

type UserContextType = {
    accessToken: string | null,
    user : User | null;
    userDetails : UserDetails | null;
    isLoading : boolean;
    Subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
    [propName: string]: any
}

export const MyUserContextProvider = (props: Props)=>{
    const {session,isLoading:isLoadingUser,supabaseClient:supabase} = useSessionContext();
    const user = useSupaUser();
    const access_token = session?.access_token ?? null;
    const [isLoadingData,setIsLoadingData] = useState<boolean>(false);
    const [userDetails,setUserDetails] = useState<UserDetails | null>(null);
    const [subscription,setSubscription] = useState<Subscription | null>(null);

    const getUserDetails =() => supabase.from('users').select("*").single();
    const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

      useEffect(() =>{
        if(user && !isLoadingData && !subscription && !userDetails){
            setIsLoadingData(true);
            Promise.allSettled([getUserDetails(),getSubscription()]).then((results) =>{
                const getUserPromise = results[0];
                const getSubscriptionPromise = results[1];

                if(getUserPromise.status === 'fulfilled'){
                    setUserDetails(getUserPromise.value.data as UserDetails);
                }

                if(getSubscriptionPromise.status === 'fulfilled'){
                    setSubscription(getSubscriptionPromise.value.data as Subscription);
                }
                else if (!user && !isLoadingUser && !isLoadingData) {
                    setUserDetails(null);
                    setSubscription(null);
                  }
                  setIsLoadingData(false);
            })
        }
      },[user,isLoadingData])

      const value = {
        accessToken:access_token,
        user,
        userDetails,
        isLoading: isLoadingData || isLoadingUser,
        Subscription:subscription
      }

      return <UserContext.Provider value={value} {...props}/>
}

export const useUser = ()=>{
    const context = useContext(UserContext);
    if(context == undefined){
        throw new Error("useUser must be used within a myUserContextProvider");
    }

    return context;
}