import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
let runStop = true;
export  const RouteMap = ({ startPoint, endPoint, order, runState }) => {
    const map2 = useMap();
     const [map, setMap] = useState(map2)
    const navigate=useNavigate()
    useEffect(() => {
      try{
        if (  map?.removeLayer!=null) {
      
          if (map && startPoint && endPoint && order?.length > 0) {
        
            map?.eachLayer((layer) => {
              if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                map?.removeLayer(layer);
              }else{
                //  navigate('/OrderCart')
              }
            });
    
            const waypoints = [
              L.Routing.waypoint(
                L.latLng(startPoint.latitude, startPoint.longitude),
                startPoint.name
              ),
              L.Routing.waypoint(
                L.latLng(endPoint.latitude, endPoint.longitude),
                endPoint.name
              ),
            ];
    
            const startIcon = L.icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/651/651110.png',
              iconSize: [32, 32],
            });
    
            const endIcon = L.icon({
              iconUrl: 'https://p1.hiclipart.com/preview/962/554/474/pizza-logo-food-delivery-meal-delivery-service-pizza-restaurant-pizza-delivery-online-food-ordering-zomato-png-clipart.jpg',
              iconSize: [32, 32],
            });
    
            L.Routing.control({
              waypoints,
              createMarker: (i, wp, nWps) => {
                if (i === 0) {
                 
                  return L.marker(wp.latLng, { icon: startIcon });
                } else if (i === nWps - 1) {
              
                  return L.marker(wp.latLng, { icon: endIcon });
                } else {
                  const intermediateIcon = L.icon({
                    iconUrl: 'https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-location-icon-png-image_956422.jpg', // Replace with the actual URL
                    iconSize: [32, 32],
                  });
                  return L.marker(wp.latLng, { icon: intermediateIcon });
                }
              },
            }).addTo(map);
          
        }
    
        return()=>{
          runStop = false
    
        }
      }
      }  catch{
        runStop = false
      }
      
    }, [startPoint, endPoint]);
  
  };
  