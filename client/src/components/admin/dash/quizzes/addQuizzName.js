import React, { useContext } from 'react'
import { defaultFetch } from '../../../../helpers/defaultFetch';
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import Cookies from 'universal-cookie';

export const AddQuizzName = ({ showInput, setShowInput }) => {
    const { setQuizzName, quizz, quizzName } = useContext(CreateQuizzContext);
    const cookies = new Cookies();

    const add = () => {
        setShowInput(!showInput)
    }
    const addQuizz = async e => {
        e.preventDefault();
        let token = cookies.set('session')
        setQuizzName({
            name: e.target.name.value,
            topic: e.target.topic.value,
            level_: e.target.level.value,
            token: token
        })
        const res = await defaultFetch("http://localhost:3001/quizz/new", "PUT", quizzName)
      console.log(res)
    }

    return (
        <div> <div className='AddQuestion'>
            <div className="titleClose">
                <div><h5>Nombre del Quizz</h5></div>
                <div><button className='close' onClick={add}>&#x2715;</button></div>
            </div>
            <form onSubmit={addQuizz}>
                <input placeholder="Escribe el título" required name="name" />
                <h4>Tema del quizz</h4>
                <input placeholder="Escribe el título" required name="topic"></input>
                <h4>Dificultad</h4>
                <select name="level">
                    <option>fácil</option>
                    <option>normal</option>
                    <option>difícil</option>
                </select>
                <button type="submit" className='addList'>Continuar</button>
            </form>
        </div>
        </div>
    )
}
