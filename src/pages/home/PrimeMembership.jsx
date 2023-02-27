import React from "react"


import "../../assets/styles/styles.css"
import "../../assets/styles/home/primeMembership.css"
import { Link } from "react-router-dom"

const PrimeMembership=()=>{
    return (
        <>
            <section class="section-align join-vips">
               <div class="container">
                 <div class="row">
             
                   <div class="col-sm-12">
                     <img src="images/home/join-the-vips.png" alt="join-vips" class="img-fluid" />
                     <div class="join-vips-content">
                       <h1>Be a VIPS Prime Member!</h1>
                       <p class="join-vips-content-p">
                        Avail exclusive discounts, offers and much more with VIPS Prime Membership
                       </p>
                       <Link to="/prime" type="button"  class="btn btn-cta">Buy Now</Link>
                     </div>
                   </div>
             
               </div>
               </div>
             
             </section>
        </>
    )
}

export default PrimeMembership