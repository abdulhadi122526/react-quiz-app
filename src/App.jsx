import axios from "axios";
import { useEffect, useRef, useState } from "react";


function App() {
  const [question , setQuestion] = useState(null);
  const [currentIndex , setCurrentIndex] = useState(0);
  const [gettingNo , setGettingNo]= useState(0);
  const [pass , setPass ] = useState()
  const inputVal =  useRef([]);

  
  
  
  useEffect(()=>{
    axios('https://the-trivia-api.com/v2/questions')
    .then((res)=>{
      setQuestion(res.data);
      
    }).catch((err)=>{
      console.log(err);
      
    })
  },[]);


  // clear selection 
  const clearSelections = () => { 
    inputVal.current.forEach(input => {
      if (input) {
        input.checked = false; // Uncheck each radio input
      }
    });
  };

  //nextques , get value 
  
  const nextQue = ()=>{
    
    const selectedOption = inputVal.current.find(item => item && item.checked)
    if(!selectedOption){
      alert('please selet option')
    }else if( question && currentIndex < question.length -1 ){
      //numbers
      selectedOption.value === question[currentIndex].correctAnswer ? setGettingNo(gettingNo + 10) : setGettingNo(gettingNo + 0) 
      //change ques 
      setCurrentIndex(currentIndex + 1);
      //call clear selection function
      clearSelections()
    }else {
      if(gettingNo >= 70){
       setPass(true);
       return
       
      } 
      
      
    }
  };
  
  
  // shuffle 

  const shuffleArrey = (arr) =>{
    const emptyArr = [];
    const ShuffleArr = [];
    for(let i = 0; i < arr.length; i++){
        const rendomNum = Math.floor(Math.random() * arr.length)
        if(emptyArr.includes(rendomNum)){
          i--;
        }else{
          emptyArr.push(rendomNum)
          ShuffleArr[rendomNum] = arr[i]
          
        }
    }
    return ShuffleArr
  }

  // numbering


  return(
    <>
    <div className="text-center mt-[50px] border border-inherit	w-1/2 ms-[25%] shadow rounded-md">
    
    <h1 className="text-2xl mt-5">Quiz APP</h1>
    
    {/* question rendering */}

    {question ? 
    <div>
      <h1 className="text-lg font-semibold my-4">Q{currentIndex + 1}: {question[currentIndex].question.text}</h1>
      
      {/* Answers */}

      {shuffleArrey([...question[currentIndex].incorrectAnswers , question[currentIndex].correctAnswer]).map((item , index)=>{
        return <div key={index} className="text-start ms-20 mt-1">
         <input type="radio" name="question" id={index} value={item} ref={el => inputVal.current[index] = el}/> 
        <label htmlFor={index} className="ms-2">{item}</label>
        </div>
      })}
    </div>
    : <h1>loading...</h1>
    } <br />
    <button onClick={nextQue} className="mt-20 mb-5 text-white border bg-indigo-500 px-5 py-1 rounded-full hover:border-slate-500 active:border-none  ">Next</button>
    </div>
    {pass ? <h1>Congratulations</h1> : null}
    
     
    </>
  )
}

export default App;