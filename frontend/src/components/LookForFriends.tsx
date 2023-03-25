import React from 'react'
import { useForm } from 'react-hook-form'
import { BiSearchAlt } from 'react-icons/bi'
 

const LookForFriends = () => {

    const {register, watch} = useForm({
        defaultValues: {
            search: ""
        }
    }) 

console.log(watch('search'))

    return (
    <div className="flex flex-wrap justify-center">
        <form action=""  >
            <div className='relative flex items-center'>
                <BiSearchAlt className='absolute w-5 h-5 ml-3 ' />
                <input {...register('search') } type="text" className="input input-bordered w-full mx-2 h-10 rounded-none pl-10" placeholder="Look for new Friends" />
            </div>
        </form>
    </div>
  )
}

export default LookForFriends