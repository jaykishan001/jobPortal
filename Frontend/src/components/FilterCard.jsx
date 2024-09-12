import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    }
]

function FilterCard() {
    const [selectedValue, setSelectedValue]= useState('')
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup value = {selectedValue} onValueChange={changeHandler}>
            {filterData.map((data, index)=> (
                <div key={`filterData-${index}`}>
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    {data.array.map((item, idx) => {
                        const itemId = `r${index}-${idx}`
                        return (
                            <div className='flex items-center space-x-2 my-2'>
                            <RadioGroupItem value={item} id= {itemId}/>   
                            <Label htmlFor= {itemId} >{item}</Label> 
                            </div>
                        )
                    })}
                </div>
            ))}
        </RadioGroup>
    </div>
  )
}

export default FilterCard