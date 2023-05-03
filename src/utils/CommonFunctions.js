export const checkInWishlist = (productId,setExistInWishlist) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    wishlist &&
      wishlist.map((w, i) => {
        if (w?.Id == productId) {
          setExistInWishlist(true);
        }
      });
  };

 export const getProductImages = (productData,setProductImages) => {
    let imgArray=[]
    if (productData?.ImageThumbURL1 != null && productData?.ImageURL1 != null) {
      const obj = {
        original: productData?.ImageURL1,
        thumbnail: productData?.ImageThumbURL1,
      };
      imgArray.push(obj);
    }
    if (productData?.ImageThumbURL2 != null && productData?.ImageURL2 != null) {
      const obj = {
        original: productData?.ImageURL2,
        thumbnail: productData?.ImageThumbURL2,
      };
      imgArray.push(obj);
    }
    if (productData?.ImageThumbURL3 != null && productData?.ImageURL3 != null) {
      const obj = {
        original: productData?.ImageURL3,
        thumbnail: productData?.ImageThumbURL3,
      };
      imgArray.push(obj);
    }
    if (productData?.ImageThumbURL4 != null && productData?.ImageURL4 != null) {
      const obj = {
        original: productData?.ImageURL4,
        thumbnail: productData?.ImageThumbURL4,
      };
      imgArray.push(obj);
    }
    if (productData?.ImageThumbURL5 != null && productData?.ImageURL5 != null) {
      const obj = {
        original: productData?.ImageURL5,
        thumbnail: productData?.ImageThumbURL5,
      };
      imgArray.push(obj);
    }
    if (productData?.ImageThumbURL6 != null && productData?.ImageURL6 != null) {
      const obj = {
        original: productData?.ImageURL6,
        thumbnail: productData?.ImageThumbURL6,
      };
      imgArray.push(obj);
    }
    if (productData?.ImageThumbURL7 != null && productData?.ImageURL7 != null) {
      const obj = {
        original: productData?.ImageURL7,
        thumbnail: productData?.ImageThumbURL7,
      };
      imgArray.push(obj);
    }
    setProductImages(imgArray);
  };