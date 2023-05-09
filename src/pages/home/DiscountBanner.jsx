import { Link } from "react-router-dom"
import "../../assets/styles/home/discountBanner.css"
 const DiscountBanner=()=>{
    return(
        <>
           <section class="section-align discount-banner py-4">
             <div class="container">
               <div class="row"> 
           
                 <div class="bgimage">
                   <div class="discount-banner-content">
                     <h2>UP TO <span> 60% </span> OFF </h2>
                     <p>Shopping experience that feels like luxury!</p>
                     <Link to="/shopping/Furniture/7" type="button" class="btn btn-cta">Shop Now</Link>
                   </div>
                 </div>
           
               </div>
             </div> 
           </section>
        </>
    )
 }

 export default DiscountBanner