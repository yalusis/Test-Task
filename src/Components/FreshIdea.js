import React, { useState } from 'react'
import { Url } from '../BasicURL'

export default function FreshIdea(props) {
 const[item_choose, set_item] = useState({activity:"Make a budget",type:"busywork",participants:1,price:0,link:"",key:4379552,accessibility:0.1})

  const choose_idea = (event) => {
    const new_id = props.fresh_idea[3].id + 1
    const delete_id = Url + "proposed_ideas/" + event.target.id
    const choosen_idea = props.fresh_idea.filter(idea => idea.id == event.target.id)[0]

    fetch('http://www.boredapi.com/api/activity/')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    set_item(data);
  });
  item_choose.id = new_id;

    const deleteMethod = {
      method: 'DELETE', 
      headers: {
       'Content-type': 'application/json; charset=UTF-8' 
      },
     }

     fetch(delete_id, deleteMethod) 
     .then(response => response.json())
     .catch(err => console.log(err)) 

     fetch(Url + 'proposed_ideas', {
      method: "POST",
      body: JSON.stringify(item_choose),
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
  props.set_choose()

     fetch(Url + 'list_idea', {
      method: "POST",
      body: JSON.stringify(choosen_idea),
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
  .catch(error =>  { console.log('post idea', error.message); alert('Your idea could not be posted\nError: '+error.message); });
  props.set_list()
  }

  const fresh_ideas = props.fresh_idea.map((idea) => { 
    return (
      <div onClick={choose_idea} key={idea.id} className="idea">
        <div id={idea.id} className='activity'>{idea.activity}</div>
        <div id={idea.id} className='type'>{idea.type}</div>
      </div>
    );
});

  return (
    <div className='choose'>
      <div className='choose-title'>Choose fresh ideas to do</div>
      <div className="fresh-ideas">
       {fresh_ideas}
      </div>
    </div>
  )
  }
