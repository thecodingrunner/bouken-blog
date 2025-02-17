import cover from '../public/gaijinjuudancover.png'

const Book = () => {
  return (
    <section className="flex flex-col gap-4 relative h-screen w-screen dark:text-dark-text text-light-text p-20">
        <h2 className="text-[7rem] font-semibold pl-6">A Foreigners Traverse</h2>
        <div className='flex gap-10'>
            <h2 className="w-auto text-[8rem] font-semibold vertical-text text-center">外人縦断</h2>
            <div className='w-auto shrink-0 px-10'>
                <img src={cover.src} className='w-[370px] dark:dark-red-shadow light-red-shadow'></img>
            </div>
            <div className='flex flex-col gap-10 flex-1 justify-center items-end w-[500px]'>
                <p className='text-3xl'>
                    あるイギリス人が日本に来て、自転車で日本縦断をしようとしたらどうなるのか？学んだ日本語は通じるか？文化の違いに驚くか？日本のことが好きになるか、それとも嫌いになるか？日本での冒険をしながら、自分について何を気づかされるのか？本人が書いた日記を通して、こういう疑問への答えは明らかになる。
                </p>
                <button className='btn dark:bg-dark-highlight text-dark-text bg-light-highlight text-lg'>Buy the book</button>
            </div>
        </div>
    </section>
  )
}

export default Book