
import * as am4core from "@amcharts/amcharts4/core"; 
import * as am4charts from "@amcharts/amcharts4/charts"; 
import am4themes_animated from "@amcharts/amcharts4/themes/animated"; 

import {  getUpdateEventObjectDataAsync, selectPreviousUserData, selectProducts, selecteventObjectData, selectuser, targetRestauranrDataAsync } from "../features/counter/counterSlice";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import AmChartsForResNprod from "../Components/AmCharts/AmChartsForResNprod";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
let searchBarData= "";

function BrowseRestaurant(){ 
  const isLargeScreen = !useMediaQuery({ maxWidth: 768 });
      const navigate = useNavigate();
      const currentUser  = useSelector(selectuser); 

    const dispatch = useDispatch();

 const products = useSelector(selectProducts); 
 const prevUser = useSelector(selectPreviousUserData)
 const [passPropData, setpassPropData] = useState([])
 const [RestaurantLp,setRestaurantLp ] = useState([])
 const EventObjectData = useSelector(selecteventObjectData)

 function StateLfForRestaurant(data){
  setRestaurantLp(data); 
 }
 const RestaurentSet = new Set(); 
 const RestaurentProductsCount = {} 
 let uniquerestaurent = []; 




useEffect(()=>{

    if(products.length !==0 ){
        am4core.useTheme(am4themes_animated);
        
        let chart = am4core.create("allRestaunantDiv", am4charts.PieChart);
        
         chart.logo.disabled = true

         products.forEach(element => { 
            if( !RestaurentSet.has(element.restaurantName)){ 
              RestaurentSet.add(element.restaurantName) 
            } 
           
           }); 
           
           products.forEach(element => { 
            if (!RestaurentProductsCount.hasOwnProperty(element.restaurantName)) { 
              RestaurentProductsCount[element.restaurantName] = 1; 
            } else { 
              RestaurentProductsCount[element.restaurantName]++; 
            } 
          }); 
           
          uniquerestaurent = Array.from(RestaurentSet); 
         
          setpassPropData(uniquerestaurent)
          
         chart.data = uniquerestaurent.map((element)=>( 
            { 
                "country": element, 
                "litres": RestaurentProductsCount[element] 
              } 
         
         )) 
        
        
        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.innerRadius = am4core.percent(50);
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.disabled = true;
        
        let rgm = new am4core.RadialGradientModifier();
        rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
        pieSeries.slices.template.fillModifier = rgm;
        pieSeries.slices.template.strokeModifier = rgm;
        pieSeries.slices.template.strokeOpacity = 0.4;
        pieSeries.slices.template.strokeWidth = 0;
        
        chart.legend = new am4charts.Legend();
        chart.legend.parent = am4core.create("legendDiv", am4core.Container);
        chart.logo.disabled = true

        chart.legend.position = "right";
       

        

        
    }
}, [isLargeScreen])
    return(<div className="mb-4"> 
      
  {isLargeScreen ? <> 
  
  { prevUser?.length !=0 && prevUser[0].Access ==="Admin" &&  
  
    <section className="content02 mt-5 cid-snLQY6UI3d" id="content02-e" >
  <div className="">
  <div className="row justify-content-center">
  <div className="col-12 col-md-4 mx-4">
  <h6 className="display-6"> Restaurants VS Listed Products</h6>

  <div id="chart-container" style={{ display: 'flex', height: "90%" }}>
  <div id="allRestaunantDiv" style={{ flex: 1, height: "100%"}}></div>
</div>
      </div>
      <div className ="col-12 col-md-2 bhag mx-3" >
        <div style={{ height: '100%', overflowY: 'auto', margin: '0 20px' }}> 

  <div 
    id="legendDiv"
    style={{
      height: '150%',
      width: '100%',
  
     
    }}
  >
    {/* Your content */}
  </div>
        </div>
</div>

      <div className="col-12 col-md-3 bhag mx-3">
        <div className="text-wrapper align-left">
        <svg style={{height: "70%", width: "90%"}}
  xmlns="http://www.w3.org/2000/svg"
  data-name="Layer 1"
  width="998.28223"
  height="772.77325"
  viewBox="0 0 998.28223 772.77325"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <title>special_event</title>
  <path
    d="M544.29639,239.33176a368.02149,368.02149,0,0,1-120.72217-20.26465C371.522,201.07,328.87939,176.24631,296.832,145.28537,236.21094,86.71945,186.51074,77.89328,155.49854,80.79953c-33.57032,3.14746-53.11084,20.33789-53.3042,20.51123L100.85889,99.822c.19726-.17724,20.14062-17.75781,54.32324-21.00146,20.04541-1.90088,41.00781,1.41113,62.30664,9.84717,26.56055,10.52,53.72314,29.085,80.73291,55.17919,31.83643,30.75733,74.231,55.4292,126.00586,73.32959,95.04736,32.86133,202.16943,24.90528,293.89892-21.8291,30.3711-15.47461,60.38868-26.03711,89.21778-31.394,36.35351-6.75684,70.83008-5.18848,102.47949,4.6582,69.54883,21.63721,117.05371,20.48975,144.6582,15.71924,29.78418-5.148,43.29786-15.45068,43.43067-15.5542l1.22851,1.57862c-.55957.435-14.0459,10.71386-44.31933,15.94628-27.82227,4.80957-75.667,5.97461-145.5918-15.78076-70.80078-22.02441-142.50879,2.312-190.19531,26.60793A383.87963,383.87963,0,0,1,573.398,238.21359Q558.79492,239.33127,544.29639,239.33176Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <circle cx="439.40025" cy="180.26772" r="20.26772" fill="#6c63ff" />
  <circle cx="753.40025" cy="99.26772" r="20.26772" fill="#6c63ff" />
  <circle cx="100.40025" cy="20.26772" r="20.26772" fill="#6c63ff" />
  <path
    d="M685.60267,548.09582v195.827h30.79041V565.33845H839.55473v178.5844h30.79042V352.26879H839.55473c-10.20308,0-25.86395,53.13887-25.86395,106.53483,0,40.24749,4.70035,74.74,11.384,89.2922Zm153.95206,0h-.29948c.10058-.219.1998-.45013.29948-.67813Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <path
    d="M799.7041,255.34171H799.704c-25.27389,0-45.76244,22.73778-45.76244,50.78624v35.63588h10.96l6.34519-13.20338-1.58632,13.20338h70.44643l5.76836-12.00307-1.44208,12.00307h7.93151V313.78328C852.36466,281.50693,828.78772,255.34171,799.7041,255.34171Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M747.26839,488.16759l-28.09776,11.94155-97.63969,79.37615a28.738,28.738,0,0,0-6.322,15.45377c-.70244,9.13177-30.20508,56.89795-19.66842,63.21995s48.46862,25.288,50.576,12.644,13.34644-66.73217,13.34644-66.73217l94.12747-84.29326Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M636.9847,660.26634l-11.94154,35.12219s12.644,13.34643,6.322,24.58554v38.63441h-9.83421l-2.80978-20.37087s-11.20122,20.11351-16.85865,20.37087c-11.86.53951-35.34608,4.75815-36.04853-1.56385s17.785-12.485,17.785-12.485l19.66843-54.08818,8.42932-33.01486Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M820.32255,479.03582s6.322,61.81506-11.94155,73.05416-99.04458,47.06374-99.04458,47.06374,34.41975,32.31242,27.39531,40.0393-38.63441,28.8002-42.84908,24.58554-51.2784-54.79062-45.65885-70.94683,83.59082-68.8395,83.59082-68.8395l9.13177-33.01486,2.80978-26.69287,29.50264-18.966Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <circle cx="687.28129" cy="242.21767" r="29.2837" fill="#ffb9b9" />
  <path
    d="M810.83956,317.825s-1.40489,26.69286,20.37087,35.12219-54.08818,63.21995-54.08818,63.21995V355.05448s9.83422-10.53666,0-26.69286Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#ffb9b9"
  />
  <path
    d="M857.55207,443.21119l-5.61955,27.39531L835.07387,564.734s14.04888,40.0393-4.91711,39.33686-9.83421-43.55152-9.83421-43.55152l9.83421-77.97127V452.343Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#ffb9b9"
  />
  <path
    d="M736.73173,429.86475l-6.322,24.58554-28.8002,69.54194s-19.66843,33.01486-3.51222,32.31242,16.15621-32.31242,16.15621-32.31242l33.01486-56.19551v-31.61Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#ffb9b9"
  />
  <path
    d="M731.81462,634.97836l23.18065,21.77576s16.15621-3.51222,22.4782,15.45376,10.53666,30.90753,10.53666,30.90753l-8.42932,4.91711L769.04415,693.2812s-6.322,26.69287-12.644,28.8002-37.932,16.15621-35.12219,0l15.45376-22.47821s2.10733-25.288-4.21466-27.39531-23.18065-23.18064-23.18065-23.18064Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M821.43611,500.81158s-66.02973-23.88309-70.24439-21.77576a31.67707,31.67707,0,0,1-9.8941,2.568l.05989-9.59241s21.77576-7.72688,33.7173-2.80977,48.46863,26.69287,48.46863,26.69287Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <path
    d="M781.33692,402.11822s18.966-21.77576,24.58553-35.12219A34.4852,34.4852,0,0,1,824.15359,349.069s42.179,9.49774,41.47659,26.35639-26.69287,42.84908-26.69287,42.84908,3.51222,93.425-15.45376,92.02014a40.68115,40.68115,0,0,1-8.42933-16.85865c-2.10733-9.83421-67.43461-20.37087-67.43461-20.37087s-5.61955,9.83421-6.322,5.61955,5.61955-107.47391,5.61955-107.47391L780.41458,349.069Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M860.21924,368.63947l.47037.264a9.69114,9.69114,0,0,1,4.94846,8.45269l-.00721,52.13043a9.76765,9.76765,0,0,0,3.47464,7.4341c2.70588,2.30158,5.21508,5.61814.0369,7.3442-8.42933,2.80978-41.44419,16.85865-42.14663,11.94155s-2.10734-10.53666,0-10.53666c1.64977,0,11.47944-50.371,19.37772-71.90771A9.69273,9.69273,0,0,1,860.21924,368.63947Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M756.40016,368.75214l-9.83422,2.80977-11.2391,48.46863s-13.34643,2.80977-9.13177,7.72688,21.77576,17.5611,21.77576,17.5611Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M812.71353,269.33164a24.00019,24.00019,0,0,0-18.93688-9.66364h-.89845c-17.32278,0-31.36559,15.67512-31.36559,35.01138v.00008h5.8044l.9374-7.13514,1.37441,7.13514h34.4256l2.88421-6.03646-.72107,6.03646h6.7725q4.74044,23.54219-13.62243,47.08437h11.53679l5.76836-12.07292-1.44207,12.07292h21.99194l4.32629-27.76778C841.54894,293.20055,829.46615,275.56639,812.71353,269.33164Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M224.39386,593.34171c7.38992-16.08983,12.58694-54.22709,12.58694-98.72739,0-59.03812-17.31569-117.792-28.5969-117.792H174.34V809.86109H208.3839V612.40631H344.55961V809.86109h34.04393V593.34171Zm-16.01-.74978c.11021.25209.21993.50767.33113.74978h-.33113Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <path
    d="M366.29212,514.34171s41,17,28,27-40-12-39-15-4-10-4-10Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#9f616a"
  />
  <path
    d="M330.29212,380.34171l13,12,3,35,10,37s17,35,14,42,3,9,3,9l-23,9s-25-28-25-34S330.29212,380.34171,330.29212,380.34171Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#575a88"
  />
  <path
    d="M330.29212,380.34171l13,12,3,35,10,37s17,35,14,42,3,9,3,9l-23,9s-25-28-25-34S330.29212,380.34171,330.29212,380.34171Z"
    transform="translate(-100.85889 -63.61338)"
    opacity="0.1"
  />
  <path
    d="M453.29212,740.34171s-5,23-6,25,19,9,19,9l24-17s-10-22-10-26Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#575a88"
  />
  <path
    d="M322.29212,516.34171l7,8s145,18,148,46,24,160,12,164-43,19-43,11-20-118-16-138c0,0-173-22-177-47s4-36,4-36Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M322.29212,516.34171l7,8s145,18,148,46,24,160,12,164-43,19-43,11-20-118-16-138c0,0-173-22-177-47s4-36,4-36Z"
    transform="translate(-100.85889 -63.61338)"
    opacity="0.1"
  />
  <path
    d="M451.29212,763.34171s-4-9-6-6-9,38-2,38,71,16,80,14,26,1,24-9-12-11-12-11-37-22-39-33-13-5-13-5v7S462.29212,774.34171,451.29212,763.34171Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M261.29212,304.34171s7,34-8,37,19,23,19,23l22,12,16-16s-14.5-29.5-3.5-51.5S261.29212,304.34171,261.29212,304.34171Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#9f616a"
  />
  <path
    d="M310.29212,360.34171l-16,16-22-12s-34-20-19-23c9.65-1.93,10.18994-16.69,9.36-26.97a92.99156,92.99156,0,0,0-1.36-10.03s56.5-17.5,45.5,4.5a38.36144,38.36144,0,0,0-3.43994,10.76C299.98206,339.37168,310.29212,360.34171,310.29212,360.34171Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#9f616a"
  />
  <polygon
    points="265.433 705.728 265.433 728.728 303.433 728.728 306.433 719.728 302.433 695.728 265.433 705.728"
    fill="#575a88"
  />
  <path
    d="M209.29212,536.34171s0,59,24,61,110,13,110,13,5,98,14,130,1,34,9,36,42-5,41-12-5-184-5-184,9-38-111-56Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M369.29212,785.34171s-6-13-7-9-13,39-1,42,50,19,75,18,28-2,28-2,7-10-2-16-46-41-48-45-17-7-17,0S376.29212,794.34171,369.29212,785.34171Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M306.79212,308.84171a38.36144,38.36144,0,0,0-3.43994,10.76c-4.98,3.01-8.31006,2.24-14.56006,2.24-9.27,0-13.01-11.85-19-18-.47-5.71-8.5.5-8.5.5S317.79212,286.84171,306.79212,308.84171Z"
    transform="translate(-100.85889 -63.61338)"
    opacity="0.1"
  />
  <circle cx="185.43324" cy="224.72833" r={33} fill="#9f616a" />
  <path
    d="M343.29212,392.34171s-5,36-8,49-7,73-9,81-14,10-38,7a45.10278,45.10278,0,0,0-4.54-.34c-14.78-.47-31.68994,5.06-47.34,9.4-9,2.5-17.59,4.6-25.12,4.94-11.4.52-14.74-12.12-14.35-25.8.37-12.73,3.98-26.38,7.35-31.2,6.07007-8.68.1-86.61,2.34009-112.31v-.01c.33985-3.92.86987-6.62,1.65991-7.68,6-8,45-28,49.37-27.19,4.36.81,41.63,24.19,41.63,24.19,9,0,8.71-9.76,8.71-9.76s6.29,11.76,18.29,14.76S343.29212,392.34171,343.29212,392.34171Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#575a88"
  />
  <path
    d="M276.44482,521.98446s64.416,2.05106,53.13165,9.70415-61.28435,14.6531-62.28435,4.6531S276.44482,521.98446,276.44482,521.98446Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#9f616a"
  />
  <path
    d="M283.75208,529.00168c.21,3.84-10.11987,12.49-13.46,18.34-1.85,3.24-16.16992-1.03-33.88-8.94a347.39653,347.39653,0,0,1-39.47-20.86c.37-12.73,3.98-26.38,7.35-31.2,6.07007-8.68.1-86.61,2.34009-112.31v-.01a11.08754,11.08754,0,0,1,1.65991-.68h12c41,19-6,101-6,101s62,51,68,53A1.79787,1.79787,0,0,1,283.75208,529.00168Z"
    transform="translate(-100.85889 -63.61338)"
    opacity="0.1"
  />
  <path
    d="M220.29212,367.34171h-12s-11,3-20,23-42,82-13,106,91,52,95,45,18-18,12-20-68-53-68-53S261.29212,386.34171,220.29212,367.34171Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#575a88"
  />
  <path
    d="M281.21528,272.986s1.4482-20.04751,19.31387-11.87327,16.69989-14.35666,11.301-18.33813-5.22793-4.96676-24.97392-2.30289-58.08172,7.17725-45.68608,46.8805,23.622,29.48955,23.622,29.48955-9.853-35.72772.13044-28.921l9.98341,6.80673,5.26829-1.11587Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#2f2e41"
  />
  <path
    d="M1018.39424,561.65954c0-18.04985-134.1295-32.68217-299.58656-32.68217s-299.58657,14.63232-299.58657,32.68217c0,6.99563,20.15906,13.47711,54.47029,18.79315V804.05231h16.34108V582.75813c54.95435,7.08431,137.04185,11.58358,228.7752,11.58358,92.49143,0,175.1821-4.57349,230.13695-11.75928V804.05231h16.34108v-223.814C998.76379,574.96269,1018.39424,568.56166,1018.39424,561.65954Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <ellipse cx="655.48109" cy="483.72833" rx={61} ry={15} fill="#f2f2f2" />
  <ellipse cx="655.48109" cy="483.72833" rx={50} ry="12.29508" fill="#d0cde1" />
  <ellipse cx="428.48109" cy="495.72833" rx={61} ry={15} fill="#f2f2f2" />
  <ellipse cx="428.48109" cy="495.72833" rx={50} ry="12.29508" fill="#d0cde1" />
  <ellipse
    cx="654.06147"
    cy="478.07756"
    rx="29.08039"
    ry="4.59164"
    fill="#9f616a"
  />
  <ellipse
    cx="638.56469"
    cy="471.38142"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <ellipse
    cx="635.12096"
    cy="471.38142"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <ellipse
    cx="675.29781"
    cy="472.52933"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <ellipse
    cx="654.25279"
    cy="471.38142"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <ellipse
    cx="669.9409"
    cy="471.38142"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <path
    d="M782.66152,531.93371q-24.89544,8.44813-55.865,0v-.775A22.82,22.82,0,0,1,748.466,508.35424a143.33168,143.33168,0,0,1,14.7743.01892A20.62039,20.62039,0,0,1,782.66152,529.01Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <path
    d="M774.51333,553.0198a183.55732,183.55732,0,0,1-36.89012,0,11.78631,11.78631,0,0,1-10.63532-11.71149h58.16077A11.78632,11.78632,0,0,1,774.51333,553.0198Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <path
    d="M747.07631,515.48033a10.94342,10.94342,0,0,1-8.418,0,10.94342,10.94342,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M755.49432,518.92406a10.94342,10.94342,0,0,1-8.418,0,10.94342,10.94342,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M756.25959,512.80187a10.94343,10.94343,0,0,1-8.418,0,10.94342,10.94342,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M771.94769,512.80187a10.9434,10.9434,0,0,1-8.418,0,10.9434,10.9434,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M767.73869,516.2456a10.94342,10.94342,0,0,1-8.418,0,10.94342,10.94342,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <ellipse
    cx="428.06147"
    cy="490.07756"
    rx="29.08039"
    ry="4.59164"
    fill="#9f616a"
  />
  <ellipse
    cx="412.56469"
    cy="483.38142"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <ellipse
    cx="409.12096"
    cy="483.38142"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <ellipse
    cx="449.29781"
    cy="484.52933"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <ellipse
    cx="428.25279"
    cy="483.38142"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <ellipse
    cx="443.9409"
    cy="483.38142"
    rx="9.18328"
    ry="4.97428"
    fill="#6c63ff"
  />
  <path
    d="M556.66152,543.93371q-24.89544,8.44813-55.865,0v-.775A22.82,22.82,0,0,1,522.466,520.35424a143.33168,143.33168,0,0,1,14.7743.01892A20.62039,20.62039,0,0,1,556.66152,541.01Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <path
    d="M548.51333,565.0198a183.55732,183.55732,0,0,1-36.89012,0,11.78631,11.78631,0,0,1-10.63532-11.71149h58.16077A11.78632,11.78632,0,0,1,548.51333,565.0198Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <path
    d="M521.07631,527.48033a10.94342,10.94342,0,0,1-8.418,0,10.94342,10.94342,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M529.49432,530.92406a10.94342,10.94342,0,0,1-8.418,0,10.94343,10.94343,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M530.25959,524.80187a10.94343,10.94343,0,0,1-8.418,0,10.94343,10.94343,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M545.94769,524.80187a10.9434,10.9434,0,0,1-8.418,0,10.9434,10.9434,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M541.73869,528.2456a10.94342,10.94342,0,0,1-8.418,0,10.94343,10.94343,0,0,1,8.418,0Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M808.817,543.27735l.14051,3.09747.17923,4.01748s-18.45167,1.04279-22.16874,4.9706a2.26385,2.26385,0,0,0-.23714.27264L779.34,554.0177l-.01832-3.64094s.10193-.05675.30015-.16369c.04532-.02342.10195-.05349.15861-.08355A67.26989,67.26989,0,0,1,808.817,543.27735Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#6c63ff"
  />
  <path
    d="M808.817,543.27735l.14051,3.09747c-8.18223.253-23.66719,5.13043-23.66719,5.13043l-5.66853-1.29218A67.0834,67.0834,0,0,1,808.817,543.27735Z"
    transform="translate(-100.85889 -63.61338)"
    opacity="0.1"
  />
  <path
    d="M779.78042,550.12952l5.50992,1.37573,1.67768,3.85765a2.26385,2.26385,0,0,0-.23714.27264L779.34,554.0177l-.01832-3.64094s.10193-.05675.30015-.16369C779.66713,550.18965,779.72376,550.15958,779.78042,550.12952Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#fff"
    opacity="0.1"
  />
  <path
    d="M585.817,556.27735l.14051,3.09747.17923,4.01748s-18.45167,1.04279-22.16874,4.9706a2.26385,2.26385,0,0,0-.23714.27264L556.34,567.0177l-.01832-3.64094s.10193-.05675.30015-.16369c.04532-.02342.10195-.05349.15861-.08355A67.26989,67.26989,0,0,1,585.817,556.27735Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#6c63ff"
  />
  <path
    d="M585.817,556.27735l.14051,3.09747c-8.18223.253-23.66719,5.13043-23.66719,5.13043l-5.66853-1.29218A67.0834,67.0834,0,0,1,585.817,556.27735Z"
    transform="translate(-100.85889 -63.61338)"
    opacity="0.1"
  />
  <path
    d="M556.78042,563.12952l5.50992,1.37573,1.67768,3.85765a2.26385,2.26385,0,0,0-.23714.27264L556.34,567.0177l-.01832-3.64094s.10193-.05675.30015-.16369C556.66713,563.18965,556.72376,563.15958,556.78042,563.12952Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#fff"
    opacity="0.1"
  />
  <path
    d="M919.94545,450.49708a18.45726,18.45726,0,0,0-5.44763-3.76373V407.87717a1.71788,1.71788,0,0,0-1.71788-1.71788h-9.61909a1.71788,1.71788,0,0,0-1.71788,1.71788V445.988a17.4383,17.4383,0,0,0-11.9485,16.54609v83.35185a7.63819,7.63819,0,0,0,7.6382,7.63819h20.60452a7.60279,7.60279,0,0,0,7.60279-7.60278V463.51651A18.35464,18.35464,0,0,0,919.94545,450.49708Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#3f3d56"
  />
  <rect
    x="788.63559"
    y="411.13916"
    width="35.8455"
    height="47.35147"
    fill="#6c63ff"
  />
  <path
    d="M915.27226,408.81451h-.77444v-.93734a1.71788,1.71788,0,0,0-1.71788-1.71788h-9.61909a1.71788,1.71788,0,0,0-1.71788,1.71788v.93734h-.77444v3.98284h.77444v20.3567h13.05485v-20.3567h.77444Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#6c63ff"
  />
  <path
    d="M632.93406,484.22331c-.94871-2.02464-1.69746-3.45672-1.95955-3.94957-16.09007,3.97066-26.82534.61532-28.51827.02189-.8278,1.56345-5.99633,11.557-8.08531,21.13828-1.88708,8.64229-.79179,14.436,3.25557,17.2203l.11993.08543.02632.01758c4.46767,2.94386,8.72955,5.5511,12.666,7.74853q.79567.44281,1.50019.82295l.05026.02729.03538.04487a23.96531,23.96531,0,0,1,1.50688,2.12608A8.36148,8.36148,0,0,1,615.06,533.66v42.924l-.27115.00572c-10.26339.20924-16.61609,1.9492-16.61609,3.441,0,1.63668,7.61765,3.4605,18.54836,3.4605s18.54824-1.82382,18.54824-3.4605c0-1.46966-6.24516-3.19991-16.33436-3.43294l-.27223-.00647.25368-39.70518a17.51045,17.51045,0,0,1,1.82635-7.74692c.20374-.40473.42269-.79836.6507-1.16928.18314-.29844.37718-.58966.57661-.86459l.03656-.05053.05479-.03q.75813-.414,1.61-.89726l.06665-.03624c3.72562-2.10414,7.73986-4.57138,11.93249-7.3349,3.7433-2.46778,5.04665-7.45549,3.87381-14.8242C638.42692,496.90632,635.33281,489.33646,632.93406,484.22331Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M633.89551,517.85664c-4.39567,2.89726-8.02471,5.0702-10.8,6.63581H623.093a63.20229,63.20229,0,0,0-12.14161.341c-2.845-1.588-6.68312-3.86549-11.40485-6.97681-.0448-.02987-.0896-.05974-.1344-.0921v-.00249c-4.331-2.97941-4.438-9.28916-3.0292-15.74079,3.58425-.39825,9.29913-.224,16.97786,2.51893,9.09253,3.24821,18.61067,1.41129,24.12642-.25887C638.39324,509.97378,637.84066,515.25557,633.89551,517.85664Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#6c63ff"
  />
  <circle cx="506.90154" cy="434.82862" r="1.24453" fill="#6c63ff" />
  <circle cx="503.41686" cy="446.27828" r="1.24453" fill="#fff" />
  <circle cx="509.8884" cy="437.81549" r="0.74672" fill="#6c63ff" />
  <circle cx="512.87527" cy="452.00311" r="0.74672" fill="#fff" />
  <circle cx="507.64825" cy="452.74983" r="0.74672" fill="#fff" />
  <circle cx="522.83149" cy="427.85927" r="0.74672" fill="#6c63ff" />
  <path
    d="M691.31249,443.75759c-.94871-2.02465-1.69746-3.45673-1.95955-3.94958-16.09007,3.97066-26.82534.61532-28.51827.02189-.8278,1.56345-5.99633,11.557-8.08531,21.13828-1.88708,8.6423-.79179,14.436,3.25556,17.22031l.11994.08542.02632.01758c4.46767,2.94386,8.72955,5.5511,12.666,7.74853q.79568.44281,1.50019.82295l.05026.02729.03538.04487a23.96539,23.96539,0,0,1,1.50688,2.12609,8.36142,8.36142,0,0,1,1.52855,4.13309v42.924l-.27115.00571c-10.26339.20925-16.61609,1.9492-16.61609,3.441,0,1.63669,7.61765,3.4605,18.54836,3.4605s18.54824-1.82381,18.54824-3.4605c0-1.46966-6.24516-3.19991-16.33436-3.43294l-.27224-.00647.25369-39.70518a17.51031,17.51031,0,0,1,1.82635-7.74692c.20374-.40473.42269-.79836.6507-1.16928.18314-.29844.37718-.58966.57661-.86458l.03656-.05054.05479-.03q.75813-.414,1.61-.89727l.06665-.03624c3.72562-2.10414,7.73985-4.57138,11.93249-7.3349,3.7433-2.46778,5.04665-7.45548,3.87381-14.8242C696.80535,456.4406,693.71124,448.87073,691.31249,443.75759Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#d0cde1"
  />
  <path
    d="M692.27394,477.39091c-4.39567,2.89726-8.02471,5.0702-10.8,6.63581h-.00249a63.20229,63.20229,0,0,0-12.14161.341c-2.845-1.588-6.68312-3.86549-11.40485-6.97681-.0448-.02987-.0896-.05974-.13441-.0921v-.00249c-4.331-2.9794-4.438-9.28916-3.02919-15.74078,3.58425-.39826,9.29913-.224,16.97786,2.51892,9.09253,3.24821,18.61067,1.41129,24.12642-.25887C696.77167,469.50806,696.21909,474.78984,692.27394,477.39091Z"
    transform="translate(-100.85889 -63.61338)"
    fill="#6c63ff"
  />
  <circle cx="565.27997" cy="394.3629" r="1.24453" fill="#6c63ff" />
  <circle cx="561.79529" cy="405.81255" r="1.24453" fill="#fff" />
  <circle cx="568.26683" cy="397.34976" r="0.74672" fill="#6c63ff" />
  <circle cx="571.2537" cy="411.53738" r="0.74672" fill="#fff" />
  <circle cx="566.02668" cy="412.2841" r="0.74672" fill="#fff" />
  <circle cx="581.20992" cy="387.39354" r="0.74672" fill="#6c63ff" />
</svg>

          <h1 className="mbr-section-title mbr-fonts-style mb-4 display-5">
            <strong> All Restarunents &amp; reliable Products</strong>
          </h1>
          <p className="mbr-text mbr-fonts-style mb-4 display-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="mbr-section-btn mt-3">
           
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  }
<div> 

    <section className="food_section layout_padding-bottom p-3 shadow mt-4">
  <div className="container">
    <div className="heading_container heading_center">
      <h2>Our Restaurants</h2>
    </div>
    <ul className="filters_menu">
    <div className="col-lg-12 card-margin">
      <div className="card search-form">
        <div className="card-body p-0">
          <form id="search-form" >
            <div className="row">
              <div className="col-12">
                <div className="row no-gutters">
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={(e)=>{
""                      }}
                    >   <option> Filter </option>

                      {RestaurantLp.map((element, index)=>(
                        <option key={index+element.name}> {element.name} </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                      id="search"
                      name="search"
                      onChange={(e)=>{
                        searchBarData = e.target.value;
                            
                      }}
                    />
                  </div>
                  <div className="col-lg-1 col-md-3 col-sm-12 p-0 bhag" onClick={()=>{
                         ""
                  }}>
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-search"
                      >
                        <circle cx={11} cy={11} r={8} />
                        <line x1={21} y1={21} x2="16.65" y2="16.65" />
                      </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
      <li className="active" data-filter="*">
      All
      </li>
      <li data-filter=".burger">Burger</li>
      <li data-filter=".pizza">Pizza</li>
      <li data-filter=".pasta">Pasta</li>
      <li data-filter=".fries">Fries</li>
    </ul>
    <div className="filters-content">
      <div  style={{ height: '900px', width: '100%', overflowY: 'auto' }}> 
      <div className="row p-3 bhag" style={{width: "99%"}}>
      <Link  to={"/TargetRestaurent"}> 

      </Link> 
      {RestaurantLp.map((element, index)=>(
 <div key={index*2*6} className="col-sm-3 col-lg-3 all pizza" onClick={()=>{
  dispatch(targetRestauranrDataAsync(element))

  // Get Time
  const date = new Date(); 

  const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Ensure 24-hour format
  };
   const indianTime = date.toLocaleString('en-IN', options)
    .replace(/\//g, '-')
    .replace(',', '');
  // Get Time
  dispatch(getUpdateEventObjectDataAsync({_id:EventObjectData?._id?? "?id..", id: currentUser.uid, actions: [...EventObjectData.actions, {
    "actionType": "RestaurantCheck",
    "timestamp": Date.now(),
     Time:indianTime,
    "details": {
      "itemId": element.children[0].uid,
      "itemName": element.name,
      "otherInfo": element.children[0].img
    }}] 
  
  }))
  navigate("/TargetRestaurent")
 }}>
     
  
 <div className="box" >
   <div>
     <div className="">
     <img className="" src= {element?.children[0].img} alt="" style={{height: "240px", width: "100%"}} />
      
     </div>
     <div className="detail-box">
       <h5>{element.name}</h5>
       <p>
         Veniam debitis quaerat officiis quasi cupiditate quo, quisquam
         velit, magnam voluptatem repellendus sed eaque
       </p>
       <div className="options">
         <h6>Total List Items: {element?.children
.length}</h6>
         <a  className="bhag">
         <img 
  src="https://cdn-icons-png.flaticon.com/512/70/70616.png"
  style={{
    width: '30px', 
    height: '30px', 
    borderRadius: '50%'
  }}
/>
         </a>
       </div>
     </div>
   </div>
 </div>

</div>
))}</div>
      </div>
    </div>
    <div className="btn-box">
      <a href="">View More</a>
    </div>
  </div>
</section>

 {passPropData.length !=0 && 
  <div className="shadow p-4 mb-4">


    <AmChartsForResNprod  prevUser={prevUser} StateLfForRestaurant= {StateLfForRestaurant} uniquerestaurent = {passPropData} > </AmChartsForResNprod>
  </div>

 }


<section className="ftco-section">
  <div className="container">
    <div className="row justify-content-center mb-5 pb-2">
      <div className="col-md-7 text-center heading-section ftco-animate">
        <span className="subheading">Specialties</span>
        <h2 className="mb-4">Our Menu</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-lg-4">
        <div className="menu-wrap">
          <div className="heading-menu text-center ftco-animate">
            <h3>Breakfast</h3>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/breakfast-1.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/breakfast-2.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus border-bottom-0 d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/breakfast-3.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <span className="flat flaticon-bread" style={{ left: 0 }} />
          <span className="flat flaticon-breakfast" style={{ right: 0 }} />
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div className="menu-wrap">
          <div className="heading-menu text-center ftco-animate">
            <h3>Lunch</h3>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/lunch-1.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/lunch-2.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus border-bottom-0 d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/lunch-3.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <span className="flat flaticon-pizza" style={{ left: 0 }} />
          <span className="flat flaticon-chicken" style={{ right: 0 }} />
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div className="menu-wrap">
          <div className="heading-menu text-center ftco-animate">
            <h3>Dinner</h3>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/dinner-1.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/dinner-2.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus border-bottom-0 d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/dinner-3.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <span className="flat flaticon-omelette" style={{ left: 0 }} />
          <span className="flat flaticon-burger" style={{ right: 0 }} />
        </div>
      </div>
      {/*  */}
      <div className="col-md-6 col-lg-4">
        <div className="menu-wrap">
          <div className="heading-menu text-center ftco-animate">
            <h3>Desserts</h3>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/dessert-1.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/dessert-2.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus border-bottom-0 d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/dessert-3.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <span className="flat flaticon-cupcake" style={{ left: 0 }} />
          <span className="flat flaticon-ice-cream" style={{ right: 0 }} />
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div className="menu-wrap">
          <div className="heading-menu text-center ftco-animate">
            <h3>Wine Card</h3>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/wine-1.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/wine-2.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus border-bottom-0 d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/wine-3.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <span className="flat flaticon-wine" style={{ left: 0 }} />
          <span className="flat flaticon-wine-1" style={{ right: 0 }} />
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div className="menu-wrap">
          <div className="heading-menu text-center ftco-animate">
            <h3>Drinks &amp; Tea</h3>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/drink-1.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/drink-2.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <div className="menus border-bottom-0 d-flex ftco-animate">
            <div
              className="menu-img img"
              style={{ backgroundImage: "url(images/drink-3.jpg)" }}
            />
            <div className="text">
              <div className="d-flex">
                <div className="one-half">
                  <h3>Beef Roast Source</h3>
                </div>
                <div className="one-forth">
                  <span className="price">$29</span>
                </div>
              </div>
              <p>
                <span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>,{" "}
                <span>Tomatoe</span>
              </p>
            </div>
          </div>
          <span className="flat flaticon-wine" style={{ left: 0 }} />
          <span className="flat flaticon-wine-1" style={{ right: 0 }} />
        </div>
      </div>
    </div>
  </div>
</section>




</div>
  
  </> : <>
  
  <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="alert alert-warning text-center">
            <h4 className="alert-heading">Switch to Desktop Mode</h4>
            <p>This page is best viewed on a larger screen. Please switch to desktop mode for an optimal experience.</p>
          </div>
        </div>
      </div>
    </div>
   </>}
  
 
    </div>) 
} 
 
export default BrowseRestaurant;