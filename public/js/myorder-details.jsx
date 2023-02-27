class TextMore {

    constructor(options = {}) {
      this.selector = options?.selector || '.text-more';
      this.selectorContainer = options?.selectorContainer || '.text-more__container';
      this.selectroBtn = options?.selectroBtn || '.text-more__btn';
      this.classOpened = options?.classOpened || 'text-more--opened';
      this.classCanMore = options?.classCanMore || 'text-more--true';
  
      let elemens = document.querySelectorAll(this.selector);
  
      elemens.length && elemens.forEach(item => {
  
        if (this.canBeMore(item)) {
  
          item.classList.add(this.classCanMore);
          
          item.querySelector(this.selectroBtn).addEventListener('click', e => this.onClick(item, e));
        }
      })
    }
  
    onClick(elem, e) {
      e.preventDefault();
    
      let container = elem.querySelector(this.selectorContainer),
          btn = e.currentTarget;
  
      elem.classList.toggle(this.classOpened);
  
      this.changeBtnTitle(btn);
  
  
      // change height container
      if (elem.classList.contains(this.classOpened)){
        container.style.maxHeight = container.scrollHeight + "px";
    
      } else {
        container.style.maxHeight = elem.dataset.startHeight + 'px';
      }
    }
  
    canBeMore(elem) {
      let container = elem.querySelector(this.selectorContainer);
  
      let startHeigth = container.offsetHeight,
          trueHeight = container.scrollHeight;
  
      if (trueHeight > startHeigth) {
        elem.dataset.startHeight = startHeigth;
        return true;
      }
    }
  
    changeBtnTitle(btn) {
            
      let swithTitle = btn.dataset.switchTitle,
          currentTitle = btn.innerText;
  
      btn.innerText = swithTitle;
      btn.dataset.switchTitle = currentTitle;
    }
  }
  
  new TextMore();
  