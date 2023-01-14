import React from 'react';

import './CarouselProductCard.css';

export default function CarouselProductCard() {

    return (
       <div id="CarouselProductCard">
            <div className="upContent">
                <div className="carouselUpContentTitle">
                    Asus Zenbook Pro 15
                </div>
                <div className="carouselUpContentCategory">
                    in Informatica
                </div>
            </div>
           <div className="bottomContent">

               <div className="carouselBottomContentImg">
                   <img src={"img/Pc.png"} alt="some img"/>
               </div>
               <div className="carouselBottomContent">
                   <div className="carouselBottomContentLocationTime">
                       Bologna, Italy - 14/01/2023 10:15
                   </div>
                   <div className="carouselBottomContentDescription">
                       Notebook in alluminio da 15,6" Touchscreen OLED FHD Glossy.
                       Processore AMD Ryzen 7 5800H, RAM 16GB, 512GB SSD PCIE, NVIDIA GeForce RTX 3050 Ti 4GB GDDR6, Win 11 Home, Grigio.
                       Il notebook si presenta in ottime condizioni, con pochi segni di usura, acquistato nel 2022 scambio per mancato utilizzo.
                   </div>
                   <div className="carouselBottomContentValueState">
                       Valore commerciale: 500$
                       <br/>
                       Stato: Ottimo
                   </div>
                   <div className="carouselBottomContentOffer">
                       <select>
                           <option value="" selected disabled hidden>Seleziona un prodotto</option>
                           <option value="informatica">Informatica</option>
                           <option value="smarthpone">Smartphone</option>
                           <option value="console&game">Console&Game</option>
                       </select>
                       <button>Fai la tua offerta</button>
                   </div>
               </div>
           </div>
       </div>
    );
}