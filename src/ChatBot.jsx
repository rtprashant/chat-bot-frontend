import React, { useEffect, useState } from 'react'
import chatBot from '../api/chatBot'
import { useDispatch, useSelector } from 'react-redux';
import { chatbegin, chatend, chaterr } from '../redux/feature/chatbot';


function ChatBot() {
    const [currentQuestion, setCurrentQuestion] = useState({
        text: "Are you a job seeker or an employer?",
        options: ["Job Seeker", "Employer"],
    });
    const [conversation, setConversation] = useState([]);
    const {loading}= useSelector(state=>state.chat);
    const dispatch = useDispatch()

    const handleBtnClick = async (selectedAnswer) => {
        try {
            dispatch(chatbegin())
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
            dispatch(chatend(apiRes.data))

        } catch (error) {
            console.log(error);
            dispatch(chaterr(error.message))
            

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
           {
            loading ? (
                <div className=''>
                    <p className='bg-gray-200 animate-pulse w-14 mt-2 p-1 rounded-full text-gray-500 flex justify-center items-center'>. . . .</p>
                </div>
            ):(
                <div className='mt-2 text-[16px]'>
                <p className='text-gray-500 '>{currentQuestion.text}</p>
                <p className='flex flex-col gap-2 '>{currentQuestion?.options.map((i) => (
                    <button className='text-gray-500 text-16px flex  p-2 w-[50%] sm:w-[20%] border rounded-full hover:bg-blue-100' onClick={() => handleBtnClick(i)}>{i}</button>

                ))}</p>


                
            </div>
            )
           }
        </div>
    )
}

export default ChatBot
