import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast";


const useGetSongById = (id: string | undefined)=>{
    const [loading,setLoading] = useState(false);
    const [song,setSong] = useState<Song | undefined>(undefined);
    const {supabaseClient} = useSessionContext();

    useEffect(()=>{
        setLoading(true);
        const fetchSong = async()=>{
            const {error,data} = await supabaseClient.from('songs')
                .select("*")
                .eq("id",id)
                .single()
            
            if(error){
                setLoading(false)
                toast.error(error.message)
                return;
            }

            setSong(data as Song)
            setLoading(false)

        }
        fetchSong()
    },[id,supabaseClient])

    return useMemo(()=>({
        song,
        setLoading
    }),[song,setLoading])
}
export default useGetSongById