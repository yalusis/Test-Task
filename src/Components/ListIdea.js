import React, { useState } from 'react'
import {TbArrowBigRight, TbArrowBigLeft} from 'react-icons/tb'
import { Url } from '../BasicURL'

export default function ListIdea(props) {

  const[min_value, set_min_value] = useState(0)
  const[max_value, set_max_value] = useState(3)
  const[main_value, set_main_value] = useState(1)
  const[current_idea, set_current_idea] = useState(2)

const AllowRight = () => {
  if(props.list_idea.length === max_value && min_value+3 === max_value){
    set_min_value(min_value + 1) 
    set_current_idea(current_idea +1)

  } else if(main_value === 0){
    set_main_value(main_value + 1)
    set_max_value(max_value + 1) 
    set_current_idea(current_idea +1)

  } else if(props.list_idea.length > max_value){
    set_max_value(max_value +1)
    set_min_value(min_value +1)
    set_current_idea(current_idea +1)

  }
}

const AllowLeft = () => {
  if(0 === min_value && 3 === max_value){
    set_max_value(max_value -1)
    set_main_value(main_value -1)  
    set_current_idea(current_idea -1)

  } else if(min_value +2 === props.list_idea.length) {
    set_min_value(min_value -1)
    set_current_idea(current_idea -1)

  }else if(0 < min_value) {
    set_max_value(max_value -1)
    set_min_value(min_value -1)   
    set_current_idea(current_idea -1) 

  }
}

const ClickOnIdea = (event) => {
  const delete_id = Url + "list_idea/" + event.target.id;
  const post_complate_idea = props.list_idea.filter(idea => idea.id == event.target.id)[0]
  let arr=[
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
 ];

  post_complate_idea.date = [ new Date().getDate(), arr[new Date().getMonth()], ]

  const deleteMethod = {
    method: 'DELETE', 
    headers: {
     'Content-type': 'application/json; charset=UTF-8' 
    },
   }

   fetch(delete_id, deleteMethod) 
   .then(response => response.json())
   .catch(err => console.log(err)) 

   
   fetch(Url + 'complate_ideas', {
    method: "POST",
    body: JSON.stringify(post_complate_idea),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
})
.then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
        throw error;
  })
.then(response => response.json())
.catch(error =>  { console.log('post idea', error.message); alert('Your idea could not be posted\nError: '+ error.message); });
props.set_list()
props.set_сomplate()

}

let three_choose_idea = props.list_idea.slice(min_value, max_value)

  const three_idea =  three_choose_idea.map((idea) => {
    if ( idea === three_choose_idea[main_value])  {
      return (
        <div  className='current_idea'>
          <div key={idea.id} className="main_idea" onClick={ClickOnIdea}>
          <div id={idea.id} className='main_activity'>{idea.activity}</div>
          <div id={idea.id} className='type'>{idea.type}</div>
        </div>
        <div className='current-number'>{current_idea}/{props.list_idea.length}</div>
        </div>
      );
    } else {
      return (
        <div key={idea.id} className="side_idea" onClick={ClickOnIdea}>
          <div id={idea.id} className='side_activity'>{idea.activity}</div>
        </div>
      );
    }
});

  return (
    <div className='choose'>
        <div className='choose-title'>Ideas in my list</div>
        <div className="choose-ideas">
            <TbArrowBigLeft onClick={AllowLeft} className="arrow"/>
            {three_idea}
            <TbArrowBigRight onClick={AllowRight} className="arrow"/>
        </div>
    </div>
  )
 }

