"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const route = useRouter();

    const [data, setdata] = useState({
        title:"",
        description:""
    })

    const inputHandler = (e) => {
        const { name,value } = e.target;

        setdata((prev) => ({...prev,[name]:value}))
    }



    const submitHandler = async(e) => {
        e.preventDefault();

        try {
           const response =  await fetch("/api/task/taskget",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data),
            })

            setdata({
                title:"",
                description:""
            })

            route.push("/taskpost")



        } catch (error) {
            console.log(error);
        }
    }


  return (
    <section className='m-auto'>

        <form onSubmit={submitHandler}>
            <div className='h-100 w-100 '>
            <div>
                <label htmlFor="">Title</label>
                <input onChange={inputHandler} value={data.title} name="title" className='bg-white m-2 p-3 text-black' type="text" id="title" />
            </div>
            <div>
                <label htmlFor="">Description</label>
                <input onChange={inputHandler} value={data.description} name="description" className='bg-white m-2 p-3 text-black' type="text" id="description" />
            </div>
        </div>
        <button  className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition" type='submit'>
            Submit
        </button>
        </form>

    </section>
  )
}

export default page
