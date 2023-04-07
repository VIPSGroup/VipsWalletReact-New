import React, { useEffect } from 'react'
import "../../assets/styles/bus/bus-booking-home.css";

const BusBookingHome = ({ setIsBottomTopNav }) => {
    useEffect(() => {
        setIsBottomTopNav(true);
        return () => {
          setIsBottomTopNav(false);
        };
      }, []);
    
  return (
    <>
    <section class="bus-booking-top">
        <div class="bus-home-top-banner shadow-light" 
        style={{backgroundImage:'url("images/bus-booking/bus-home-header-bg.png")'}}
        > 
            <div class="container position-relative zindex-1">
              <div class="row align-content-center justify-content-between ">
                
                <div class="col-lg-5 col-md-6">
                    <form class="bus-booking-form">
                        <div class="travel-form-heading">
                          <h1 class="travel-form-title"> Bus Ticket Booking </h1>
                        </div>
                        
                        <div class="inside-wrap">
                          <div class="rotate-btn">
                            <figure>
                              <img src="images/bus-booking/swipe-icon.svg"/>
                            </figure>
                          </div>
                          <div class="from">
                            
                            <div class="dropdown select-option">
                              <button class="select-type" type="button" data-toggle="dropdown" aria-expanded="false">
                                Travelling From
                              </button>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Maharashtra</a>
                                <a class="dropdown-item" href="#">Karmataka</a>
                                <a class="dropdown-item" href="#">Gujrat</a>
                                <a class="dropdown-item" href="#">Maharashtra</a>
                                <a class="dropdown-item" href="#">Karmataka</a>
                                <a class="dropdown-item" href="#">Gujrat</a>
                                <a class="dropdown-item" href="#">Maharashtra</a>
                                <a class="dropdown-item" href="#">Karmataka</a>
                                <a class="dropdown-item" href="#">Gujrat</a>
                              </div>
                            </div>
                            
                          </div>
                          <div class="to">

                            <div class="dropdown select-option">
                              <button class="select-type" type="button" data-toggle="dropdown" aria-expanded="false">
                                Travelling To
                              </button>
                              <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Maharashtra</a>
                                <a class="dropdown-item" href="#">Karmataka</a>
                                <a class="dropdown-item" href="#">Gujrat</a>
                                <a class="dropdown-item" href="#">Maharashtra</a>
                                <a class="dropdown-item" href="#">Karmataka</a>
                                <a class="dropdown-item" href="#">Gujrat</a>
                                <a class="dropdown-item" href="#">Maharashtra</a>
                                <a class="dropdown-item" href="#">Karmataka</a>
                                <a class="dropdown-item" href="#">Gujrat</a>
                              </div>
                            </div>

                          </div>
                        </div>

                        <div class="bus-booking-date">
                          <div class="input-field"> 
                              <input type='date' placeholder='Select Date'/>
                              <label>Departure Date</label>
                          </div>
                        </div>
            
                        <div class="">
                          <div class="search-bus-btn">
                            <button class="btn-primery"> Search Bus </button>
                          </div> 
                        </div>

                    </form>

                </div>

                <div class="col-lg-6 col-md-6 pr-md-5 text-left align-self-center ">  
                    <h1 class="bus-home-top-banner-title"> Book Your <span>Bus</span> Now </h1>
                 
                    <p class="bus-home-top-banner-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis cursus cras facilisi consequat id. Tellus diam tincidunt mi aliquet arcu facilisi rutrum turpis nulla.</p>
                    

                    <div class="bus-animation">
                      <script src="pay-animations/bus_animation.js"></script>
                      <lottie-player src="pay-animations/bus_animation_json.json" background="transparent"  speed="1" class="bus-outer" loop  autoplay></lottie-player>
                    </div>

                </div>

              </div>
            </div>
        </div>
</section>
<section class="section">
    <div class="container">
        <div class="row">
            <div class="bus-home-banner">
                <img src="images/bus-booking/bus-home-banner.png" class="img-fluid" alt="VIPS Wallet Bus Booking" />
            </div>
        </div>

    </div>
</section>
<section class="recent-search">
    <div class="container">
        <div class="row">
          <div class="section-head">
            <h1 class="section-head-title"> <span>Recent</span> Searched</h1>
          </div>
          
            <div class="recent-search-outer shadow-dark">
                <div class="recent-search-card">
                    <div class="recent-searched-info">
                        <div class="recent-searched-location">
                            <p>Pune</p>
                            <span class="arrow-circle"></span>
                            <hr class="dashline"/>
                            <img src="images/bus-booking/bus-icon.svg" />
                            <p>Arni (Yavatmal)</p>
                        </div>
                        <div class="recent-dept-date">
                            <p> <i class="fa-regular fa-calendar-days"></i> Departure Date : <span>9 Feb Thu, 2023</span> </p>
                        </div>
                        
                    </div>

                    <div class="track-search-btn">
                        <button href="#" class="btn-cta" onclick="location.href = 'mobile-payment-confirm.html';"> Search </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
<section class="bus-travel-policy">
    <div class="container">
        <div class="row">

            <div class="bus-travel-policy-outer">
                <div class="section-head">
                    <h1 class="section-head-title"> <span>Travel</span> Policy</h1>
                </div>
    
                <div class="">
                    <p>The standard Lorem Ipsum passage, used since the 1500s</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</p>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
                    <p>1914 translation by H. Rackham</p>
                    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?</p>
                    <p>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</p>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat</p>
                    <p>1914 translation by H. Rackham</p>
                    <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                </div>
            </div>
            
        </div>

       

    </div>

</section>
    </>
  )
}

export default BusBookingHome