import Box from '@mui/material/Box';

export default function LoginPage() {
 

  return (
      <div className="h-full">
        <div className="w-[60%] bg-linear-to-r/increasing from-[#0571e1] to-[#021d7b] h-[100vh] flex items-center justify-center" >
        <div className="text-white space-y-2">
          <h1 className=" text-3xl font-bold ">GoFinance</h1>
          <p>The most popular peer to peer lending Sea</p>
          <button className='rounded-full px-4 py-1 bg-[#0575e6]'>See More</button>
          <Box
            sx={{
              position: "absolute",
              bottom: -400,
              left: -400,
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.1)",
            }}
          />
            <Box
            sx={{
              position: "absolute",
              bottom: -500,
              left:-200,
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>
        </div>
        <div></div>
      </div>
  )
}