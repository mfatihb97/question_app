import React, { useState } from 'react'
import example from "../../../data/example.json"
import "./question.css"

export const Questions = () => {

    const question = example.questions;
    const [currentIndex, setcurrentIndex] = useState(0);
    const [trueAnswered, setTrueAnswered] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(false);
    const [currentSelection, setCurrentSelection] = useState("");
    const [selectedAnswerHold, setSelectedAnswerHold] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [selectionMade, setSelecetionMade] = useState("");
    const [showTestResult,setShowTestResult]=useState(false);

    const nextHandle = () => {
        if (currentIndex < question.length - 1) {
            setcurrentIndex(prev => prev + 1);
        }
        if (selectedAnswerHold.length < currentIndex + 1) {
            selectedAnswerHold.push(selectionMade);
        }
        if (selectedAnswerHold.length == 5) {
            setShowResult(true)
        }
        console.log(selectedAnswerHold)
        setSelectedAnswer(false);
    }

    const restartTest = () => {
        setcurrentIndex(0);
        setSelectedAnswer(false);
        setShowResult(false);
        setTrueAnswered(0);
        setSelectedAnswerHold([]);
        setShowTestResult(false);
    }

    const answerQuestion = (selection) => {

        setSelecetionMade(selection);
        setCurrentSelection(selection);
        setSelectedAnswer(!selectedAnswer);
        console.log("selectionMade", { selectionMade })
    }

    const seeResult = () => {
        setShowTestResult(true);
        for (let i = 0; i < question.length; i++) {
            if (question[i].true_answer == selectedAnswerHold[i]) {
                setTrueAnswered(prev => prev + 1)
            }
        }

    }

    return (
        <div className='question-container vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-body-secondary'>
            {!showResult ? <div className='bg-info-subtle rounded-top border m-5 p-5'>
                <h4>Soru</h4>
                <div style={{ maxWidth: 600, maxHeight: 600 }} key={question[currentIndex].id}>
                    <h5>{question[currentIndex].id}) {question[currentIndex].question}</h5>
                    <br />
                    <ul>
                        <li className={selectedAnswer && currentSelection === "A" ? "bg-primary" : ""} onClick={() => answerQuestion("A")}>A) {question[currentIndex].A}</li>
                        <li className={selectedAnswer && currentSelection === "B" ? "bg-primary" : ""} onClick={() => answerQuestion("B")}>B) {question[currentIndex].B}</li>
                        <li className={selectedAnswer && currentSelection === "C" ? "bg-primary" : ""} onClick={() => answerQuestion("C")}>C) {question[currentIndex].C}</li>
                        <li className={selectedAnswer && currentSelection === "D" ? "bg-primary" : ""} onClick={() => answerQuestion("D")}>D) {question[currentIndex].D}</li>
                    </ul>
                    <br />
                    <button className='btn btn-info' onClick={nextHandle}>{currentIndex==4 ? "Testi bitir" : "İleri"}</button>

                    <br />
                    <br />
                    <h6>{question[currentIndex].id} out of {question.length}</h6>
                </div>
            </div>
                :
                <div className='bg-info-subtle rounded-top border m-5 p-5'>
                    <h4>Sonuç</h4>
                    <button className='btn btn-success' onClick={seeResult}>Sonuçları gör</button>
                    <button className='btn btn-warning' onClick={restartTest}>Reset</button>
                    {showTestResult ? <h5>{question.length} sorudan {trueAnswered} tanesini doğru cevaplandırdın</h5> : <></>}
                    <p>{selectedAnswerHold}</p>
                </div>}
        </div>
    )
}
