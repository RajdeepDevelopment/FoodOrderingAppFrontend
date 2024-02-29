import { useDispatch } from "react-redux";
import { SelectOutForDelivery, selectPreviousUserData } from "./counterSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline"; 


import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets"; 

function convertStringToDate(dateString) {
    // Append seconds and milliseconds to the date string to make it a complete format
    const formattedDateString = dateString + ':00.000';
    
    const inputDate = new Date(formattedDateString);
    const inputDateMilliseconds = inputDate.getTime();
  
    return inputDateMilliseconds;
  }
  
function TimeLineAmChart({zoom,nameChart, mapData, timeShifthour, timeShiftmonth, timeShiftday, getStartEndTime, TargetUserEventObjectData}){
    const currentUser = useSelector(selectPreviousUserData)
    const OutForDelivery = useSelector(SelectOutForDelivery); 
    const dispatch = useDispatch();
    useEffect(()=>{
       if(mapData.length !==0) {
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        let colorSet = new am4core.ColorSet();

        
        am4core.ready(function() {
            let chart = am4core.create(nameChart, am4plugins_timeline.CurveChart);
            chart.curveContainer.padding(100, 20, 50, 20);
            chart.maskBullets = false;
        
        
            chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";
            chart.dateFormatter.dateFormat = "HH";
           chart.logo.disabled = true

           chart.data =  mapData
           
            chart.fontSize = 10;
            chart.tooltipContainer.fontSize = 10;
        
            let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.grid.template.disabled = true;
            categoryAxis.renderer.labels.template.paddingRight = 25;
            categoryAxis.renderer.minGridDistance = 10;
            categoryAxis.renderer.innerRadius = 10;
            categoryAxis.renderer.radius = 30;
        
            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        
        
            dateAxis.renderer.points = getPoints();
        
            dateAxis.renderer.autoScale = true;
            dateAxis.renderer.autoCenter = false;
            dateAxis.renderer.minGridDistance = 70;
            dateAxis.baseInterval = { count: 5, timeUnit: "minute" };
            dateAxis.renderer.tooltipLocation = 0;
            dateAxis.renderer.line.strokeDasharray = "1,4";
            dateAxis.renderer.line.strokeOpacity = 0.5;
            dateAxis.tooltip.background.fillOpacity = 0.2;
            dateAxis.tooltip.background.cornerRadius = 5;
            dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
            dateAxis.tooltip.label.paddingTop = 7;
            dateAxis.endLocation = 0;
            dateAxis.startLocation = -0.5;
            const date = new Date()
            let day = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric' });
            day = parseInt(day)

            let hour = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false });
              hour = hour -3 
             let startDate =  new Date(date.getFullYear(), (parseInt(date.getMonth())+timeShiftmonth) , ( day +timeShiftday), hour+timeShifthour, 55).getTime();
            dateAxis.min = convertStringToDate(mapData[0].start)

                     
            hour = hour +6 + zoom
            let endDate = new Date(date.getFullYear(), (parseInt(date.getMonth())+timeShiftmonth), (day +timeShiftday  ), hour+timeShifthour, 10).getTime();
            dateAxis.max = convertStringToDate(mapData[mapData.length-1].end);           
           //State lefting Function 
            getStartEndTime(convertStringToDate(mapData[0].start), convertStringToDate(mapData[mapData.length-1].end))
            let labelTemplate = dateAxis.renderer.labels.template;
            labelTemplate.verticalCenter = "middle";
            labelTemplate.fillOpacity = 0.6;
            labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor("background");
            labelTemplate.background.fillOpacity = 1;
            labelTemplate.fill = new am4core.InterfaceColorSet().getFor("text");
            labelTemplate.padding(7, 7, 7, 7);
        
            let series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
            series.columns.template.height = am4core.percent(30);
        
            series.dataFields.openDateX = "start";
            series.dataFields.dateX = "end";
            series.dataFields.categoryY = "category";
            series.baseAxis = categoryAxis;
            series.columns.template.propertyFields.fill = "color"; // get color from data
            series.columns.template.propertyFields.stroke = "color";
            series.columns.template.strokeOpacity = 0;
            series.columns.template.fillOpacity = 0.6;
        
            let imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet());
            imageBullet1.background.radius = 18;
            imageBullet1.locationX = 1;
            imageBullet1.propertyFields.stroke = "color";
            imageBullet1.background.propertyFields.fill = "color";
            imageBullet1.image = new am4core.Image();
            imageBullet1.image.propertyFields.href = "icon";
            imageBullet1.image.scale = 0.7;
            imageBullet1.circle.radius = am4core.percent(100);
            imageBullet1.background.fillOpacity = 0.8;
            imageBullet1.background.strokeOpacity = 0;
            imageBullet1.dy = -2;
            imageBullet1.background.pointerBaseWidth = 10;
            imageBullet1.background.pointerLength = 10
            imageBullet1.tooltipText = "{text}";
        
            series.tooltip.pointerOrientation = "up";
        
            imageBullet1.background.adapter.add("pointerAngle", (value, target) => {
                if (target.dataItem) {
                    let position = dateAxis.valueToPosition(target.dataItem.openDateX.getTime());
                    return dateAxis.renderer.positionToAngle(position);
                }
                return value;
            });
        
            let hs = imageBullet1.states.create("hover")
            hs.properties.scale = 1.3;
            hs.properties.opacity = 1;
        
            let textBullet = series.bullets.push(new am4charts.LabelBullet());
            textBullet.label.propertyFields.text = "text";
            textBullet.disabled = true;
            textBullet.propertyFields.disabled = "textDisabled";
            textBullet.label.strokeOpacity = 0;
            textBullet.locationX = 1;
            textBullet.dy = - 100;
            textBullet.label.textAlign = "middle";
        
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX.align = "center"
            chart.scrollbarX.width = am4core.percent(70);
            chart.scrollbarX.parent = chart.curveContainer;
            chart.scrollbarX.height = 300;
            chart.scrollbarX.orientation = "vertical";
            chart.scrollbarX.x = 75;
            chart.scrollbarX.y = -140;
            chart.scrollbarX.isMeasured = false;
            chart.scrollbarX.opacity = 0.5;
            let cursor = new am4plugins_timeline.CurveCursor();
            chart.cursor = cursor;
            cursor.xAxis = dateAxis;
            cursor.yAxis = categoryAxis;
            cursor.lineY.disabled = true;
            cursor.lineX.disabled = true;
        
            dateAxis.renderer.tooltipLocation2 = 0;
            categoryAxis.cursorTooltipEnabled = true;
        
            chart.zoomOutButton.disabled = false;
        
            let previousBullet;
        
            chart.events.on("inited", function() {
                setTimeout(function() {
                    hoverItem(series.dataItems.getIndex(0));
                }, 2000)
            })
        
            function hoverItem(dataItem) {
                let bullet = dataItem.bullets.getKey(imageBullet1.uid);
                let index = dataItem.index;
        
                if (index >= series.dataItems.length - 1) {
                    index = -1;
                }
        
                if (bullet) {
        
                    if (previousBullet) {
                        previousBullet.isHover = false;
                    }
        
                    bullet.isHover = true;
        
                    previousBullet = bullet;
                }
                setTimeout(
                    function() {
                        hoverItem(series.dataItems.getIndex(index + 1))
                    }, 1000);
            }
        
        });
        
        
        function getPoints() {
        
            let points = [{ x: -1300, y: 200 }, { x: 0, y: 200 }];
        
            let w = 400;
            let h = 400;
            let levelCount = 4;
        
            let radius = am4core.math.min(w / (levelCount - 1) / 2, h / 2);
            let startX = radius;
        
            for (var i = 0; i < 25; i++) {
                let angle = 0 + i / 25 * 90;
                let centerPoint = { y: 200 - radius, x: 0 }
                points.push({ y: centerPoint.y + radius * am4core.math.cos(angle), x: centerPoint.x + radius * am4core.math.sin(angle) });
            }
        
        
            for (var i = 0; i < levelCount; i++) {
        
                if (i % 2 != 0) {
                    points.push({ y: -h / 2 + radius, x: startX + w / (levelCount - 1) * i })
                    points.push({ y: h / 2 - radius, x: startX + w / (levelCount - 1) * i })
        
                    let centerPoint = { y: h / 2 - radius, x: startX + w / (levelCount - 1) * (i + 0.5) }
                    if (i < levelCount - 1) {
                        for (var k = 0; k < 50; k++) {
                            let angle = -90 + k / 50 * 180;
                            points.push({ y: centerPoint.y + radius * am4core.math.cos(angle), x: centerPoint.x + radius * am4core.math.sin(angle) });
                        }
                    }
        
                    if (i == levelCount - 1) {
                        points.pop();
                        points.push({ y: -radius, x: startX + w / (levelCount - 1) * i })
                        let centerPoint = { y: -radius, x: startX + w / (levelCount - 1) * (i + 0.5) }
                        for (var k = 0; k < 25; k++) {
                            let angle = -90 + k / 25 * 90;
                            points.push({ y: centerPoint.y + radius * am4core.math.cos(angle), x: centerPoint.x + radius * am4core.math.sin(angle) });
                        }
                        points.push({ y: 0, x: 1300 });
                    }
        
                }
                else {
                    points.push({ y: h / 2 - radius, x: startX + w / (levelCount - 1) * i })
                    points.push({ y: -h / 2 + radius, x: startX + w / (levelCount - 1) * i })
                    let centerPoint = { y: -h / 2 + radius, x: startX + w / (levelCount - 1) * (i + 0.5) }
                    if (i < levelCount - 1) {
                        for (var k = 0; k < 50; k++) {
                            let angle = -90 - k / 50 * 180;
                            points.push({ y: centerPoint.y + radius * am4core.math.cos(angle), x: centerPoint.x + radius * am4core.math.sin(angle) });
                        }
                    }
                }
            }
        
            return points;
        }
       }
      
        
          
     }, [OutForDelivery, zoom,  dispatch, currentUser, timeShifthour, timeShiftday, timeShiftmonth, TargetUserEventObjectData, mapData])

    return(<> 
          {mapData.length !==0 ?
          
         <div className="shadow-lg p-3 mb-5 bg-body rounded m-3"  id={nameChart} style={{height: "500px", width: "95%"}}>
             </div>
         : <div className="shadow-lg p-3 mb-5 bg-body rounded m-3 bhag"  >
            
<h1 className="display-5"> No Data Found</h1>        

     </div> }
    </>)
}

export default TimeLineAmChart;