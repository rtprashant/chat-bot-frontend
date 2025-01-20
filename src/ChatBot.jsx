import React, { useEffect, useState } from 'react'
import chatBot from '../api/chatBot'


function ChatBot() {
    const [currentQuestion, setCurrentQuestion] = useState({
        text: "Are you a job seeker or an employer?",
        options: ["Job Seeker", "Employer"],
    });
    const [conversation, setConversation] = useState([]);

    const handleBtnClick = async (selectedAnswer) => {
        try {
            setConversation(
                (prev) => [
                    ...prev,
                    { question: currentQuestion.text, answer: selectedAnswer },
                ]
            )
                const apiRes = await chatBot({
                    question: currentQuestion.text,
                    selectedAnswer,
                });
                console.log(apiRes);
                
              
           
            if (apiRes.data.nextQuestion) {
                setCurrentQuestion({
                    text: apiRes.data.nextQuestion,
                    options: apiRes.data.nextOptions || [],
                });
            } else {
                setCurrentQuestion({ text: "Thank you for your response!", options: [] });
            }

        } catch (error) {
            console.log(error);
            

        }

    }

    return (
        <div className='p-5'>
            <div>
                <h1 className='  text-[35px] font-bold text-blue-500'>ChatBot</h1>
            </div>
            <div className='flex'>
                <p className='text-gray-500 text-[20px]'>Tell us more about you</p>
                <p className='animate-pulse text-[20px] text-gray-500'>.....</p>
            </div>
            <div>
            {
                    conversation.map((item, idx) => (
                        <div key={idx} className='flex flex-col gap-2'>
                            <p className='text-gray-500  w-fit sm:w-fit p-2'>{item.question}</p>
                            <p className='text-gray-500 bg-blue-100 rounded-full w-[50%] sm:w-[20%] p-2'>{item.answer}</p>
                        </div>
                    ))
                }
            </div>
            <div className='mt-2 text-[16px]'>
                <p className='text-gray-500 '>{currentQuestion.text}</p>
                <p className='flex flex-col gap-2 '>{currentQuestion?.options.map((i) => (
                    <button className='text-gray-500 text-16px flex  p-2 w-[50%] sm:w-[20%] border rounded-full hover:bg-blue-100' onClick={() => handleBtnClick(i)}>{i}</button>

                ))}</p>


                
            </div>
        </div>
    )
}

export default ChatBot
