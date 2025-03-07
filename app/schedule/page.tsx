import GameFiltersSchedule from "@/components/feature/game-filters";
import GameResultCard from "@/components/feature/game-result-card";


export default  function  ScheduleScreen(){



    return(
        <>
            <div className= "2xl:relative w-full h-full flex flex-col  gap-5 justify-center items-center p-10">
                <p className='2xl:absolute 2xl:left-10 text-white font-bold text-4xl 2xl:text-8xl'>Schedule</p>
                <GameFiltersSchedule/>
                <GameResultCard/>
            </div>





        </>

    )


}