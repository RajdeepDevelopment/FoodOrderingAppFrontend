import { RingLoader } from "react-spinners";


   function  RefreshBar({Setstate, state}){

    const handleRefresh = () => {
        // Toggle the refresh state to trigger a re-render
        Setstate(!state);
      };
    
    return(<> 

<div
      className='btn btn-sm fixed-top bhag'
       onClick={handleRefresh}
       style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        height: '45px',
        width: '50px',
        backgroundColor: '#f0f0f0',
        padding: '0px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        transition: 'transform 0.2s ease-in-out', // Added transition for smooth effect
        cursor: 'pointer' // Change cursor on hover
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.1)'; // Scale up on hover
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)'; // Return to normal size on mouse out
      }} 


> 
     

     < div > 
    
     <RingLoader color="#36d7b7"
       size={40}
       loading

     />

     <p className='bhag'> Refresh</p>
      </div>
</div>
    
    </>)

}

export default RefreshBar; 