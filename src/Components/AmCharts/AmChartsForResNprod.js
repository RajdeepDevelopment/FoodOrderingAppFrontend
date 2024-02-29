

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../features/counter/counterSlice";

function AmChartsForResNprod({uniquerestaurent, StateLfForRestaurant, prevUser}){
     const products = useSelector( selectProducts)
    useEffect(()=>{
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
        chart.legend = new am4charts.Legend();
        chart.logo.disabled =true
        
        let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
        
        const uniqueRestaurantsWithProducts = uniquerestaurent.map((restaurant) => {
            const child = products.filter((product) => product.restaurantName === restaurant);
              const helperMap  = child.map((element, index)=>(
                {
                    name: element.name, value: index * (index* element.price* element.rating), img: element.thumbnail, _id: element?._id, price: element.price, rating: element.rating, discountPercentage: element.discountPercentage, uid: element.uid
                  }
              )) 

            return {
              name: restaurant,
              children: helperMap, 
            };
          });

StateLfForRestaurant(uniqueRestaurantsWithProducts)
        networkSeries.data =  uniqueRestaurantsWithProducts;
        networkSeries.dataFields.linkWith = "linkWith";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.id = "name";
        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.children = "children";
        
        networkSeries.nodes.template.tooltipText = "{name}";
        networkSeries.nodes.template.fillOpacity = 1;
        
        networkSeries.nodes.template.label.text = "{name}"
        networkSeries.fontSize = 10;
        networkSeries.maxLevels = 3;
        networkSeries.maxRadius = am4core.percent(15);
        networkSeries.manyBodyStrength = -0;
        networkSeries.nodes.template.label.hideOversized = true;
        networkSeries.nodes.template.label.truncate = true;
      }, [])

    return(<>
     {prevUser?.length !=0 && prevUser[0].Access ==="Admin" &&  
     
      <div id="chartdiv" style={{height: "800px" , width: "100%"}}> </div>
     }
    </>)
}

export default AmChartsForResNprod;