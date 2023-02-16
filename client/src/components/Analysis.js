import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import { useParams } from 'react-router-dom'


function Analysis() {

    const [userCategoryCount, setUserCategoryCount] = useState({})

    const { id } = useParams()
    
    useEffect(() => {
        fetch(`/users/${id}/categories`)
            .then(res => res.json())
            .then(userCategories => {
                // console.log(userCategories)
                setUserCategoryCount(userCategories)
            })
    }, [])

    // console.log(Object.entries(userCategoryCount))

    const dataTitleArr = ["Category", "Count"]
    const categoriesArr = Object.entries(userCategoryCount)

    const categoryData = [
        dataTitleArr, 
        ...categoriesArr.map(([category, count]) => [category, count])
    ]
    // console.log(categoryData)

    const options = {
        title: "My Spending Categories",
        pieHole: 0.4,
        is3D: false,
      };

    return(
        <div>
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={categoryData}
                options={options}
                />
        </div>
    )
}

export default Analysis