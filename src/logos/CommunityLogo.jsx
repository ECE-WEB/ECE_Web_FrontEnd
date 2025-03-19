import React from "react";

const CommunityLogo = () =>{
const styles ={
    logoContainer:{
        position: 'relative',
      width: '60px',/* Adjust based on circle size & desired overlap */
      height: '40px',/* Match the circle diameter for vertical alignment */
    },
    circle :{
        width: '35px',
      height: '35px',
      borderRadius: '50%',
      position: 'absolute',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
    },
    circle1:{
        backgroundColor: '#292929',
        left: '0px',
      zIndex: 1
    },
    circle2:{
        backgroundColor: '#656564',
      left: '10px',
      zIndex: 2
    },
    circle3:{
        backgroundColor: '#4D0000',
      left: '20px',
      zIndex: 2
    }
}
return(
<>
    <div style={styles.logoContainer}>
      <div style={{ ...styles.circle, ...styles.circle1 }}></div>
      <div style={{ ...styles.circle, ...styles.circle2 }}></div>
      <div style={{ ...styles.circle, ...styles.circle3 }}></div>
    </div>
</>
);
}
export default CommunityLogo;