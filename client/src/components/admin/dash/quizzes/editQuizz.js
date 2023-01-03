import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { defaultFetch } from '../../../../helpers/defaultFetch';

export const EditQuizz = ({ quizzes, setShowEdit, showEdit, currentQuizz }) => {
  const cookies = new Cookies();
  const [printQuizz, setPrintQuizz] = useState();
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    let value =cookies.get('session')
    defaultFetch(`http://localhost:3001/quizz`, "post", {id: currentQuizz, token: value}).then((res) => {
      setPrintQuizz(res);
      })
  }
  , [showEdit, refresh])

  const changeQuizz = async e => {
    e.preventDefault();
    let value = cookies.get('session')

    let body = {
      id: currentQuizz,  
      name_: e.target.name.value,
      topic: e.target.topic.value,
      level_: e.target.level.value,
        token: value
    }
    console.log(body)
    let metaData = {
        method: 'post',
        body: JSON.stringify(body),
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
        },
    };

    fetch("http://localhost:3001/quizz/update", metaData)
        .then((res) => console.log(res))
    setShowEdit(!showEdit)
    setRefresh(!refresh)
    setShowEdit(!showEdit)
  }

  const deleteQuizz = async e => {
    let value =cookies.get('session')
    await defaultFetch("http://localhost:3001/quizz/delete", "DELETE", {id: currentQuizz,token: value })
    .then((res) => {
      if (res.mensaje) {console.log(res);
        setShowEdit(!showEdit)
      };

    });
   setRefresh(!refresh);

  }
  const editQuizz = e => {
    //setShowEdit(!showEdit)
  }


  return (
    <div className='quizzEdit-container'>
      <div>
        <div className='quizzEdit' >
          <form onSubmit={changeQuizz}>
          {printQuizz &&
           <div>
           <p>Nombre del quizz</p>
       <input name="name" defaultValue={printQuizz.name_} id={printQuizz.id}></input>
       <p>Tema</p>
       <input name="topic" defaultValue={printQuizz.topic} ></input>
       <p>Dificultad</p>
       <select name="level" defaultValue={printQuizz.level_} >
         <option>fácil</option>
         <option>normal</option>
         <option>difícil</option>
       </select>

       <button type="submit" >Modificar</button>
       <button onClick={editQuizz} >volver</button>
       <button onClick={deleteQuizz} id={printQuizz.id}>Eliminar</button>
       </div>
          }
         
          </form>
        </div>
      </div>
    </div>
  )
}
