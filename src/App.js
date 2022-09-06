import React, { useState, useEffect } from "react";
import FreshIdea from "./Components/FreshIdea";
import { Url } from "./BasicURL";
import ListIdea from "./Components/ListIdea";
import TypeIdea from "./Components/TypeIdea";
import TableChallenges from "./Components/TableChallenges";
import Loading from "./Components/Loading";

const App = () => {

  const [choose, set_choose] = useState(true)
  const [list, set_list] = useState(true)
  const [complate, set_complate] = useState(true)
  const [fresh_idea, set_fresh_idea] = useState()
  const [list_idea, set_list_idea] = useState()
  const [complate_ideas, set_complate_ideas] = useState()

  useEffect(() => {
    fetch(Url + 'proposed_ideas')
      .then(response => response.json())
      .then(response => set_fresh_idea(response));
  }, [choose])
  useEffect(() => {
    fetch(Url + 'list_idea')
      .then(response => response.json())
      .then(response => set_list_idea(response));
  }, [list])
  useEffect(() => {
    fetch(Url + 'complate_ideas')
      .then(response => response.json())
      .then(response => set_complate_ideas(response));
  }, [complate])

  if(fresh_idea == null || list_idea == null || complate_ideas == null){
    return <Loading />
  } else {
    return (
      <div className="App">
      <FreshIdea fresh_idea={fresh_idea} set_fresh_idea={set_fresh_idea} 
      set_list_idea={set_list_idea} set_choose={() => set_choose({choose : !choose})}
      set_list={() => set_list({list : !list})}/>
      <ListIdea list_idea={list_idea} set_сomplate={() => set_complate({complate: !complate})}
      set_list={() => set_list({list : !list})}/>
      <TypeIdea complate_ideas={complate_ideas}/>
      <TableChallenges complate_ideas={complate_ideas}/>
      </div>
    );
  }
}

export default App;
