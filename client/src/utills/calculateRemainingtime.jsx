const calculateRemainingTime = ({startDate,duration}) => {
    const currentDate = new Date();
    const courseStartDate = new Date(startDate);
    console.log(startDate,"courseStartDate",duration)
  

    const courseEndDate = new Date(courseStartDate.getTime() + duration * 60 * 60 * 1000);
  
    const remainingTime = courseEndDate - currentDate;
  
    const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
    console.log(remainingHours,"remainingHours")
  
    return remainingHours > 0 ? remainingHours : 0; 
  };
  export default calculateRemainingTime;