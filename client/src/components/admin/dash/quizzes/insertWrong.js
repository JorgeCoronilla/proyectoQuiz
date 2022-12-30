import React, { useContext } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
export const InsertWrong = () => {
  const { setDisplay,
    question,
    rightAnswer,
    wrongAnswers, setWrongAnswers
  } = useContext(CreateQuizzContext);

  const addWrong = e => {
    e.preventDefault();
    let wrongAux = []
    if (wrongAnswers.length >= 1 && wrongAnswers.length) {
      wrongAux = wrongAnswers;
      wrongAux = wrongAux.filter((item) => item != '');
      wrongAux.push(e.target.wrong.value);
      setWrongAnswers(wrongAux);
    }
    if (wrongAnswers.length < 1) { setWrongAnswers([e.target.wrong.value]) }
    e.target.wrong.value = "";  }

    if (wrongAnswers.length = 3) {
     
    } 

  const close = () => {
    setDisplay("main")
  }
  return (
    <div> <div className='AddQuestion'>
      <form onSubmit={addWrong}>
        <div className="titleClose">
          <div><h5>Pregunta</h5></div>
          <div><button className='close' onClick={close}>&#x2715;</button></div>
        </div>
        <h6>{question}</h6>
        <div>
          <h5>Respuesta correcta</h5>
          <h6>{rightAnswer}</h6>
          <div>
            {wrongAnswers.map((wrongAnswer, index) => {
              return <div key={index}>
                <h5>Respuesta incorrecta {(index + 1)}</h5>
                <h6>{wrongAnswer}</h6>
              </div>
            })}

            <p>Inserta una respuesta <span>incorrecta</span></p>
            <input type="text" name="wrong"></input>
            {wrongAnswers.length===2 ?
            
            <button type="submit" className='final' id="final">Última respuesta {wrongAnswers.length}</button>
           : <button type="submit" className='addList' id="sigue">Añadir {wrongAnswers.length}</button>
}
          </div>

        </div>
      </form>
    </div>
      <div className='spacer'></div>
    </div>

  )
}
