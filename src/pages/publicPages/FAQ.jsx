import React, { useEffect } from 'react'

const FAQ = ({setIsBottomTopNav}) => {
  useEffect(()=>{
    setIsBottomTopNav(true)
    return ()=>{setIsBottomTopNav(false)}
},[])
  return (
    <section class="inpage-section-align my-account">
    <div class="container">
      <div class="container">
        <div class="section-head">
          <h1 class="section-head-title"> FAQs </h1>
        </div>
      </div>

      <div class="content-outer">
        <ul>
          <li>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
              morbi amet vel, enim praesent.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
              morbi amet vel, enim praesent. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Arcu, morbi amet vel, enim
              praesent.
            </p>
            <p>Lorem ipsum dolor sit amet:</p>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
                morbi amet vel, enim praesent.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
                morbi amet vel, enim praesent.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
                morbi amet vel, enim praesent.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
                morbi amet vel, enim praesent.
              </li>
            </ul>
          </li>
          <li>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
              morbi amet vel, enim praesent.
            </p>
            <p>Lorem ipsum dolor sit amet:</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
              morbi amet vel, enim praesent. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Arcu, morbi amet vel, enim
              praesent.
            </p>
            <p>Lorem ipsum dolor sit amet:</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
              morbi amet vel, enim praesent. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Arcu, morbi amet vel, enim
              praesent.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
  )
}

export default FAQ