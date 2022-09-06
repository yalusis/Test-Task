import React from 'react'

export default function TypeIdea({ complate_ideas }) {
        const value_charity = complate_ideas.filter(item=> item.type === "charity").length
        const value_social = complate_ideas.filter(item=> item.type === "social").length
        const value_busywork= complate_ideas.filter(item=> item.type === "busywork").length
        const value_education = complate_ideas.filter(item=> item.type === "education").length
        const value_cooking = complate_ideas.filter(item=> item.type === "cooking").length
        const value_other = complate_ideas.length - (value_charity + value_social + value_busywork + value_education + value_cooking)
        const array = [
            {name: "charity", value: value_charity},
            {name: "social", value: value_social},
            {name: "busywork", value: value_busywork},
            {name: "education", value: value_education},
            {name: "cooking", value: value_cooking}, 
            {name: "other", value: value_other}
        ]
    
        const achievements = array.map((item) => {
                return(
                    <div key={array.indexOf(item)} className='achievements'>
                    <div className='circle'>
                        <div className='number'>{item.value}</div>
                    </div>
                    <div className='category'>{item.name}</div>
                    </div>
                )
        })
    
        const achievements_pair = achievements.filter(idea => achievements.indexOf(idea) % 2 === 0)
        const achievements_odd = achievements.filter(idea => achievements.indexOf(idea) % 2 === 1)
    
        return (
            <div className='type_idea'>
            <div className='choose-title'>Achievements</div>
            <div className='all_achievements'>
            <div className='all_achievements_1'>
            {achievements_pair}
            </div>
            <div className='all_achievements_2'>
            {achievements_odd}
            </div>
            </div>
            </div>
          )
    }

