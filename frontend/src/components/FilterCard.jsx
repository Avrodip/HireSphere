import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1 lakh to 5 lakh"]
    }
]
const FilterCard = () => {
    return (
        <div>
            <h1>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    filterData.map((data, index) => {
                        return (
                            <div key={index}>
                                <h1 className='font-bold text-lg'>{data.filterType}</h1>
                                {
                                    data.array.map((item, index) => {
                                        return (
                                            <div className='flex items-center space-x-2 my-2'>
                                                <RadioGroupItem value={item} />
                                                <label>{item}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        );
                    })
                }

            </RadioGroup>
        </div>
    )
}

export default FilterCard