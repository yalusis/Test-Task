import React from 'react'

export default function TableChallenges({ complate_ideas }) {

    const reverse_arr = Array.from(complate_ideas).reverse()

    return (
        <div className='footer'>
        <div className='choose-title'>Completed challenges</div>
        <table>
        <tr>
          <td className='table_number'></td>
          <th className='table_title'>Title</th>
          <th className='table_type'>Type</th>
          <th className='table_when'>When</th>
        </tr>
        {reverse_arr.map((challenges, key) => {
        let short_message = '';
        if(challenges.activity.length > 25){
        short_message = challenges.activity.slice(0, 25)
        short_message = short_message.concat(' ...')
        }
         return(
            <tr key={key} className="new_completed">
                <td className='right-border'>{key + 1}</td>
                <td>{short_message === '' ? challenges.activity : short_message }</td>
                <td>{challenges.type}</td>
                <td>{challenges.date.join(' ')}</td>
            </tr>
        )
        })}
      </table>
        </div>
      )
  }

