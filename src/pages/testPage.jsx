export default function TestPage(){
  let count = 0;
  return (
    <div className = "w-full h-screen  flex justify-center items-center">
      <div className = "w-[450px] h-[250px] shadow  flex justify-center items-center">
        <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer ">-</button>
        <span className="text-[20px] font-bold text-center w-[100px] h-[40px] mx-[10px]">
          {count}
        </span>
        <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer">+</button>



      </div>


    </div>




  )






}