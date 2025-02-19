"use client"

import { useState } from 'react'
import cover from '../public/gaijinjuudancover.png'
import { trusted } from 'mongoose';
import { FaInfo } from "react-icons/fa";
import { MdOutlineTranslate } from "react-icons/md";

const Book = () => {
    const [translate, setTranslate] = useState(false);
    const [info, setInfo] = useState(false);

  return (
    <section className="flex flex-col gap-8 h-screen w-screen dark:text-dark-text text-light-text px-20 justify-center">
        {/* <h2 className="text-[7rem] font-semibold pl-6">A Foreigner's Traverse</h2> */}
        <div className='flex gap-10 justify-center items-center'>
                <h2 className={`${translate ? "text-[3rem] max-w-[20rem]" : "text-[8rem] vertical-text"} w-auto font-semibold text-center`}>
                {translate == true ?
                    "A Foreigner's Traverse"
                :
                    "外人縦断"
                }
            </h2>
            <div className='w-auto px-10 shrink-0'>
                <img src={cover.src} className='dark:dark-red-shadow light-red-shadow h-[550px]'></img>
            </div>
            <div
                className={`mt-5 transition-all duration-500 ease-in-out transform ${
                info
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0 pointer-events-none"
                }`}
            >
                <div className={`${info ? "min-w-[400px] opacity-100" : "w-0 h-0 opacity-0"} flex flex-col gap-6 flex-1 justify-between items-start shrink-0 dark:bg-dark-background`}>
                    <p className={`${translate ? "text-xl text-justify" : "text-2xl"}`}>
                        {translate == true ? 
                            "What happens when a 22 year old british kid attempts to cycle the length of Japan on a whim? Will the Japanese he studied be enough? Will he be surprised by the culture differences? Will he come to love Japan, or will he come to hate it? What will he discover about himself through this adventure? All of these doubts and questions are answered through an exciting journal written by that kid himself."
                        : 
                            "あるイギリス人が日本に来て、自転車で日本縦断をしようとしたらどうなるのか？学んだ日本語は通じるか？文化の違いに驚くか？日本のことが好きになるか、それとも嫌いになるか？日本での冒険をしながら、自分について何を気づかされるのか？本人が書いた日記を通して、こういう疑問への答えは明らかになる。"
                        }
                        
                    </p>
                    <div className='flex justify-between items-center w-full'>
                        <button 
                            className='shrink-0 btn dark:bg-dark-highlight text-dark-text bg-light-highlight text-lg ml-1'
                        >
                            {translate == true ?
                                "Buy the book"
                            :
                                "本を買う"
                            }
                        </button>
                        {info == true && (
                            <button 
                                className='w-10 h-10 rounded-full dark:bg-dark-highlight text-dark-text bg-light-highlight text-xl mr-1 flex justify-center items-center' 
                                onClick={() => setInfo(prev => !prev)}
                            >
                                <FaInfo />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {info != true && (
                <button 
                    className='w-10 h-10 rounded-full dark:bg-dark-highlight text-dark-text bg-light-highlight text-xl flex justify-center items-center' 
                    onClick={() => setInfo(prev => !prev)}
                >
                    <FaInfo />
                </button>
            )}
        </div>

        <button 
            className='rounded-full dark:bg-dark-highlight text-dark-text bg-light-highlight text-5xl apple-box fixed bottom-3 right-3 p-2' 
            onClick={() => setTranslate(prev => !prev)}
        >
            <MdOutlineTranslate />
        </button>
    </section>
  )
}

export default Book