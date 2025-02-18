"use client"

import { useState } from 'react'
import cover from '../public/gaijinjuudancover.png'

const Book = () => {
    const [translate, setTranslate] = useState(true);
  return (
    <section className="flex flex-col gap-8 relative h-screen w-screen dark:text-dark-text text-light-text px-20 justify-center">
        <h2 className="text-[7.2rem] font-semibold pl-6">A Foreigners Traverse</h2>
        <div className='flex gap-16'>
            <h2 className="w-auto text-[7rem] font-semibold vertical-text text-center">外人縦断</h2>
            <div className='w-auto px-10'>
                <img src={cover.src} className='dark:dark-red-shadow light-red-shadow h-[450px]'></img>
            </div>
            <div className={`flex flex-col gap-6 flex-1 justify-between items-start w-[400px] mx-10 p-10 dark:bg-dark-background light-red-shadow bg-white rounded-[18px]`}>
                <p className={`${translate ? "text-xl" : "text-2xl"}`}>
                    {translate == true ? 
                        "What happens when a 23 year old british kid attempts to cycle the length of Japan on a whim? Will the Japanese he studied be enough? Will he be surprised by the culture differences? Will he come to love Japan, or will he come to hate it? What will he discover about himself through this adventure? All of these doubts and questions are answered through an exciting journal written by that kid himself."
                    : 
                        "あるイギリス人が日本に来て、自転車で日本縦断をしようとしたらどうなるのか？学んだ日本語は通じるか？文化の違いに驚くか？日本のことが好きになるか、それとも嫌いになるか？日本での冒険をしながら、自分について何を気づかされるのか？本人が書いた日記を通して、こういう疑問への答えは明らかになる。"
                    }
                    
                </p>
                <button className='btn dark:bg-dark-highlight text-dark-text bg-light-highlight text-lg ml-1'>Buy the book</button>
            </div>
        </div>
    </section>
  )
}

export default Book