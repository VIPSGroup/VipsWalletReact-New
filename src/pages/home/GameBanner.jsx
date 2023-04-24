import React from 'react'
import { Link } from 'react-router-dom'
import { gameZopLink } from '../../constants'

const GameBanner = () => {
  return (
    <>
    <Link to={gameZopLink} target="_blank">
      <section class="section-align game-banner">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="game-bgimage d-none d-sm-block">
                <img
                  src="/images/home/gamezop-banner.jpg"
                  class="img-fluid"
                  alt="VIPS Wallet"
                />
              </div>

              <div class="game-bgimage d-block d-sm-none">
                <img
                  src="/images/home/gamebanner-mobile.jpg"
                  class="img-fluid"
                  alt="VIPS Wallet"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  </>
  )
}

export default GameBanner